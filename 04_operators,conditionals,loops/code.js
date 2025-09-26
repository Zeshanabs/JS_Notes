let num1 = 10;
let num2 = 5;

console.log("Addition: " + (num1 + num2));
console.log("Subtraction: " + (num1 - num2));
console.log("Multiplication: " + (num1 * num2));
console.log("Division: " + (num1 / num2));
console.log("Modulus: " + (num1 % num2));
console.log("Exponentiation: " + (num1 ** num2));



let pin = 1234;
let enteredPin = 1234; // imagine user entered this
let balance = 1000;

if (enteredPin === pin) {
  console.log("Welcome to ATM");
  let choice = "withdraw"; // user choice (withdraw / deposit / balance)

  if (choice === "balance") {
    console.log("Your balance is: " + balance);
  } else if (choice === "withdraw") {
    let amount = 200;
    if (amount <= balance) {
      balance -= amount;
      console.log("Withdrawal successful. New balance: " + balance);
    } else {
      console.log("Insufficient funds.");
    }
  } else if (choice === "deposit") {
    let deposit = 500;
    balance += deposit;
    console.log("Deposit successful. New balance: " + balance);
  } else {
    console.log("Invalid choice");
  }

} else {
  console.log("Invalid PIN");
}




let secretNumber = Math.floor(Math.random() * 10) + 1;
let guess;
let attempts = 0;

do {
  guess = Math.floor(Math.random() * 10) + 1; // simulating user input
  attempts++;
  console.log("User guessed: " + guess);
} while (guess !== secretNumber);

console.log("Correct! The number was " + secretNumber);
console.log("Attempts taken: " + attempts);
