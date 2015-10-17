//Deck
//Shuffle the deck
//Distribute two cards to each player
//Check if the player has 21, if he does pay 1.5x bet.  If dealer also has blackjack, then there's a push and everyone without 21 loses their money
//Player has option to hit or stay
//Go around the table for each player to get his turn
//Dealer then hits until he gets 17 or above
//Check for win: anyone with 21 wins double their bet unless dealer also has their bet


//=========
//variables
//=========
//Deck
var deck = []

//freshDeck
var newDeck =[]
//Bank
//Player cards
var playerCards = []
//Player money
var playerMoney = 1000
//Bet size
var playerBet=0
//Player total
var playerTotal= 0
var display = document.getElementById("display")
var button = document.getElementById("button")
var bankroll = document.getElementById("bankroll")
var hitButton = document.getElementById("hit")
var stayButton = document.getElementById("stay")
var dealButton = document.getElementById("deal")
var doubleButton = document.getElementById("double")
var display2 = document.getElementById("display2")
//Dealer cards
var dealerCards = []
var cardTypes = ["hearts", "diamonds", "spades", "clubs"]
var cardValues = [2,3,4,5,6,7,8,9,10,10,10,10,11]
//=========
//Functions
//=========
//Create a deck

var createDeck = function(){
	for (var i = 0; i < 13; i++) {
		for (var h = 0; h < 4; h++) {
			newCard = {value: cardValues[i], suit: cardTypes[h]}
			deck.push(newCard)
		};
	};
};
createDeck()

//Shuffle

var shuffle = function(deck) {
    for (var i = 0; i < 52; i++)    
        newDeck[i] = deck.splice(Math.floor(Math.random() * deck.length), 1)[0];
    return newDeck;
}    
 shuffle(deck)

 //Count cards

 var countCards = function(cards){
	var cardTotal = 0;
		for (var i = 0; i <cards.length; i++) {
			
			cardTotal += cards[i].value;
		};
	return cardTotal
}

 //Make a bet

 var makeBet = function(){
 	bet = prompt("How much would you like to bet?");	
 	playerBet = bet;
 	playerMoney -= bet;
 	$(bankroll).html("Your balance is: " + playerMoney)
 }

//Deal cards

var dealCards = function(){
	display.innerHTML = "It is now player's turn";
	makeBet();
	for (var i = 0; i < 2; i++) {
	playerCards[i] = newDeck.pop();
	dealerCards[i] = newDeck.pop();
	};
	console.log(countCards(playerCards))
	console.log(countCards(dealerCards))
	console.log(playerCards)
	console.log(dealerCards)
	return playerCards
	return dealerCards
}
dealCards()

//Check cards before deal///////////////////////////////////////////////////////////

if (countCards(playerCards)===21){

	alert("Blackjack!");

	playerMoney = playerMoney + 2.5*(playerBet);
	bankroll.innerHTML = ("Your balance is: " + playerMoney)
}
else if(countCards(playerCards)===21){
	alert("Dealer has blackjack!")
	;
}

//Clear table & end game//////////////////////////////////

var clearTable = function(){
	playerCards = [];
	dealerCards = [];
	bet = 0;
	display2.innerHTML = ""
}

var endGame = function(){
	deck = []
	var playAgain = prompt("Would you like to play another game? (yes/no)")
	if(playAgain === "yes"){
		clearTable()
		dealCards()
	}
}

//Hit and double down functions //////////////////////////////////////////////////////////////////////////
var playerHit = function(){

	playerCards[playerCards.length] = newDeck.pop();
	console.log(countCards(playerCards));
	checkForBust(playerCards);
	console.log(playerCards)
}

// var dealerHit = function(){
// 	checkForBust(dealerCards);
// 	console.log(dealerCards);
// 	console.log(countCards(dealerCards))
// }

var doubleDown = function(){
	playerCards[2]= newDeck.pop();
	playerMoney -= bet;
	$(bankroll).html("Your balance is: " + playerMoney);
	bet = bet * 2;
	playerBet = bet;
	checkForBust(playerCards)
	dealerLogic();


}

//Check for functions/////////////////////////////////////////////////////////////////////////////////////////

var checkForWinner = function(){
	if(countCards(playerCards)<countCards(dealerCards)){
		display2.innerHTML = "Sorry, the dealer wins.  Hit deal to play again"
		$(bankroll).html("Your balance is: " + playerMoney)
	}
	else if(countCards(playerCards)>countCards(dealerCards)){
		display2.innerHTML = "Congratulations, you win! Hit deal to play again"
		playerMoney= (playerMoney + 2*(bet));
		$(bankroll).html("Your balance is: " + playerMoney)
	}
	else if(countCards(playerCards)===countCards(dealerCards)){
		display2.innerHTML = "It is a push! Hit deal to play again"
		playerMoney+=((parseInt(playerBet)) +(parseInt(playerMoney)))
		$(bankroll).html("Your balance is: " + playerMoney)
	};
}


//Checks for winner when the dealer still needs to hit!??


var checkForBust = function(){
	if(countCards(playerCards) > 21){
		alert("Bust! Hit deal to play again.");
		clearTable();
	}
	else if(countCards(dealerCards) > 21){
		alert("Congratulations, you win! The dealer busts. Hit deal to play again")
		clearTable();
	}
}

//Player win function

//Dealer win function

//============
//Dealer logic
//============
//run dealer logic whenever it is the dealer's turn to make a move
var dealerLogic = function(){
	
	while(countCards(dealerCards) < 17){
	dealerCards.push(newDeck.pop());
	console.log(dealerCards)
	};
	checkForBust()
	if(countCards(dealerCards)>0 && countCards(playerCards)>0){
	checkForWinner()}

}

//=========
//Listeners
//=========
hitButton.onclick = function(){
	playerHit()
}

stayButton.onclick = function(){
	display.innerHTML = "It is now the dealer's turn"
	dealerLogic()
}

dealButton.onclick = function(){
	clearTable()
	dealCards()
}
doubleButton.onclick = function(){
	doubleDown()
}

//