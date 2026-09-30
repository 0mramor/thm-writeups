import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });

try {
    const text = await rl.question("How old are you? ");
    let age = parseInt(text, 10);

    if (age >= 18) {
        console.log("Come in");
    } else {
        console.log("no");
    }
} finally {
    rl.close();
}