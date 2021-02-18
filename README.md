# Spw!

(it's pronounced "swoop")

## What's that?

Spw is a declarative, subject-oriented, informal logic programming language that evolved out of a need to eloquently describe & reference vast amounts of multi-modal data.

### Requirements

1. It should provide concise methods to describe the relationship between one concept and another

   a. The output of execution should be specific and concise relative to the context of interpretation
2. It should be flexible

   a. One concept may be referenced by multiple labels
    1. (e.g. "Sam" as shorthand for "Sam Washington")

   b. Concepts have context-dependent features or behaviors
    1. (e.g. an egg is not runny if it's been boiled)

Turns out, improving what already exists in this space (e.g. [Prolog](https://www.swi-prolog.org/), Graph Databases like [Neo4j](https://neo4j.com/), and [Wikipedia](https://www.wikipedia.org/)) is a doozy of a project. Fun!

### Go on...

Nowadays, this is mostly an exploration of what it'd take to write a programming language (I'm pretty excited to dive more into set and graph theory with it, though).

When it started, I was in college working on growing a student organization I started called Student Body for Meaningful Education (SBME).
The main idea behind SBME was that **it'd be neat to crowdsource education in Uni**, and a lot of people want to contribute but don't have a centralized place to.

As it turns out, the hard part isn't finding people who want to improve education strategies, it's coordinating an effort so broad.

#### Enter Spw.

Originally a content tagging scheme, Spw's syntax evolved to express nuances I felt were necessary to synchronize diverse learning objectives or strategies.


## How Spw works

### Tentative:
The runtime ended up getting a lot more complicated than I thought it would, and I think the "end" is some sort of graph database.

Also, I've been playing around with SWI-Prolog and appreciate its style of querying. Worth looking into.

### Now:
(todo)

## Atoms, Blocks, Strands, and Operators

##### Atoms (similar to variable/primitive)

- Anchors
    - purpose
        - A label representing a concept
    - examples
        - `anchor`
        - `label`
        - `noun`
        - `ball`
        - `Sam`
- Phrases
    - purpose
        - A collection of labels
    - examples
        - `this is a phrase`
        - `phrases are labels composed of multiple anchors`
- Strings
    - definition
        - A collection of labels
            - words have no implicit connection to the semantic context of the string unless explicitly linked
        - Strings are like phrases, but punctuation is permitted. Unlike phrases, words in strings have no implicit connection to the semantic context of the collection they're a part of.
    - examples
        - `"string"`,
        - `"strings have punctuation? Sometimes! Perhaps formatting is what they'll be used for."`
        - `"It's not assumed that each word represents an anchor (unless the {anchor} is interpolated)"`
        -
        ```
        "{interpolated anchors} can be described or linked to a semantic context via {description}".
              [
                  <interpolated anchors> => 
                      words or phrases that depend on the context assumed or presented by the string
        
                  <description> => 
                      the square brackets following the period after the string
              ]
        ```

##### Blocks (similar to object/array/set)

- Essences
  - Description
    - Represent a collection of concepts.
    - If directly attached to an atom, they specify "which version" of that atom we're referencing. 
    - If preceded with a dot (.), they describe an atom.
    - The order of concepts in an essence is assumed to be based on salience relative to the essence's anchor and domain of attachment
    
- Domains
    - purpose
        - Specify context or describe implementation
        - Describe behavior
        - Similar to Essence but order is preserved
    - examples
        - `{_context concept implementation_}`
        - ```
          {_context
              objective => subjective 
          instance_}
          ```
        - ```
          {_paper
              &[
                    circle[yellow]          => sun 
                    rectangle[blue]         => sky           
                    { blob[white] plural_}  => clouds
               ]
              rectangle[green]          => grass 
          <image.[sunny day]>_}
          ```
##### Evaluation (similar to function)

##### Transport (similar to assignment/control flow statement)
