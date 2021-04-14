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
                             case 'phrase_expression':

                             case 'number':
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
body:(Expression / ContainerNode / Atom / (Space {return null;}))*
{const items=Array.isArray(body)?body.map(i=>i&&i.kind?i:void 0).filter(i=>void 0!==i):body;return 1===items.length?items[0]:items;}

UnicodeWithoutQuotes = 
[-a-zA-Z \t\'] / [\u0020-\u0021,\u0023-\u26FF]

Space = 
(newlines:(([\t ] / newline:[\n,] {return newline;})+)+ {return toSpwItem({kind:"space"});})

Atom = 
LabeledAtom / PureAtom

Anchor = 
anchor:((head:([a-zA-Z])+ tail:(line:("-" / "_") chars:([a-zA-Z0-9])+ {return line+chars.join("");})+ {return[...head,...tail].join("");}) / (head:([a-zA-Z])+ tail:([a-zA-Z0-9])* {return[...head,...tail].join("");}) / "&")
{return toSpwItem({kind:"anchor",key:anchor});}

Number = 
num:([0-9])+
{return toSpwItem({kind:"number",key:parseInt(num.join(""))});}

Phrase = 
phrase:(head:Anchor tail:(([\t ])+ anchor:Anchor {return anchor;})+ {return[head,...tail];})
{const p=phrase.reduce((r,e)=>[...r,...Array.isArray(e)?e:[e]],[]);return toSpwItem({kind:"phrase",key:p.map(r=>r.key).join(" "),body:p});}

StringNode = 
string:(([\'] body:(UnicodeWithoutQuotes / [\n] / [\"])* [\'] {return body.join("");}) / ([\"] body:(("\\" [\"] {return'"';}) / UnicodeWithoutQuotes / [\n] / [\'])* [\"] {return body.join("");}))
{return toSpwItem({kind:"string",key:string});}

PureAtom = 
Phrase / StringNode / Number / Anchor

LabeledAtom = 
ChannelNode / EvaluationNode / InvocationNode / PerformanceNode / PerspectiveNode

ChannelNode = 
components:((token:"#" "_" label:Anchor {return{token:token,label:label};}) / "#")
{return toSpwItem({kind:"channel",...components});}

EvaluationNode = 
components:((token:"?" "_" label:Anchor {return{token:token,label:label};}) / "?")
{return toSpwItem({kind:"evaluation",...components});}

InvocationNode = 
components:((token:"~" "_" label:Anchor {return{token:token,label:label};}) / "~")
{return toSpwItem({kind:"invocation",...components});}

PerformanceNode = 
components:((token:"!" "_" label:Anchor {return{token:token,label:label};}) / "!")
{return toSpwItem({kind:"performance",...components});}

PerspectiveNode = 
components:((token:"@" "_" label:Anchor {return{token:token,label:label};}) / "@")
{return toSpwItem({kind:"perspective",...components});}

ContainerNode = 
DomainNode / EssentialNode / ConceptNode / GroupNode

DomainNodeOpen = 
(token:"{" "_" node:(anchor:(Anchor / DomainNode / EssentialNode / ConceptNode / GroupNode) description:(DomainNode / EssentialNode / ConceptNode / GroupNode)? {return{anchor:anchor,description:description};}) (Space {return null;}) {return toSpwItem({key:[token,node.anchor.key].join("_"),...node,kind:"delimiter"});}) / (tok:"{" {return toSpwItem({key:tok,label:null,kind:"delimiter"});})

DomainNodeClose = 
(node:Anchor "_" token:"}" {return toSpwItem({key:[token,node.key].join("_"),anchor:null,kind:"delimiter"});}) / (tok:"}" {return toSpwItem({key:tok,label:null,kind:"delimiter"});})

DomainNodeBody = 
(items:(StrandExpression / PhraseExpression / LabeledAtom / PureAtom / DomainNode / EssentialNode / ConceptNode / GroupNode / (Space {return null;}))+ {const entries=items.filter(e=>null!=e),key=items.map(e=>e&&e.key).filter(Boolean).join(", ");return toSpwItem({kind:"node-body",key:key,entries:entries});})

DomainNode = 
container:((open:DomainNodeOpen (([\t ] {return null;}) / (underscore:"_" {return underscore;}) / ([\n,] {return null;}))* close:DomainNodeClose {return{open:open,close:close};}) / (open:DomainNodeOpen body:DomainNodeBody close:DomainNodeClose {return{open:open,body:body,close:close};}))
{const key=[container.open.key+(container.open.anchor?" ":""),(container.body||{}).key||"#",container.close.key].join("");return toSpwItem({...container,key:key,kind:"domain"});}

EssentialNodeOpen = 
(token:"[" "_" node:(anchor:(Anchor / DomainNode / EssentialNode / ConceptNode / GroupNode) description:(DomainNode / EssentialNode / ConceptNode / GroupNode)? {return{anchor:anchor,description:description};}) (Space {return null;}) {return toSpwItem({key:[token,node.anchor.key].join("_"),...node,kind:"delimiter"});}) / (tok:"[" {return toSpwItem({key:tok,label:null,kind:"delimiter"});})

EssentialNodeClose = 
(node:Anchor "_" token:"]" {return toSpwItem({key:[token,node.key].join("_"),anchor:null,kind:"delimiter"});}) / (tok:"]" {return toSpwItem({key:tok,label:null,kind:"delimiter"});})

EssentialNodeBody = 
(items:(StrandExpression / PhraseExpression / LabeledAtom / PureAtom / DomainNode / EssentialNode / ConceptNode / GroupNode / (Space {return null;}))+ {const entries=items.filter(e=>null!=e),key=items.map(e=>e&&e.key).filter(Boolean).join(", ");return toSpwItem({kind:"node-body",key:key,entries:entries});})

EssentialNode = 
container:((open:EssentialNodeOpen (([\t ] {return null;}) / (underscore:"_" {return underscore;}) / ([\n,] {return null;}))* close:EssentialNodeClose {return{open:open,close:close};}) / (open:EssentialNodeOpen body:EssentialNodeBody close:EssentialNodeClose {return{open:open,body:body,close:close};}))
{const key=[container.open.key+(container.open.anchor?" ":""),(container.body||{}).key||"#",container.close.key].join("");return toSpwItem({...container,key:key,kind:"essence"});}

ConceptNodeOpen = 
(token:"<" "_" node:(anchor:(Anchor / DomainNode / EssentialNode / ConceptNode / GroupNode) description:(DomainNode / EssentialNode / ConceptNode / GroupNode)? {return{anchor:anchor,description:description};}) (Space {return null;}) {return toSpwItem({key:[token,node.anchor.key].join("_"),...node,kind:"delimiter"});}) / (tok:"<" {return toSpwItem({key:tok,label:null,kind:"delimiter"});})

ConceptNodeClose = 
(node:Anchor "_" token:">" {return toSpwItem({key:[token,node.key].join("_"),anchor:null,kind:"delimiter"});}) / (tok:">" {return toSpwItem({key:tok,label:null,kind:"delimiter"});})

ConceptNodeBody = 
(items:(StrandExpression / PhraseExpression / LabeledAtom / PureAtom / DomainNode / EssentialNode / ConceptNode / GroupNode / (Space {return null;}))+ {const entries=items.filter(e=>null!=e),key=items.map(e=>e&&e.key).filter(Boolean).join(", ");return toSpwItem({kind:"node-body",key:key,entries:entries});})

ConceptNode = 
container:((open:ConceptNodeOpen (([\t ] {return null;}) / (underscore:"_" {return underscore;}) / ([\n,] {return null;}))* close:ConceptNodeClose {return{open:open,close:close};}) / (open:ConceptNodeOpen body:ConceptNodeBody close:ConceptNodeClose {return{open:open,body:body,close:close};}))
{const key=[container.open.key+(container.open.anchor?" ":""),(container.body||{}).key||"#",container.close.key].join("");return toSpwItem({...container,key:key,kind:"concept"});}

GroupNodeOpen = 
(token:"(" "_" node:(anchor:(Anchor / DomainNode / EssentialNode / ConceptNode / GroupNode) description:(DomainNode / EssentialNode / ConceptNode / GroupNode)? {return{anchor:anchor,description:description};}) (Space {return null;}) {return toSpwItem({key:[token,node.anchor.key].join("_"),...node,kind:"delimiter"});}) / (tok:"(" {return toSpwItem({key:tok,label:null,kind:"delimiter"});})

GroupNodeClose = 
(node:Anchor "_" token:")" {return toSpwItem({key:[token,node.key].join("_"),anchor:null,kind:"delimiter"});}) / (tok:")" {return toSpwItem({key:tok,label:null,kind:"delimiter"});})

GroupNodeBody = 
(items:(StrandExpression / PhraseExpression / LabeledAtom / PureAtom / DomainNode / EssentialNode / ConceptNode / GroupNode / (Space {return null;}))+ {const entries=items.filter(e=>null!=e),key=items.map(e=>e&&e.key).filter(Boolean).join(", ");return toSpwItem({kind:"node-body",key:key,entries:entries});})

GroupNode = 
container:((open:GroupNodeOpen (([\t ] {return null;}) / (underscore:"_" {return underscore;}) / ([\n,] {return null;}))* close:GroupNodeClose {return{open:open,close:close};}) / (open:GroupNodeOpen body:GroupNodeBody close:GroupNodeClose {return{open:open,body:body,close:close};}))
{const key=[container.open.key+(container.open.anchor?" ":""),(container.body||{}).key||"#",container.close.key].join("");return toSpwItem({...container,key:key,kind:"group"});}

Expression = 
StrandExpression / PhraseExpression

StrandExpression = 
head:(PhraseExpression / LabeledAtom / PureAtom) (Space)* tails:((Space)* transport:"=>" (Space)* tail:(DomainNode / EssentialNode / ConceptNode / GroupNode / LabeledAtom / PureAtom) {return toSpwItem({kind:"strand-tail",tail:tail,transport:transport,key:transport+tail.key});})+
{return toSpwItem({kind:"strand",head:head,tails:tails,key:[head.key,tails.map(a=>a.key).join("")].join("")});}

PhraseExpression = 
head:(DomainNode / EssentialNode / ConceptNode / GroupNode / LabeledAtom / PureAtom) tail:(([\t ])* tail:(DomainNode / EssentialNode / ConceptNode / GroupNode / LabeledAtom / PureAtom) {return tail;})+
{var items=[head,...tail];return toSpwItem({kind:"phrase_expression",items:items,key:items.map(e=>e&&e.key||!1).filter(Boolean).join(" ")});}