{
function normalize(node) {
                  return {
                      key: text().trim(),
                      ...Object
                          .fromEntries(
                              Object
                                  .entries(node)
                                  .filter(([k, v]) => v !== null)
                          ),
                      location: location(),
                  };
              }

              function spwNode(node) {
                  if (!node.kind) throw new Error('No node kind specified')
                  const out = normalize(node);
                  switch (out.kind) {
                      case 'node':
                      case 'channel':
                      case 'performance':
                      case 'perspective':
                      case 'evaluation':
                      case 'string':
                      case 'anchor':
                      case 'domain':
                      case 'strand':
                      case 'space':
                      case 'phrase':
                      case 'transport':
                      case 'essence':
                      case 'concept':
                      case 'selection':
                      case 'analog':
                      case 'analog-tail':
                      case 'analogical-operator':
                      case 'complex_node':
                      case 'invocation':
                      case 'strand-tail':
                          return out;
                      default:
                          console.error('No handler for ' + out.kind);
                          out ? (out.kind = out.kind || 'unknown') : null;
                          return out;
                  }
              }
}

Top = 
body:(DomainBody / (head:([\t \n] / Strand / Node) [\t \n] tail:([\t \n] / Strand / Node)+ {return[head,...tail];}))
{{const r=Array.isArray(body)?body.map(r=>{if(r&&r.kind)return r}).filter(r=>void 0!==r):body;return 1===r.length?r[0]:r}}

DescriptionSequence = 
([\t ]* "." [\n\t ]* description:(Concept / Aside / Domain / Essence) {return description;})*

LabelNode = 
node:(Anchor / String)
{return node;}

Node = 
(node:(":" / Invocation / Performance / Evaluation / Perspective / ChannelAnchor / PerformanceAnchor / EvaluationAnchor / PerspectiveAnchor / String / Anchor / Essence / Domain / Aside / Concept) essence:Essence? description:DescriptionSequence {{const e={kind:"node",node:node};return essence||description.length?(essence&&(e.essence=essence),description.length&&(e.description=description),spwNode(e)):node}}) / node:(":" / Invocation / Performance / Evaluation / Perspective / ChannelAnchor / PerformanceAnchor / EvaluationAnchor / PerspectiveAnchor / String / Anchor / Essence / Domain / Aside / Concept)
{return node;}

UnicodeWithoutQuotes = 
[-a-zA-Z \t\'] / [\u0020-\u0021,\u0023-\u26FF]

String = 
string:(([\'] body:(UnicodeWithoutQuotes / [\n] / [\"])* [\'] {return body.join("");}) / ([\"] body:((quote:("\\" [\"]) {return'"';}) / UnicodeWithoutQuotes / [\n] / [\'])* [\"] {return body.join("");}))
{return spwNode({kind:"string",key:string});}

Phrase = 
phrase:(Node body:([\t ]* "\\" [\n] [\t ]* / [\t ]+ anchor:Node {return anchor;})+)
{return spwNode({kind:"phrase",key:phrase,slam:phrase});}

complexAnchor = 
complexAnchor:(Node body:([\t ]* "." [\t ]* anchor:Node {return anchor;})+)
{return spwNode({kind:"complexAnchor",key:complexAnchor,body:complexAnchor});}

Analog = 
head:Node [\t ]* tail:([\n\t ]* operator:AnalogicalTransport [\n\t ]* node:Node {return spwNode({kind:"analog-tail",node:node,operator:operator});})+
{return spwNode({kind:"analog",head:head,tail:tail});}

BondOperator = 
operator:([\t ]* (eq:"-"+ {return eq.join("");}) [\t ]*)
{return spwNode({kind:"bond-operator",basis:operator.join("")});}

Bond = 
head:Node [\t ]* tail:([\n\t ]* operator:BondOperator [\n\t ]* node:Node {return spwNode({kind:"bond-tail",node:node,operator:operator});})+
{return spwNode({kind:"bond",head:head,tail:tail});}

Strand = 
head:(Phrase / complexAnchor / Node) [\t ]* tail:([\n\t ]* transport:(transport:ObjectiveTransport / transport:SubjectiveTransport) [\n\t ]* node:(Phrase / complexAnchor / Node) {return spwNode({kind:"strand-tail",node:node,transport:transport});})+
{return spwNode({kind:"strand",head:head,tail:tail});}

ObjectiveTransport = 
transport:("<" "=" (eq:"="+ {return eq.join("");}))
{return spwNode({kind:"transport",basis:transport.join("")});}

SubjectiveTransport = 
transport:((eq:"="+ {return eq.join("");}) ">")
{return spwNode({kind:"transport",basis:transport.join("")});}

AnalogicalTransport = 
operator:([\t ]* (eq:"="+ {return eq.join("");}) [\t ]*)
{return spwNode({kind:"analogical-operator",basis:operator.join("")});}

ConsequentialTransport = 
operator:("=>>" / ((eq:"="+ {return eq.join("");}) body:(Domain / Essence / Concept) (eq:"="+ {return eq.join("");}) ">>" {return{body:body};}) / ((body:(body:(Domain / Essence / Concept) description:DescriptionSequence?) {return{body:body,description:description};}) (eq:"="+ {return eq.join("");}) ">>" {return{body:body};}))
{return spwNode({kind:"consequential-operator",basis:operator});}

DomainOpen = 
("{" "_" node:LabelNode {return node;}) / ("{" {return null;})

DomainClose = 
(node:LabelNode "_" "}" {return node;}) / ("}" {return null;})

DomainBody = 
body:(item:(Phrase / complexAnchor / Strand / Analog / Perspective / (body:(node:Node [\t ]* channel:Channel {return[node,channel];})+ {return spwNode({kind:"complex_node",body:body.flatMap(d=>d)});}) / Node / (newlines:([\t ]* newline:[\n,] [\t ]* {return newline;})+ {{const e=newlines.length;if(1===e)return;return spwNode({kind:"space",distance:e-1})}})) {return item;})+

Domain = 
container:((open_anchor:DomainOpen ([\t ] / newline:[\n,])* close_anchor:DomainClose {return"undefined"==typeof underscore?{objective_anchor:open_anchor,subjective_anchor:close_anchor}:{anchor:open_anchor};}) / (open_anchor:DomainOpen underscore:"_" close_anchor:DomainClose {return"undefined"==typeof underscore?{objective_anchor:open_anchor,subjective_anchor:close_anchor}:{anchor:open_anchor};}) / (open_anchor:DomainOpen [\t ]* body:DomainBody [\t ]* close_anchor:DomainClose {return{objective_anchor:open_anchor,body:body.filter(o=>void 0!==o),subjective_anchor:close_anchor};}))
{return spwNode({kind:"domain",...container});}

AsideOpen = 
("(" "_" node:LabelNode {return node;}) / ("(" {return null;})

AsideClose = 
(node:LabelNode "_" ")" {return node;}) / (")" {return null;})

AsideBody = 
body:(item:(Phrase / complexAnchor / Strand / Analog / Perspective / (body:(node:Node [\t ]* channel:Channel {return[node,channel];})+ {return spwNode({kind:"complex_node",body:body.flatMap(d=>d)});}) / Node / (newlines:([\t ]* newline:[\n,] [\t ]* {return newline;})+ {{const e=newlines.length;if(1===e)return;return spwNode({kind:"space",distance:e-1})}})) {return item;})+

Aside = 
container:((open_anchor:AsideOpen ([\t ] / newline:[\n,])* close_anchor:AsideClose {return"undefined"==typeof underscore?{objective_anchor:open_anchor,subjective_anchor:close_anchor}:{anchor:open_anchor};}) / (open_anchor:AsideOpen underscore:"_" close_anchor:AsideClose {return"undefined"==typeof underscore?{objective_anchor:open_anchor,subjective_anchor:close_anchor}:{anchor:open_anchor};}) / (open_anchor:AsideOpen [\t ]* body:AsideBody [\t ]* close_anchor:AsideClose {return{objective_anchor:open_anchor,body:body.filter(o=>void 0!==o),subjective_anchor:close_anchor};}))
{return spwNode({kind:"aside",...container});}

ConceptOpen = 
("<" "_" node:LabelNode {return node;}) / ("<" {return null;})

ConceptClose = 
(node:LabelNode "_" ">" {return node;}) / (">" {return null;})

ConceptBody = 
body:(item:(Phrase / complexAnchor / Strand / Analog / Perspective / (body:(node:Node [\t ]* channel:Channel {return[node,channel];})+ {return spwNode({kind:"complex_node",body:body.flatMap(d=>d)});}) / Node / (newlines:([\t ]* newline:[\n,] [\t ]* {return newline;})+ {{const e=newlines.length;if(1===e)return;return spwNode({kind:"space",distance:e-1})}})) {return item;})+

Concept = 
container:((open_anchor:ConceptOpen ([\t ] / newline:[\n,])* close_anchor:ConceptClose {return"undefined"==typeof underscore?{objective_anchor:open_anchor,subjective_anchor:close_anchor}:{anchor:open_anchor};}) / (open_anchor:ConceptOpen underscore:"_" close_anchor:ConceptClose {return"undefined"==typeof underscore?{objective_anchor:open_anchor,subjective_anchor:close_anchor}:{anchor:open_anchor};}) / (open_anchor:ConceptOpen [\t ]* body:ConceptBody [\t ]* close_anchor:ConceptClose {return{objective_anchor:open_anchor,body:body.filter(o=>void 0!==o),subjective_anchor:close_anchor};}))
{return spwNode({kind:"concept",...container});}

EssenceOpen = 
("[" "_" node:LabelNode {return node;}) / ("[" {return null;})

EssenceClose = 
(node:LabelNode "_" "]" {return node;}) / ("]" {return null;})

EssenceBody = 
body:(item:(Phrase / complexAnchor / Strand / Analog / Perspective / (body:(node:Node [\t ]* channel:Channel {return[node,channel];})+ {return spwNode({kind:"complex_node",body:body.flatMap(d=>d)});}) / Node / (newlines:([\t ]* newline:[\n,] [\t ]* {return newline;})+ {{const e=newlines.length;if(1===e)return;return spwNode({kind:"space",distance:e-1})}})) {return item;})+

Essence = 
container:((open_anchor:EssenceOpen ([\t ] / newline:[\n,])* close_anchor:EssenceClose {return"undefined"==typeof underscore?{objective_anchor:open_anchor,subjective_anchor:close_anchor}:{anchor:open_anchor};}) / (open_anchor:EssenceOpen underscore:"_" close_anchor:EssenceClose {return"undefined"==typeof underscore?{objective_anchor:open_anchor,subjective_anchor:close_anchor}:{anchor:open_anchor};}) / (open_anchor:EssenceOpen [\t ]* body:EssenceBody [\t ]* close_anchor:EssenceClose {return{objective_anchor:open_anchor,body:body.filter(o=>void 0!==o),subjective_anchor:close_anchor};}))
{return spwNode({kind:"essence",...container});}

ChannelAnchor = 
label:(("#" "_" label:LabelNode {return label;}) / "#")
{return spwNode({kind:"channel",label:label});}

Channel = 
(channel:ChannelAnchor [\t ]* node:Node [\t ]* {return spwNode({kind:"selection",transport:channel,node:node});})

PerformanceAnchor = 
label:(("!" "_" label:LabelNode {return label;}) / "!")
{return spwNode({kind:"performance",label:label});}

Performance = 
(actor:(String / Anchor / Essence / Domain / Aside / Concept) [\t ]* label:PerformanceAnchor [\t ]* target:(node:(String / Anchor / Essence / Domain / Aside / Concept) {return node;})? [\n\t ]* consequence:ConsequentialTransport? {return target=void 0!==target?target:null,consequence=void 0!==consequence?consequence:null,target||consequence?spwNode({kind:"performance",actor:actor,label:label,target:target,consequence:consequence}):label;}) / (label:PerformanceAnchor [\t ]* target:(node:(String / Anchor / Essence / Domain / Aside / Concept) {return node;})? [\n\t ]* consequence:ConsequentialTransport? {return target=void 0!==target?target:null,consequence=void 0!==consequence?consequence:null,target||consequence?spwNode({kind:"performance",label:label,target:target,consequence:consequence}):label;})

InvocationAnchor = 
label:(("~" "_" label:LabelNode {return label;}) / "~")
{return spwNode({kind:"invocation",label:label});}

Invocation = 
(actor:(String / Anchor / Essence / Domain / Aside / Concept) [\t ]* label:InvocationAnchor [\t ]* target:(node:(String / Anchor / Essence / Domain / Aside / Concept) {return node;})? [\n\t ]* consequence:ConsequentialTransport? {return target=void 0!==target?target:null,consequence=void 0!==consequence?consequence:null,target||consequence?spwNode({kind:"invocation",actor:actor,label:label,target:target,consequence:consequence}):label;}) / (label:InvocationAnchor [\t ]* target:(node:(String / Anchor / Essence / Domain / Aside / Concept) {return node;})? [\n\t ]* consequence:ConsequentialTransport? {return target=void 0!==target?target:null,consequence=void 0!==consequence?consequence:null,target||consequence?spwNode({kind:"invocation",label:label,target:target,consequence:consequence}):label;})

EvaluationAnchor = 
label:(("?" "_" label:LabelNode {return label;}) / "?")
{return spwNode({kind:"evaluation",label:label});}

Evaluation = 
(evaluation:EvaluationAnchor [\t ]* target:Node? [\n\t ]* consequence:("=>>" [\n\t ]* node:Node {return node;})? {return target=void 0!==target?target:null,consequence=void 0!==consequence?consequence:null,target||consequence?spwNode({kind:"evaluation",label:evaluation,target:target,consequence:consequence}):evaluation;})

PerspectiveAnchor = 
label:(("@" "_" label:LabelNode {return label;}) / "@")
{return spwNode({kind:"perspective",label:label});}

Perspective = 
(perspective:PerspectiveAnchor [\t ]* node:(Phrase / complexAnchor / Channel / Node) [\t ]* {return spwNode({kind:"selection",transport:perspective,node:node});})

Anchor = 
anchor:((body:[-a-zA-Z_0-9]+ {return body.join("");}) / "&")
{return spwNode({kind:"anchor",key:anchor});}