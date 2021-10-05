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
	/ "_"
	/ "["
	/ "]"
	/ "<"
	/ "}"
	/ "("
	/ ")"
	/ "$"
	/ "."
	/ "!"
	/ "@"
	/ "#"
	/ "$"
	/ "%"
	/ "^"
	/ "&"
	/ "*"
	/ [\u0020-\u0021,\u0023-\u0059,\u0061-\u26FF]

Space "Space"= 
(newlines:(
		([\t]
				/ " "
				/ newline:[\n] {return newline;})+
		)+ {return constructs.space();})

Node "Node"= 
InstanceExpression
	/ BehaviorExpression
	/ EntityExpression
	/ PhraseNode
	/ EmbedmentNode
	/ StringNode
	/ NumberNode
	/ AnchorNode
	/ Concept
	/ Location
	/ Domain
	/ Essence

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
				/ "_"
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
					/ "_"
					/ [\"]
				)*
			[\'] {return body.join("");})
		/ ([\"]
			body:(
				("\\"
						[\"] {return'"';})
					/ UnicodeWithoutQuotes
					/ "_"
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
				EmbedmentNode
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
				EmbedmentNode
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
				EmbedmentNode
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
				EmbedmentNode
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
PostfixedExpression
	/ InfixedExpression
	/ PrefixedExpression
	/ SequenceExpression

BehaviorExpression "BehaviorExpression"= 
(location:Location
		domain:Domain
		essence:Essence {const expression={kind:"behavior_expression",domain:"undefined"!=typeof domain?domain:void 0,essence:"undefined"!=typeof essence?essence:void 0,location:"undefined"!=typeof location?location:void 0};return toConstruct(expression);})
	/ (location:Location
		domain:Domain {const expression={kind:"behavior_expression",domain:"undefined"!=typeof domain?domain:void 0,essence:"undefined"!=typeof essence?essence:void 0,location:"undefined"!=typeof location?location:void 0};return toConstruct(expression);})
	/ (location:Location
		essence:Essence {const expression={kind:"behavior_expression",domain:"undefined"!=typeof domain?domain:void 0,essence:"undefined"!=typeof essence?essence:void 0,location:"undefined"!=typeof location?location:void 0};return toConstruct(expression);})
	/ (location:Location
		(
			" "
			)*
		domain:Domain
		(
			" "
			)*
		essence:Essence {const expression={kind:"behavior_expression",domain:"undefined"!=typeof domain?domain:void 0,essence:"undefined"!=typeof essence?essence:void 0,location:"undefined"!=typeof location?location:void 0};return toConstruct(expression);})
	/ (location:Location
		(
			" "
			)*
		domain:Domain {const expression={kind:"behavior_expression",domain:"undefined"!=typeof domain?domain:void 0,essence:"undefined"!=typeof essence?essence:void 0,location:"undefined"!=typeof location?location:void 0};return toConstruct(expression);})
	/ (location:Location
		(
			" "
			)*
		essence:Essence {const expression={kind:"behavior_expression",domain:"undefined"!=typeof domain?domain:void 0,essence:"undefined"!=typeof essence?essence:void 0,location:"undefined"!=typeof location?location:void 0};return toConstruct(expression);})
	/ (domain:Domain
		essence:Essence {const expression={kind:"behavior_expression",domain:"undefined"!=typeof domain?domain:void 0,essence:"undefined"!=typeof essence?essence:void 0,location:"undefined"!=typeof location?location:void 0};return toConstruct(expression);})
	/ (domain:Domain
		(
			" "
			)*
		essence:Essence {const expression={kind:"behavior_expression",domain:"undefined"!=typeof domain?domain:void 0,essence:"undefined"!=typeof essence?essence:void 0,location:"undefined"!=typeof location?location:void 0};return toConstruct(expression);})
	/ (location:Location {const expression={kind:"behavior_expression",domain:"undefined"!=typeof domain?domain:void 0,essence:"undefined"!=typeof essence?essence:void 0,location:"undefined"!=typeof location?location:void 0};return toConstruct(expression);})
	/ (domain:Domain {const expression={kind:"behavior_expression",domain:"undefined"!=typeof domain?domain:void 0,essence:"undefined"!=typeof essence?essence:void 0,location:"undefined"!=typeof location?location:void 0};return toConstruct(expression);})
	/ (essence:Essence {const expression={kind:"behavior_expression",domain:"undefined"!=typeof domain?domain:void 0,essence:"undefined"!=typeof essence?essence:void 0,location:"undefined"!=typeof location?location:void 0};return toConstruct(expression);})

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

CommonExpression "CommonExpression"= 
items:(
	(head:(expression:(
					Container
						/ Scalar
					)
					(
						" "
							/ [\n]
							/ (
							" "
								/ [\t]
							)
						)*
					delimiter:CommonDelimiter
					(
						" "
							/ [\n]
							/ (
							" "
								/ [\t]
							)
						)* {return expression;})+
			tail:(
				Container
					/ Scalar
				) {return[...head,tail];})
		/ (head:(expression:(
				Container
					/ Scalar
				)
				(
					" "
						/ [\n]
						/ (
						" "
							/ [\t]
						)
					)*
				delimiter:CommonDelimiter
				(
					" "
						/ [\n]
						/ (
						" "
							/ [\t]
						)
					)* {return expression;})+ {return[...head];})
	)
{
	const common = {
	  kind: 'common_expression',
	  items: typeof items !== "undefined" ? items : undefined,
	};
	return toConstruct(common)
}

EntityExpression "EntityExpression"= 
(concept:Concept
		space:(
			" "
			)*
		anchor:Scalar {const expression={kind:"entity_expression",anchor:"undefined"!=typeof anchor?anchor:void 0,concept:"undefined"!=typeof concept?concept:void 0};return toConstruct(expression);})
	/ (concept:Concept {const expression={kind:"entity_expression",anchor:"undefined"!=typeof anchor?anchor:void 0,concept:"undefined"!=typeof concept?concept:void 0};return toConstruct(expression);})
	/ (anchor:Scalar {const expression={kind:"entity_expression",anchor:"undefined"!=typeof anchor?anchor:void 0,concept:"undefined"!=typeof concept?concept:void 0};return toConstruct(expression);})

InfixedAggregationExpression "InfixedAggregationExpression"= 
head:Node
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
head:Node
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

InfixedChannelExpression "InfixedChannelExpression"= 
head:Node
	(Space {return null;})*
	tail:(
	(Space {return null;})*
		PrefixedChannelExpression
	)
{
	return toConstruct({
	                     kind: 'infixed_channel_expression',
	                     head: head,
	                     tail: tail,
	                   })
}

InfixedEvaluationExpression "InfixedEvaluationExpression"= 
head:Node
	(Space {return null;})*
	tail:(
	(Space {return null;})*
		PrefixedEvaluationExpression
	)
{
	return toConstruct({
	                     kind: 'infixed_evaluation_expression',
	                     head: head,
	                     tail: tail,
	                   })
}

InfixedExpression "InfixedExpression"= 
InfixedBindingExpression
	/ InfixedTransformationExpression
	/ InfixedAggregationExpression
	/ InfixedChannelExpression
	/ InfixedEvaluationExpression
	/ InfixedInvocationExpression
	/ InfixedPerformanceExpression
	/ InfixedPerspectiveExpression
	/ InfixedRangeExpression
	/ InfixedReductionExpression
	/ CommonExpression
	/ PhraseExpression

InfixedInvocationExpression "InfixedInvocationExpression"= 
head:Node
	(Space {return null;})*
	tail:(
	(Space {return null;})*
		PrefixedInvocationExpression
	)
{
	return toConstruct({
	                     kind: 'infixed_invocation_expression',
	                     head: head,
	                     tail: tail,
	                   })
}

InfixedPerformanceExpression "InfixedPerformanceExpression"= 
head:Node
	(Space {return null;})*
	tail:(
	(Space {return null;})*
		PrefixedPerformanceExpression
	)
{
	return toConstruct({
	                     kind: 'infixed_performance_expression',
	                     head: head,
	                     tail: tail,
	                   })
}

InfixedPerspectiveExpression "InfixedPerspectiveExpression"= 
head:Node
	(Space {return null;})*
	tail:(
	(Space {return null;})*
		PrefixedPerspectiveExpression
	)
{
	return toConstruct({
	                     kind: 'infixed_perspective_expression',
	                     head: head,
	                     tail: tail,
	                   })
}

InfixedRangeExpression "InfixedRangeExpression"= 
head:Node
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

InfixedReductionExpression "InfixedReductionExpression"= 
head:Node
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
head:Node
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

PostfixedAggregationExpression "PostfixedAggregationExpression"= 
(head:(
	InfixedAggregationExpression
		/ PrefixedAggregationExpression
		/ InstanceExpression
		/ EntityExpression
		/ BehaviorExpression
		/ InfixedBindingExpression
		/ InfixedTransformationExpression
		/ InfixedChannelExpression
		/ InfixedEvaluationExpression
		/ InfixedInvocationExpression
		/ InfixedPerformanceExpression
		/ InfixedPerspectiveExpression
		/ InfixedRangeExpression
		/ InfixedReductionExpression
		/ CommonExpression
		/ PhraseExpression
		/ PrefixedBindingExpression
		/ PrefixedRangeExpression
		/ PrefixedReductionExpression
		/ PrefixedTransformationExpression
		/ PrefixedChannelExpression
		/ PrefixedInvocationExpression
		/ PrefixedEvaluationExpression
		/ PrefixedPerformanceExpression
		/ PrefixedPerspectiveExpression
		/ Node
	)
	(
		(
			" "
				/ [\t]
			)
			/ [\n]
		)*
	tail:AggregationOperator {return toConstruct({kind:"postfixed_aggregation_expression",tail:tail,head:head});})

PostfixedBindingExpression "PostfixedBindingExpression"= 
(head:(
	InfixedBindingExpression
		/ PrefixedBindingExpression
		/ InstanceExpression
		/ EntityExpression
		/ BehaviorExpression
		/ InfixedTransformationExpression
		/ InfixedAggregationExpression
		/ InfixedChannelExpression
		/ InfixedEvaluationExpression
		/ InfixedInvocationExpression
		/ InfixedPerformanceExpression
		/ InfixedPerspectiveExpression
		/ InfixedRangeExpression
		/ InfixedReductionExpression
		/ CommonExpression
		/ PhraseExpression
		/ PrefixedAggregationExpression
		/ PrefixedRangeExpression
		/ PrefixedReductionExpression
		/ PrefixedTransformationExpression
		/ PrefixedChannelExpression
		/ PrefixedInvocationExpression
		/ PrefixedEvaluationExpression
		/ PrefixedPerformanceExpression
		/ PrefixedPerspectiveExpression
		/ Node
	)
	(
		(
			" "
				/ [\t]
			)
			/ [\n]
		)*
	tail:BindingOperator {return toConstruct({kind:"postfixed_binding_expression",tail:tail,head:head});})

PostfixedChannelExpression "PostfixedChannelExpression"= 
(head:(
	InfixedChannelExpression
		/ PrefixedChannelExpression
		/ InstanceExpression
		/ EntityExpression
		/ BehaviorExpression
		/ InfixedBindingExpression
		/ InfixedTransformationExpression
		/ InfixedAggregationExpression
		/ InfixedEvaluationExpression
		/ InfixedInvocationExpression
		/ InfixedPerformanceExpression
		/ InfixedPerspectiveExpression
		/ InfixedRangeExpression
		/ InfixedReductionExpression
		/ CommonExpression
		/ PhraseExpression
		/ PrefixedAggregationExpression
		/ PrefixedBindingExpression
		/ PrefixedRangeExpression
		/ PrefixedReductionExpression
		/ PrefixedTransformationExpression
		/ PrefixedInvocationExpression
		/ PrefixedEvaluationExpression
		/ PrefixedPerformanceExpression
		/ PrefixedPerspectiveExpression
		/ Node
	)
	(
		(
			" "
				/ [\t]
			)
			/ [\n]
		)*
	tail:ChannelOperator {return toConstruct({kind:"postfixed_channel_expression",tail:tail,head:head});})

PostfixedEvaluationExpression "PostfixedEvaluationExpression"= 
(head:(
	InfixedEvaluationExpression
		/ PrefixedEvaluationExpression
		/ InstanceExpression
		/ EntityExpression
		/ BehaviorExpression
		/ InfixedBindingExpression
		/ InfixedTransformationExpression
		/ InfixedAggregationExpression
		/ InfixedChannelExpression
		/ InfixedInvocationExpression
		/ InfixedPerformanceExpression
		/ InfixedPerspectiveExpression
		/ InfixedRangeExpression
		/ InfixedReductionExpression
		/ CommonExpression
		/ PhraseExpression
		/ PrefixedAggregationExpression
		/ PrefixedBindingExpression
		/ PrefixedRangeExpression
		/ PrefixedReductionExpression
		/ PrefixedTransformationExpression
		/ PrefixedChannelExpression
		/ PrefixedInvocationExpression
		/ PrefixedPerformanceExpression
		/ PrefixedPerspectiveExpression
		/ Node
	)
	(
		(
			" "
				/ [\t]
			)
			/ [\n]
		)*
	tail:EvaluationOperator {return toConstruct({kind:"postfixed_evaluation_expression",tail:tail,head:head});})

PostfixedExpression "PostfixedExpression"= 
PostfixedAggregationExpression
	/ PostfixedBindingExpression
	/ PostfixedChannelExpression
	/ PostfixedEvaluationExpression
	/ PostfixedInvocationExpression
	/ PostfixedPerformanceExpression
	/ PostfixedPerspectiveExpression
	/ PostfixedRangeExpression
	/ PostfixedReductionExpression
	/ PostfixedTransformationExpression

PostfixedInvocationExpression "PostfixedInvocationExpression"= 
(head:(
	InfixedInvocationExpression
		/ PrefixedInvocationExpression
		/ InstanceExpression
		/ EntityExpression
		/ BehaviorExpression
		/ InfixedBindingExpression
		/ InfixedTransformationExpression
		/ InfixedAggregationExpression
		/ InfixedChannelExpression
		/ InfixedEvaluationExpression
		/ InfixedPerformanceExpression
		/ InfixedPerspectiveExpression
		/ InfixedRangeExpression
		/ InfixedReductionExpression
		/ CommonExpression
		/ PhraseExpression
		/ PrefixedAggregationExpression
		/ PrefixedBindingExpression
		/ PrefixedRangeExpression
		/ PrefixedReductionExpression
		/ PrefixedTransformationExpression
		/ PrefixedChannelExpression
		/ PrefixedEvaluationExpression
		/ PrefixedPerformanceExpression
		/ PrefixedPerspectiveExpression
		/ Node
	)
	(
		(
			" "
				/ [\t]
			)
			/ [\n]
		)*
	tail:InvocationOperator {return toConstruct({kind:"postfixed_invocation_expression",tail:tail,head:head});})

PostfixedPerformanceExpression "PostfixedPerformanceExpression"= 
(head:(
	InfixedPerformanceExpression
		/ PrefixedPerformanceExpression
		/ InstanceExpression
		/ EntityExpression
		/ BehaviorExpression
		/ InfixedBindingExpression
		/ InfixedTransformationExpression
		/ InfixedAggregationExpression
		/ InfixedChannelExpression
		/ InfixedEvaluationExpression
		/ InfixedInvocationExpression
		/ InfixedPerspectiveExpression
		/ InfixedRangeExpression
		/ InfixedReductionExpression
		/ CommonExpression
		/ PhraseExpression
		/ PrefixedAggregationExpression
		/ PrefixedBindingExpression
		/ PrefixedRangeExpression
		/ PrefixedReductionExpression
		/ PrefixedTransformationExpression
		/ PrefixedChannelExpression
		/ PrefixedInvocationExpression
		/ PrefixedEvaluationExpression
		/ PrefixedPerspectiveExpression
		/ Node
	)
	(
		(
			" "
				/ [\t]
			)
			/ [\n]
		)*
	tail:PerformanceOperator {return toConstruct({kind:"postfixed_performance_expression",tail:tail,head:head});})

PostfixedPerspectiveExpression "PostfixedPerspectiveExpression"= 
(head:(
	InfixedPerspectiveExpression
		/ PrefixedPerspectiveExpression
		/ InstanceExpression
		/ EntityExpression
		/ BehaviorExpression
		/ InfixedBindingExpression
		/ InfixedTransformationExpression
		/ InfixedAggregationExpression
		/ InfixedChannelExpression
		/ InfixedEvaluationExpression
		/ InfixedInvocationExpression
		/ InfixedPerformanceExpression
		/ InfixedRangeExpression
		/ InfixedReductionExpression
		/ CommonExpression
		/ PhraseExpression
		/ PrefixedAggregationExpression
		/ PrefixedBindingExpression
		/ PrefixedRangeExpression
		/ PrefixedReductionExpression
		/ PrefixedTransformationExpression
		/ PrefixedChannelExpression
		/ PrefixedInvocationExpression
		/ PrefixedEvaluationExpression
		/ PrefixedPerformanceExpression
		/ Node
	)
	(
		(
			" "
				/ [\t]
			)
			/ [\n]
		)*
	tail:PerspectiveOperator {return toConstruct({kind:"postfixed_perspective_expression",tail:tail,head:head});})

PostfixedRangeExpression "PostfixedRangeExpression"= 
(head:(
	InfixedRangeExpression
		/ PrefixedRangeExpression
		/ InstanceExpression
		/ EntityExpression
		/ BehaviorExpression
		/ InfixedBindingExpression
		/ InfixedTransformationExpression
		/ InfixedAggregationExpression
		/ InfixedChannelExpression
		/ InfixedEvaluationExpression
		/ InfixedInvocationExpression
		/ InfixedPerformanceExpression
		/ InfixedPerspectiveExpression
		/ InfixedReductionExpression
		/ CommonExpression
		/ PhraseExpression
		/ PrefixedAggregationExpression
		/ PrefixedBindingExpression
		/ PrefixedReductionExpression
		/ PrefixedTransformationExpression
		/ PrefixedChannelExpression
		/ PrefixedInvocationExpression
		/ PrefixedEvaluationExpression
		/ PrefixedPerformanceExpression
		/ PrefixedPerspectiveExpression
		/ Node
	)
	(
		(
			" "
				/ [\t]
			)
			/ [\n]
		)*
	tail:RangeOperator {return toConstruct({kind:"postfixed_range_expression",tail:tail,head:head});})

PostfixedReductionExpression "PostfixedReductionExpression"= 
(head:(
	InfixedReductionExpression
		/ PrefixedReductionExpression
		/ InstanceExpression
		/ EntityExpression
		/ BehaviorExpression
		/ InfixedBindingExpression
		/ InfixedTransformationExpression
		/ InfixedAggregationExpression
		/ InfixedChannelExpression
		/ InfixedEvaluationExpression
		/ InfixedInvocationExpression
		/ InfixedPerformanceExpression
		/ InfixedPerspectiveExpression
		/ InfixedRangeExpression
		/ CommonExpression
		/ PhraseExpression
		/ PrefixedAggregationExpression
		/ PrefixedBindingExpression
		/ PrefixedRangeExpression
		/ PrefixedTransformationExpression
		/ PrefixedChannelExpression
		/ PrefixedInvocationExpression
		/ PrefixedEvaluationExpression
		/ PrefixedPerformanceExpression
		/ PrefixedPerspectiveExpression
		/ Node
	)
	(
		(
			" "
				/ [\t]
			)
			/ [\n]
		)*
	tail:ReductionOperator {return toConstruct({kind:"postfixed_reduction_expression",tail:tail,head:head});})

PostfixedTransformationExpression "PostfixedTransformationExpression"= 
(head:(
	InfixedTransformationExpression
		/ PrefixedTransformationExpression
		/ InstanceExpression
		/ EntityExpression
		/ BehaviorExpression
		/ InfixedBindingExpression
		/ InfixedAggregationExpression
		/ InfixedChannelExpression
		/ InfixedEvaluationExpression
		/ InfixedInvocationExpression
		/ InfixedPerformanceExpression
		/ InfixedPerspectiveExpression
		/ InfixedRangeExpression
		/ InfixedReductionExpression
		/ CommonExpression
		/ PhraseExpression
		/ PrefixedAggregationExpression
		/ PrefixedBindingExpression
		/ PrefixedRangeExpression
		/ PrefixedReductionExpression
		/ PrefixedChannelExpression
		/ PrefixedInvocationExpression
		/ PrefixedEvaluationExpression
		/ PrefixedPerformanceExpression
		/ PrefixedPerspectiveExpression
		/ Node
	)
	(
		(
			" "
				/ [\t]
			)
			/ [\n]
		)*
	tail:TransformationOperator {return toConstruct({kind:"postfixed_transformation_expression",tail:tail,head:head});})

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
	InfixedBindingExpression
		/ InfixedTransformationExpression
		/ InfixedAggregationExpression
		/ InfixedChannelExpression
		/ InfixedEvaluationExpression
		/ InfixedInvocationExpression
		/ InfixedPerformanceExpression
		/ InfixedPerspectiveExpression
		/ InfixedRangeExpression
		/ InfixedReductionExpression
		/ CommonExpression
		/ PhraseExpression
		/ PrefixedAggregationExpression
		/ PrefixedBindingExpression
		/ PrefixedRangeExpression
		/ PrefixedReductionExpression
		/ PrefixedTransformationExpression
		/ PrefixedChannelExpression
		/ PrefixedInvocationExpression
		/ PrefixedEvaluationExpression
		/ PrefixedPerformanceExpression
		/ PrefixedPerspectiveExpression
		/ Node
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
	InfixedBindingExpression
		/ InfixedTransformationExpression
		/ InfixedAggregationExpression
		/ InfixedChannelExpression
		/ InfixedEvaluationExpression
		/ InfixedInvocationExpression
		/ InfixedPerformanceExpression
		/ InfixedPerspectiveExpression
		/ InfixedRangeExpression
		/ InfixedReductionExpression
		/ CommonExpression
		/ PhraseExpression
		/ PrefixedAggregationExpression
		/ PrefixedBindingExpression
		/ PrefixedRangeExpression
		/ PrefixedReductionExpression
		/ PrefixedTransformationExpression
		/ PrefixedChannelExpression
		/ PrefixedInvocationExpression
		/ PrefixedEvaluationExpression
		/ PrefixedPerformanceExpression
		/ PrefixedPerspectiveExpression
		/ Node
	)
	(
		(
			" "
				/ [\t]
			)
			/ [\n]
		)* {return toConstruct({kind:"prefixed_binding_expression",head:head,tail:tail});})

PrefixedChannelExpression "PrefixedChannelExpression"= 
(head:ChannelOperator
	(
		(
			" "
				/ [\t]
			)
			/ [\n]
		)*
	tail:(
	InfixedBindingExpression
		/ InfixedTransformationExpression
		/ InfixedAggregationExpression
		/ InfixedChannelExpression
		/ InfixedEvaluationExpression
		/ InfixedInvocationExpression
		/ InfixedPerformanceExpression
		/ InfixedPerspectiveExpression
		/ InfixedRangeExpression
		/ InfixedReductionExpression
		/ CommonExpression
		/ PhraseExpression
		/ PrefixedAggregationExpression
		/ PrefixedBindingExpression
		/ PrefixedRangeExpression
		/ PrefixedReductionExpression
		/ PrefixedTransformationExpression
		/ PrefixedChannelExpression
		/ PrefixedInvocationExpression
		/ PrefixedEvaluationExpression
		/ PrefixedPerformanceExpression
		/ PrefixedPerspectiveExpression
		/ Node
	) {return toConstruct({kind:"prefixed_channel_expression",head:head,tail:tail});})

PrefixedEvaluationExpression "PrefixedEvaluationExpression"= 
(head:EvaluationOperator
	(
		(
			" "
				/ [\t]
			)
			/ [\n]
		)*
	tail:(
	InfixedBindingExpression
		/ InfixedTransformationExpression
		/ InfixedAggregationExpression
		/ InfixedChannelExpression
		/ InfixedEvaluationExpression
		/ InfixedInvocationExpression
		/ InfixedPerformanceExpression
		/ InfixedPerspectiveExpression
		/ InfixedRangeExpression
		/ InfixedReductionExpression
		/ CommonExpression
		/ PhraseExpression
		/ PrefixedAggregationExpression
		/ PrefixedBindingExpression
		/ PrefixedRangeExpression
		/ PrefixedReductionExpression
		/ PrefixedTransformationExpression
		/ PrefixedChannelExpression
		/ PrefixedInvocationExpression
		/ PrefixedEvaluationExpression
		/ PrefixedPerformanceExpression
		/ PrefixedPerspectiveExpression
		/ Node
	) {return toConstruct({kind:"prefixed_evaluation_expression",head:head,tail:tail});})

PrefixedExpression "PrefixedExpression"= 
PrefixedAggregationExpression
	/ PrefixedBindingExpression
	/ PrefixedRangeExpression
	/ PrefixedReductionExpression
	/ PrefixedTransformationExpression
	/ PrefixedChannelExpression
	/ PrefixedInvocationExpression
	/ PrefixedEvaluationExpression
	/ PrefixedPerformanceExpression
	/ PrefixedPerspectiveExpression

PrefixedInvocationExpression "PrefixedInvocationExpression"= 
(head:InvocationOperator
	(
		(
			" "
				/ [\t]
			)
			/ [\n]
		)*
	tail:(
	InfixedBindingExpression
		/ InfixedTransformationExpression
		/ InfixedAggregationExpression
		/ InfixedChannelExpression
		/ InfixedEvaluationExpression
		/ InfixedInvocationExpression
		/ InfixedPerformanceExpression
		/ InfixedPerspectiveExpression
		/ InfixedRangeExpression
		/ InfixedReductionExpression
		/ CommonExpression
		/ PhraseExpression
		/ PrefixedAggregationExpression
		/ PrefixedBindingExpression
		/ PrefixedRangeExpression
		/ PrefixedReductionExpression
		/ PrefixedTransformationExpression
		/ PrefixedChannelExpression
		/ PrefixedInvocationExpression
		/ PrefixedEvaluationExpression
		/ PrefixedPerformanceExpression
		/ PrefixedPerspectiveExpression
		/ Node
	) {return toConstruct({kind:"prefixed_invocation_expression",head:head,tail:tail});})

PrefixedPerformanceExpression "PrefixedPerformanceExpression"= 
(head:PerformanceOperator
	(
		(
			" "
				/ [\t]
			)
			/ [\n]
		)*
	tail:(
	InfixedBindingExpression
		/ InfixedTransformationExpression
		/ InfixedAggregationExpression
		/ InfixedChannelExpression
		/ InfixedEvaluationExpression
		/ InfixedInvocationExpression
		/ InfixedPerformanceExpression
		/ InfixedPerspectiveExpression
		/ InfixedRangeExpression
		/ InfixedReductionExpression
		/ CommonExpression
		/ PhraseExpression
		/ PrefixedAggregationExpression
		/ PrefixedBindingExpression
		/ PrefixedRangeExpression
		/ PrefixedReductionExpression
		/ PrefixedTransformationExpression
		/ PrefixedChannelExpression
		/ PrefixedInvocationExpression
		/ PrefixedEvaluationExpression
		/ PrefixedPerformanceExpression
		/ PrefixedPerspectiveExpression
		/ Node
	) {return toConstruct({kind:"prefixed_performance_expression",head:head,tail:tail});})

PrefixedPerspectiveExpression "PrefixedPerspectiveExpression"= 
(head:PerspectiveOperator
	(
		(
			" "
				/ [\t]
			)
			/ [\n]
		)*
	tail:(
	InfixedBindingExpression
		/ InfixedTransformationExpression
		/ InfixedAggregationExpression
		/ InfixedChannelExpression
		/ InfixedEvaluationExpression
		/ InfixedInvocationExpression
		/ InfixedPerformanceExpression
		/ InfixedPerspectiveExpression
		/ InfixedRangeExpression
		/ InfixedReductionExpression
		/ CommonExpression
		/ PhraseExpression
		/ PrefixedAggregationExpression
		/ PrefixedBindingExpression
		/ PrefixedRangeExpression
		/ PrefixedReductionExpression
		/ PrefixedTransformationExpression
		/ PrefixedChannelExpression
		/ PrefixedInvocationExpression
		/ PrefixedEvaluationExpression
		/ PrefixedPerformanceExpression
		/ PrefixedPerspectiveExpression
		/ Node
	) {return toConstruct({kind:"prefixed_perspective_expression",head:head,tail:tail});})

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
	InfixedBindingExpression
		/ InfixedTransformationExpression
		/ InfixedAggregationExpression
		/ InfixedChannelExpression
		/ InfixedEvaluationExpression
		/ InfixedInvocationExpression
		/ InfixedPerformanceExpression
		/ InfixedPerspectiveExpression
		/ InfixedRangeExpression
		/ InfixedReductionExpression
		/ CommonExpression
		/ PhraseExpression
		/ PrefixedAggregationExpression
		/ PrefixedBindingExpression
		/ PrefixedRangeExpression
		/ PrefixedReductionExpression
		/ PrefixedTransformationExpression
		/ PrefixedChannelExpression
		/ PrefixedInvocationExpression
		/ PrefixedEvaluationExpression
		/ PrefixedPerformanceExpression
		/ PrefixedPerspectiveExpression
		/ Node
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
	InfixedBindingExpression
		/ InfixedTransformationExpression
		/ InfixedAggregationExpression
		/ InfixedChannelExpression
		/ InfixedEvaluationExpression
		/ InfixedInvocationExpression
		/ InfixedPerformanceExpression
		/ InfixedPerspectiveExpression
		/ InfixedRangeExpression
		/ InfixedReductionExpression
		/ CommonExpression
		/ PhraseExpression
		/ PrefixedAggregationExpression
		/ PrefixedBindingExpression
		/ PrefixedRangeExpression
		/ PrefixedReductionExpression
		/ PrefixedTransformationExpression
		/ PrefixedChannelExpression
		/ PrefixedInvocationExpression
		/ PrefixedEvaluationExpression
		/ PrefixedPerformanceExpression
		/ PrefixedPerspectiveExpression
		/ Node
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
	InfixedBindingExpression
		/ InfixedTransformationExpression
		/ InfixedAggregationExpression
		/ InfixedChannelExpression
		/ InfixedEvaluationExpression
		/ InfixedInvocationExpression
		/ InfixedPerformanceExpression
		/ InfixedPerspectiveExpression
		/ InfixedRangeExpression
		/ InfixedReductionExpression
		/ CommonExpression
		/ PhraseExpression
		/ PrefixedAggregationExpression
		/ PrefixedBindingExpression
		/ PrefixedRangeExpression
		/ PrefixedReductionExpression
		/ PrefixedTransformationExpression
		/ PrefixedChannelExpression
		/ PrefixedInvocationExpression
		/ PrefixedEvaluationExpression
		/ PrefixedPerformanceExpression
		/ PrefixedPerspectiveExpression
		/ Node
	) {return toConstruct({kind:"prefixed_transformation_expression",head:head,tail:tail});})

SequenceExpression "SequenceExpression"= 
InstanceExpression
	/ EntityExpression
	/ BehaviorExpression