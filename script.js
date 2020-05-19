function typeOnElement(node, text, speed, exit=null) {
  node.textContent = "";
  let i=0;
  function type() {
    if (i < text.length) {
      node.textContent += text[i];
      i++;
      setTimeout(type, speed);
    }
    else if (exit) {
      exit();
    }
  }
  setTimeout(type, speed);
}

function computerPlay() {
  let choice = Math.floor(Math.random()*3)
  let result;
  switch(choice) {
    case 0:
      result = "Rock";
      break;
    case 1:
      result = "Paper";
      break;
    case 2:
      result = "Scissors";
      break;
  }
  return result;
}

function playRound(playerSelection, computerSelection) {
  let c2i = {"rock": 0, "paper": 1, "scissors": 2};
  let ps = c2i[playerSelection.toLowerCase()];
  let cs = c2i[computerSelection.toLowerCase()];
  let result;
  if (ps === cs) { // tie
    result = 0;
  } else if ((ps+1)%3 == cs) {
    result = -1; // cs > ps
  } else {
    result = 1; // ps > cs
  }

  return result;
}

function game() {
  let ps = 0, cs = 0, tie = 0;

  for (let rnd = 1; rnd <= 5; rnd++) {
    let playerSelection = prompt(), computerSelection = computerPlay();
    let res = playRound(playerSelection, computerSelection);
    let str = "Round " + rnd + ": "
    if (res == 0) {
      str += "Tie."
      tie++;
    } else if (res > 0) {
      str += "You win! " + playerSelection + " beats " + computerSelection;
      ps++;
    } else {
      str += "You lose! " + computerSelection + " beats " + playerSelection;
      cs++;
    }
    console.log(str);
  }

  console.log("---Your final score---\n" + "Won: " + ps + ", Tie: " + tie + ", Lost: " + cs);
}

function nothing() {
  return;
}

/**
* Delay for a number of milliseconds
*/
function sleep(delay) {
    let start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

maintext = document.querySelector("#maintext");

function typeChoose() {
  typeOnElement(maintext, "Choose your action...", 50);
}
// maintext.textContent = "hello, world";
typeOnElement(maintext, "A wild PC has appeared!", 50, function() {sleep(1000); typeChoose();});

