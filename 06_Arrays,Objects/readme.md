Objects & Arrays — Full Theory Notes
Why objects & arrays matter

JavaScript programs use objects and arrays as the primary data structures.

In MERN, data travels as JSON (which maps directly to objects & arrays). MongoDB documents are objects; responses from APIs are objects/arrays.

Understanding these thoroughly is essential for state management (React), server logic (Node/Express), and database modeling (MongoDB).

PART A — Objects (deep theory)
1. What is an object?

An object is an unordered collection of key → value pairs (properties).

Keys (property names) are strings (or Symbols); values can be any JavaScript value — primitives, arrays, functions, other objects.

Objects model real-world things: user profiles, products, requests, configs.

2. Creating objects (ways)

Object literal: { name: "Ali", age: 20 } — most common.

Constructor function: function Person(){ this.name = ... } then new Person().

ES6 class: class Person { constructor(...) {...} } — syntactic sugar over prototypes.

Object.create(proto): creates object with a specific prototype.

Object.assign / spread to build objects from other objects.

3. Property types

Data properties: value, and attributes writable, enumerable, configurable.

Accessor properties (getters/setters): computed on access or assignment.

Methods: functions assigned to properties (object behavior).

4. Accessing properties

Dot notation: obj.name — concise; use when key is a valid identifier.

Bracket notation: obj["first-name"] or obj[keyVariable] — required when:

key contains spaces or special chars,

key is numeric or starts with a digit,

key is dynamic (stored in a variable).

Bracket notation allows computed property access and computed property names in literals: { [dynamicKey]: value }.

5. Adding / updating / deleting properties

Add/update: obj.newProp = value; or obj["new-prop"] = value;

Delete: delete obj.prop;

Setting a property to undefined is not the same as deleting — delete removes the key from the object.

Object.assign(obj, {a:1}) merges properties (mutates target).

Spread: { ...obj, newProp: 5 } creates a shallow copy + new property (immutable pattern).

6. Enumerating properties

for...in iterates enumerable properties (including inherited). Use obj.hasOwnProperty(key) to filter own properties.

Object.keys(obj) → array of own enumerable property names.

Object.values(obj) → array of values.

Object.entries(obj) → array of [key, value] pairs.

Object.getOwnPropertyNames(obj) / Object.getOwnPropertySymbols(obj) for more.

7. Methods & this

Method = function stored as object property. When called as obj.method(), this inside refers to obj (the receiver).

Arrow functions do not have their own this — they inherit lexical this from surrounding scope. So arrow functions are usually not used as object methods if you need this to refer to the object.

call, apply, bind: explicit control of this:

func.call(thisArg, arg1, arg2) — call immediately with thisArg.

func.apply(thisArg, [args]) — call immediately with args array.

const bound = func.bind(thisArg) — returns new function permanently bound.

Beware of losing this when passing methods as callbacks (use .bind() or arrow wrappers).

8. Property descriptors & control

Object.defineProperty(obj, "name", { value: "Ali", writable: false, enumerable: true, configurable: false })

writable: can change value; enumerable: shows up in loops; configurable: can be deleted/changed.

get / set let you define computed properties.

9. Immutability helpers

Object.freeze(obj) — shallow freeze: prevents adding/removing/modifying properties on that object (not deep).

Object.seal(obj) — prevent adding or deleting keys, but allow value updates.

Object.preventExtensions(obj) — prevent adding new props.

10. Prototypes & inheritance

Objects have an internal [[Prototype]] chain (accessible via Object.getPrototypeOf(obj) or obj.__proto__).

Methods and properties on prototype are shared by instances.

class syntax is sugar over prototype-based inheritance.

Use prototypes for shared behavior to save memory.

11. Copying objects: shallow vs deep

Shallow copy: Object.assign({}, obj) or { ...obj } — top-level properties copied; nested objects still share references.

Deep copy: JSON.parse(JSON.stringify(obj)) — works for plain data (no functions, undefined, Symbol, Date becomes string). Modern environment: structuredClone(obj) can deep clone many types.

For complex objects, implement custom deep clone or use libraries (lodash cloneDeep).

12. Useful object APIs

Object.keys, Object.values, Object.entries, Object.assign, Object.fromEntries, Object.freeze, Object.seal, Object.defineProperty, Object.getOwnPropertyDescriptors.

13. Common pitfalls & best practices

Avoid mutating objects directly in React state — prefer immutability via spread or concat.

Prefer dot notation unless you need dynamic keys.

Avoid storing functions in JSON (functions are not serializable).

When iterating, prefer Object.entries + for...of for clarity.

Keep object shapes consistent (same keys) — easier to work with in DB and UI.

PART B — Arrays (deep theory)
1. What is an array?

An ordered list-like object. Indices start at 0. Arrays are objects with length and indexed elements.

Used for lists, collections, ordered data; commonly used for DB result sets, lists of items, etc.

2. Creating arrays

Literal: [], [1,2,3].

new Array(n) — be careful: new Array(3) creates an empty array with length 3 (holes).

Array.of(1,2,3) creates array from args (safer than new Array).

Array.from(iterableOrArrayLike) builds array from iterable (string, NodeList) or maps in one step.

3. Accessing & length

arr[0], arr.length.

arr.length = n can truncate or expand array (new elements are undefined).

4. Mutating vs Non-mutating methods

Mutating (change original): push, pop, shift, unshift, splice, sort, reverse, direct index assignment.

Non-mutating (return new array): slice, concat, map, filter, reduce (returns value), flat, flatMap.

Prefer non-mutating for functional programming and React state.

5. Important array methods (with purpose)

push(...items), pop(), shift(), unshift(...items) — stack/queue ops.

splice(start, deleteCount, ...items) — insert/remove at arbitrary position (mutates).

slice(start, end) — shallow copy portion (non-mutating).

concat(...arraysOrValues) — combine, returns new array.

map(fn) — transform each element → new array.

filter(fn) — keep elements that pass predicate → new array.

reduce(fn, initial) — accumulate to a single value (sum, groupBy).

forEach(fn) — iterate (no return).

find(fn), findIndex(fn) — locate first match.

some(fn), every(fn) — boolean checks.

includes(value), indexOf, lastIndexOf.

sort([compareFn]) — in-place sorting (mutating); use compare function for numbers.

flat(depth) and flatMap(fn) — flatten nested arrays.

6. Iteration patterns

for (let i = 0; i < arr.length; i++) — index-based.

for (const x of arr) — reads values.

arr.forEach(item => ...) — functional iteration.

Avoid for...in on arrays (iterates property keys, including prototype properties).

7. Destructuring & rest/spread

Array destructuring: const [first, second, ...rest] = arr.

Spread: const copy = [...arr], const merged = [...a, ...b].

Rest in parameters: function sum(...numbers) {}.

8. Arrays of objects

Common in apps — each element is an object (e.g., list of users).

Transform and query with map, filter, find, reduce.

Cloning arrays of objects requires deep clone if you intend to change nested properties.

9. Sparse arrays & holes

Arrays can have empty slots: [ , , ] — many array methods skip holes; be careful.

10. Performance & best practices

Frequent shift() is costly (reindexing). Use pointers or pop()/push() for performance-critical queues.

Use map/filter chain instead of nested loops when readable and not performance-critical.

Use key prop in React when rendering arrays; ensure stable unique ids.

11. Converting between objects & arrays

Object.keys(obj), Object.values(obj), Object.entries(obj) lets you treat objects like arrays.

Object.fromEntries(arrayOfPairs) builds object from [key, value] pairs.

12. JSON & Arrays

JSON arrays ⇄ JS arrays via JSON.parse / JSON.stringify.

Arrays in DB documents map directly to JSON arrays.

Quick Comparison: Objects vs Arrays

Use arrays when order matters or you have a list of items.

Use objects for keyed lookup, representing entities with named properties.

Often used together: array of objects (e.g., list of users).