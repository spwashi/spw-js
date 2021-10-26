# Spw


## About

Spw (pronounced "swoop") is a programming language. It can be used to compare ideas across dimensions

### More info
I originally meant for the language to make it easier to synchronize meaning between two people with different perspectives. I still think it can be very powerful towards that, but for very different reasons. 

Ultimately, communication is more about style than language.

So now Spw is more of a programming language, and for now my plan is to leave the runtime as an exercise for whomever is interested. 

I'll be working on making the constructs easy to navigate, and I'll come up with a few "canonical" rules to make the problem space a bit smaller.


## High Level Overview

The constructs fall into four main categories:
- Scalars
- Containers
- Operators
- Expressions

### Containers

Containers are constructs that have three parts:
- An opening Delimiter
- A body (usually a Block Node)
- A closing Delimiter

### Scalars

A scalar is a construct that is not composed of smaller parts.

There are currently three Scalars:
- Anchor Nodes
- Number Nodes
- Embedment Nodes

### Near Scalars

A near scalar is a construct that I just realized is (or will be) composed of smaller parts.

There are currently two near-scalars:
- Phrase Nodes
- String Nodes

### Operators

Operators fall into two main categories:
- Pragmatic Operators
- Semantic Operators

#### Pragmatic Operators

Pragmatic Operators mutate the identity of the Subject Under Evaluation (SUE).

##### Rules
- The Subject Under Evaluation is the Active Expression, or a Node Under Reduction.
- The Subject Under Evaluation is evaluated after Reducing each Semantic Operator in a Node or Expression.

#### Semantic Operators

Semantic Operators alter the Context of Evaluation (COE).

The Context of Evaluation is a collection of identities available in processing the current Subject Under Evaluation.

The semantic operators are:
- the Block Delimiting Operator
- the Common Delimiting Operator
- the Node Delimiting Operator

###### Rules
- Block Delimiting Operators create a new Context of Evaluation that extends from its nearest parent.
- The Context of Evaluation is preserved amongst items in the same Common Operation or the same Node.



### Expressions

Expressions are constructs whose constituent Nodes must be Reduced before Evaluation.

##### Rules
- When an Expression is Evaluated, it becomes the Active Expression.
- When the Evaluation of an Expression is complete, it is no longer the Active Expression.
- Active Expressions are represented as a stack.
- Deactivation of an Active Expression results in the Reactivation of the previous Active Expression.