const completeDeck = []
let gameDeck =[]
let discardPile = []
let cardsInDiscard = 0
const suits = ['&#9824', '&#9830', '&#9827', '&#9829']
let playersArr = []
let finishedPlayers = []
const legalAmountOfPlayers = ['2','3','4']
let playerCount = 4


////HTML ELEMENTS
const currentBoard = document.querySelector('.currentPlayer')
const inactivePlayers = document.querySelector('.inactivePlayers')
let playerBoards = []
const deckCards = document.querySelector('.deckCards')
const discardCards = document.querySelector('.discardCards')
const passBtn = document.querySelector('.pass')
////HTML ELEMENTS


//Class for the card object
class Card{
    constructor(suit,num){
        this.suit = suit
        this.num = num
    }
}

//copied from MDN Web Docs
const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}
  
// resulting deck should be an array containing 52 objects. Each with a suit and number value
const defineDeck =() =>{
    for (let i = 0; i < suits.length; i++){
        for(let j = 0; j<13; j++){
            let newCard = new Card (suits[i], j+2)
            completeDeck.push(newCard)
        }
    }
}

// adds the elements from the deck array into a shuffled array in random order
const shuffleDeck = (deck) =>{
    newDeck = [...deck]
    while (newDeck.length >0){
        let randomIndex= randomNum(0,newDeck.length)
        gameDeck.push(newDeck[randomIndex]);
        newDeck.splice(randomIndex,1)
    }
}

//Class for Player object. Has Name, cards in hand, cards faceUp and cards faceDown. Also tracks whether the player has finished the game and in which position.
class Player{
    constructor(name, hand =[], faceUp =[], faceDown =[]) {
        this.hand = hand
        this.faceUp = faceUp
        this.faceDown = faceDown
        this.name = name
    }
    done = false;
    position = null;
    //method to check if player has cards left
    doneWithGame(){ 
        if (this.hand === 0 && this.faceUp === 0 && this.faceDown ===0)
        this.done = true
    }
    //method to update the position in which the player finished their game
    positionFinished(num){
        this.position = num
    }
}


//prompt will repeat until user choses a valid amount of players
//stretch goal - Include this as a welcome page. Let players have names
const askPlayerCount = () =>{
    while(legalAmountOfPlayers.includes(playerCount) === false){
        playerCount = prompt('How many players? 2-4 :')
        if (legalAmountOfPlayers.includes(playerCount) === false){
            playerCount = prompt('Sorry, not a valid answer.\nHow many players? 2-4 :')
        }
    }
} 

//will create one object for each player using the 'Player' object class
const generatePlayers =() => {
    for (let i = 0; i < playerCount; i++){
        playersArr[i] = new Player(`player${i+1}`)
    }
}

//Generic methot to create an element(default DIV) and add conntent to it.
const createElement =(className, content, tag = 'div') =>{
    const newDiv = document.createElement(`${tag}`)
    newDiv.className = className;
    newDiv.textContent= content
    return newDiv
}

//Creates one board div for each player. Each one containing 3 divs (hand, faceup, facedown).
//First Player gets appended to current board and the rest to inactive boards 
const displayPlayerBoards =() =>{
    for (let i = 0; i < playersArr.length; i++){
        playerBoards[i] = document.createElement('div')
        if (i === 0){
            playerBoards[i].className = 'playerBoard'
            playerBoards[i].setAttribute('id', 'player1')
            currentBoard.appendChild(playerBoards[i])
        }else{
            playerBoards[i].className = 'playerBoard'
            inactivePlayers.appendChild(playerBoards[i])
            playerBoards[i].setAttribute('id', `player${i+1}`)
        }
        playerBoards[i].appendChild(createElement('hand'))
        playerBoards[i].appendChild(createElement('faceUpRow'))
        playerBoards[i].appendChild(createElement('faceDownRow' ))
    }
}


//takes two parameters, player index, player property and the class of the card(faceUp or faceDown)
//i.e drawCard(1, hand) will draw a card into the hand of the player in index 1
//affects both the array and the display
const drawCard = (playerInd, playerProperty, className, setup = false) =>{
    let topCard = gameDeck[gameDeck.length-1]
    gameDeck.pop()
    playersArr[playerInd][playerProperty].push(topCard)

    displayCard(playerInd, className, playerProperty, topCard.num, topCard.suit)
    //Only display cards in deck after setup
    if(setup === false){
        deckCards.textContent = (gameDeck.length).toString()
    }

}



//Gives each player 3 cards in each of their areas
const drawInitialCards =() =>{
    for (let i = 0; i < playersArr.length; i++){
        for (let j = 0; j < 3; j++){
            drawCard(i, 'faceUp','hand', true )
            drawCard(i, 'faceUp','faceUpRow', true)
            drawCard(i, 'faceDown','faceDownRow', true)
        }
    }
    deckCards.textContent = (gameDeck.length).toString()
}

// shuffles the deck and then draws starting cards
const setUp =() =>{
    gameDeck = shuffleDeck(completeDeck)
    drawInitialCards()
}

// Simple function to replace the display number for a letter in case of a facecard
const faceCard =(num) =>{
    if (num === 14) {
        return 'A'
    } else if (num === 13){
        return 'K'
    } else if(num ===12){
        return 'Q'
    } else if (num ===11){
        return 'J'
    } else return num


}

//Creates the divs elements for the card and contents of the cars, then appends it to the player and class targeted
const displayCard = (playerInd, className, orientation = faceUp, num, suit) =>{

    let card = createElement(`card ${orientation}`)
    let cardNum = createElement('cardNum',num, 'h3')
    let cardSuit = document.createElement('h3')
    cardSuit.className = 'suit'
    cardSuit.innerHTML = suit
    if (orientation === 'faceDown'){
        cardSuit.className = 'suit hid'
        cardNum.className = 'cardNum hid'
    }
    card.appendChild(cardNum)
    card.appendChild(cardSuit)

    const board = playerBoards[playerInd].querySelector(`.${className}`)
    board.appendChild(card)


}
//cycles through the players according to the direction (forwards or backwards)
const changeCurrentPlayer =(direction) =>{
    let prevPlayerInd = playersArr.indexOf(currentPlayer)
    let inactivePlayersInd = []

    if ((direction === 1) && (currentPlayer === playersArr[playersArr.length-1])){
        currentPlayer = playersArr[0]

    }else if ((direction === -1) && (currentPlayer === playersArr[0])){
        currentPlayer = playersArr[playersArr.length-1]
    } else{
        currentPlayer = playersArr[playersArr.indexOf(currentPlayer) + direction]
    }
    displayCurrentPlayer(prevPlayerInd)
    if (direction == 1){
        inactivePlayers.appendChild(playerBoards[prevPlayerInd])
    }else {
        inactivePlayers.prepend(playerBoards[prevPlayerInd])
    }
}



// replaces the current player board with the new current player
const displayCurrentPlayer = (prevPlayerInd) =>{
    let currentPlayerInd = playersArr.indexOf(currentPlayer);
    currentBoard.replaceChild(playerBoards[currentPlayerInd], playerBoards[prevPlayerInd])
}
// element.replaceChild((currentBoard.children[0]), playerBoards[1])





//This function should play a turn. currently is only swapping current player
currentBoard.addEventListener('click', function(e){
    let selectedCardValue = e.target.closest('.card').children[0].textContent

    console.log(selectedCard)
})

defineDeck()
shuffleDeck(completeDeck)

generatePlayers()
let currentPlayer = playersArr[0]

displayPlayerBoards()

drawInitialCards()

