here i learn the variables and different types of variable


1. What is a Variable?

A variable is like a container (or a box) in your computer’s memory where you store data.

Example: Think of a jar where you put candy. You can open the jar, check the candy, replace it, or even empty it.
In programming, that jar = variable, and candy = value/data.

👉 In JavaScript, variables allow us to store information, use it later, and modify it.

🔹 2. Declaring Variables

JavaScript provides three keywords to declare variables:

var

let

const

✅ var (old way)

Introduced in ES5 (before 2015).

Can be redeclared and updated.

Function-scoped (limited to the function it is declared in).

Problem: It can be used before it’s declared (hoisting issue).

var name = "Ali"; 
console.log(name); // Ali

✅ let (modern way)

Introduced in ES6 (2015).

Can be updated, but not redeclared in the same scope.

Block-scoped (limited to { }).

let age = 20;
age = 21; // ✅ allowed
console.log(age); // 21

// let age = 22; ❌ Error: Cannot redeclare

✅ const (constant)

Also introduced in ES6 (2015).

Value cannot be changed after assigning.

Must be initialized when declared.

const pi = 3.14;
// pi = 3.14159; ❌ Error: Assignment to constant
console.log(pi); // 3.14

🔹 3. Rules for Naming Variables

JavaScript has rules for naming:

Can contain letters, numbers, _ (underscore), and $ (dollar sign).

Must **start with a letter, _, or $ (not a number).

Case-sensitive (age and Age are different).

Cannot use reserved keywords (let, const, class, etc.).

👉 Examples:

let firstName = "Ali";   // ✅
let _score = 100;        // ✅
let $price = 50;         // ✅
let 1apple = "red";      // ❌ Invalid

🔹 4. Variable Scope

Scope = where a variable is accessible.

1. Global Scope

Declared outside any function/block → can be used anywhere.

let city = "Islamabad";
console.log(city); // Islamabad

2. Function Scope (var)

Variables declared with var inside a function are only accessible inside that function.

function test() {
  var x = 10;
  console.log(x); // 10
}
console.log(x); // ❌ Error

3. Block Scope (let, const)

Variables declared inside { } are only accessible inside.

{
  let y = 5;
  const z = 15;
  console.log(y, z); // 5 15
}
console.log(y); // ❌ Error

🔹 5. Hoisting

JavaScript moves variable declarations to the top of the scope during execution.

But only for var.

let and const are hoisted too but remain in the Temporal Dead Zone (TDZ) until initialized.

console.log(a); // undefined (hoisted var)
var a = 10;

console.log(b); // ❌ Error (cannot access before initialization)
let b = 20;

🔹 6. Data Types in Variables

Variables can hold different data types:

Primitive Types (simple values):

String → "Hello"

Number → 42, 3.14

Boolean → true, false

Undefined → declared but not assigned

Null → intentional empty value

Symbol → unique values

BigInt → very large numbers

Non-Primitive (Reference Types):

Object

Array

Function

👉 Example:

let name = "Ali";         // String
let age = 21;             // Number
let isStudent = true;     // Boolean
let car;                  // Undefined
let empty = null;         // Null
let bigNum = 12345678901234567890n; // BigInt

🔹 7. Dynamic Typing

JavaScript is dynamically typed, meaning a variable can hold different types of values at different times.

let data = 5;        // Number
data = "Hello";      // String
data = true;         // Boolean

🔹 8. Best Practices for Variables

Use const by default (for values that don’t change).

Use let when you need to reassign a value.

Avoid var (only for legacy code).

Use meaningful names:

let userAge = 25;   // ✅ Good
let x = 25;         // ❌ Bad


✅ That’s a complete overview of variables in JavaScript!