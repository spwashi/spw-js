# Spw
*swwoooopp*

## Overview

**Spw** (pronounced "swoop") is a programming language designed to map, model, and compare complex ideas across multidimensional contexts. It integrates the precision of programming with the adaptability of linguistic structures, making it a unique tool for abstract representation and real-world application.

### Purpose
Spw was initially envisioned as a tool to bridge communication between individuals with differing perspectives. Over time, it matured into a structured programming language that empowers developers to represent complex systems and relationships efficiently.

This project is a platform for exploring innovative constructs in computational and theoretical models. The runtime implementation is left open for developers who wish to create their interpretations and extensions. As the creator, my goal is to build a robust framework that simplifies navigation through constructs and to establish a set of "canonical" guidelines that optimize the language's usability.

### Background
Spw originated as a merger between two projects:
1. A content tagging system aimed at creating cross-referential and adaptive educational resources.
2. A philosophical project exploring analogies and their role in meaning-making and contextual understanding.

Spw started during my time as a junior software engineer, focusing on the development of tools that foster deeper educational engagement. Today, Spw stands as a versatile language that not only tags and categorizes content but also serves as a powerful modeling tool for representing diverse systems.

## Design Principles

### Core Philosophy
In Spw, each "program" is conceptualized as a **noun** representing an entity. The outcome of processing that entity depends on the runtime context, which is adaptable and interpretable by those creating or extending Spw environments.

### Key Constructs
The essence of Spw lies in its **Five Top-Level Dimensional Constructs**, classified into two main categories:

**Identity**:
- **Basis**: The conceptual foundation or namespace.
- **Identity**: The unique identifier or name.

**Being**:
- **Conditions**: The situational parameters or arguments.
- **Definition**: The logical core or domain.
- **Meaning**: The evaluated essence or result.

### Core Components
- **Entities**: Consistent representations of identities.
- **Behaviors**: States or processes that describe entity interactions.
- **Instances**: Specific representations associating an entity with a behavior.

**Concepts** create the contextual framework within which other identities are interpreted. **Identifiers** provide a consistent reference, functioning as stable memory addresses. **Locations** map positions based on combined identities. **Domains** embody the defining truths of an entity, while **Essences** reveal the entity's evaluated value.

### Objective
The primary objective of an Spw program is to produce a runtime environment that models these five constructs in detail. A **System** in Spw represents a cohesive entity that encompasses all identities defined within the program.

## Grammar and Syntax Overview

### Construct Categories
Spw grammar is categorized into:
- **Scalars and Near-Scalars**
- **Containers**
- **Operators**
- **Expressions**

### Scalars
**Scalars** are indivisible units within Spw that, when interpreted, influence the **Semantic Context** based on the current **Semantic Operation**.

**Types of Scalars**:
- **Identifier Nodes**: Represent unique references to identities.
- **Number Nodes**: Refer to numerical values, impacting interpretation based on context.
- **Embedment Nodes**: Refer to external data not fully representable in the runtime.

**Examples**:
- **Identifier Node**:
    ```spw
    cat
    ```

- **Number Node**:
    ```spw
    42
    ```

- **Embedment Node**:
    ```spw
    `0xEAB6DD`
    ```

### Near Scalars
**Near Scalars** behave similarly to scalars but are composed of smaller parts, treated as a single entity for operational simplicity.

**Types of Near Scalars**:
- **Phrase Nodes**:
    ```spw
    once in a blue moon
    ```

- **String Nodes**:
    ```spw
    "The quick brown fox jumps over the lazy dog"
    ```

### Containers
**Container Nodes** are used to cluster identities, highlighting how these identities interact within a system.

**Types of Containers**:
- **Concept Containers**: Modify the interpretation framework.
    ```spw
    <biology> dna: genetic_code;
    ```

- **Location Containers**: Represent positions or contexts.
    ```spw
    <science> {
        cell(): alive;
    }
    ```

- **Domain Containers**: Define core attributes of entities.
    ```spw
    genome{ replication }: active;
    ```

- **Essence Containers**: Contain evaluated values.
    ```spw
    cell{ energy }: dynamic;
    ```

### Operators
Operators in Spw are categorized into **Pragmatic** and **Semantic** types.

**Pragmatic Operators**:
- **+ (Aggregation Operator)**: Combines identities.
- **@ (Perspective Operator)**: Modifies context.
- **< (Divergence Operator)**: Introduces new concepts.
- **~ (Invocation Operator)**: Brings new identities into the current frame.

**Semantic Operators**:
- **Block Delimiting Operator**: Creates a new evaluation context.
- **Node Delimiting Operator**: Maintains evaluation consistency within nodes.

### Expressions
**Expressions** are constructs whose elements must be reduced before they can be fully evaluated.

**Evaluation Rules**:
- Expressions become active upon evaluation and are processed in a stack structure.
- When an expression completes, it is deactivated, and the prior active expression is reactivated.

## Advanced Examples and Use Cases

**Referencing Multiple Concepts**:
```spw
cat, dog, horse
```

**Contextual Basis Demonstration**:
```spw
<languages> python: programming_language;
<animals> python: snake;
```

**Container with Multiple Conditions**:
```spw
<science> {
    reaction( catalyst ): faster;
    reaction( inhibitor ): slower;
}
```

## Contributing to Spw

Contributions to Spw are encouraged, whether through runtime development, language extension, or new constructs. To contribute:

1. Fork the repository and create a branch.
2. Make your enhancements or changes.
3. Submit a pull request with a detailed description.

### Future Vision
As GitHub evolves into a collaborative platform where READMEs serve as project seeds, Spw’s README aims to be a foundational document that guides contributors and inspires exploration into modeling complex systems.

### Community and Support
Join our discussions and stay updated with developments:
- **Community Forum**: [Spw Discussions](#)
- **Documentation and Wiki**: [Spw Wiki](#)

## License
Spw is released under the MIT License. See [LICENSE](LICENSE) for more details.
