# Constructs

## Nodes

`Nodes` are `Constructs` that, unlike `Operators`, can only `Objectively Modify` `Local` identities within a `Context`. Identities are `Local` when they occur within the same `Node`. `Locality` is `Subjectively Determined` by the `Node Delimiter`.  

### Scalars

`Scalar Nodes` are `Nodes` that do not have constituent parts.

When a `Scalar` is first `Evaluated`, an `Entity` is invoked. An `Entity` maintains a reference to the perceived identity of a `Scalar`, as well as its `Conceptual Basis`.

 - `anchor` [`Anchor Nodes`]("/constructs/nodes/scalars/anchors")
 - `123456` [`Number Nodes`]("/constructs/nodes/scalars/number")
 - ``` `#f00` ```  [`Embedment Nodes`]("/constructs/nodes/scalars/embedment")

### Near Scalars

`Near Scalars` are `Nodes` that are used like `Scalars`, but are composed of smaller parts.

 - `spick and span` [`Phrase Nodes`]("/constructs/nodes/near-scalars/phrases")
 - `"Near Hawai'i"` [`String Nodes`]("/constructs/nodes/near-scalars/string")

### Containers
- `<>` [`Concept Container`]("/constructs/nodes/containers/concept")
- `()` [`Location Container`]("/constructs/nodes/containers/location")
- `{}` [`Domain Container`]("/constructs/nodes/containers/domain")
- `[]` [`Essence Container`]("/constructs/nodes/containers/essence")


## Operators

`Operators` `Objectively Modify` `Subjectively Referenced` identities within a `Context`, particularly those of their `Operands`.

### Semantic Operators

Semantic Operators mutate the `Semantic Context`, which determines how the `Subject Under Evaluation` behaves in `Expressions`.

- `;` [`Block Delimiter`]("/constructs/operators/semantic/block")
- `,` [`Common Delimiter`]("/constructs/operators/semantic/common")
- ` ` [`Node Delimiter`]("/constructs/operators/semantic/node")


### Pragmatic Operators

`Pragmatic Operators` mutate the perceived identity or composition of the `Subject Under Evaluation`.

 - `+  ` [`Aggregation Operator`]("/constructs/operators/pragmatic/aggregation")
 - `^  ` [`Ascent Operator`]("/constructs/operators/pragmatic/ascent")
 - `:  ` [`Binding Operator`]("/constructs/operators/pragmatic/binding")
 - `|  ` [`Branch Operator`]("/constructs/operators/pragmatic/branch")
 - `#  ` [`Channel Operators`]("/constructs/operators/pragmatic/channel")
 - `>  ` [`Convergence Operator`]("/constructs/operators/pragmatic/convergence")
 - `.  ` [`Descent Operator`]("/constructs/operators/pragmatic/descent")
 - `<  ` [`Divergence Operator`]("/constructs/operators/pragmatic/divergence")
 - `?  ` [`Evaluation Operators`]("/constructs/operators/pragmatic/evaluation")
 - `~  ` [`Invocation Operators`]("/constructs/operators/pragmatic/invocation")
 - `!  ` [`Performance Operators`]("/constructs/operators/pragmatic/performance")
 - `@  ` [`Perspective Operators`]("/constructs/operators/pragmatic/perspective")
 - `.. ` [`Range Operator`]("/constructs/operators/pragmatic/range")
 - `-  ` [`Reduction Operator`]("/constructs/operators/pragmatic/reduction")
 - `&  ` [`Reference Operator`]("/constructs/operators/pragmatic/reference")
 - `=  ` [`Relation Operator`]("/constructs/operators/pragmatic/relation")
 - `...` [`Spread Operator`]("/constructs/operators/pragmatic/spread")
 - `=> ` [`Transformation Operator`]("/constructs/operators/pragmatic/transformation")
 - `*  ` [`Value Operator`]("/constructs/operators/pragmatic/value")