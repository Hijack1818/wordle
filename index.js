import picked from "./words.js";

const wordSize = 5;
let count = 0;
const word = [];
const test = Array.from(picked);
// console.log(test);
const Alltries = 6;
let tries = 0;
let checked = false;
const Fields = document.querySelector(".field");
MakeFields();
const Input = document.querySelectorAll(".wordle-field");
MakeKeyBoard();
const Keys = document.querySelectorAll(".keyboard-col div");
let KeyArr = Array.from(Keys);

// console.log(picked);
document.addEventListener("keypress", (event) => {
  if (count >= 5 && tries < Alltries) {
    checkWord(event.key);
  }
  updateViaKeyBoard(event.code, event.key, tries);
  // console.log(word);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Backspace") updateViaKeyBoard(event.code, event.key);
});

KeyArr.map((val) => {
  val.addEventListener("click", (e) => {
    if (count >= 5 && tries < Alltries - 1) {
      checkWord(e.target.textContent);
    }
    updateViaScreen(e.target.textContent);
  });
});

function updateViaScreen(value) {
  if (count != wordSize && value >= "a" && value <= "z") {
    word.push(value);
    count++;
  }
  if (count >= 1 && count <= wordSize && value === "⇐") {
    word.pop();
    Input[tries].children[count - 1].textContent = "";
    count--;
  }
  word.map((val, idx) => {
    if (tries < Alltries) Input[tries].children[idx].textContent = val;
  });
}

function updateViaKeyBoard(code, key) {
  if (count != wordSize && code >= "KeyA" && code <= "KeyZ") {
    word.push(key);
    count++;
  }
  if (count >= 1 && count <= wordSize && key === "Backspace") {
    word.pop();
    Input[tries].children[count - 1].textContent = "";
    Input[tries].children[count - 1].style.backgroundColor = "bisque";
    count--;
  }
  word.map((val, idx) => {
    if (tries < Alltries) Input[tries].children[idx].textContent = val;
  });
}

function MakeKeyBoard() {
  const keyboardKeys = {
    row1: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    row2: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    row3: ["Enter", "z", "x", "c", "v", "b", "n", "m", "⇐"],
  };
  const keyBoard = document.querySelector(".keyboard");
  Object.keys(keyboardKeys).map((el) => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "keyboard-col";
    keyboardKeys[el].map((val) => {
      let keyDiv = document.createElement("div");
      keyDiv.textContent = val;
      if (val === "⇐" || val === "Enter") keyDiv.className = "actions";
      rowDiv.appendChild(keyDiv);
    });
    keyBoard.appendChild(rowDiv);
  });
}

function MakeFields() {
  for (let tries = 1; tries <= 6; tries++) {
    let inputDiv = document.createElement("div");
    inputDiv.className = "wordle-field";
    for (let el = 1; el <= 5; el++) {
      let elDiv = document.createElement("div");
      inputDiv.appendChild(elDiv);
    }
    Fields.appendChild(inputDiv);
  }
}

function checkWord(key) {
  if (!checked) {
    if (key === "Enter") {
      test.map((checkEl, chckIdx) => {
        word.map((val, idx) => {
          if (checkEl === val) {
            if (idx === chckIdx) {
              Input[tries].children[chckIdx].style.backgroundColor = "green";
            } else {
              Input[tries].children[idx].style.backgroundColor = "grey";
              // console.log(`${idx}  ${chckIdx}`);
            }
          }
        });
      });
      checked = true;
      // console.log(word);
    }
    if (test.every((val, idx) => val === word[idx])) alert("Word is Found !!");

    if (checked) {
      while (word.length != 0) word.pop();
      count = 0;
      tries++;
    }
  }
  checked = false;
}
