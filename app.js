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
var display = $('#display')
var button = $('#button')
var bankroll = $('#bankroll')
var hitButton = document.getElementById("hit")
var stayButton = document.getElementById("stay")
var dealButton = document.getElementById("deal")

//Dealer cards
var dealerCards = []

var cardTypes = ["hearts", "diamonds", "spades", "clubs"]
var cardValues = [2,3,4,5,6,7,8,9,10,10,10,10,11]
//=========
//Functions
//=========
//Create a deck
for (var i = 0; i < 13; i++) {
	for (var h = 0; h < 4; h++) {
		newCard = {value: cardValues[i], suit: cardTypes[h]}
		deck.push(newCard)
	};
};
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
	makeBet()
	for (var i = 0; i < 2; i++) {
	playerCards[i] = newDeck.pop();
	dealerCards[i] = newDeck.pop();
	};
	$(display).html("It is now player's turn")
}
dealCards()

//Check cards before deal///////////////////////////////////////////////////////////

if (countCards(playerCards)===21){

	alert("Blackjack!");

	playerMoney = playerMoney + 2.5*(playerBet);
}

//Hit and stay functions //////////////////////////////////////////////////////////////////////////
var playerHit = function(){

	playerCards[playerCards.length] = newDeck.pop();
	// console.log(countCards(playerCards));
	checkForBust(playerCards);
}

var dealerHit = function(){
	dealerCards[dealerCards.length] = newDeck.pop();
	checkForBust(dealerCards);
}



//Check for functions/////////////////////////////////////////////////////////////////////////////////////////

var checkForWinner = function(){
	if(countCards(playerCards)<countCards(dealerCards)){
		//alert or div displaying "dealer wins!"
	}
	else if(countCards(playerCards)>countCards(dealerCards)){
		//alert or div displaying "player wins"
		playerMoney= playerMoney + 2*(bet);
	}
	else if(countCards(playerCards)===countCards(dealerCards)){
		//"PUSH"
		playerMoney= playerMoney + bet
	};
}

var checkForBust = function(cards){
	if(countCards(cards) > 21){
		//BUST
		console.log("bust!")
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
	dealerHit();
	};

}

console.log(countCards(playerCards))
console.log(countCards(dealerCards))

//=========
//Listeners
//=========
hitButton.onclick = function(){
	playerHit()
}

stayButton.onclick = function(){
	dealerLogic()
}



//