# GA-Project-1
Game of Tres

## Index
- [Scope](#Scope)
- [User Stories](#user-stories)
- [Wireframes](#wireframes)
- [Rules](#Rules)
- [Milestones](#milestones)

## Scope

The final objective is to build a web browser for a card game called Tres. Two to Four players should be able to see the current state of the game, cards they have in their posession and choose which card to play, if any.

#### Technologies used

-HTML
-CSS
-Javascrips

## User Stories

A user for game of tres is for anyone interested in playing the game along with one to three people

There are no limitations for the user


## Wireframes

#### Welcome Screen
User will get to input how many playets will play the game in addition to assigning names to them
![image](https://i.imgur.com/5mRS7nU.png)
#### Rules Screen
![image](https://i.imgur.com/5URqQRj.png)
#### Phone display game screen
![image](https://i.imgur.com/Vwj0Djn.png)
#### Desktop display game screen
![image](https://i.imgur.com/yh3QOHL.png)
#### EndGame Results
![image](https://i.imgur.com/kmqmBfh.png)

## Rules
 
 #### The objective of the game is to run out of cards as soon as possible
    Each player starts the game with 3 cards face down, 3 cards face up and 3 cards in hand
    In a turn, the active player has to play a card on top of discard pile if possible
    Rules for playing a card are:
     if there are no cards in discard. you can play any card
     Otherwise play a card that has a higher value than the card on top of the discard pile (highest card for this game is A), or a wild card

    After playing a card, if you have fewer than 3 cards in your hand AND there are cards left on the deck, draw a card
    If you can't play a card, you'll collect the discard pile into your hand, the previous player gets to go again
    you can only play cards from the table face up when your hand is empty
    -you can only play face down cards when you don't have any face up cards left nor cards in your hand
    playing facedown cards is always a gamble, you don't get to see them before choosing which one to play. if it's not a valid move, add it to you hand, collect the discard and previous player gets to go again
Special situations:
    - 2 is a wild card. It can be played regardless of the number on top of discard. Then play another card
    - 10 is a wild card. It can be played regardles of the number on top of discard AND it will get rid of current discard pile (trashed). Then play a another card
    - if the top of the discard pile has 3 continuous cards of the same value, the discard pile gets trashed and current player gets another turn.

Players will be ranked in the order of which they got rid of all the cards

## Milestones

#### Week1
-All basic functions are working

### Goals
-Clear some minor bugs
-Implement 1 player mode
-Add animations

### Code Snippet

```javascript
const playCard = (cardInd, source) =>{
    
    displayOnDiscard(currentPlayer[source][cardInd].displayNum, currentPlayer[source][cardInd].suit)

    discardPile.push(currentPlayer[source][cardInd])
    currentPlayer[source].splice(cardInd, 1)
    if (gameDeck.length > 0 && currentPlayer.hand.length < 3){

    drawCard(playersArr.indexOf(currentPlayer), 'hand','hand')

    }
   
}
```
