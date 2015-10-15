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
 	var bet = prompt("How much money would you like to bet?");
 	playerBet = bet;
 	playerMoney -= bet;
 }

//Deal cards

var dealCards = function(){
	for (var i = 0; i < 2; i++) {
	playerCards[i] = newDeck.pop();
	dealerCards[i] = newDeck.pop();
	};
}
dealCards()

//Check for 21 before deal

if (countCards(playerCards)===21){

	alert("Blackjack!");

	playerMoney = playerMoney + 2.5*(playerBet);
}

//Hit
var playerHit = function(){

	playerCards[playerCards.length] = newDeck.pop();
	console.log(countCards(playerCards));
}

var dealerHit = function(){
	dealerCards[dealerCards.length] = newDeck.pop();
}

//Stay


//Player win function

//Dealer win function


//============
//Dealer logic
//============
//run dealer logic whenever it is the dealer's turn to make a move
var dealerLogic = function(){
	
	while(countCards(dealerCards) < 17){
	dealerHit()
	}


}

console.log(countCards(playerCards))
console.log(countCards(dealerCards))


//