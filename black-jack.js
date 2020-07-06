const outputArea = document.getElementById("output-area");
const newgameButton = document.getElementById("new-game-button");
const hitButton = document.getElementById("hit-button");
const stayButton = document.getElementById("stay-button");
const winnerArea = document.getElementById("winner-area");
let playerScore = 0;
let dealerScore = 0;
hideGameButtons();
const test = document.getElementById("test");


let cards = [
  //set 1
  { card: "🂡", value: 1 },
  { card: "🂢", value: 2 },
  { card: "🂣", value: 3 },
  { card: "🂤", value: 4 },
  { card: "🂥", value: 5 },
  { card: "🂦", value: 6 },
  { card: "🂧", value: 7 },
  { card: "🂨", value: 8 },
  { card: "🂩", value: 9 },
  { card: "🂪", value: 10 },
  { card: "🂫", value: 10 },
  { card: "🂭", value: 10 },
  { card: "🂮", value: 10 },

  // set 2
  { card: "🂡", value: 1 },
  { card: "🂢", value: 2 },
  { card: "🂣", value: 3 },
  { card: "🂤", value: 4 },
  { card: "🂥", value: 5 },
  { card: "🂦", value: 6 },
  { card: "🂧", value: 7 },
  { card: "🂨", value: 8 },
  { card: "🂩", value: 9 },
  { card: "🂪", value: 10 },
  { card: "🂫", value: 10 },
  { card: "🂭", value: 10 },
  { card: "🂮", value: 10 },

  // set 3
  { card: "🂡", value: 1 },
  { card: "🂢", value: 2 },
  { card: "🂣", value: 3 },
  { card: "🂤", value: 4 },
  { card: "🂥", value: 5 },
  { card: "🂦", value: 6 },
  { card: "🂧", value: 7 },
  { card: "🂨", value: 8 },
  { card: "🂩", value: 9 },
  { card: "🂪", value: 10 },
  { card: "🂫", value: 10 },
  { card: "🂭", value: 10 },
  { card: "🂮", value: 10 },

  // set 4
  { card: "🂡", value: 1 },
  { card: "🂢", value: 2 },
  { card: "🂣", value: 3 },
  { card: "🂤", value: 4 },
  { card: "🂥", value: 5 },
  { card: "🂦", value: 6 },
  { card: "🂧", value: 7 },
  { card: "🂨", value: 8 },
  { card: "🂩", value: 9 },
  { card: "🂪", value: 10 },
  { card: "🂫", value: 10 },
  { card: "🂭", value: 10 },
  { card: "🂮", value: 10 }
];

//03

let deck = [];
shuffleDeck = () => {
  let tmpDeck = cards.slice(0);
  while (tmpDeck.length > 0) {
    let pos = Math.floor(Math.random() * tmpDeck.length);
    let card = tmpDeck.splice(pos, 1);
    deck.push(...card);
  }
  //Check the length of the tmpDeck. it should be 0.
  //console.log(tmpDeck.length);

  /* for(let i=0; i<deck.length;i++){
        outputArea.innerHTML += ` card: ${deck[i].card} and value is: ${deck[i].value}</br>`;
    } //Print the shaffaled card  */
};

//shuffleDeck();

//04

drawCard = () => {
  return deck.shift();
};


//05 - Show Hands
let dealer = [],
  player = [];

showHand = (hand, score) => {
  let cards = "";
  
  for (let i = 0; i < hand.length; i++) {
      cards += hand[i].card;
    }

    return `${cards} ${score} </br>`;
};

clearTable = () =>{
    outputArea.innerHTML = "";
}


dealInitialCards = () => {
  player.push(drawCard());
  player.push(drawCard());
  dealer.push(drawCard());
  dealer.push(drawCard());
  showHands();
};


calculateHand = (cards) => {
    let score = 0;
    let hasAce = cards.find(card => card.value === 1) !== undefined;
    cards.forEach((card) =>  score += card.value);
    if (hasAce && score + 10 <= 21) {
        score = score + 10;
    }
    return score;
};


/* //dealInitialCards();
playerScore = calculateHand(player);
dealerScore = calculateHand(dealer);
showHand(dealer, dealerScore);
showHand(player, playerScore); */

//08
// Now we will close the shuffle and dealInitialCards and that will effect our display 



startNewGame = () =>{
    newgameButton.style.display = 'none';
    hitButton.style.display = 'inline';
    stayButton.style.display = 'inline';
    deck = [];
    player = [];
    dealer = [];
    shuffleDeck();
    dealInitialCards();

 
}

newgameButton.addEventListener('click', function(){
    startNewGame();
    //dealInitialCards();
    //playerScore = calculateHand(player);
    //dealerScore = calculateHand(dealer);
    //showHand(dealer, dealerScore);
    //showHand(player, playerScore); 
})


//10


hasBlackJack=(hand, score)=>{
  if(hand.length===2 && score===21) return true;
  return false;
}

isBust=(score)=>{
  if(score > 21) return true;
  return false;
}

determineWinner = (stayed) =>{
 /* if(stayButton.clicked === true){
    stayed = true;
  }   */
  const dealerWins = 'Dealer wins!';
  const playerWins = 'You win!';
  const draw = 'Draw';
  
  if(playerScore > 21) return dealerWins;
  else if(dealerScore > 21) return playerWins;
  else if(dealer.length==5 && dealerScore <= 21) return dealerWins;
  
  else if(playerScore==dealerScore && stayed) return draw;
  else if(playerScore > dealerScore && stayed) return playerWins;
  else if(dealerScore > playerScore && stayed) return dealerWins;
  else{
    let dealerBJ = hasBlackJack(dealer, dealerScore);
    let playerBJ = hasBlackJack(player, playerScore);
    if(dealerBJ === true && playerBJ===true) return draw;
    if(playerBJ===true) return playerWins;   
    if(dealerBJ===true) return dealerWins;
  }
  return '';
}

//09

showHands = (stayed = false) =>{
  //stayed = false;
  playerScore = calculateHand(player);
  dealerScore = calculateHand(dealer);
  clearTable();
  outputArea.innerHTML += showHand(dealer, dealerScore);
  outputArea.innerHTML += showHand(player, playerScore);
  let winner = determineWinner(stayed);
  console.log(winner);
  winnerArea.innerHTML = winner;
  if(winner!=='') hideGameButtons();    
} 

dealAnotherCard = (hand) =>{
    hand.push(drawCard());
}

hitButton.addEventListener('click', function(){
    dealAnotherCard(player);
    showHands();
});



function showGameButtons(){
  newgameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display='inline'
}

function hideGameButtons(){
  newgameButton.style.display = 'inline';
  hitButton.style.display = 'none';
  stayButton.style.display='none'
}


// 11


stayButton.addEventListener('click',function(){
  hideGameButtons();
  while(dealerScore < playerScore && playerScore <= 21 && dealerScore <= 17 ){
      dealer.push(drawCard());
      showHands(true);
  }
  showHands(true);
}) 




