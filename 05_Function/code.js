//Project 1: Simple Calculator (Functions Basics)
//Covers → Function Declaration, Parameters, Return Values

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return b !== 0 ? a / b : "Cannot divide by zero";
}

console.log("Add: " + add(5, 3));
console.log("Subtract: " + subtract(5, 3));
console.log("Multiply: " + multiply(5, 3));
console.log("Divide: " + divide(5, 0));



//✅ Project 2: Shopping Cart (Default & Rest Parameters)
//Covers → Default Parameters, Rest Parameters, Arrow Functions

const addToCart = (username = "Guest", ...items) => {
  console.log(`${username} added these items: ${items.join(", ")}`);
};

addToCart("Ali", "Shoes", "Watch", "Shirt");
addToCart(); 


//✅ Project 3: Student Grading System
//Covers → Function Expressions, Return Values, Higher-Order Functions

const calculateAverage = function(marks) {
  let total = marks.reduce((a, b) => a + b, 0);
  return total / marks.length;
};

function assignGrade(avg) {
  if (avg >= 90) return "A+";
  if (avg >= 75) return "A";
  if (avg >= 50) return "B";
  return "Fail";
}

// Higher-order function
function evaluateStudent(marks, gradingFunction) {
  let avg = calculateAverage(marks);
  return gradingFunction(avg);
}

let studentMarks = [85, 90, 78];
console.log("Grade: " + evaluateStudent(studentMarks, assignGrade));


//✅ Project 4: To-Do List Manager
//Covers → Arrow Functions, Callbacks, Higher-Order Functions

let tasks = [];

function addTask(task, callback) {
  tasks.push(task);
  callback(`Task "${task}" added!`);
}

function removeTask(task, callback) {
  tasks = tasks.filter(t => t !== task);
  callback(`Task "${task}" removed!`);
}

addTask("Study JavaScript", message => console.log(message));
addTask("Practice Functions", message => console.log(message));

removeTask("Study JavaScript", message => console.log(message));

console.log("Remaining tasks:", tasks);


