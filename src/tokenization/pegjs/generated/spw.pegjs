{
const _cache = new Map();

              function normalize(node) {
                  return {
                      key: text(),
                      ...Object
                          .fromEntries(
                              Object
                                  .entries(node)
                                  .filter(([k, v]) => k === 'key' ? true : v !== undefined)
                          ),
                      src:      text(),
                      location: location()
                  };
              }

              function toSpwItem(node) {
                  if (!node.kind) throw new Error('No node kind specified')
                  var cacheKey = JSON.stringify(location());
                  if (_cache.has(cacheKey)) return _cache.get(cacheKey);

                  const out = normalize(node);
                  _cache.set(cacheKey, out);
                  switch (out.kind) {
                      case 'channel':
                      case 'evaluation':
                      case 'invocation':
                      case 'performance':
                      case 'perspective':

                      case 'string':
                      case 'anchor':
                      case 'anchor':
                      case 'phrase':

                      case 'domain':
                      case 'group':
                      case 'essence':
                      case 'concept':

                      case 'strand':

                      case 'strand-tail':
                      case 'node-body':
                      case 'delimiter':
                      case 'space':
                          return out;
                      default:
                          console.error('No handler for ' + out.kind);
                          out ? (out.kind = out.kind || 'unknown') : null;
                          throw new Error();
                  }
              }
}

Top = 
body:(StrandExpression / DomainNode / EssentialNode / ConceptualNode / GroupNode / PureAtom / LabeledNode / LabeledNode / Space)*
{const items=Array.isArray(body)?body.map(i=>i&&i.kind?i:void 0).filter(i=>void 0!==i):body;return 1===items.length?items[0]:items;}

Space = 
(newlines:(([\t\s ] / newline:[\n,] {return newline;})+)+ {return toSpwItem({kind:"space"});})

StrandExpression = 
head:(PureAtom / LabeledNode) (Space)* tail:((Space)* transport:"=>" (Space)* tail:(StrandExpression / PureAtom) {return toSpwItem({kind:"strand-tail",tail:tail,transport:transport});})+
{return toSpwItem({kind:"strand",head:head,tail:tail});}

Phrase = 
phrase:(head:Anchor tail:(([\t\s ])+ anchor:Anchor {return anchor;})+ {return[head,...tail];})
{const p=phrase.reduce((r,e)=>[...r,...Array.isArray(e)?e:[e]],[]);return toSpwItem({kind:"phrase",key:p.map(r=>r.key).join(" "),body:p});}

UnicodeWithoutQuotes = 
[-a-zA-Z \t\'] / [\u0020-\u0021,\u0023-\u26FF]

Anchor = 
anchor:((head:([a-zA-Z])+ tail:([a-zA-Z0-9])* {return[...head,...tail].join("");}) / (head:([a-zA-Z])+ tail:([-a-zA-Z_0-9])+ tail_2:[a-zA-Z0-9] {return[...head,...tail,tail_2].join("");}) / "&")
{return toSpwItem({kind:"anchor",key:anchor});}

String = 
string:(([\'] (UnicodeWithoutQuotes / [\n] / [\"])* [\']) / ([\"] (("\\" [\"]) / UnicodeWithoutQuotes / [\n] / [\'])* [\"]))
{return toSpwItem({kind:"string",key:string});}

PureAtom = 
Phrase / Anchor / String

ChannelNode = 
components:(token:"#" "_" label:Anchor {undefined}) / "#"
{return toSpwItem({kind:"channel",...components});}

EvaluationNode = 
components:(token:"?" "_" label:Anchor {undefined}) / "?"
{return toSpwItem({kind:"evaluation",...components});}

InvocationNode = 
components:(token:"~" "_" label:Anchor {undefined}) / "~"
{return toSpwItem({kind:"invocation",...components});}

PerformanceNode = 
components:(token:"!" "_" label:Anchor {undefined}) / "!"
{return toSpwItem({kind:"performance",...components});}

PerspectiveNode = 
components:(token:"@" "_" label:Anchor {undefined}) / "@"
{return toSpwItem({kind:"perspective",...components});}

LabeledNode = 
ChannelNode / EvaluationNode / InvocationNode / PerformanceNode / PerspectiveNode

DomainNodeOpen = 
(token:"{" "_" node:(anchor:(Anchor / DomainNode / EssentialNode / ConceptualNode / GroupNode) description:(DomainNode / EssentialNode / ConceptualNode / GroupNode)? {return{anchor:anchor,description:description};}) (Space {return null;}) {return toSpwItem({key:[token,node.anchor.key].join("_"),...node,kind:"delimiter"});}) / (tok:"{" {return toSpwItem({key:tok,label:null,kind:"delimiter"});})

DomainNodeClose = 
(node:Anchor "_" token:"}" {return toSpwItem({key:[token,node.key].join("_"),anchor:null,kind:"delimiter"});}) / (tok:"}" {return toSpwItem({key:tok,label:null,kind:"delimiter"});})

DomainNodeBody = 
(items:(item:(StrandExpression / LabeledNode / PureAtom / (Space {return null;})) {return item;})+ {return toSpwItem({kind:"node-body",key:items.map(e=>e&&e.key).filter(Boolean).join(", "),entries:items.filter(e=>null!=e)});})

DomainNode = 
container:((open:DomainNodeOpen (([\t\s ] {return null;}) / (underscore:"_" {return underscore;}) / ([\n,] {return null;}))* close:DomainNodeClose {return{open:open,close:close};}) / (open:DomainNodeOpen body:DomainNodeBody close:DomainNodeClose {return{open:open,body:body,close:close};}))
{return toSpwItem({...container,key:[container.open.key+(container.open.anchor?" ":""),(container.body||{}).key||"#",container.close.key].join(""),kind:"domain"});}

EssentialNodeOpen = 
(token:"[" "_" node:(anchor:(Anchor / DomainNode / EssentialNode / ConceptualNode / GroupNode) description:(DomainNode / EssentialNode / ConceptualNode / GroupNode)? {return{anchor:anchor,description:description};}) (Space {return null;}) {return toSpwItem({key:[token,node.anchor.key].join("_"),...node,kind:"delimiter"});}) / (tok:"[" {return toSpwItem({key:tok,label:null,kind:"delimiter"});})

EssentialNodeClose = 
(node:Anchor "_" token:"]" {return toSpwItem({key:[token,node.key].join("_"),anchor:null,kind:"delimiter"});}) / (tok:"]" {return toSpwItem({key:tok,label:null,kind:"delimiter"});})

EssentialNodeBody = 
(items:(item:(StrandExpression / LabeledNode / PureAtom / (Space {return null;})) {return item;})+ {return toSpwItem({kind:"node-body",key:items.map(e=>e&&e.key).filter(Boolean).join(", "),entries:items.filter(e=>null!=e)});})

EssentialNode = 
container:((open:EssentialNodeOpen (([\t\s ] {return null;}) / (underscore:"_" {return underscore;}) / ([\n,] {return null;}))* close:EssentialNodeClose {return{open:open,close:close};}) / (open:EssentialNodeOpen body:EssentialNodeBody close:EssentialNodeClose {return{open:open,body:body,close:close};}))
{return toSpwItem({...container,key:[container.open.key+(container.open.anchor?" ":""),(container.body||{}).key||"#",container.close.key].join(""),kind:"essence"});}

ConceptualNodeOpen = 
(token:"<" "_" node:(anchor:(Anchor / DomainNode / EssentialNode / ConceptualNode / GroupNode) description:(DomainNode / EssentialNode / ConceptualNode / GroupNode)? {return{anchor:anchor,description:description};}) (Space {return null;}) {return toSpwItem({key:[token,node.anchor.key].join("_"),...node,kind:"delimiter"});}) / (tok:"<" {return toSpwItem({key:tok,label:null,kind:"delimiter"});})

ConceptualNodeClose = 
(node:Anchor "_" token:">" {return toSpwItem({key:[token,node.key].join("_"),anchor:null,kind:"delimiter"});}) / (tok:">" {return toSpwItem({key:tok,label:null,kind:"delimiter"});})

ConceptualNodeBody = 
(items:(item:(StrandExpression / LabeledNode / PureAtom / (Space {return null;})) {return item;})+ {return toSpwItem({kind:"node-body",key:items.map(e=>e&&e.key).filter(Boolean).join(", "),entries:items.filter(e=>null!=e)});})

ConceptualNode = 
container:((open:ConceptualNodeOpen (([\t\s ] {return null;}) / (underscore:"_" {return underscore;}) / ([\n,] {return null;}))* close:ConceptualNodeClose {return{open:open,close:close};}) / (open:ConceptualNodeOpen body:ConceptualNodeBody close:ConceptualNodeClose {return{open:open,body:body,close:close};}))
{return toSpwItem({...container,key:[container.open.key+(container.open.anchor?" ":""),(container.body||{}).key||"#",container.close.key].join(""),kind:"concept"});}

GroupNodeOpen = 
(token:"(" "_" node:(anchor:(Anchor / DomainNode / EssentialNode / ConceptualNode / GroupNode) description:(DomainNode / EssentialNode / ConceptualNode / GroupNode)? {return{anchor:anchor,description:description};}) (Space {return null;}) {return toSpwItem({key:[token,node.anchor.key].join("_"),...node,kind:"delimiter"});}) / (tok:"(" {return toSpwItem({key:tok,label:null,kind:"delimiter"});})

GroupNodeClose = 
(node:Anchor "_" token:")" {return toSpwItem({key:[token,node.key].join("_"),anchor:null,kind:"delimiter"});}) / (tok:")" {return toSpwItem({key:tok,label:null,kind:"delimiter"});})

GroupNodeBody = 
(items:(item:(StrandExpression / LabeledNode / PureAtom / (Space {return null;})) {return item;})+ {return toSpwItem({kind:"node-body",key:items.map(e=>e&&e.key).filter(Boolean).join(", "),entries:items.filter(e=>null!=e)});})

GroupNode = 
container:((open:GroupNodeOpen (([\t\s ] {return null;}) / (underscore:"_" {return underscore;}) / ([\n,] {return null;}))* close:GroupNodeClose {return{open:open,close:close};}) / (open:GroupNodeOpen body:GroupNodeBody close:GroupNodeClose {return{open:open,body:body,close:close};}))
{return toSpwItem({...container,key:[container.open.key+(container.open.anchor?" ":""),(container.body||{}).key||"#",container.close.key].join(""),kind:"group"});}