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

////HTML ELEMENTS


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

const createDiv =(className, content) =>{
    const newDiv = document.createElement('div')
    newDiv.className = className;
    newDiv.textContent= content
    return newDiv
}

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
        playerBoards[i].appendChild(createDiv('hand'))
        playerBoards[i].appendChild(createDiv('faceUpRow'))
        playerBoards[i].appendChild(createDiv('faceDownRow' ))
    }
}


//takes two parameters, player property and player Index
//i.e drawCard(1, hand) will draw a card into the hand of the player in index 1
const drawCard = (playerInd, playerProperty, className) =>{
    let topCard = gameDeck[gameDeck.length-1]
    gameDeck.pop()
    playersArr[playerInd][playerProperty].push(topCard)

    displayCard(playerInd, className, playerProperty, topCard.num, topCard.suit)
}




const drawInitialCards =() =>{
    for (let i = 0; i < playersArr.length; i++){
        for (let j = 0; j < 3; j++){
            drawCard(i, 'faceUp','hand' )
            drawCard(i, 'faceUp','faceUpRow')
            drawCard(i, 'faceDown','faceDownRow')
        }
    }
}

const setUp =() =>{
    gameDeck = shuffleDeck(completeDeck)
    drawInitialCards()
}

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


const displayCard = (playerInd, className, orientation = faceUp, num, suit) =>{

    let card = document.createElement(`div`)
    card.className = `card ${orientation}`

    let cardNum = document.createElement('h3')
    cardNum.className = 'cardNum'
    cardNum.textContent = faceCard(num)

    let cardSuit = document.createElement('h3')
    cardSuit.className = 'suit'
    cardSuit.innerHTML = suit
    if (orientation === 'faceDown'){
        cardSuit.className = 'suit hid'
        cardNum.className = 'cardNum hid'
    }
    card.appendChild(cardNum)
    card.appendChild(cardSuit)
    console.log(playerBoards[playerInd])
    console.log(className)

    const board = playerBoards[playerInd].querySelector(`.${className}`)
    if(board === undefined || board === null){
        console.log("unknown board")
    } else{
      board.appendChild(card)
    }

}

const changeCurrentPlayer =(direction) =>{
    if ((direction === 1) && (currentPlayer === playersArr[playersArr.length-1])){
        currentPlayer = playersArr[0]
    }else if ((direction === -1) && (currentPlayer === playersArr[0])){
        currentPlayer = playersArr[playersArr.length-1]
    } else{
        currentPlayer = playersArr[playersArr.indexOf(currentPlayer) + direction]
    }
}

const displayCurrentPlayer = () =>{

}

currentBoard.addEventListener('click', function(e){
    console.log(e.target)
    changeCurrentPlayer(1)
    console.log(currentPlayer.name)
})

defineDeck()
shuffleDeck(completeDeck)
console.log(gameDeck)
generatePlayers()
let currentPlayer = playersArr[0]
displayPlayerBoards()

drawInitialCards()
console.log(playersArr)
