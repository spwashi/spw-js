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
                             case 'phrase':

                             case 'domain':
                             case 'parenthetical':
                             case 'essence':
                             case 'concept':

                             case 'perspective_expression':
                             case 'strand_expression':
                             case 'phrase_expression':

                             case 'number':
                             case 'lens':
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

Top "Top"= 
body:(Number / StrandExpression / PerspectiveExpression / Domain / Essence / Concept / Group / LabeledAtom / PureAtom / PhraseExpression / DomainOpen / (Space {return null;}))+
{const items=Array.isArray(body)?body.map(i=>i&&i.kind?i:void 0).filter(i=>void 0!==i):body;return 1===items.length?items[0]:items;}

UnicodeWithoutQuotes "UnicodeWithoutQuotes"= 
[-a-zA-Z \t\'] / [\u0020-\u0021,\u0023-\u26FF]

Space "Space"= 
(newlines:(([\t ] / newline:[\n,] {return newline;})+)+ {return toSpwItem({kind:"space"});})

Node "Node"= 
Domain / Essence / Concept / Group / LabeledAtom / PureAtom

Atom "Atom"= 
LabeledAtom / PureAtom

Anchor "Anchor"= 
anchor:((head:([a-zA-Z])+ tail:(line:("-" / "_") chars:([a-zA-Z0-9])+ {return line+chars.join("");})+ {return[...head,...tail].join("");}) / (head:([a-zA-Z])+ tail:([a-zA-Z0-9])* {return[...head,...tail].join("");}) / "&")
{return toSpwItem({kind:"anchor",label:anchor});}

Number "Number"= 
num:([0-9])+
{return toSpwItem({kind:"number",value:parseInt(num.join(""))});}

Phrase "Phrase"= 
phrase:(head:Anchor tail:(([\t ])+ anchor:Anchor {return anchor;})+ {return[head,...tail];})
{const p=phrase.reduce((r,e)=>[...r,...Array.isArray(e)?e:[e]],[]);return toSpwItem({kind:"phrase",body:p});}

StringNode "StringNode"= 
string:(([\'] body:(UnicodeWithoutQuotes / [\n] / [\"])* [\'] {return body.join("");}) / ([\"] body:(("\\" [\"] {return'"';}) / UnicodeWithoutQuotes / [\n] / [\'])* [\"] {return body.join("");}))
{return toSpwItem({kind:"string",token:'"',chars:string});}

PureAtom "PureAtom"= 
Phrase / Number / (node:(Anchor / StringNode) spec:(ContainerNode)* description:("." (Space {return null;}) container:ContainerNode {return container;})* {return"undefined"!=typeof spec&&(node.key+=spec.map(e=>e.key),node.spec=spec),node;})

LabeledAtom "LabeledAtom"= 
ChannelOperator / EvaluationOperator / InvocationOperator / PerformanceOperator / PerspectiveOperator

ChannelOperator "ChannelOperator"= 
components:((token:"#" "_" label:Anchor {return{token:token,label:label};}) / "#")
{return toSpwItem({kind:"channel",...components});}

EvaluationOperator "EvaluationOperator"= 
components:((token:"?" "_" label:Anchor {return{token:token,label:label};}) / "?")
{return toSpwItem({kind:"evaluation",...components});}

InvocationOperator "InvocationOperator"= 
components:((token:"~" "_" label:Anchor {return{token:token,label:label};}) / "~")
{return toSpwItem({kind:"invocation",...components});}

PerformanceOperator "PerformanceOperator"= 
components:((token:"!" "_" label:Anchor {return{token:token,label:label};}) / "!")
{return toSpwItem({kind:"performance",...components});}

PerspectiveOperator "PerspectiveOperator"= 
components:((token:"@" "_" label:Anchor {return{token:token,label:label};}) / "@")
{return toSpwItem({kind:"perspective",...components});}

ContainerNode "ContainerNode"= 
Domain / Essence / Concept / Group

DomainOpen "DomainOpen"= 
(token:"{" "_" node:(anchor:(Anchor / Domain / Essence / Concept / Group) description:(Domain / Essence / Concept / Group)? {return{anchor:anchor,description:description};}) (Space {return null;}) {return toSpwItem({token:token,position:"open",label:node,kind:"delimiter"});}) / (tok:"{" {return toSpwItem({token:tok,position:"open",kind:"delimiter"});})

DomainClose "DomainClose"= 
(node:Anchor "_" token:"}" {return toSpwItem({token:token,position:"close",label:node,kind:"delimiter"});}) / (tok:"}" {return toSpwItem({token:tok,position:"close",kind:"delimiter"});})

DomainBody "DomainBody"= 
(Top)+

Domain "Domain"= 
container:((open:DomainOpen (([\t ] {return null;}) / (underscore:"_" {return underscore;}) / ([\n,] {return null;}))* close:DomainClose {return{open:open,close:close};}) / (open:DomainOpen body:DomainBody close:DomainClose {return{open:open,body:body,close:close};}))
{return toSpwItem({kind:"domain",open:container.open,body:container.body,close:container.close});}

EssenceOpen "EssenceOpen"= 
(token:"[" "_" node:(anchor:(Anchor / Domain / Essence / Concept / Group) description:(Domain / Essence / Concept / Group)? {return{anchor:anchor,description:description};}) (Space {return null;}) {return toSpwItem({token:token,position:"open",label:node,kind:"delimiter"});}) / (tok:"[" {return toSpwItem({token:tok,position:"open",kind:"delimiter"});})

EssenceClose "EssenceClose"= 
(node:Anchor "_" token:"]" {return toSpwItem({token:token,position:"close",label:node,kind:"delimiter"});}) / (tok:"]" {return toSpwItem({token:tok,position:"close",kind:"delimiter"});})

EssenceBody "EssenceBody"= 
(Top)+

Essence "Essence"= 
container:((open:EssenceOpen (([\t ] {return null;}) / (underscore:"_" {return underscore;}) / ([\n,] {return null;}))* close:EssenceClose {return{open:open,close:close};}) / (open:EssenceOpen body:EssenceBody close:EssenceClose {return{open:open,body:body,close:close};}))
{return toSpwItem({kind:"essence",open:container.open,body:container.body,close:container.close});}

ConceptOpen "ConceptOpen"= 
(token:"<" "_" node:(anchor:(Anchor / Domain / Essence / Concept / Group) description:(Domain / Essence / Concept / Group)? {return{anchor:anchor,description:description};}) (Space {return null;}) {return toSpwItem({token:token,position:"open",label:node,kind:"delimiter"});}) / (tok:"<" {return toSpwItem({token:tok,position:"open",kind:"delimiter"});})

ConceptClose "ConceptClose"= 
(node:Anchor "_" token:">" {return toSpwItem({token:token,position:"close",label:node,kind:"delimiter"});}) / (tok:">" {return toSpwItem({token:tok,position:"close",kind:"delimiter"});})

ConceptBody "ConceptBody"= 
(Top)+

Concept "Concept"= 
container:((open:ConceptOpen (([\t ] {return null;}) / (underscore:"_" {return underscore;}) / ([\n,] {return null;}))* close:ConceptClose {return{open:open,close:close};}) / (open:ConceptOpen body:ConceptBody close:ConceptClose {return{open:open,body:body,close:close};}))
{return toSpwItem({kind:"concept",open:container.open,body:container.body,close:container.close});}

GroupOpen "GroupOpen"= 
(token:"(" "_" node:(anchor:(Anchor / Domain / Essence / Concept / Group) description:(Domain / Essence / Concept / Group)? {return{anchor:anchor,description:description};}) (Space {return null;}) {return toSpwItem({token:token,position:"open",label:node,kind:"delimiter"});}) / (tok:"(" {return toSpwItem({token:tok,position:"open",kind:"delimiter"});})

GroupClose "GroupClose"= 
(node:Anchor "_" token:")" {return toSpwItem({token:token,position:"close",label:node,kind:"delimiter"});}) / (tok:")" {return toSpwItem({token:tok,position:"close",kind:"delimiter"});})

GroupBody "GroupBody"= 
(Top)+

Group "Group"= 
container:((open:GroupOpen (([\t ] {return null;}) / (underscore:"_" {return underscore;}) / ([\n,] {return null;}))* close:GroupClose {return{open:open,close:close};}) / (open:GroupOpen body:GroupBody close:GroupClose {return{open:open,body:body,close:close};}))
{return toSpwItem({kind:"parenthetical",open:container.open,body:container.body,close:container.close});}

Expression "Expression"= 
StrandExpression / PhraseExpression / PerspectiveExpression

PerspectiveExpression "PerspectiveExpression"= 
source:Node (Space {return null;})* lens:((atom:PerspectiveOperator spec:Essence {return{atom:atom,spec:spec};}) / (atom:PerspectiveOperator {return{atom:atom};})) (Space {return null;})* "->"? (Space {return null;})* target:Node
{return toSpwItem({kind:"perspective_expression",source:source,lens:lens,target:target});}

StrandExpression "StrandExpression"= 
head:(PerspectiveExpression / PhraseExpression / Node) (Space {return null;})* tails:((Space {return null;})* transport:"=>" (Space {return null;})* tail:Node {return{tail:tail,transport:transport};})+
{return toSpwItem({kind:"strand_expression",head:head,tails:tails});}

PhraseExpression "PhraseExpression"= 
head:(PerspectiveExpression / Node) tail:(([\t ])* tail:(Domain / Essence / Concept / Group / LabeledAtom / PureAtom) {return tail;})+
{var items=[head,...tail];return toSpwItem({kind:"phrase_expression",items:items});}