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
            loc: location(),
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
        space: function () {
            return toConstruct({ kind: 'space' });
        },
    };
    return {
        toConstruct: toConstruct,
        constructs: constructs,
    };
};
  var head        = spwHead();
  var toConstruct = head.toConstruct;
  var constructs  = head.constructs;
}

Top "Top"= 
(Space {return null;})*
	body:(
	Expression
		/ Node
		/ ContainerNode
	)
	(Space {return null;})*
{
	const items = Array.isArray(body)
	              ? body
	                .map(item => item && item.kind ? item : undefined)
	                .filter(item => typeof item !== 'undefined')
	              : body;
	return items.length === 1 ? items [0] : items;
}

UnicodeWithoutQuotes "UnicodeWithoutQuotes"= 
[-a-zA-Z \t\']
	/ [\u0020-\u0021,\u0023-\u26FF]

Space "Space"= 
(newlines:(
		([\t]
				/ " "
				/ newline:[\n] {return newline;})+
		)+ {return constructs.space();})

Node "Node"= 
NumberNode
	/ PhraseNode
	/ StringNode
	/ AnchorNode

AnchorNode "AnchorNode"= 
anchor:(
	(head:(
				[a-zA-Z]
				)+
			tail:(line:(
					"-"
						/ "_"
					)
					chars:(
						[a-zA-Z0-9]
						)+ {return line+chars.join("");})+ {return[...head,...tail].join("");})
		/ (head:(
				[a-zA-Z]
				)+
			tail:(
				[a-zA-Z0-9]
				)* {const characters=[...head,...tail];return characters.join("");})
	)
{
	return toConstruct({
	                     kind: "anchor",
	                     label: anchor,
	                   });
}

NumberNode "NumberNode"= 
num:(
		[0-9]
		)+
{
	return toConstruct({
	                     kind: "number",
	                     value: parseInt(num.join(''))
	                   });
}

PhraseNode "PhraseNode"= 
phrase:(head:(
		AnchorNode
			/ NumberNode
		)
		tail:((
					" "
						/ [\t]
					)+
				anchor:(
				AnchorNode
					/ NumberNode
				) {return anchor;})+ {const items=[head,...tail];return items;})
{
	var makeArray = c => Array.isArray(c) ? c : [c];
	/** @var {Array} phrase*/
	const _phrase = phrase;
	const p       = _phrase.reduce((p, c) => [...p, ...makeArray(c)], []);
	return toConstruct({
	                     kind: 'phrase',
	                     body: p
	                   });
}

StringNode "StringNode"= 
string:(
	([\']
			body:(
				UnicodeWithoutQuotes
					/ [\n]
					/ [\"]
				)*
			[\'] {return body.join("");})
		/ ([\"]
			body:(
				("\\"
						[\"] {return'"';})
					/ UnicodeWithoutQuotes
					/ [\n]
					/ [\']
				)*
			[\"] {return body.join("");})
	)
{
	return toConstruct({
	  kind: 'string',
	  open: '"',
	  body: string,
	  close: '"',
	});
}

Scalar "Scalar"= 
PhraseNode
	/ NumberNode
	/ AnchorNode
	/ StringNode

Operator "Operator"= 
SpreadOperator
	/ RangeOperator
	/ DescentOperator
	/ TransformationOperator
	/ DirectionOperator
	/ AggregationOperator
	/ AscentOperator
	/ BranchOperator
	/ ChannelOperator
	/ EvaluationOperator
	/ InvocationOperator
	/ PerformanceOperator
	/ PerspectiveOperator
	/ ReductionOperator
	/ ReferenceOperator
	/ ValueOperator

AggregationOperator "AggregationOperator"= 
_operatorComponents:(
	(token:"+"
			"_"
			label:AnchorNode {return{token:token,label:label};})
		/ "+"
	)
{
	return toConstruct({
	                   kind: "aggregation",
	                   ..._operatorComponents
	                 })
}

AscentOperator "AscentOperator"= 
_operatorComponents:(
	(token:"^"
			"_"
			label:AnchorNode {return{token:token,label:label};})
		/ "^"
	)
{
	return toConstruct({
	                   kind: "ascent",
	                   ..._operatorComponents
	                 })
}

BranchOperator "BranchOperator"= 
_operatorComponents:(
	(token:"|"
			"_"
			label:AnchorNode {return{token:token,label:label};})
		/ "|"
	)
{
	return toConstruct({
	                   kind: "branch",
	                   ..._operatorComponents
	                 })
}

ChannelOperator "ChannelOperator"= 
_operatorComponents:(
	(token:"#"
			"_"
			label:AnchorNode {return{token:token,label:label};})
		/ "#"
	)
{
	return toConstruct({
	                   kind: "channel",
	                   ..._operatorComponents
	                 })
}

DescentOperator "DescentOperator"= 
_operatorComponents:(
	(token:"."
			"_"
			label:AnchorNode {return{token:token,label:label};})
		/ "."
	)
{
	return toConstruct({
	                   kind: "descent",
	                   ..._operatorComponents
	                 })
}

DirectionOperator "DirectionOperator"= 
_operatorComponents:(
	(token:".-"
			"_"
			label:AnchorNode {return{token:token,label:label};})
		/ ".-"
	)
{
	return toConstruct({
	                   kind: "direction",
	                   ..._operatorComponents
	                 })
}

EvaluationOperator "EvaluationOperator"= 
_operatorComponents:(
	(token:"?"
			"_"
			label:AnchorNode {return{token:token,label:label};})
		/ "?"
	)
{
	return toConstruct({
	                   kind: "evaluation",
	                   ..._operatorComponents
	                 })
}

InvocationOperator "InvocationOperator"= 
_operatorComponents:(
	(token:"~"
			"_"
			label:AnchorNode {return{token:token,label:label};})
		/ "~"
	)
{
	return toConstruct({
	                   kind: "invocation",
	                   ..._operatorComponents
	                 })
}

PerformanceOperator "PerformanceOperator"= 
_operatorComponents:(
	(token:"!"
			"_"
			label:AnchorNode {return{token:token,label:label};})
		/ "!"
	)
{
	return toConstruct({
	                   kind: "performance",
	                   ..._operatorComponents
	                 })
}

PerspectiveOperator "PerspectiveOperator"= 
_operatorComponents:(
	(token:"@"
			"_"
			label:AnchorNode {return{token:token,label:label};})
		/ "@"
	)
{
	return toConstruct({
	                   kind: "perspective",
	                   ..._operatorComponents
	                 })
}

RangeOperator "RangeOperator"= 
_operatorComponents:(
	(token:".."
			"_"
			label:AnchorNode {return{token:token,label:label};})
		/ ".."
	)
{
	return toConstruct({
	                   kind: "range",
	                   ..._operatorComponents
	                 })
}

ReductionOperator "ReductionOperator"= 
_operatorComponents:(
	(token:"-"
			"_"
			label:AnchorNode {return{token:token,label:label};})
		/ "-"
	)
{
	return toConstruct({
	                   kind: "reduction",
	                   ..._operatorComponents
	                 })
}

ReferenceOperator "ReferenceOperator"= 
_operatorComponents:(
	(token:"&"
			"_"
			label:AnchorNode {return{token:token,label:label};})
		/ "&"
	)
{
	return toConstruct({
	                   kind: "reference",
	                   ..._operatorComponents
	                 })
}

SpreadOperator "SpreadOperator"= 
_operatorComponents:(
	(token:"..."
			"_"
			label:AnchorNode {return{token:token,label:label};})
		/ "..."
	)
{
	return toConstruct({
	                   kind: "spread",
	                   ..._operatorComponents
	                 })
}

TransformationOperator "TransformationOperator"= 
_operatorComponents:(
	(token:"=>"
			"_"
			label:AnchorNode {return{token:token,label:label};})
		/ "=>"
	)
{
	return toConstruct({
	                   kind: "transformation",
	                   ..._operatorComponents
	                 })
}

ValueOperator "ValueOperator"= 
_operatorComponents:(
	(token:"*"
			"_"
			label:AnchorNode {return{token:token,label:label};})
		/ "*"
	)
{
	return toConstruct({
	                   kind: "value",
	                   ..._operatorComponents
	                 })
}

BlockDelimitingOperator "BlockDelimitingOperator"= 
_operatorComponents:(
	(token:";"
			"_"
			label:AnchorNode {return{token:token,label:label};})
		/ ";"
	)
{
	return toConstruct({
	                   kind: "block_delimiter",
	                   ..._operatorComponents
	                 })
}

CommonDelimitingOperator "CommonDelimitingOperator"= 
_operatorComponents:(
	(token:","
			"_"
			label:AnchorNode {return{token:token,label:label};})
		/ ","
	)
{
	return toConstruct({
	                   kind: "common_delimiter",
	                   ..._operatorComponents
	                 })
}

NodeDelimitingOperator "NodeDelimitingOperator"= 
_operatorComponents:(
	(token:" "
			"_"
			label:AnchorNode {return{token:token,label:label};})
		/ " "
	)
{
	return toConstruct({
	                   kind: "operator_delimiter",
	                   ..._operatorComponents
	                 })
}

ContainerNode "ContainerNode"= 
Concept
	/ Location
	/ Domain
	/ Essence

DomainOpen "DomainOpen"= 
(token:"{"
		"_"
		node:(anchor:(
				AnchorNode
					/ Concept
					/ Location
					/ Domain
					/ Essence
				)
				description:(
						Concept
							/ Location
							/ Domain
							/ Essence
						)? {return{anchor:anchor,description:description};})
		(Space {return null;}) {return toConstruct({token:token,position:"open",label:node.anchor,description:node.description,kind:"domain_scheme"});})
	/ (tok:"{" {return toConstruct({token:tok,position:"open",kind:"domain_scheme"});})

DomainClose "DomainClose"= 
(
	(token:"}"
			"_"
			node:AnchorNode {return toConstruct({token:token,position:"close",label:node,kind:"domain_identity"});})
		/ (node:AnchorNode
			"_"
			token:"}" {return toConstruct({token:token,position:"close",label:node,kind:"domain_identity"});})
	)
	/ (tok:"}" {return toConstruct({token:tok,position:"close",kind:"domain_identity"});})

DomainBody "DomainBody"= 
(
	Expression
		/ Node
		/ (Space {return null;})
	)+

Domain "Domain"= 
container:(
	(open:DomainOpen
			(
				(" "
						/ [\t] {return null;})
					/ (underscore:"_" {return underscore;})
					/ ([\n] {return null;})
				)*
			close:DomainClose {return{open:open,close:close};})
		/ (open:DomainOpen
			body:DomainBody
			close:DomainClose {return{open:open,body:body,close:close};})
	)
{
	return toConstruct({
	                     kind:  'domain',
	                     open:  container.open,
	                     body:  container.body,
	                     close: container.close,
	                 })
}

EssenceOpen "EssenceOpen"= 
(token:"["
		"_"
		node:(anchor:(
				AnchorNode
					/ Concept
					/ Location
					/ Domain
					/ Essence
				)
				description:(
						Concept
							/ Location
							/ Domain
							/ Essence
						)? {return{anchor:anchor,description:description};})
		(Space {return null;}) {return toConstruct({token:token,position:"open",label:node.anchor,description:node.description,kind:"essence_scheme"});})
	/ (tok:"[" {return toConstruct({token:tok,position:"open",kind:"essence_scheme"});})

EssenceClose "EssenceClose"= 
(
	(token:"]"
			"_"
			node:AnchorNode {return toConstruct({token:token,position:"close",label:node,kind:"essence_identity"});})
		/ (node:AnchorNode
			"_"
			token:"]" {return toConstruct({token:token,position:"close",label:node,kind:"essence_identity"});})
	)
	/ (tok:"]" {return toConstruct({token:tok,position:"close",kind:"essence_identity"});})

EssenceBody "EssenceBody"= 
(
	Expression
		/ Node
		/ (Space {return null;})
	)+

Essence "Essence"= 
container:(
	(open:EssenceOpen
			(
				(" "
						/ [\t] {return null;})
					/ (underscore:"_" {return underscore;})
					/ ([\n] {return null;})
				)*
			close:EssenceClose {return{open:open,close:close};})
		/ (open:EssenceOpen
			body:EssenceBody
			close:EssenceClose {return{open:open,body:body,close:close};})
	)
{
	return toConstruct({
	                     kind:  'essence',
	                     open:  container.open,
	                     body:  container.body,
	                     close: container.close,
	                 })
}

ConceptOpen "ConceptOpen"= 
(token:"<"
		"_"
		node:(anchor:(
				AnchorNode
					/ Concept
					/ Location
					/ Domain
					/ Essence
				)
				description:(
						Concept
							/ Location
							/ Domain
							/ Essence
						)? {return{anchor:anchor,description:description};})
		(Space {return null;}) {return toConstruct({token:token,position:"open",label:node.anchor,description:node.description,kind:"concept_scheme"});})
	/ (tok:"<" {return toConstruct({token:tok,position:"open",kind:"concept_scheme"});})

ConceptClose "ConceptClose"= 
(
	(token:">"
			"_"
			node:AnchorNode {return toConstruct({token:token,position:"close",label:node,kind:"concept_identity"});})
		/ (node:AnchorNode
			"_"
			token:">" {return toConstruct({token:token,position:"close",label:node,kind:"concept_identity"});})
	)
	/ (tok:">" {return toConstruct({token:tok,position:"close",kind:"concept_identity"});})

ConceptBody "ConceptBody"= 
(
	Expression
		/ Node
		/ (Space {return null;})
	)+

Concept "Concept"= 
container:(
	(open:ConceptOpen
			(
				(" "
						/ [\t] {return null;})
					/ (underscore:"_" {return underscore;})
					/ ([\n] {return null;})
				)*
			close:ConceptClose {return{open:open,close:close};})
		/ (open:ConceptOpen
			body:ConceptBody
			close:ConceptClose {return{open:open,body:body,close:close};})
	)
{
	return toConstruct({
	                     kind:  'concept',
	                     open:  container.open,
	                     body:  container.body,
	                     close: container.close,
	                 })
}

LocationOpen "LocationOpen"= 
(token:"("
		"_"
		node:(anchor:(
				AnchorNode
					/ Concept
					/ Location
					/ Domain
					/ Essence
				)
				description:(
						Concept
							/ Location
							/ Domain
							/ Essence
						)? {return{anchor:anchor,description:description};})
		(Space {return null;}) {return toConstruct({token:token,position:"open",label:node.anchor,description:node.description,kind:"location_scheme"});})
	/ (tok:"(" {return toConstruct({token:tok,position:"open",kind:"location_scheme"});})

LocationClose "LocationClose"= 
(
	(token:")"
			"_"
			node:AnchorNode {return toConstruct({token:token,position:"close",label:node,kind:"location_identity"});})
		/ (node:AnchorNode
			"_"
			token:")" {return toConstruct({token:token,position:"close",label:node,kind:"location_identity"});})
	)
	/ (tok:")" {return toConstruct({token:tok,position:"close",kind:"location_identity"});})

LocationBody "LocationBody"= 
(
	Expression
		/ Node
		/ (Space {return null;})
	)+

Location "Location"= 
container:(
	(open:LocationOpen
			(
				(" "
						/ [\t] {return null;})
					/ (underscore:"_" {return underscore;})
					/ ([\n] {return null;})
				)*
			close:LocationClose {return{open:open,close:close};})
		/ (open:LocationOpen
			body:LocationBody
			close:LocationClose {return{open:open,body:body,close:close};})
	)
{
	return toConstruct({
	                     kind:  'location',
	                     open:  container.open,
	                     body:  container.body,
	                     close: container.close,
	                 })
}

Expression "Expression"= 
SequenceExpression
	/ PrefixExpression
	/ InfixExpression
	/ PostfixExpression

BehaviorExpression "BehaviorExpression"= 
address:Location
	(
		" "
		)*
	domain:Domain
	(
		" "
		)*
	essence:Essence
{
	const expression = {
	  kind: 'behavior_expression',
	  domain: domain,
	  essence: essence,
	  address: address
	};
	return toConstruct(expression)
}

EntityExpression "EntityExpression"= 
concept:Concept
	space:(
		" "
		)*
	anchor:(
	Scalar
		/ ReferenceOperator
	)
{
	const expression = {
	  kind: 'entity_expression',
	  anchor: typeof anchor !== 'undefined' ? anchor : undefined,
	  concept: typeof concept !== 'undefined' ? concept : undefined
	};
	return toConstruct(expression)
}

LocatedConceptExpression "LocatedConceptExpression"= 
address:Location
	space:(
		" "
		)*
	concept:Concept
{
	const expression = {
	  kind: 'located_concept_expression',
	  address: typeof address !== 'undefined' ? address : undefined,
	  concept: typeof concept !== 'undefined' ? concept : undefined,
	};
	return toConstruct(expression)
}

LocatedDomainExpression "LocatedDomainExpression"= 
address:Location
	domain:Domain
{
	const expression = {
	  kind: 'located_domain_expression',
	  address: address,
	  domain: domain,
	};
	return toConstruct(expression)
}

LocatedEntityExpression "LocatedEntityExpression"= 
address:Location
	(
		" "
		)*
	entity:EntityExpression
{
	const expression = {
	  kind: 'located_entity_expression',
	  address: typeof address !== 'undefined' ? address : undefined,
	  entity: typeof entity !== 'undefined' ? entity : undefined,
	};
	return toConstruct(expression)
}

LocatedEssenceExpression "LocatedEssenceExpression"= 
address:Location
	space:(
		" "
		)*
	essence:Essence
{
	const expression = {
	  kind: 'located_essence_expression',
	  address: typeof address !== 'undefined' ? address : undefined,
	  essence: typeof essence !== 'undefined' ? essence : undefined,
	};
	return toConstruct(expression)
}

SequenceExpression "SequenceExpression"= 
EntityExpression
	/ BehaviorExpression
	/ LocatedEntityExpression
	/ LocatedConceptExpression
	/ LocatedDomainExpression
	/ LocatedEssenceExpression

StrandExpression "StrandExpression"= 
head:Node
	(Space {return null;})*
	tail:((Space {return null;})*
			operator:TransformationOperator
			(Space {return null;})*
			item:(
			Expression
				/ Node
			) {return toConstruct({kind:"strand_tail",operator:operator,item:item});})+
{
	return toConstruct({
	                     kind: 'strand',
	                     head: head,
	                     tail,
	                   })
}

PhraseExpression "PhraseExpression"= 
head:(
	SequenceExpression
		/ ContainerNode
		/ Node
	)
	tail:((
				" "
					/ [\t]
				)+
			tail:(
			SequenceExpression
				/ ContainerNode
				/ Node
			) {return tail;})+
{
	const phrase = {
	  kind: 'phrase_expression',
	  body: [head, ...tail]
	};
	
	return toConstruct(phrase)
}

InfixExpression "InfixExpression"= 
StrandExpression
	/ PhraseExpression

PrefixExpression "PrefixExpression"= 
operator:(
	SpreadOperator
		/ RangeOperator
		/ DescentOperator
		/ DirectionOperator
		/ AggregationOperator
		/ AscentOperator
		/ BranchOperator
		/ ChannelOperator
		/ EvaluationOperator
		/ InvocationOperator
		/ PerformanceOperator
		/ PerspectiveOperator
		/ ReductionOperator
		/ ReferenceOperator
		/ ValueOperator
	)
	(Space {return null;})*
	operands:(
	Expression
		/ Node
	)
{
	return toConstruct({ kind: 'prefix_expression', operator, operands });
}

PostfixExpression "PostfixExpression"= 
operands:(
	(operand:(
				PrefixExpression
					/ InfixExpression
					/ Node
				)
				NodeDelimitingOperator
				(Space {return null;})* {return operand;})*
		/ (
		PrefixExpression
			/ InfixExpression
			/ Node
		)
	)
	(Space {return null;})*
	operator:Operator
{
	const expression = {
	  kind: 'postfix_expression',
	  operator,
	  operands
	};
	return toConstruct(expression);
}