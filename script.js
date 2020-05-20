let speed = 50; /* speed of typing animations */
let ps = 0, cs = 0, tie = 0; /* scores */

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

/* Helper function that does nothing */
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

function typeOnElement(node, text, speed, exit=nothing) {
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

function typeChoose(end=nothing) {
  typeOnElement(maintext, "Choose your action...", speed, end);
}

function showPlayerChoice(choice, end=nothing) {
  playerImg.classList.add("active");
  playerImg.setAttribute("src", choice.toLowerCase()+".png");
  sleep(500);
  end();
}

function showComputerChoice(choice, end=nothing) {
  cpuImg.classList.add("active");
  cpuImg.setAttribute("src", choice.toLowerCase()+".png");
  sleep(500);
  end()
}

function resetRound(){
  sleep(1000);
  typeChoose(function(){
    attackbox.classList.add("active");
  });
}

/* Main function with logic */
function onClick(choice, end=nothing){
  if (attackbox.classList.contains("active")){
    attackbox.classList.remove("active");
    typeOnElement(maintext, "You chose " + choice + "...", speed, function(){
      let cpuChoice = computerPlay();
      showPlayerChoice(choice);
      showComputerChoice(cpuChoice);
      typeOnElement(maintext, "Computer chose " + cpuChoice + "...", speed, function(){
        sleep(500);
        let result = playRound(choice, cpuChoice);
        if (result === 1) {
          typeOnElement(maintext, choice + " beats " + cpuChoice, speed, resetRound);
          let psText = document.querySelector("#your-score");
          psText.textContent = "You: " + ++ps;
        } else if (result === -1) {
          typeOnElement(maintext, cpuChoice + " beats " + choice, speed, resetRound);
          let csText = document.querySelector("#cp-score");
          csText.textContent = "CPU: " + ++cs;
        } else {
          typeOnElement(maintext, "Draw.", speed, resetRound);
          let tieText = document.querySelector("#tie");
          tieText.textContent = "Tie: " + ++tie;
        }
      });
    });
  }
}

function addChoose(node) {
  node.addEventListener('click', function(e) {
    onClick(this.textContent, nothing);
  });
}

let maintext = document.querySelector("#maintext");
let attackbox = document.querySelector("#attackbox");

let playerImg = document.querySelector("#you");
let cpuImg = document.querySelector("#cp");

let choices = document.querySelectorAll(".choice");

typeOnElement(maintext, "A wild PC has appeared!", speed, function() {
  sleep(1000);
  typeChoose(function(){
    attackbox.classList.add("active");
  });
});

choices.forEach(addChoose);

