// language=JavaScript
export const head =
                 `
                     const _cache = new Map();

                     function normalize(node) {
                         return {
                             ...Object
                                 .fromEntries(
                                     Object
                                         .entries(node)
                                         .filter(([k, v]) => k === 'key' ? true : v !== undefined)
                                 ),
                             src:      text(),
                             location: location()
                         };
                     }

                     function toSpwItem(node) {
                         if (!node.kind) throw new Error('No node kind specified')
                         var cacheKey = JSON.stringify(location());
                         if (_cache.has(cacheKey)) return _cache.get(cacheKey);

                         const out = normalize(node);
                         _cache.set(cacheKey, out);
                         return out;
                     }
                 `;