Data Types in JavaScript

A data type defines the kind of value a variable can hold.
👉 Example: 5 is a number, "Ali" is a string, true is a boolean.

JavaScript has two categories of data types:

Primitive Types (simple, stored directly in memory)

Non-Primitive Types (complex, stored by reference)

🔸 1. Primitive Data Types

These are immutable (cannot be changed once created) and stored by value.

1. String

Represents text, written inside quotes (" ", ' ', or ` `).

Can contain characters, words, or sentences.

let name = "Ali";         // Double quotes
let city = 'Islamabad';   // Single quotes
let sentence = `Hi ${name}`; // Template literal (can embed variables)


👉 Notes:

typeof "Ali" → "string"

2. Number

Represents numbers (integers, decimals, positive, negative).

JavaScript has only one number type (no separate int or float).

let age = 21;       // Integer
let price = 99.99;  // Decimal
let temp = -5;      // Negative


👉 Special values:

console.log(10 / 0);     // Infinity
console.log(-10 / 0);    // -Infinity
console.log("abc" * 2);  // NaN (Not a Number)

3. Boolean

Represents true or false (logic values).

let isStudent = true;
let isMarried = false;


👉 Mostly used in conditions:

if (isStudent) {
  console.log("He is a student");
}

4. Undefined

A variable declared but not assigned any value automatically gets undefined.

let x;
console.log(x); // undefined


👉 typeof undefined → "undefined"

5. Null

Represents intentional empty value (nothing).

let y = null;
console.log(y); // null


👉 Fun fact:
typeof null → "object" (this is a bug in JavaScript from 1995, still not fixed 😅).

6. Symbol (ES6)

Represents a unique and immutable value.

Used when you want a property/key to be unique.

let id1 = Symbol("id");
let id2 = Symbol("id");
console.log(id1 === id2); // false (always unique)

7. BigInt (ES11 / 2020)

For very large integers beyond the safe range of Number.

Add n at the end.

let bigNum = 123456789012345678901234567890n;
console.log(bigNum); // BigInt


✅ Summary of Primitive Types:

String

Number

Boolean

Undefined

Null

Symbol

BigInt

🔸 2. Non-Primitive (Reference) Data Types

These are objects and stored by reference in memory.

1. Object

A collection of key-value pairs.

Used to store structured data.

let person = {
  name: "Ali",
  age: 21,
  isStudent: true
};
console.log(person.name); // Ali

2. Array

Special kind of object, used to store ordered list of values.

let fruits = ["Apple", "Banana", "Mango"];
console.log(fruits[0]); // Apple


👉 typeof fruits → "object" (arrays are objects internally).

3. Function

Functions are also objects but callable.

function greet() {
  return "Hello!";
}
console.log(greet()); // Hello!


✅ So Non-Primitive Types = Object, Array, Function (and other built-in objects like Date, RegExp, Map, Set, etc.).

🔸 3. typeof Operator

You can check the type of any value using typeof.

console.log(typeof "Ali");     // string
console.log(typeof 42);        // number
console.log(typeof true);      // boolean
console.log(typeof undefined); // undefined
console.log(typeof null);      // object (bug)
console.log(typeof Symbol());  // symbol
console.log(typeof 10n);       // bigint

🔸 4. Dynamic Typing

JavaScript is dynamically typed → variable types are decided at runtime, and can change.

let data = 5;       // number
data = "Hello";     // string
data = true;        // boolean

🔸 5. Type Conversion

JavaScript can convert types automatically (type coercion) or you can do it manually.

Automatic Conversion (Coercion)
console.log("5" + 2); // "52" (string + number = string)
console.log("5" - 2); // 3   (string - number = number)

Manual Conversion
let num = Number("123");   // "123" → 123
let str = String(456);     // 456 → "456"
let bool = Boolean(1);     // 1 → true

🔸 6. Mutable vs Immutable

Primitive types → immutable (cannot change the value itself).

Non-primitive types (objects, arrays, functions) → mutable (can change properties/elements).

let str = "Hello";
str[0] = "J";
console.log(str); // "Hello" (unchanged)

let arr = [1, 2, 3];
arr[0] = 99;
console.log(arr); // [99, 2, 3] (changed)

🎯 Final Big Picture
Primitive (immutable, stored by value)

String

Number

Boolean

Undefined

Null

Symbol

BigInt

Non-Primitive (mutable, stored by reference)

Object

Array

Function
(and others like Date, Map, Set, etc.)

___________________________+++++++++++++++++Type Conversion++++++++++++++++++++_____________________


What is Type Conversion?

Type conversion = changing one data type into another.

There are two ways it happens in JavaScript:

Type Casting (Explicit Conversion) → You manually convert.

Type Coercion (Implicit Conversion) → JavaScript automatically converts.

🔹 2. Explicit Conversion (Manual)

We use built-in functions like Number(), String(), Boolean().

✅ Convert to Number

Use Number(value).

console.log(Number("42"));     // 42
console.log(Number("3.14"));   // 3.14
console.log(Number("Ali"));    // NaN (Not a Number)
console.log(Number(true));     // 1
console.log(Number(false));    // 0
console.log(Number(null));     // 0
console.log(Number(undefined));// NaN


📌 Shortcuts:

parseInt("42px") → 42 (reads until invalid char)

parseFloat("3.14") → 3.14

✅ Convert to String

Use String(value) or .toString().

console.log(String(123));      // "123"
console.log(String(true));     // "true"
console.log(String(null));     // "null"
console.log(String(undefined));// "undefined"

let num = 99;
console.log(num.toString());   // "99"

✅ Convert to Boolean

Use Boolean(value).

console.log(Boolean(1));       // true
console.log(Boolean(0));       // false
console.log(Boolean("Hello")); // true
console.log(Boolean(""));      // false
console.log(Boolean(null));    // false
console.log(Boolean(undefined));// false


👉 Rule: Falsy values = 0, "", null, undefined, NaN, false
Everything else = true.

🔹 3. Implicit Conversion (Type Coercion)

This happens automatically when JavaScript tries to make sense of an operation.

✅ String Coercion

If one operand is a string, + converts the other to a string.

console.log("5" + 2);   // "52"
console.log("Age: " + 21); // "Age: 21"

✅ Number Coercion

When using -, *, /, %, JS converts strings to numbers.

console.log("5" - 2);   // 3
console.log("6" * "2"); // 12
console.log("10" / 2);  // 5
console.log("Ali" * 2); // NaN

✅ Boolean Coercion

In logical contexts (like if, &&, ||), values get converted to true or false.

if ("hello") {
  console.log("This runs"); // because "hello" is truthy
}

if (0) {
  console.log("This won't run"); // 0 is falsy
}

🔹 4. Special Cases (Tricky!)

These are where JavaScript confuses many people.

console.log(1 + "2");    // "12"   (string concatenation)
console.log(1 - "2");    // -1     (number conversion)
console.log("5" + true); // "5true"
console.log("5" - true); // 4
console.log("5" * false);// 0
console.log(null + 1);   // 1   (null → 0)
console.log(undefined + 1); // NaN (undefined → NaN)

🔹 5. Equality and Type Conversion

JavaScript has two equality operators:

✅ Loose Equality (==)

Converts types before comparing.

console.log(5 == "5");      // true
console.log(0 == false);    // true
console.log(null == undefined); // true

✅ Strict Equality (===)

No conversion, compares value + type.

console.log(5 === "5");     // false
console.log(0 === false);   // false


👉 Best practice: Always use === to avoid surprises.

