import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

// ----------------------------
// Guess the Number (Beginner Demo)
// ----------------------------
// The computer picks a secret number.
// The player keeps guessing until they find it.

const MIN_NUMBER = 1;
const MAX_NUMBER = 20;

const rl = readline.createInterface({ input, output });

try {
  const secret =
    Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER; // MIN_NUMBER <= secret <= MAX_NUMBER
  let tries = 0;
  let guess = 0; // start with a value that cannot be the secret (since secret is 1..20)

  console.log("I'm thinking of a number between", MIN_NUMBER, "and", MAX_NUMBER);

  // Repeat until the user guesses the secret number.
  while (guess !== secret) {
    const text = await rl.question("Take a guess: "); // rl.question() returns text (a string)

    // If the user didn't type digits, we avoid crashing and ask again.
    if (!/^\d+$/.test(text)) { // True only if all characters are digits
      console.log("Please type a whole number (like 7).");
    } else {
      guess = parseInt(text, 10); // convert the text to a number
      tries = tries + 1; // add 1 try

      // Give a hint using if / else if / else.
      if (guess < MIN_NUMBER || guess > MAX_NUMBER) {
        console.log("That number is out of range. Try again.");
      } else if (guess < secret) {
        console.log("Too low, try again.");
      } else if (guess > secret) {
        console.log("Too high, try again.");
      } else {
        console.log("You got it in", tries, "tries!");
      }
    }
  }
} finally {
  rl.close();
}
