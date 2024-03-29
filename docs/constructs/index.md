# Constructs

A `Construct` is a `Language Feature` that does not depend on a [`Runtime`](/spw-js/runtime) to exist. 

Constructs are divided into three main categories:
- [`Nodes`](/spw-js/constructs/nodes) (things)
- [`Operators`](/spw-js/constructs/operators) (forces)
- [`Expressions`](/spw-js/constructs/expressions) (circumstances)

## Nodes

`Nodes` are things.

`Nodes` represent `Dimensions` of `Entities`.

`Nodes` are `Constructs` which, unlike `Operators`, can only `Objectively Modify` `Local` identities within a `Context`. Identities are `Local` when they occur within the same `Node`. `Locality` is `Subjectively Determined` by the `Node Delimiter`.  

### Scalars

A `Scalar` is a thing with one diminesion (its identity).

`Scalars` represent themselves. A thing is a thing.

`Scalars` clarify 'what'.

`Scalar Nodes` are `Nodes` that do not have constituent parts.

When a `Scalar` is first `Evaluated`, an `Entity` is invoked. An `Entity` maintains a reference to the perceived identity of a `Scalar`, as well as its `Conceptual Basis`.

 - `anchor` [`Anchor Nodes`](/spw-js/constructs/nodes/scalars/anchors)
 - `123456` [`Number Nodes`](/spw-js/constructs/nodes/scalars/numbers)
 - ``` `#f00` ```  [`Embedment Nodes`](/spw-js/constructs/nodes/scalars/embedments)

### Near Scalars

`Near Scalars` are things that are made of other things, and have one objective dimension (their identity).

`Near Scalars` invoke meaning the same way `Scalars` do.

`Near Scalars` clarify 'what'.

`Near Scalars` are `Nodes` that are used like `Scalars`, but are composed of smaller parts.

 - `spick and span` [`Phrase Nodes`](/spw-js/constructs/nodes/near-scalars/phrases)
 - `"Near Hawai'i"` [`String Nodes`](/spw-js/constructs/nodes/near-scalars/strings)

### Containers

`Containers` are things that are made of other things, and have multiple (including "one) objective dimensions. 

`Containers` are more context-dependent than `Scalars` or `Near Scalars`.

`Containers` clarify 'which', 'how', 'where', and 'why'.

`Container Nodes` are composed of a `Scheme`, `Body`, and `Identity`.

- `{}` [`Domain Container`](/spw-js/constructs/nodes/containers/domain)
- `[]` [`Essence Container`](/spw-js/constructs/nodes/containers/essence)
- `()` [`Location Container`](/spw-js/constructs/nodes/containers/location)
- `<>` [`Concept Container`](/spw-js/constructs/nodes/containers/concept)

## Operators

`Operators` do things to `Nodes`.

`Operators` are `Constructs` that, unlike `Nodes`, exist to `Objectively Modify` identities within a `Context`, particularly those of their `Operands`. 

`Operators` modify meaning.

`Operators` describe ideas that would otherwise be indescribable.

When an `Operation` is in the same `Location` as its `Operands` (minding `Configuration`), it forms an `Operation` that can be `Evaluated` or `Referenced`. The effects of `Evaluating` an `Operation` are `Subjectively Referenced`.

### Semantic Operators

`Semantic Operators` arrange things.

`Semantic Operators` bind `Nodes` to their `positions` in `Expressions`, often around `Pragmatic Operators`.

`Semantic Operators` moderate meaning.

`Semantic Operators` mutate the `Semantic Context`, which determines how the `Subject Under Evaluation` behaves in `Expressions`.

- `;` [`Block Delimiter`](/spw-js/constructs/operators/semantic/block)
- `,` [`Common Delimiter`](/spw-js/constructs/operators/semantic/common)
- ` ` [`Node Delimiter`](/spw-js/constructs/operators/semantic/node)

### Pragmatic Operators

`Pragmatic Operators` mutate things.

`Pragmatic Operators` create `Expressions`.

`Pragmatic Operators` define meaning.

`Pragmatic Operators` mutate the perceived identity or composition of the `Subject Under Evaluation`.

 - `+`   [`Aggregation Operator`](/spw-js/constructs/operators/pragmatic/aggregation) - combines the `Channels` of its operands additively
 - `^`   [`Ascent Operator`](/spw-js/constructs/operators/pragmatic/ascent) - refers to a parent context
 - `:`   [`Binding Operator`](/spw-js/constructs/operators/pragmatic/binding) - creates a link/association between its operands
 - `|`   [`Branch Operator`](/spw-js/constructs/operators/pragmatic/branch) - introduces an exclusive factor between its operands
 - `#`   [`Channel Operators`](/spw-js/constructs/operators/pragmatic/channel) - represent dimension or being
 - `>`   [`Convergence Operator`](/spw-js/constructs/operators/pragmatic/convergence) - describes direction
 - `.`   [`Descent Operator`](/spw-js/constructs/operators/pragmatic/descent) - enters a `Compositional Container` of its operand
 - `<`   [`Divergence Operators`](/spw-js/constructs/operators/pragmatic/divergence) - represent the source location of a set of `Entities` 
 - `?`   [`Evaluation Operators`](/spw-js/constructs/operators/pragmatic/evaluation) - attract similar `Channels` and can cause `Invocation` in the next `Frame`
 - `~`   [`Invocation Operators`](/spw-js/constructs/operators/pragmatic/invocation) - introduce new identities to the `Active` `Frame`
 - `!`   [`Performance Operators`](/spw-js/constructs/operators/pragmatic/performance) - invoke new `Nodes` or `Expressions` that create a new `Frame`
 - `@`   [`Perspective Operators`](/spw-js/constructs/operators/pragmatic/perspective) - introduce a new `Context of Interpretation`, 
 - `..`  [`Range Operator`](/spw-js/constructs/operators/pragmatic/range) - represents the space between two nodes, or the space around a node
 - `-`   [`Reduction Operator`](/spw-js/constructs/operators/pragmatic/reduction) - removes `Channels`, `Dimensions`, or identities from its operands
 - `&`   [`Reference Operators`](/spw-js/constructs/operators/pragmatic/reference) - consistently refer to the "same" `Entity`
 - `...` [`Spread Operator`](/spw-js/constructs/operators/pragmatic/spread) - represents the elements between two `Nodes`, or the elements before/after a `Node`
 - `=>`  [`Transformation Operator`](/spw-js/constructs/operators/pragmatic/transformation) - introduces a change in one or more `Dimensions` of an `Entity`
 - `*`   [`Value Operator`](/spw-js/constructs/operators/pragmatic/value) - represents value