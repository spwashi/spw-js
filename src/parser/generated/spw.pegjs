{
function spwHead() {
    var _cache = new Map();
    /**
     * add the usual things to a node, remove missteps
     * @param node
     */
    function normalize(
    // @ts-ignore
    node) {
        return Object.assign({
            src: text(),
            location: location(),
        }, Object.fromEntries(Object.entries(node).filter(function (e) {
            var k = e[0];
            var v = e[1];
            return k === 'key' ? true : v !== undefined;
        })));
    }
    /**
     * Convert a node to a {@see Construct } Construct initializer
     * @param node
     */
    function toConstruct(
    // @ts-ignore
    node) {
        if (typeof location === 'undefined')
            return;
        if (!node.kind)
            throw new Error('No node kind specified');
        var cacheKey = JSON.stringify(location());
        if (_cache.has(cacheKey))
            return _cache.get(cacheKey);
        var out = normalize(node);
        _cache.set(cacheKey, out);
        return out;
    }
    /** Actions **/
    var constructs = {
        space: function spaceNodeAction() {
            return toConstruct({ kind: 'space' });
        },
    };
    return {
        toConstruct: toConstruct,
        constructs: constructs,
    };
};
    var head       = spwHead();
    var toConstruct  = head.toConstruct;
    var constructs = head.constructs;
}

Top "Top"= 
body:(StrandExpression / PhraseExpression / PerspectiveExpression / Domain / Essence / Concept / Location / Operator / Scalar / DomainOpen / (Space {return null;}))+
{const items=Array.isArray(body)?body.map(i=>i&&i.kind?i:void 0).filter(i=>void 0!==i):body;return 1===items.length?items[0]:items;}

UnicodeWithoutQuotes "UnicodeWithoutQuotes"= 
[-a-zA-Z \t\'] / [\u0020-\u0021,\u0023-\u26FF]

Space "Space"= 
(newlines:(([\t] / " " / newline:[\n] {return newline;})+)+ {return constructs.space();})

Node "Node"= 
Domain / Essence / Concept / Location / Operator / Scalar

ContainerNode "ContainerNode"= 
Domain / Essence / Concept / Location

DomainOpen "DomainOpen"= 
(token:"{" "_" node:(anchor:(AnchorNode / Domain / Essence / Concept / Location) description:(Domain / Essence / Concept / Location)? {return{anchor:anchor,description:description};}) (Space {return null;}) {return toConstruct({token:token,position:"open",label:node.anchor,description:node.description,kind:"domain_scheme"});}) / (tok:"{" {return toConstruct({token:tok,position:"open",kind:"domain_scheme"});})

DomainClose "DomainClose"= 
((token:"}" "_" node:AnchorNode {return toConstruct({token:token,position:"close",label:node,kind:"domain_identity"});}) / (node:AnchorNode "_" token:"}" {return toConstruct({token:token,position:"close",label:node,kind:"domain_identity"});})) / (tok:"}" {return toConstruct({token:tok,position:"close",kind:"domain_identity"});})

DomainBody "DomainBody"= 
(StrandExpression / PhraseExpression / PerspectiveExpression / Domain / Essence / Concept / Location / Operator / Scalar / SpreadOperator / RangeOperator / DescentOperator / TransformationOperator / DirectionOperator / AggregationOperator / AscentOperator / BranchOperator / ChannelOperator / EvaluationOperator / InvocationOperator / PerformanceOperator / PerspectiveOperator / ReductionOperator / ReferenceOperator / ValueOperator / CommonDelimitingOperator / BlockDelimitingOperator / (Space {return null;}))+

Domain "Domain"= 
container:((open:DomainOpen ((" " / [\t] {return null;}) / (underscore:"_" {return underscore;}) / ([\n] {return null;}))* close:DomainClose {return{open:open,close:close};}) / (open:DomainOpen body:DomainBody close:DomainClose {return{open:open,body:body,close:close};}))
{return toConstruct({kind:"domain",open:container.open,body:container.body,close:container.close});}

EssenceOpen "EssenceOpen"= 
(token:"[" "_" node:(anchor:(AnchorNode / Domain / Essence / Concept / Location) description:(Domain / Essence / Concept / Location)? {return{anchor:anchor,description:description};}) (Space {return null;}) {return toConstruct({token:token,position:"open",label:node.anchor,description:node.description,kind:"essence_scheme"});}) / (tok:"[" {return toConstruct({token:tok,position:"open",kind:"essence_scheme"});})

EssenceClose "EssenceClose"= 
((token:"]" "_" node:AnchorNode {return toConstruct({token:token,position:"close",label:node,kind:"essence_identity"});}) / (node:AnchorNode "_" token:"]" {return toConstruct({token:token,position:"close",label:node,kind:"essence_identity"});})) / (tok:"]" {return toConstruct({token:tok,position:"close",kind:"essence_identity"});})

EssenceBody "EssenceBody"= 
(StrandExpression / PhraseExpression / PerspectiveExpression / Domain / Essence / Concept / Location / Operator / Scalar / SpreadOperator / RangeOperator / DescentOperator / TransformationOperator / DirectionOperator / AggregationOperator / AscentOperator / BranchOperator / ChannelOperator / EvaluationOperator / InvocationOperator / PerformanceOperator / PerspectiveOperator / ReductionOperator / ReferenceOperator / ValueOperator / CommonDelimitingOperator / BlockDelimitingOperator / (Space {return null;}))+

Essence "Essence"= 
container:((open:EssenceOpen ((" " / [\t] {return null;}) / (underscore:"_" {return underscore;}) / ([\n] {return null;}))* close:EssenceClose {return{open:open,close:close};}) / (open:EssenceOpen body:EssenceBody close:EssenceClose {return{open:open,body:body,close:close};}))
{return toConstruct({kind:"essence",open:container.open,body:container.body,close:container.close});}

ConceptOpen "ConceptOpen"= 
(token:"<" "_" node:(anchor:(AnchorNode / Domain / Essence / Concept / Location) description:(Domain / Essence / Concept / Location)? {return{anchor:anchor,description:description};}) (Space {return null;}) {return toConstruct({token:token,position:"open",label:node.anchor,description:node.description,kind:"concept_scheme"});}) / (tok:"<" {return toConstruct({token:tok,position:"open",kind:"concept_scheme"});})

ConceptClose "ConceptClose"= 
((token:">" "_" node:AnchorNode {return toConstruct({token:token,position:"close",label:node,kind:"concept_identity"});}) / (node:AnchorNode "_" token:">" {return toConstruct({token:token,position:"close",label:node,kind:"concept_identity"});})) / (tok:">" {return toConstruct({token:tok,position:"close",kind:"concept_identity"});})

ConceptBody "ConceptBody"= 
(StrandExpression / PhraseExpression / PerspectiveExpression / Domain / Essence / Concept / Location / Operator / Scalar / SpreadOperator / RangeOperator / DescentOperator / TransformationOperator / DirectionOperator / AggregationOperator / AscentOperator / BranchOperator / ChannelOperator / EvaluationOperator / InvocationOperator / PerformanceOperator / PerspectiveOperator / ReductionOperator / ReferenceOperator / ValueOperator / CommonDelimitingOperator / BlockDelimitingOperator / (Space {return null;}))+

Concept "Concept"= 
container:((open:ConceptOpen ((" " / [\t] {return null;}) / (underscore:"_" {return underscore;}) / ([\n] {return null;}))* close:ConceptClose {return{open:open,close:close};}) / (open:ConceptOpen body:ConceptBody close:ConceptClose {return{open:open,body:body,close:close};}))
{return toConstruct({kind:"concept",open:container.open,body:container.body,close:container.close});}

LocationOpen "LocationOpen"= 
(token:"(" "_" node:(anchor:(AnchorNode / Domain / Essence / Concept / Location) description:(Domain / Essence / Concept / Location)? {return{anchor:anchor,description:description};}) (Space {return null;}) {return toConstruct({token:token,position:"open",label:node.anchor,description:node.description,kind:"group_scheme"});}) / (tok:"(" {return toConstruct({token:tok,position:"open",kind:"group_scheme"});})

LocationClose "LocationClose"= 
((token:")" "_" node:AnchorNode {return toConstruct({token:token,position:"close",label:node,kind:"group_identity"});}) / (node:AnchorNode "_" token:")" {return toConstruct({token:token,position:"close",label:node,kind:"group_identity"});})) / (tok:")" {return toConstruct({token:tok,position:"close",kind:"group_identity"});})

LocationBody "LocationBody"= 
(StrandExpression / PhraseExpression / PerspectiveExpression / Domain / Essence / Concept / Location / Operator / Scalar / SpreadOperator / RangeOperator / DescentOperator / TransformationOperator / DirectionOperator / AggregationOperator / AscentOperator / BranchOperator / ChannelOperator / EvaluationOperator / InvocationOperator / PerformanceOperator / PerspectiveOperator / ReductionOperator / ReferenceOperator / ValueOperator / CommonDelimitingOperator / BlockDelimitingOperator / (Space {return null;}))+

Location "Location"= 
container:((open:LocationOpen ((" " / [\t] {return null;}) / (underscore:"_" {return underscore;}) / ([\n] {return null;}))* close:LocationClose {return{open:open,close:close};}) / (open:LocationOpen body:LocationBody close:LocationClose {return{open:open,body:body,close:close};}))
{return toConstruct({kind:"group",open:container.open,body:container.body,close:container.close});}

Atom "Atom"= 
Operator / Scalar

AnchorNode "AnchorNode"= 
anchor:((head:([a-zA-Z])+ tail:(line:("-" / "_") chars:([a-zA-Z0-9])+ {return line+chars.join("");})+ {return[...head,...tail].join("");}) / (head:([a-zA-Z])+ tail:([a-zA-Z0-9])* {const characters=[...head,...tail];return characters.join("");}))
{return toConstruct({kind:"anchor",label:anchor});}

NumberNode "NumberNode"= 
num:([0-9])+
{return toConstruct({kind:"number",value:parseInt(num.join(""))});}

PhraseNode "PhraseNode"= 
phrase:(head:(AnchorNode / NumberNode) tail:((" " / [\t])+ anchor:(AnchorNode / NumberNode) {return anchor;})+ {const items=[head,...tail];return items;})
{function makeArray(r){return Array.isArray(r)?r:[r]}const _phrase=phrase,p=_phrase.reduce((r,a)=>[...r,...makeArray(a)],[]);return toConstruct({kind:"phrase",body:p});}

StringNode "StringNode"= 
string:(([\'] body:(UnicodeWithoutQuotes / [\n] / [\"])* [\'] {return body.join("");}) / ([\"] body:(("\\" [\"] {return'"';}) / UnicodeWithoutQuotes / [\n] / [\'])* [\"] {return body.join("");}))
{return toConstruct({kind:"string",open:'"',body:string,close:'"'});}

Scalar "Scalar"= 
PhraseNode / NumberNode / (node:(AnchorNode / StringNode) spec:(ContainerNode)* description:("." (Space {return null;}) container:ContainerNode {return container;})* {return"undefined"!=typeof spec&&(node.key+=spec.map(e=>e.key),node.spec=spec),node;})

Operator "Operator"= 
SpreadOperator / RangeOperator / DescentOperator / TransformationOperator / DirectionOperator / AggregationOperator / AscentOperator / BranchOperator / ChannelOperator / EvaluationOperator / InvocationOperator / PerformanceOperator / PerspectiveOperator / ReductionOperator / ReferenceOperator / ValueOperator / CommonDelimitingOperator / BlockDelimitingOperator

AggregationOperator "AggregationOperator"= 
_operatorComponents:((token:"+" "_" label:AnchorNode {return{token:token,label:label};}) / "+")
{return toConstruct({kind:"aggregation",..._operatorComponents});}

AscentOperator "AscentOperator"= 
_operatorComponents:((token:"^" "_" label:AnchorNode {return{token:token,label:label};}) / "^")
{return toConstruct({kind:"ascent",..._operatorComponents});}

BranchOperator "BranchOperator"= 
_operatorComponents:((token:"|" "_" label:AnchorNode {return{token:token,label:label};}) / "|")
{return toConstruct({kind:"branch",..._operatorComponents});}

ChannelOperator "ChannelOperator"= 
_operatorComponents:((token:"#" "_" label:AnchorNode {return{token:token,label:label};}) / "#")
{return toConstruct({kind:"channel",..._operatorComponents});}

CommonDelimitingOperator "CommonDelimitingOperator"= 
_operatorComponents:((token:"," "_" label:AnchorNode {return{token:token,label:label};}) / ",")
{return toConstruct({kind:"common_delimiter",..._operatorComponents});}

BlockDelimitingOperator "BlockDelimitingOperator"= 
_operatorComponents:((token:";" "_" label:AnchorNode {return{token:token,label:label};}) / ";")
{return toConstruct({kind:"block_delimiter",..._operatorComponents});}

OperatorDelimitingOperator "OperatorDelimitingOperator"= 
_operatorComponents:((token:" " "_" label:AnchorNode {return{token:token,label:label};}) / " ")
{return toConstruct({kind:"operator_delimiter",..._operatorComponents});}

DescentOperator "DescentOperator"= 
_operatorComponents:((token:"." "_" label:AnchorNode {return{token:token,label:label};}) / ".")
{return toConstruct({kind:"descent",..._operatorComponents});}

DirectionOperator "DirectionOperator"= 
_operatorComponents:((token:"->" "_" label:AnchorNode {return{token:token,label:label};}) / "->")
{return toConstruct({kind:"direction",..._operatorComponents});}

EvaluationOperator "EvaluationOperator"= 
_operatorComponents:((token:"?" "_" label:AnchorNode {return{token:token,label:label};}) / "?")
{return toConstruct({kind:"evaluation",..._operatorComponents});}

InvocationOperator "InvocationOperator"= 
_operatorComponents:((token:"~" "_" label:AnchorNode {return{token:token,label:label};}) / "~")
{return toConstruct({kind:"invocation",..._operatorComponents});}

PerformanceOperator "PerformanceOperator"= 
_operatorComponents:((token:"!" "_" label:AnchorNode {return{token:token,label:label};}) / "!")
{return toConstruct({kind:"performance",..._operatorComponents});}

PerspectiveOperator "PerspectiveOperator"= 
_operatorComponents:((token:"@" "_" label:AnchorNode {return{token:token,label:label};}) / "@")
{return toConstruct({kind:"perspective",..._operatorComponents});}

RangeOperator "RangeOperator"= 
_operatorComponents:((token:".." "_" label:AnchorNode {return{token:token,label:label};}) / "..")
{return toConstruct({kind:"range",..._operatorComponents});}

ReductionOperator "ReductionOperator"= 
_operatorComponents:((token:"-" "_" label:AnchorNode {return{token:token,label:label};}) / "-")
{return toConstruct({kind:"reduction",..._operatorComponents});}

ReferenceOperator "ReferenceOperator"= 
_operatorComponents:((token:"&" "_" label:AnchorNode {return{token:token,label:label};}) / "&")
{return toConstruct({kind:"reference",..._operatorComponents});}

SpreadOperator "SpreadOperator"= 
_operatorComponents:((token:"..." "_" label:AnchorNode {return{token:token,label:label};}) / "...")
{return toConstruct({kind:"spread",..._operatorComponents});}

TransformationOperator "TransformationOperator"= 
_operatorComponents:((token:"=>" "_" label:AnchorNode {return{token:token,label:label};}) / "=>")
{return toConstruct({kind:"transformation",..._operatorComponents});}

ValueOperator "ValueOperator"= 
_operatorComponents:((token:"*" "_" label:AnchorNode {return{token:token,label:label};}) / "*")
{return toConstruct({kind:"value",..._operatorComponents});}

Expression "Expression"= 
StrandExpression / PhraseExpression / PerspectiveExpression

PerspectiveExpression "PerspectiveExpression"= 
source:Node (Space {return null;})* lens:((atom:PerspectiveOperator spec:Essence {return toConstruct({kind:"lens",atom:atom,spec:spec});}) / (atom:PerspectiveOperator {return{atom:atom};})) (Space {return null;})* "->"? (Space {return null;})* target:Node
{return toConstruct({kind:"perspective_expression",source:source,lens:lens,target:target});}

StrandExpression "StrandExpression"= 
head:(PhraseExpression / PerspectiveExpression / Node) (Space {return null;})* tails:((Space {return null;})* operator:TransformationOperator (Space {return null;})* item:(Node / StrandExpression) {return toConstruct({kind:"strand_tail",operator:operator,item:item});})+
{return toConstruct({kind:"strand",head:head,tails:tails});}

PhraseExpression "PhraseExpression"= 
head:(Domain / Essence / Concept / Location / NumberNode / PhraseNode / StringNode / AnchorNode) tail:((" " / [\t])* tail:(Domain / Essence / Concept / Location / NumberNode / PhraseNode / StringNode / AnchorNode) {return tail;})+
{return toConstruct({kind:"phrase_expression",body:[head,...tail]});}