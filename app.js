const completeDeck = []
let gameDeck =[]
let discardPile = []
let cardsInDiscard = 0
let suits = ['♠', '♣', '♦', '♥']
let playersArr = []
let finishedPlayers = []
const legalAmountOfPlayers = ['2','3','4']
let playerCount = 4
let gameOver = false


////HTML ELEMENTS
const currentBoard = document.querySelector('.currentPlayer')
const inactivePlayers = document.querySelector('.inactivePlayers')
let playerBoards = []
const deckCards = document.querySelector('.deckCards')
const discardCards = document.querySelector('.discardCards')
const passBtn = document.querySelector('.pass')
const almostOver = document.querySelector('.almostOver')
const positions = document.querySelector('.positions')
const gameOverDisplay = document.querySelector('.endGameResults')
// const handDisplay = document.querySelectorAll('.currentPlayer .hand')
////HTML ELEMENTS


//Class for the card object
class Card{
    constructor(suit,num, displayNum){
        this.suit = suit
        this.num = num
        this.displayNum = displayNum
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
            let newCard = new Card (suits[i], j+2, j+2)
            if (newCard.num === 14) {
                newCard.displayNum = 'A'
            } else if (newCard.num === 13){
                newCard.displayNum = 'K'
            } else if(newCard.num ===12){
                newCard.displayNum = 'Q'
            } else if (newCard.num ===11){
                newCard.displayNum = 'J'
            } else {
                newCard.displayNum = "" +  newCard.num
            }
            completeDeck.push(newCard)
        }
    }
}

// adds the elements from the deck array into a shuffled array in random order
const shuffleDeck = (deck) =>{
    oldDeck = [...deck]
    while (oldDeck.length >0){
        let randomIndex= randomNum(0,oldDeck.length)
        gameDeck.push(oldDeck[randomIndex]);
        oldDeck.splice(randomIndex,1)
    }
}

//Class for Player object. Has Name, cards in hand, cards faceUp and cards faceDown. Also tracks whether the player has finished the game and in which position.
class Player{
    constructor(name, hand =[], faceUp =[], faceDown =[], displayNum) {
        this.hand = hand
        this.faceUp = faceUp
        this.faceDown = faceDown
        this.name = name
    }
    done = false;
    position = null;
    //method to check if player has cards left
    doneWithGame(){ 
        if (this.hand.length === 0 && this.faceUp.length === 0 && this.faceDown.length === 0)
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
    newDiv.textContent= content;
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
const drawCard = (playerInd, playerProperty = 'hand', className ='hand', setup = false) =>{
    let topCard = gameDeck[gameDeck.length-1]
    gameDeck.pop()
    playersArr[playerInd][playerProperty].push(topCard)
    
    displayCard(playerInd, className, playerProperty ,topCard.displayNum, topCard.suit)
    //Only display cards in deck after setup
    if(setup === false){
        deckCards.textContent = (gameDeck.length).toString()
    }

}



//Gives each player 3 cards in each of their areas
const drawInitialCards =() =>{
    for (let i = 0; i < playersArr.length; i++){
        for (let j = 0; j < 3; j++){
            drawCard(i, 'hand','hand', true )
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


//Creates the divs elements for the card and contents of the cars, then appends it to the player and class targeted
const displayCard = (playerInd, className, orientation = faceUp, displayNum, suit) =>{

    let card = createElement(`card ${orientation}`)
    let cardNum = createElement('cardNum',displayNum, 'h3')
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

const compareCardValue =(selectedCardValue) =>{
    let topDiscard = discardPile[discardPile.length-1]
        if (discardPile.length === 0){
            return true
        } else if (selectedCardValue >= topDiscard.num){
            return true
        } else if (selectedCardValue === 2) {
            return true
        } else if (selectedCardValue === 10) {
            return true
        }
        return false
}


//checks if the selected card can be added to the discard pile
const isLegalCardPlay = (selectedCardValue, source) =>{
    if (currentPlayer.hand.length != 0) {
        if(source != 'hand'){
            console.log('Player tried to play card not in hand when having cards in hand')
            return false
        }else {
            return compareCardValue(selectedCardValue)
        }

    } else if (currentPlayer.faceUp.length != 0){
        if(source != 'faceUp'){
            console.log('Player tried to play faceDown card when having cards faceUp')
            return false
        }else {
            return compareCardValue(selectedCardValue)
        }
    } else{
        return compareCardValue(selectedCardValue)
    }
}

const canPlayCard = () => {
    if (discardPile.length ===0){
        return true
    }
    //if player has cards in hand that can be played, return true.
    if (currentPlayer.hand.length != 0) {
        for (let i = 0; i >currentPlayer.hand.length; i++){
            if (isLegalCardPlay(currentPlayer.hand[i], 'hand') === true) {
                return true
            } 
        } 
        return false
    //if player has no cards in hand, but has faceUp cards that can be played, return true.
    } else if (currentPlayer.faceUp.length != 0){
        for (let i = 0; i >currentPlayer.faceUp.length; i++){
            if (isLegalCardPlay(currentPlayer.faceUp[i]) === true) {
                return true
            } 
        } return false
    }
    return true
}

//looks for matching cards on top of the discard pile
const checkForSet = () =>{
    if (discardPile.length >= 3) {
        if (discardPile[discardPile.length-1].num === discardPile[discardPile.length-2].num &&
            discardPile[discardPile.length-1].num === discardPile[discardPile.length-3].num){
                return true
        }
    }
}

//makes content on discardpile visible
//redefines content of discardPile to match the arguments
const displayOnDiscard = (displayNum, suit) =>{
    document.querySelector('.discardPile .cardNum').style.visibility = 'visible' 
    document.querySelector('.discardPile .suit').style.visibility = 'visible' 

    document.querySelector('.discardPile .cardNum').textContent = displayNum
    document.querySelector('.discardPile .suit').textContent = suit
}



// loops through the cards of the player looking for the chosen one. returns the index
const determineCardIndex =(chosenDisplayNum, chosenSuit, source) =>{
    
    // console.log(currentPlayer[source].length, 'length')
    // console.log( chosenDisplayNum, 'chosen display num')
    // console.log( chosenSuit, 'chosen display suit')
    // console.log( source, 'source')

    let cardIndex = 0
    for (let i = 0; i < currentPlayer[source].length; i++){
        if (currentPlayer[source][i].displayNum === chosenDisplayNum && currentPlayer[source][i].suit === chosenSuit){
            cardIndex = i
            return cardIndex
        }
    }
}

//should set the discards visibility to invisible. not working
clearDiscardDisplay =() =>{
    document.querySelector('.discardPile .cardNum').style.visibility = 'hidden' 
    document.querySelector('.discardPile .suit').style.visibility = 'hidden' 
}



//adds the card to discard both in the array and display
//removes it from the player both in the array and display
//if conditions are met. clears discard
const playCard = (cardInd, source) =>{

    displayOnDiscard(currentPlayer[source][cardInd].displayNum, currentPlayer[source].suit)
    discardPile.push(currentPlayer[source][cardInd])

    currentPlayer[source].splice(cardInd, 1)
    if (gameDeck.length > 0 && currentPlayer.hand.length < 3){
        drawCard(playersArr.indexOf(currentPlayer), 'hand','hand')
    }

   
}
//Displays the position of the players than finished the game inside their boards
const displayFinalPosition=() =>{
    let positionDisplay =createElement('.finalText', `${currentPlayer.name} Finished game in ${finishedPlayers.length} position`)
    const middleRow = document.querySelector('.currentPlayer .faceUpRow')
    middleRow.append(positionDisplay)
}


const doubleCardInd = (selectedCardNum) =>{
    for (let i = 0; i < currentPlayer.hand.length;i++ ){
        if (currentPlayer.hand[i].num === selectedCardNum){
            console.log("There's a dup in ", i)
            return i
        }
    }
}

//checks if the player can play. if they can, they're not allowed to pass
//if they can pass. they'll add the discard to their hand both in array and display
//previous player goes again
const passAttempt = () =>{
    if (canPlayCard()){
        console.log('please pick a card')
    }else{
        currentPlayer.hand.push(...discardPile)
        let playerInd = playersArr.indexOf(currentPlayer) 
        discardPile.forEach((card) =>{
            displayCard(playerInd, 'hand', 'hand', card.displayNum, card.suit)
        })
        discardPile = []
        clearDiscardDisplay()
        changeCurrentPlayer(-1)
        while (currentPlayer.done === true){
            changeCurrentPlayer(-1)
        }
        discardCards.textContent = discardPile.length.toString()
        console.log('pass')
    }
}


//Just for testing / demo
//clears the cards from the requested set
const removeAllCards = (source) => {
    while (source.firstChild) {
        source.removeChild(source.firstChild);
    }
}

//takes event target and it returns the index of element in it's parent
const findIndex = (e) =>{
    let selectedCard = e.target.closest('.card')
    let source = e.target.closest('.card').parentNode
    let cardsInSource = source.childNodes
    console.log(cardsInSource)
    console.log(selectedCard)
    for (let i = 0; i < cardsInSource.length; i++){
        if (selectedCard === cardsInSource[i]){
            console.log(i)
            return i
        } 
    }
}

// finished game
const removeFromGame =() =>{
    console.log( 'this player is done')
    finishedPlayers.push(currentPlayer)
    console.log(playersArr)
    displayFinalPosition()
    let positionLi = createElement('positionLi', `${currentPlayer.name}`, 'li')
    positions.append(positionLi)
    if (playersArr.length === finishedPlayers.length){
        gameOverDisplay.style.display = 'flex'
        gameOver = true
    }
}

const checkForMultiples =(selCardNum, selCardDisplayNum) =>{
    console.log(selCardNum, 'checking for multiples')
    if (doubleCardInd(selCardNum) != null ){
        let playAgain = prompt(`You have another ${selCardDisplayNum}. Do you want to play it? y/n`)
        while (playAgain != 'y' && playAgain != 'n'){
            playAgain = prompt(`You have another ${selCardDisplayNum}. Do you want to play it? y/n`)
        
        }
        if (playAgain === 'y'){
            console.log('playagain')
            let dupCardInd = doubleCardInd(selCardNum)
            console.log(dupCardInd)
            playCard(dupCardInd, 'hand',selCardNum, currentPlayer.hand[dupCardInd].suit , selCardDisplayNum)
            dupCard = document.querySelector(`.currentPlayer .hand .card:nth-of-type(${dupCardInd+1})`)
            console.log(dupCard, 'dupCard')
            dupCard.remove()
            checkForMultiples(selCardNum, selCardDisplayNum)
        }
    }
}




defineDeck()
shuffleDeck(completeDeck)

generatePlayers()
let currentPlayer = playersArr[0]

displayPlayerBoards()

drawInitialCards()



/*
Event Listeners past this line
-----------------------------------------
*/



passBtn.addEventListener('click', passAttempt)



currentBoard.addEventListener('click', function(e){
    let cardIndex = findIndex(e)
    let source = e.target.closest('div').className.split(' ')[1]
    console.log(cardIndex, 'cardIndex')
    let selCard = currentPlayer[source][cardIndex]
    console.log(selCard, 'selected Card')

    if (isLegalCardPlay(selCard.num , source)){
        playCard(cardIndex, source)
        e.target.closest('.card').remove()
        if (source === 'hand'){
            checkForMultiples(selCard.num, selCard.displayNum)
        } 
        currentPlayer.doneWithGame()
        if (currentPlayer.done){
            removeFromGame()
        }
        if (checkForSet() || selCard.num === 10 ){
            if (selCard.num ===10 ){
                console.log('You played a 10. Play again')
            } else{
                console.log('You completed a set in the discard Pile. Play again')
            }
            discardPile = []
            //remove cards from display discard pile
            clearDiscardDisplay()
            discardCards.textContent = discardPile.length.toString()
        } 

        discardCards.textContent = discardPile.length.toString()
        
        if(gameOver != true){
            changeCurrentPlayer(1)
            while (currentPlayer.done === true){
                changeCurrentPlayer(1)
            }
        }
        


    }else if (source === 'faceDown'){
        if (currentPlayer.hand.length != 0){
            console.log('Player tried to play card not in hand when having cards in hand')
        } else{
            displayCard(playerInd, 'hand', 'hand', selectedCardDisplayNum, selectedCardSuit)
            currentPlayer.hand.push(currentPlayer.faceDown[cardInd])
            e.target.closest('.card').remove()
            changeCurrentPlayer(-1)
            while (currentPlayer.done === true){
                changeCurrentPlayer(-1)
            }
        }
    } else {
        console.log('illegal play')
 
    }

})

almostOver.addEventListener('click', function(){
    gameDeck = []

    let winningCard = new Card(suits[0], 14, 'A')
    let winningCard1= new Card(suits[1], 14, 'A')
    let winningCard2 = new Card(suits[2], 14, 'A')
    currentPlayer.hand = [winningCard, winningCard1, winningCard2] 
    currentPlayer.faceUp = []
    currentPlayer.faceDown = []
    const handRow1 = document.querySelector('.currentPlayer .hand');
    const faceUpRow1 = document.querySelector('.currentPlayer .faceUpRow');
    const faceDownRow1 = document.querySelector('.currentPlayer .faceDownRow');
    removeAllCards(handRow1);
    removeAllCards(faceUpRow1);
    removeAllCards(faceDownRow1);
    displayCard(playersArr.indexOf(currentPlayer), 'hand', 'hand', 'A', suits[0])
    displayCard(playersArr.indexOf(currentPlayer), 'hand', 'hand', 'A', suits[1])
    displayCard(playersArr.indexOf(currentPlayer), 'hand', 'hand', 'A', suits[2])
    deckCards.textContent = (gameDeck.length).toString()
})


// let selectedCard =document.querySelector(`.currentPlayer .hand .card:nth-of-type(2)`)
// selectedCard.style.backgroundColor = 'red'
// selectedCard.remove()

