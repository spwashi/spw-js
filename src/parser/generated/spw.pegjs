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
            srcloc: location(),
        }, Object.fromEntries(Object.entries(node).filter((e) => {
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
        toConstruct,
        constructs,
    };
};
  var head = spwHead();
  var toConstruct = head.toConstruct;
  var constructs = head.constructs;
}

Top "Top"= 
(
		(
			" "
				/ [\t]
			)
			/ [\n]
		)*
	body:(
	BlockExpression
		/ Expression
		/ Container
		/ Node
	)
	(
		(
			" "
				/ [\t]
			)
			/ [\n]
		)*
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
	/ [\u0020-\u0021,\u0023-\u0059,\u0061-\u26FF]

Space "Space"= 
(newlines:(
		([\t]
				/ " "
				/ newline:[\n] {return newline;})+
		)+ {return constructs.space();})

Node "Node"= 
PhraseNode
	/ EmbedmentNode
	/ StringNode
	/ NumberNode
	/ AnchorNode

AnchorNode "AnchorNode"= 
anchor:(
	(tail:(chars:(
						[a-zA-Z0-9]
							/ "_"
						)+ {return chars.join("");})+ {return[...tail].join("");})
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

EmbedmentNode "EmbedmentNode"= 
embedment:([`]
		body:(
			UnicodeWithoutQuotes
				/ [\\]
				/ (Space {return null;})
				/ [\"]
				/ [\']
				/ [\n]
			)*
		[`] {return body.join("");})
{
	return toConstruct({
	  kind: 'embedment',
	  open: '`',
	  body: embedment,
	  close: '`',
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
	                     items: p
	                   });
}

Scalar "Scalar"= 
PhraseNode
	/ EmbedmentNode
	/ StringNode
	/ NumberNode
	/ AnchorNode

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

Operator "Operator"= 
SpreadOperator
	/ RangeOperator
	/ DescentOperator
	/ TransformationOperator
	/ DirectionOperator
	/ AggregationOperator
	/ AscentOperator
	/ BindingOperator
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
	                     kind: "aggregation_operator",
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
	                     kind: "ascent_operator",
	                     ..._operatorComponents
	                   })
}

BindingOperator "BindingOperator"= 
_operatorComponents:(
	(token:":"
			"_"
			label:AnchorNode {return{token:token,label:label};})
		/ ":"
	)
{
	return toConstruct({
	                     kind: "binding_operator",
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
	                     kind: "branch_operator",
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
	                     kind: "channel_operator",
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
	                     kind: "descent_operator",
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
	                     kind: "direction_operator",
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
	                     kind: "evaluation_operator",
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
	                     kind: "invocation_operator",
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
	                     kind: "performance_operator",
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
	                     kind: "perspective_operator",
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
	                     kind: "range_operator",
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
	                     kind: "reduction_operator",
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
	                     kind: "reference_operator",
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
	                     kind: "spread_operator",
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
	                     kind: "transformation_operator",
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
	                     kind: "value_operator",
	                     ..._operatorComponents
	                   })
}

BlockDelimiter "BlockDelimiter"= 
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

CommonDelimiter "CommonDelimiter"= 
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

NodeDelimiter "NodeDelimiter"= 
_operatorComponents:(
	(token:" "
			"_"
			label:AnchorNode {return{token:token,label:label};})
		/ " "
	)
{
	return toConstruct({
	                     kind: "node_delimiter",
	                     ..._operatorComponents
	                   })
}

Container "Container"= 
Concept
	/ Location
	/ Domain
	/ Essence

DomainOpen "DomainOpen"= 
(token:"{"
		"_"
		node:(anchor:(
				PhraseNode
					/ EmbedmentNode
					/ StringNode
					/ NumberNode
					/ AnchorNode
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
		(Space {return null;}) {return toConstruct({token:token,label:node.anchor,kind:"domain_scheme"});})
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
(leadingspace:(
		" "
			/ [\n]
		)*
	expression:BlockExpression
	trailingspace:(
		" "
			/ [\n]
		)* {return expression;})

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
	                     kind: 'domain_container',
	                     open: container.open,
	                     body: container.body,
	                     close: container.close,
	                   })
}

EssenceOpen "EssenceOpen"= 
(token:"["
		"_"
		node:(anchor:(
				PhraseNode
					/ EmbedmentNode
					/ StringNode
					/ NumberNode
					/ AnchorNode
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
		(Space {return null;}) {return toConstruct({token:token,label:node.anchor,kind:"essence_scheme"});})
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
(leadingspace:(
		" "
			/ [\n]
		)*
	expression:BlockExpression
	trailingspace:(
		" "
			/ [\n]
		)* {return expression;})

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
	                     kind: 'essence_container',
	                     open: container.open,
	                     body: container.body,
	                     close: container.close,
	                   })
}

ConceptOpen "ConceptOpen"= 
(token:"<"
		"_"
		node:(anchor:(
				PhraseNode
					/ EmbedmentNode
					/ StringNode
					/ NumberNode
					/ AnchorNode
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
		(Space {return null;}) {return toConstruct({token:token,label:node.anchor,kind:"concept_scheme"});})
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
(leadingspace:(
		" "
			/ [\n]
		)*
	expression:BlockExpression
	trailingspace:(
		" "
			/ [\n]
		)* {return expression;})

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
	                     kind: 'concept_container',
	                     open: container.open,
	                     body: container.body,
	                     close: container.close,
	                   })
}

LocationOpen "LocationOpen"= 
(token:"("
		"_"
		node:(anchor:(
				PhraseNode
					/ EmbedmentNode
					/ StringNode
					/ NumberNode
					/ AnchorNode
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
		(Space {return null;}) {return toConstruct({token:token,label:node.anchor,kind:"location_scheme"});})
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
(leadingspace:(
		" "
			/ [\n]
		)*
	expression:BlockExpression
	trailingspace:(
		" "
			/ [\n]
		)* {return expression;})

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
	                     kind: 'location_container',
	                     open: container.open,
	                     body: container.body,
	                     close: container.close,
	                   })
}

Expression "Expression"= 
PrefixExpression
	/ InfixedExpression
	/ SequenceExpression

BlockExpression "BlockExpression"= 
items:(
	(head:(expression:(
					Expression
						/ Container
						/ Node
						/ ChannelOperator
					)
					(
						" "
							/ [\n]
							/ (
							" "
								/ [\t]
							)
						)*
					delimiter:BlockDelimiter
					(
						" "
							/ [\n]
							/ (
							" "
								/ [\t]
							)
						)* {return expression;})+
			tail:(
				Expression
					/ Container
					/ Node
					/ ChannelOperator
				) {return[...head,tail];})
		/ (head:(expression:(
				Expression
					/ Container
					/ Node
					/ ChannelOperator
				)
				(
					" "
						/ [\n]
						/ (
						" "
							/ [\t]
						)
					)*
				delimiter:BlockDelimiter
				(
					" "
						/ [\n]
						/ (
						" "
							/ [\t]
						)
					)* {return expression;})+ {return[...head];})
		/ tail:(
			Expression
				/ Container
				/ Node
				/ ChannelOperator
			) {return[tail];}
	)
{
	const block = {
	  kind: 'block',
	  items: typeof items !== "undefined" ? items : undefined,
	};
	return toConstruct(block)
}

InstanceExpression "InstanceExpression"= 
entity:EntityExpression
	space:(
		" "
			/ [\n]
		)*
	behavior:BehaviorExpression
{
	const expression = {
	  kind: 'instance_expression',
	  entity: entity,
	  behavior: behavior
	};
	return toConstruct(expression)
}

BehaviorExpression "BehaviorExpression"= 
(address:Location
		domain:Domain
		essence:Essence {const expression={kind:"behavior_expression",domain:"undefined"!=typeof domain?domain:void 0,essence:"undefined"!=typeof essence?essence:void 0,address:"undefined"!=typeof address?address:void 0};return toConstruct(expression);})
	/ (address:Location
		(
			" "
			)*
		domain:Domain
		(
			" "
			)*
		essence:Essence {const expression={kind:"behavior_expression",domain:"undefined"!=typeof domain?domain:void 0,essence:"undefined"!=typeof essence?essence:void 0,address:"undefined"!=typeof address?address:void 0};return toConstruct(expression);})
	/ (domain:Domain
		(
			" "
			)*
		essence:Essence {const expression={kind:"behavior_expression",domain:"undefined"!=typeof domain?domain:void 0,essence:"undefined"!=typeof essence?essence:void 0,address:"undefined"!=typeof address?address:void 0};return toConstruct(expression);})

EntityExpression "EntityExpression"= 
(concept:Concept
		space:(
			" "
			)*
		anchor:(
		Scalar
			/ ReferenceOperator
		) {const expression={kind:"entity_expression",anchor:anchor,concept:"undefined"!=typeof concept?concept:void 0};return toConstruct(expression);})
	/ (anchor:(
		Scalar
			/ ReferenceOperator
		) {const expression={kind:"entity_expression",anchor:anchor,concept:"undefined"!=typeof concept?concept:void 0};return toConstruct(expression);})

LocatedConceptExpression "LocatedConceptExpression"= 
address:Location
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
InstanceExpression
	/ EntityExpression
	/ BehaviorExpression
	/ LocatedEntityExpression
	/ LocatedConceptExpression
	/ LocatedEssenceExpression
	/ LocatedDomainExpression

InfixedExpression "InfixedExpression"= 
CommonExpression
	/ PhraseExpression
	/ InfixedBindingExpression
	/ InfixedTransformationExpression
	/ InfixedAggregationExpression
	/ InfixedReductionExpression
	/ InfixedRangeExpression

CommonExpression "CommonExpression"= 
head:Node
	(Space {return null;})*
	tail:(operator:CommonDelimiter
			(Space {return null;})*
			item:(
			Expression
				/ Node
			)
			(Space {return null;})* {return toConstruct({kind:"common_tail",operator:operator,item:item});})+
{
	return toConstruct({
	                     kind: 'common_expression',
	                     head,
	                     tail,
	                   });
}

PhraseExpression "PhraseExpression"= 
head:(
	SequenceExpression
		/ Container
		/ Node
	)
	tail:((
				" "
					/ [\t]
				)+
			tail:(
			SequenceExpression
				/ Container
				/ Node
			) {return tail;})+
{
	const phrase = {
	  kind: 'phrase_expression',
	  items: [head, ...tail]
	};
	
	return toConstruct(phrase)
}

InfixedAggregationExpression "InfixedAggregationExpression"= 
head:(
	SequenceExpression
		/ Container
		/ Node
		/ ChannelOperator
	)
	(Space {return null;})*
	tail:(
	(Space {return null;})*
		PrefixedAggregationExpression
	)
{
	return toConstruct({
	                     kind: 'infixed_aggregation_expression',
	                     head: head,
	                     tail: tail,
	                   })
}

InfixedBindingExpression "InfixedBindingExpression"= 
head:(
	SequenceExpression
		/ Container
		/ Node
		/ ChannelOperator
	)
	(Space {return null;})*
	tail:(
	(Space {return null;})*
		PrefixedBindingExpression
	)
{
	return toConstruct({
	                     kind: 'infixed_binding_expression',
	                     head: head,
	                     tail: tail,
	                   })
}

InfixedReductionExpression "InfixedReductionExpression"= 
head:(
	SequenceExpression
		/ Container
		/ Node
		/ ChannelOperator
	)
	(Space {return null;})*
	tail:(
	(Space {return null;})*
		PrefixedReductionExpression
	)
{
	return toConstruct({
	                     kind: 'infixed_reduction_expression',
	                     head: head,
	                     tail: tail,
	                   })
}

InfixedTransformationExpression "InfixedTransformationExpression"= 
head:(
	SequenceExpression
		/ Container
		/ Node
		/ ChannelOperator
	)
	(Space {return null;})*
	tail:(
	(Space {return null;})*
		PrefixedTransformationExpression
	)
{
	return toConstruct({
	                     kind: 'infixed_transformation_expression',
	                     head: head,
	                     tail: tail,
	                   })
}

InfixedRangeExpression "InfixedRangeExpression"= 
head:(
	SequenceExpression
		/ Container
		/ Node
		/ ChannelOperator
	)
	(Space {return null;})*
	tail:(
	(Space {return null;})*
		PrefixedRangeExpression
	)
{
	return toConstruct({
	                     kind: 'infixed_range_expression',
	                     head: head,
	                     tail: tail,
	                   })
}

PrefixedAggregationExpression "PrefixedAggregationExpression"= 
(head:AggregationOperator
	(
		(
			" "
				/ [\t]
			)
			/ [\n]
		)*
	tail:(
	CommonExpression
		/ PhraseExpression
		/ InfixedBindingExpression
		/ InfixedTransformationExpression
		/ InfixedAggregationExpression
		/ InfixedReductionExpression
		/ InfixedRangeExpression
		/ PrefixedAggregationExpression
		/ PrefixedBindingExpression
		/ PrefixedRangeExpression
		/ PrefixedReductionExpression
		/ PrefixedTransformationExpression
		/ Container
		/ Node
		/ ChannelOperator
	)
	(
		(
			" "
				/ [\t]
			)
			/ [\n]
		)* {return toConstruct({kind:"prefixed_aggregation_expression",head:head,tail:tail});})

PrefixedBindingExpression "PrefixedBindingExpression"= 
(head:BindingOperator
	(
		(
			" "
				/ [\t]
			)
			/ [\n]
		)*
	tail:(
	CommonExpression
		/ PhraseExpression
		/ InfixedBindingExpression
		/ InfixedTransformationExpression
		/ InfixedAggregationExpression
		/ InfixedReductionExpression
		/ InfixedRangeExpression
		/ PrefixedAggregationExpression
		/ PrefixedBindingExpression
		/ PrefixedRangeExpression
		/ PrefixedReductionExpression
		/ PrefixedTransformationExpression
		/ Container
		/ Node
		/ ChannelOperator
	)
	(
		(
			" "
				/ [\t]
			)
			/ [\n]
		)* {return toConstruct({kind:"prefixed_binding_expression",head:head,tail:tail});})

PrefixedRangeExpression "PrefixedRangeExpression"= 
(head:RangeOperator
	(
		(
			" "
				/ [\t]
			)
			/ [\n]
		)*
	tail:(
	CommonExpression
		/ PhraseExpression
		/ InfixedBindingExpression
		/ InfixedTransformationExpression
		/ InfixedAggregationExpression
		/ InfixedReductionExpression
		/ InfixedRangeExpression
		/ PrefixedAggregationExpression
		/ PrefixedBindingExpression
		/ PrefixedRangeExpression
		/ PrefixedReductionExpression
		/ PrefixedTransformationExpression
		/ Container
		/ Node
		/ ChannelOperator
	)
	(
		(
			" "
				/ [\t]
			)
			/ [\n]
		)* {return toConstruct({kind:"prefixed_range_expression",head:head,tail:tail});})

PrefixedReductionExpression "PrefixedReductionExpression"= 
(head:ReductionOperator
	(
		(
			" "
				/ [\t]
			)
			/ [\n]
		)*
	tail:(
	CommonExpression
		/ PhraseExpression
		/ InfixedBindingExpression
		/ InfixedTransformationExpression
		/ InfixedAggregationExpression
		/ InfixedReductionExpression
		/ InfixedRangeExpression
		/ PrefixedAggregationExpression
		/ PrefixedBindingExpression
		/ PrefixedRangeExpression
		/ PrefixedReductionExpression
		/ PrefixedTransformationExpression
		/ Container
		/ Node
		/ ChannelOperator
	)
	(
		(
			" "
				/ [\t]
			)
			/ [\n]
		)* {return toConstruct({kind:"prefixed_reduction_expression",head:head,tail:tail});})

PrefixedTransformationExpression "PrefixedTransformationExpression"= 
(head:TransformationOperator
	(
		(
			" "
				/ [\t]
			)
			/ [\n]
		)*
	tail:(
	CommonExpression
		/ PhraseExpression
		/ InfixedBindingExpression
		/ InfixedTransformationExpression
		/ InfixedAggregationExpression
		/ InfixedReductionExpression
		/ InfixedRangeExpression
		/ PrefixedAggregationExpression
		/ PrefixedBindingExpression
		/ PrefixedRangeExpression
		/ PrefixedReductionExpression
		/ PrefixedTransformationExpression
		/ Container
		/ Node
		/ ChannelOperator
	)
	(
		(
			" "
				/ [\t]
			)
			/ [\n]
		)* {return toConstruct({kind:"prefixed_transformation_expression",head:head,tail:tail});})

PrefixExpression "PrefixExpression"= 
PrefixedAggregationExpression
	/ PrefixedBindingExpression
	/ PrefixedRangeExpression
	/ PrefixedReductionExpression
	/ PrefixedTransformationExpression