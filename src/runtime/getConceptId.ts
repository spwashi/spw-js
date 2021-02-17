function toDomain(curr: string) {
    return `{_${curr.indexOf(' ') > -1 ? `<${curr}>` : curr}}`;
}

export function getConceptId(domain: string, ...label: string[]) {
    return (
        label.reduce((prev, curr, i, arr) => {
                         if (i && (i === arr.length - 1)) return `${prev}#${curr}`;

                         const currentDomain = toDomain(curr);
                         return `${prev ? prev + '#' : ''}${currentDomain}`
                     },
                     toDomain(domain))
    );
}