# Spw
swwoooopp

## About

Spw (pronounced "swoop") is a programming language. It can be used to compare ideas across dimensions

### Intent
I first meant for the language to aid communication between two people with inherently different perspectives. 

Ultimately, communication is more about style than language.

Now Spw errs more towards programming than it does towards natural language, and my tentative plan is to leave the ultimate runtime as an exercise for those *interested fellows* out there. 

I'll work on making the constructs easier to navigate, then try to come up with a few sensible "canonical" rules/guidelines to make the problem space a bit smaller.

#### Background
Spw is the merger of two projects: 1) a content tagging system, and 2) a philosophy project centered around analogies.

When I started dabbling with it, I was a student in Learning and Education Studies founding an organization focused on discovering meaning in academia. In it, we explored how different people with disparate career goals could find meaning in the same content, despite having varied goals.

I wanted to tag learning materials agnostically enough to be searchable across skill- or awareness- level, while remaining specific enough to meaningfully distinguish each feature tagged.


## Design

### In Brief
Each "program" written in Spw is a noun. Depending on the runtime, certain things may happen when that noun is processed or realized.

The implementation of the runtime is left as an exercise for whomever is creating or using the runtime ;)
### In More Detail

The premise follows - 

We write Programs to describe `Concepts`. The goal of a `Program` is to communicate the relevant identities and relationships of a `System`.

Each concept (symbol, entity, or anything) is a combination of five experiential forms. In these docs, they're referred to as the `Five Top-Level Dimensional Constructs`

Those five forms can be placed in two categories:
- Identity
  - basis (Concept, or namespace)
  - identity (Identifier, or name)
- Being
  - conditions (Location, or arguments)
  - definition (Domain, or body)
  - meaning (Essence, or value)
  
For definition's sake, an `Entity` is a symbol that consistently references the "same" identity. `Entities` can have `Behaviors`, which are data structures that point to different states of `Being`. An `Instance` is a data structure that associates an `Entity` with a `Behavior`. 

A `Concept` (e.g. basis, namespace, also anything) is hard to describe. `Concepts` introduce identities which might contextualize the interpretation of other `Entities` in the `System`. 

An `Identifier` (e.g. identity) is like a name. It's how a concept is consistently referenced, regardless of any other dimension, location, structure, or status. An Identifier is like an address in memory (or other positional structure). Identifiers are axiomatic with respect to their conceptual basis.

`Locations` (e.g. function arguments) are like defining features that make something stand out, sometimes composed of multiple things. A Location is like an address in memory that exist as the result of combining multiple other identities. 

`Domains` (e.g. block statements) are like the core "truth" of an Entity that uniquely distinguishes instances. A Domain may contain Nodes and Expressions to evaluate, either in Common or as a Block (i.e. in parallel **, or synchronously). Domains represent features that exist regardless of a Node's Context.

`Essences` (e.g. property value) contain Nodes and Expressions to evaluate, either in Common or as a Block. Essences only occur as the result of evaluation.

### Objective

The goal of each `Program` is to create a runtime that represents each of these five top-level dimensions for a single `System`, in as much detail as necessary. 

A `System` is an `Entity` that contains all identities mentioned in a program.  

## Grammar Overview

The constructs fall into four main categories:
- `Scalars` (and `Near-Scalars`)
- `Containers`
- `Operators`
- `Expressions`

### Scalars

A `Scalar` is a construct that is not composed of smaller parts.

When a `Scalar` is interpreted, it either invokes or mutates a `Semantic Context` depending on the `Active` `Semantic Operation`. `Scalars` determine the identity of the subject, which is discerned by evaluating the `Active` `Semantic Context`.

There are currently three Scalars:
- `Identifier Nodes`
- `Number Nodes`
- `Embedment Nodes`

#### Identifier Nodes
An `Identifier Node` is a pointer to a identity. It's existence in a `System` is axiomatic with respect to the `Conceptual Basis` of the current `Context of Evaluation`. In other words, its use "proves" its existence according to the nearest `Concept`.

An `Identifier Node` is composed of an Alpha character followed by any number of characters from a set of permitted unicode characters.

Examples:


##### one concept 
To refer to a concept, for example describing a cat:
```spw
cat
```


##### multiple concepts
To refer to a concept, for example describing a cat:
```spw
cat, dog, horse
```

This should create three addresses in the Runtime's memory whose values are a pointers to three respective data structures containing all `Behaviors` associated with each `Identifier`. 

An `Identifier` references an `Entity`, which is a data structure holding references to an `Identifier` and `Conceptual Basis`. In this example, the `Conceptual Basis` is assumed to be the `Generalized Concept`, usually represented as `<>`. 

##### other examples
```spw
cat1, cat-2, cat_in_hat
```

#### Number Nodes
A `Number Node` is a pointer to a number. Numbers invoke an `Interpretation Context` that may overload some operators, such as the `Aggregation` or `Reduction` operators. For the time being, only positive integers are representable. The `Max Number` depends on the runtime.

Example:

To refer to a number, for example four:
```spw
4
```

This should create an address in the Runtime's memory whose value is a pointer to an address with this Number's `value`.

#### Embedment Nodes
An `Embedment Node` is a reference to an `Entity` that is not fully representable in the Runtime's `Environment`. The interpretation of an `Embedment Node` depends on the `Interpretation Context`, which in turn depends on the `Active Evaluator` and the `Active Evaluation Scheme`. 

### Near Scalars

A `Near Scalar` is a construct that ... I only recently realized is (or will be) composed of smaller parts. So they aren't quite scalars, but in my opinion, they can safely be treated as such.

This needs more thought.

There are currently two near-scalars:
- `Phrase Nodes`
- `String Nodes`

#### Phrase Nodes

A `Phrase Node` is a collection of Nodes whose individual `Semantic Implications` are processed in parallel and may depend on each other. The `Semantic Implications` of each `Scalar` present in the `Phrase Node`are not assumed to have any direct relationship to

Examples:
```spw
spick and span
```
```spw
once in a while
```

#### String Nodes

A `String Node` is a collection of characters that create a string, which can then be used the same ways the other `Scalars` are.

Examples:
```spw
"Hawai'i and Moloka'i"
```

```spw
"stop!"
```

### Containers

The point of a container node is to cluster identities such that their interactions give better insight as to how the System works.

Container Nodes are constructs that have three parts:
- A `Scheme` (context)
- A `Body` (composition)`
- An `Identity` (realization)

A `Container Scheme` determines how the identities in the `Body` are presented. `Container Schemes` determine `Salience` of entries in a `Container Body`, as well as which `Identifiers` or `Channels` can be bound to. 

`Container Schemes` introduce `Evaluation Schemes` that determine the meaning of each entry in the `Container Body`.
`Channels` and `Identifiers` that are `Bound` as part of the definition of the `Container Scheme` determine how `Binding` works in the given `Container`.

There are four `Container Nodes`. They represent four of the `Five Top-level Dimensional Constructs`, only excluding `Identifiers`.

#### Concept Containers
`Concept Containers` determine the identities that can be referenced, and mutate the `Active` `Context of Evaluation` and replace the `Active` `Context of Interpretation`. 
#### Location Containers
`Location Containers` describe the position of an `Entity`. Each `Location Container` can reference identities present in the Active `Context of Interpretation`. The `Identity` of each `Location Container` is dependent on the `Context of Evaluation`. 
#### Domain Containers
`Domain Containers` describe the definition of an `Entity`. The definition of an `Entity`, as it relates to the `Behavior` containing this `Domain`, is not dependent on the `Context of Evaluation`.
An `Entity` should have the same `Domain` at a given `Location` to be considered part of the same `Instance`. The `Identity` of a `Domain` is dependent on the `Context of Interpretation`.
#### Essence Containers
`Essence Containers` describe the value of an `Entity`. The value of an `Entity`, as it relates to the `Behavior` containing this `Essence`, depends on the `Context of Evaluation`. The `Identity` of an `Essence` is dependent on the `Context of Interpretation`.  



### Operators

Operators fall into two main categories:
- `Pragmatic Operators`
- `Semantic Operators`

#### Pragmatic Operators

`Pragmatic Operators` mutate the identity of the `Subject Under Evaluation` (`SUE`). Most `Pragmatic Operators` can create `Prefixed`, `Infixed`, or `Postfixed` `Operations`. Depending on the `Context of Evaluation`, an `Operator` may be processed as a `Node`.

List:
 - `+` : Aggregation Operator
 - `:` : Binding Operator
 - `#` : Channel Operator
 - `>` : Convergence Operator
 - `<` : Divergence Operator
 - `?` : Evaluation Operator
 - `!` : Performance Operator
 - `@` : Perspective Operator
 - `&` : Reference Operator
 - `-` : Reduction Operator

#### Semantic Operators

`Semantic Operators` create `Semantic Operations` by being `Bound` to a set of `Operands`.
`Semantic Operators` alter the `Context of Evaluation` (`COE`).

The `Context of Evaluation` is a collection of identities available in processing the current `Subject Under Evaluation`.

The `Semantic Operators` are:
- the `Block Delimiting Operator`
- the `Common Delimiting Operator`
- the `Node Delimiting Operator`

##### Rules
- Each `Block Delimiting Operator` creates a new `Context of Evaluation` that extends from its nearest parent. That `Context of Evaluation` replaces the previous one at the top of a stack.
- The `Context of Evaluation` is preserved amongst items in the same `Common Operation` or the same `Node`.

### Expressions

`Expressions` are constructs whose constituent `Nodes` must be `Reduced` before `Evaluation`.

##### Rules
- When an `Expression` is `Evaluated`, it becomes the `Active Expression`.
- When the `Evaluation` of an `Expression` is complete, it is no longer the `Active Expression`.
- `Active Expressions` are represented as a stack.
- `Deactivation` of an `Active Expression` results in the `Reactivation` of the previous `Active Expression`.