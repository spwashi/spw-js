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
                         return out;
                     }
}

Top "Top"= 
body:(StrandExpression / PhraseExpression / PerspectiveExpression / Domain / Essence / Concept / Group / Operator / Scalar / DomainOpen / (Space {return null;}))+
{const items=Array.isArray(body)?body.map(i=>i&&i.kind?i:void 0).filter(i=>void 0!==i):body;return 1===items.length?items[0]:items;}

UnicodeWithoutQuotes "UnicodeWithoutQuotes"= 
[-a-zA-Z \t\'] / [\u0020-\u0021,\u0023-\u26FF]

Space "Space"= 
(newlines:(([\t ] / newline:[\n] {return newline;})+)+ {return toSpwItem({kind:"space"});})

Node "Node"= 
Domain / Essence / Concept / Group / Operator / Scalar

ContainerNode "ContainerNode"= 
Domain / Essence / Concept / Group

DomainOpen "DomainOpen"= 
(token:"{" "_" node:(anchor:(AnchorNode / Domain / Essence / Concept / Group) description:(Domain / Essence / Concept / Group)? {return{anchor:anchor,description:description};}) (Space {return null;}) {return toSpwItem({token:token,position:"open",label:node.anchor,description:node.description,kind:"domain_objective"});}) / (tok:"{" {return toSpwItem({token:tok,position:"open",kind:"domain_objective"});})

DomainClose "DomainClose"= 
((token:"}" "_" node:AnchorNode {return toSpwItem({token:token,position:"close",label:node,kind:"domain_subjective"});}) / (node:AnchorNode "_" token:"}" {return toSpwItem({token:token,position:"close",label:node,kind:"domain_subjective"});})) / (tok:"}" {return toSpwItem({token:tok,position:"close",kind:"domain_subjective"});})

DomainBody "DomainBody"= 
(StrandExpression / PhraseExpression / PerspectiveExpression / Domain / Essence / Concept / Group / Operator / Scalar / (Space {return null;}))+

Domain "Domain"= 
container:((open:DomainOpen (([\t ] {return null;}) / (underscore:"_" {return underscore;}) / ([\n] {return null;}))* close:DomainClose {return{open:open,close:close};}) / (open:DomainOpen body:DomainBody close:DomainClose {return{open:open,body:body,close:close};}))
{return toSpwItem({kind:"domain",open:container.open,body:container.body,close:container.close});}

EssenceOpen "EssenceOpen"= 
(token:"[" "_" node:(anchor:(AnchorNode / Domain / Essence / Concept / Group) description:(Domain / Essence / Concept / Group)? {return{anchor:anchor,description:description};}) (Space {return null;}) {return toSpwItem({token:token,position:"open",label:node.anchor,description:node.description,kind:"essence_objective"});}) / (tok:"[" {return toSpwItem({token:tok,position:"open",kind:"essence_objective"});})

EssenceClose "EssenceClose"= 
((token:"]" "_" node:AnchorNode {return toSpwItem({token:token,position:"close",label:node,kind:"essence_subjective"});}) / (node:AnchorNode "_" token:"]" {return toSpwItem({token:token,position:"close",label:node,kind:"essence_subjective"});})) / (tok:"]" {return toSpwItem({token:tok,position:"close",kind:"essence_subjective"});})

EssenceBody "EssenceBody"= 
(StrandExpression / PhraseExpression / PerspectiveExpression / Domain / Essence / Concept / Group / Operator / Scalar / (Space {return null;}))+

Essence "Essence"= 
container:((open:EssenceOpen (([\t ] {return null;}) / (underscore:"_" {return underscore;}) / ([\n] {return null;}))* close:EssenceClose {return{open:open,close:close};}) / (open:EssenceOpen body:EssenceBody close:EssenceClose {return{open:open,body:body,close:close};}))
{return toSpwItem({kind:"essence",open:container.open,body:container.body,close:container.close});}

ConceptOpen "ConceptOpen"= 
(token:"<" "_" node:(anchor:(AnchorNode / Domain / Essence / Concept / Group) description:(Domain / Essence / Concept / Group)? {return{anchor:anchor,description:description};}) (Space {return null;}) {return toSpwItem({token:token,position:"open",label:node.anchor,description:node.description,kind:"concept_objective"});}) / (tok:"<" {return toSpwItem({token:tok,position:"open",kind:"concept_objective"});})

ConceptClose "ConceptClose"= 
((token:">" "_" node:AnchorNode {return toSpwItem({token:token,position:"close",label:node,kind:"concept_subjective"});}) / (node:AnchorNode "_" token:">" {return toSpwItem({token:token,position:"close",label:node,kind:"concept_subjective"});})) / (tok:">" {return toSpwItem({token:tok,position:"close",kind:"concept_subjective"});})

ConceptBody "ConceptBody"= 
(StrandExpression / PhraseExpression / PerspectiveExpression / Domain / Essence / Concept / Group / Operator / Scalar / (Space {return null;}))+

Concept "Concept"= 
container:((open:ConceptOpen (([\t ] {return null;}) / (underscore:"_" {return underscore;}) / ([\n] {return null;}))* close:ConceptClose {return{open:open,close:close};}) / (open:ConceptOpen body:ConceptBody close:ConceptClose {return{open:open,body:body,close:close};}))
{return toSpwItem({kind:"concept",open:container.open,body:container.body,close:container.close});}

GroupOpen "GroupOpen"= 
(token:"(" "_" node:(anchor:(AnchorNode / Domain / Essence / Concept / Group) description:(Domain / Essence / Concept / Group)? {return{anchor:anchor,description:description};}) (Space {return null;}) {return toSpwItem({token:token,position:"open",label:node.anchor,description:node.description,kind:"group_objective"});}) / (tok:"(" {return toSpwItem({token:tok,position:"open",kind:"group_objective"});})

GroupClose "GroupClose"= 
((token:")" "_" node:AnchorNode {return toSpwItem({token:token,position:"close",label:node,kind:"group_subjective"});}) / (node:AnchorNode "_" token:")" {return toSpwItem({token:token,position:"close",label:node,kind:"group_subjective"});})) / (tok:")" {return toSpwItem({token:tok,position:"close",kind:"group_subjective"});})

GroupBody "GroupBody"= 
(StrandExpression / PhraseExpression / PerspectiveExpression / Domain / Essence / Concept / Group / Operator / Scalar / (Space {return null;}))+

Group "Group"= 
container:((open:GroupOpen (([\t ] {return null;}) / (underscore:"_" {return underscore;}) / ([\n] {return null;}))* close:GroupClose {return{open:open,close:close};}) / (open:GroupOpen body:GroupBody close:GroupClose {return{open:open,body:body,close:close};}))
{return toSpwItem({kind:"group",open:container.open,body:container.body,close:container.close});}

Atom "Atom"= 
Operator / Scalar

AnchorNode "AnchorNode"= 
anchor:((head:([a-zA-Z])+ tail:(line:("-" / "_") chars:([a-zA-Z0-9])+ {return line+chars.join("");})+ {return[...head,...tail].join("");}) / (head:([a-zA-Z])+ tail:([a-zA-Z0-9])* {const characters=[...head,...tail];return characters.join("");}))
{return toSpwItem({label:anchor,kind:"anchor"});}

NumberNode "NumberNode"= 
num:([0-9])+
{return toSpwItem({kind:"number",value:parseInt(num.join(""))});}

PhraseNode "PhraseNode"= 
phrase:(head:(AnchorNode / NumberNode) tail:(([\t ])+ anchor:(AnchorNode / NumberNode) {return anchor;})+ {const items=[head,...tail];return items;})
{function makeArray(r){return Array.isArray(r)?r:[r]}const p=phrase.reduce((r,e)=>[...r,...makeArray(e)],[]);return toSpwItem({kind:"phrase",body:p});}

StringNode "StringNode"= 
string:(([\'] body:(UnicodeWithoutQuotes / [\n] / [\"])* [\'] {return body.join("");}) / ([\"] body:(("\\" [\"] {return'"';}) / UnicodeWithoutQuotes / [\n] / [\'])* [\"] {return body.join("");}))
{return toSpwItem({kind:"string",token:'"',chars:string});}

Scalar "Scalar"= 
PhraseNode / NumberNode / (node:(AnchorNode / StringNode) spec:(ContainerNode)* description:("." (Space {return null;}) container:ContainerNode {return container;})* {return"undefined"!=typeof spec&&(node.key+=spec.map(e=>e.key),node.spec=spec),node;})

Operator "Operator"= 
SpreadOperator / RangeOperator / DescentOperator / TransformationOperator / DirectionOperator / AggregationOperator / AscentOperator / BranchOperator / ChannelOperator / EvaluationOperator / InvocationOperator / PerformanceOperator / PerspectiveOperator / ReductionOperator / ReferenceOperator / ValueOperator

AggregationOperator "AggregationOperator"= 
components:((token:"+" "_" label:AnchorNode {return{token:token,label:label};}) / "+")
{return toSpwItem({kind:"aggregation",...components});}

AscentOperator "AscentOperator"= 
components:((token:"^" "_" label:AnchorNode {return{token:token,label:label};}) / "^")
{return toSpwItem({kind:"ascent",...components});}

BranchOperator "BranchOperator"= 
components:((token:"|" "_" label:AnchorNode {return{token:token,label:label};}) / "|")
{return toSpwItem({kind:"branch",...components});}

ChannelOperator "ChannelOperator"= 
components:((token:"#" "_" label:AnchorNode {return{token:token,label:label};}) / "#")
{return toSpwItem({kind:"channel",...components});}

DescentOperator "DescentOperator"= 
components:((token:"." "_" label:AnchorNode {return{token:token,label:label};}) / ".")
{return toSpwItem({kind:"descent",...components});}

DirectionOperator "DirectionOperator"= 
components:((token:"->" "_" label:AnchorNode {return{token:token,label:label};}) / "->")
{return toSpwItem({kind:"direction",...components});}

EvaluationOperator "EvaluationOperator"= 
components:((token:"?" "_" label:AnchorNode {return{token:token,label:label};}) / "?")
{return toSpwItem({kind:"evaluation",...components});}

InvocationOperator "InvocationOperator"= 
components:((token:"~" "_" label:AnchorNode {return{token:token,label:label};}) / "~")
{return toSpwItem({kind:"invocation",...components});}

PerformanceOperator "PerformanceOperator"= 
components:((token:"!" "_" label:AnchorNode {return{token:token,label:label};}) / "!")
{return toSpwItem({kind:"performance",...components});}

PerspectiveOperator "PerspectiveOperator"= 
components:((token:"@" "_" label:AnchorNode {return{token:token,label:label};}) / "@")
{return toSpwItem({kind:"perspective",...components});}

RangeOperator "RangeOperator"= 
components:((token:".." "_" label:AnchorNode {return{token:token,label:label};}) / "..")
{return toSpwItem({kind:"range",...components});}

ReductionOperator "ReductionOperator"= 
components:((token:"-" "_" label:AnchorNode {return{token:token,label:label};}) / "-")
{return toSpwItem({kind:"reduction",...components});}

ReferenceOperator "ReferenceOperator"= 
components:((token:"&" "_" label:AnchorNode {return{token:token,label:label};}) / "&")
{return toSpwItem({kind:"reference",...components});}

SpreadOperator "SpreadOperator"= 
components:((token:"..." "_" label:AnchorNode {return{token:token,label:label};}) / "...")
{return toSpwItem({kind:"spread",...components});}

TransformationOperator "TransformationOperator"= 
components:((token:"=>" "_" label:AnchorNode {return{token:token,label:label};}) / "=>")
{return toSpwItem({kind:"transformation",...components});}

ValueOperator "ValueOperator"= 
components:((token:"*" "_" label:AnchorNode {return{token:token,label:label};}) / "*")
{return toSpwItem({kind:"value",...components});}

Expression "Expression"= 
StrandExpression / PhraseExpression / PerspectiveExpression

PerspectiveExpression "PerspectiveExpression"= 
source:Node (Space {return null;})* lens:((atom:PerspectiveOperator spec:Essence {return{atom:atom,spec:spec};}) / (atom:PerspectiveOperator {return{atom:atom};})) (Space {return null;})* "->"? (Space {return null;})* target:Node
{return toSpwItem({kind:"perspective_expression",source:source,lens:lens,target:target});}

StrandExpression "StrandExpression"= 
head:(PhraseExpression / PerspectiveExpression / Node) (Space {return null;})* tails:((Space {return null;})* operator:TransformationOperator (Space {return null;})* item:(Node / StrandExpression) {return{item:item,operator:operator};})+
{return toSpwItem({kind:"strand_expression",head:head,tails:tails});}

PhraseExpression "PhraseExpression"= 
head:(Domain / Essence / Concept / Group / NumberNode / PhraseNode / StringNode / AnchorNode) tail:(([\t ])* tail:(Domain / Essence / Concept / Group / NumberNode / PhraseNode / StringNode / AnchorNode) {return tail;})+
{var items=[head,...tail];return toSpwItem({kind:"phrase_expression",items:items});}