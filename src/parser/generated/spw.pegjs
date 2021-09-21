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
  var head = spwHead();
  var toConstruct = head.toConstruct;
  var constructs = head.constructs;
}

Top "Top"= 
(
		(Space {return null;})
			/ [\n]
		)*
	body:(
	Block
		/ Expression
		/ Container
		/ Node
	)
	(
		(Space {return null;})
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

Container "Container"= 
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
(expression:(
	Block
		/ Expression
		/ Container
		/ Node
	) {return expression;})

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
			(
				" "
					/ [\n]
				)*
			body:DomainBody
			(
				" "
					/ [\n]
				)*
			close:DomainClose {return{open:open,body:body,close:close};})
	)
{
	return toConstruct({
	                     kind: 'domain',
	                     open: container.open,
	                     body: container.body,
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
(expression:(
	Block
		/ Expression
		/ Container
		/ Node
	) {return expression;})

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
			(
				" "
					/ [\n]
				)*
			body:EssenceBody
			(
				" "
					/ [\n]
				)*
			close:EssenceClose {return{open:open,body:body,close:close};})
	)
{
	return toConstruct({
	                     kind: 'essence',
	                     open: container.open,
	                     body: container.body,
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
(expression:(
	Block
		/ Expression
		/ Container
		/ Node
	) {return expression;})

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
			(
				" "
					/ [\n]
				)*
			body:ConceptBody
			(
				" "
					/ [\n]
				)*
			close:ConceptClose {return{open:open,body:body,close:close};})
	)
{
	return toConstruct({
	                     kind: 'concept',
	                     open: container.open,
	                     body: container.body,
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
(expression:(
	Block
		/ Expression
		/ Container
		/ Node
	) {return expression;})

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
			(
				" "
					/ [\n]
				)*
			body:LocationBody
			(
				" "
					/ [\n]
				)*
			close:LocationClose {return{open:open,body:body,close:close};})
	)
{
	return toConstruct({
	                     kind: 'location',
	                     open: container.open,
	                     body: container.body,
	                     close: container.close,
	                   })
}

Expression "Expression"= 
InfixExpression
	/ SequenceExpression

Block "Block"= 
items:(
	(head:(expression:(
					Expression
						/ Container
						/ Node
					)
					(
						(Space {return null;})
							/ [\n]
						)*
					delimiter:BlockDelimitingOperator
					(
						(Space {return null;})
							/ [\n]
						)* {return expression;})+
			(
				(Space {return null;})
					/ [\n]
				)*
			tail:(expression:(
					Expression
						/ Container
						/ Node
					)
					(
						(Space {return null;})
							/ [\n]
						)*
					delimiter:BlockDelimitingOperator?
					(
						(Space {return null;})
							/ [\n]
						)* {return expression;})
			(
				(Space {return null;})
					/ [\n]
				)* {return"undefined"==typeof tail?head:[...head,tail];})
		/ (head:(expression:(
				Expression
					/ Container
					/ Node
				)
				(
					(Space {return null;})
						/ [\n]
					)*
				delimiter:BlockDelimitingOperator
				(
					(Space {return null;})
						/ [\n]
					)* {return expression;})+ {return"undefined"==typeof tail?head:[...head,tail];})
		/ (expression:(
		Expression
			/ Container
			/ Node
		) {return[expression];})
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
(
	address:Location
		(
			" "
			)*
		domain:Domain
		(
			" "
			)*
		essence:Essence
	)
	/ (
	address:Location
		(
			" "
			)*
		domain:Domain
	)
	/ (
	address:Location
		(
			" "
			)*
		essence:Essence
	)
	/ (
	domain:Domain
		(
			" "
			)*
		essence:Essence
	)
	/ address:Location
	/ domain:Domain
	/ essence:Essence
{
	const expression = {
	  kind: 'behavior_expression',
	  domain: typeof domain !== 'undefined' ? domain : undefined,
	  essence: typeof essence !== 'undefined' ? essence : undefined,
	  address: typeof address !== 'undefined' ? address : undefined,
	};
	return toConstruct(expression)
}

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
InstanceExpression
	/ EntityExpression
	/ BehaviorExpression
	/ LocatedEntityExpression
	/ LocatedConceptExpression
	/ LocatedDomainExpression
	/ LocatedEssenceExpression

StrandExpression "StrandExpression"= 
head:(
	Container
		/ Node
		/ ChannelOperator
	)
	(Space {return null;})*
	tail:((Space {return null;})*
			operator:TransformationOperator
			(Space {return null;})*
			item:(
			Expression
				/ Container
				/ Node
			) {return toConstruct({kind:"prefixed_strand_expression",operator:operator,item:item});})+
{
	return toConstruct({
	                     kind: 'strand_expression',
	                     head: head,
	                     tail,
	                   })
}

CommonExpression "CommonExpression"= 
head:Node
	(Space {return null;})*
	tail:(operator:CommonDelimitingOperator
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

AggregationExpression "AggregationExpression"= 
head:(
	Container
		/ Node
	)
	(Space {return null;})*
	tail:((Space {return null;})*
			operator:AggregationOperator
			(Space {return null;})*
			item:(
			Expression
				/ Node
			) {return toConstruct({kind:"prefixed_aggregation_expression",operator:operator,item:item});})+
{
	return toConstruct({
	                     kind: 'aggregation_expression',
	                     head: head,
	                     tail,
	                   })
}

ReductionExpression "ReductionExpression"= 
head:(
	Container
		/ Node
	)
	(Space {return null;})*
	tail:((Space {return null;})*
			operator:ReductionOperator
			(Space {return null;})*
			item:(
			Expression
				/ Node
			) {return toConstruct({kind:"prefixed_reduction_expression",operator:operator,item:item});})+
{
	return toConstruct({
	                     kind: 'reduction_expression',
	                     head: head,
	                     tail,
	                   })
}

InfixExpression "InfixExpression"= 
StrandExpression
	/ CommonExpression
	/ PhraseExpression
	/ AggregationExpression
	/ ReductionExpression

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
	(
		(Space {return null;})
			/ [\n]
		)*
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