Game of Tres (card game)

Rules of the game
    -The objective of the game is to run out of cards as soon as possible
    -Each player starts the game with 3 cards face down, 3 cards face up and 3 cards in hand
    -In a turn, the active player has to play a card on top of discard pile if possible
    -Rules for playing a card are:
        - if there are no cards in discard. you can play any card
        - Otherwise play a card that has a higher value than the card on top of the discard pile (highest card for this game is A)

        ----after playing a card, if you have fewer than 3 cards in your hand AND there are cards left on the deck, draw a card
    -If you can't play a card, you'll collect the discard pile into your hand, the previous player gets to go again
    -you can only play cards from the table face up when your hand is empty
    -you can only play face down cards when you don't have any face up cards left
    ---playing facedown cards is always a gamble, you don't get to see them before choosing which one to play. if it's not a valid move, add it to you hand, collect the discard and previous player gets to go again
Special situations:
    - 2 can be played regardless of the number on top of discard. Then play another card
    - 10 can be played regardles of the number on top of discard AND it will get rid of current discard pile (trashed). Then play a another card
    - if the top of the discard pile has 4 continuous cards of the same value, the discard pile gets trashed and current player gets another turn.

Players will be ranked in the order of which they got rid of all the cards



-stretch goal make IA to allow single player
----------------------
PseudoCode
----------------------
const completeDeck = []
let gameDeck =[]
let discardPile = []

class Card{
    suit = 'string'
    num = 'number'
}

Define deck()
    loop 4{
        loop 12{
            add new card to completeDeck[]
        }
    }

//completeDeck should be an an array of 48 card objects, each one having a suit and a value

class Player{
    constructor{
    hand = []
    faceup = []
    facedown = []
    }
    done = false
    position = null
    //method to check if player has cards left
    doneWithGame(){ 
        if hand, faceup and facedown are empty
        done = true
    }
    positionFinished(num){
        this.position = num
    }
}

playersArr = []
finishedPlayers[]


number of players = prompt number of players (2-4)

definePlayers(number of players){
    loop number of players
        add new player to playersArr
}
        
setUp(playersArr){
    gameDeck = shuffleDeck(completeDeck)
    drawInitialcards(PlayersArr)
}

drawCard(target){
    let topCard = gameDeck[length-1]
    gameDeck.pop
    target.push(topCard)
}

drawInitialcards(PlayersArr){
    loop players
        loop 3
            drawcard(playeri.hand)
            drawcard(playeri.faceup)
            drawcard(playeri.facedown)
}


displayCurrentPlayer(){
    - do some DOM stuff
}

pickUp(currentPlayer){
    add Discard Pile to currentPlayer.hand
}

changeCurrentPlayer(direction){
    if direction = +1 && currentPlayer is last in the array{
        current player = [0]
    }
    if direction = -1 && currentPlayer is first in the array{
        current player = [length-1]
    }
    current Player = current player + direction
    display currentPlayer
}

isLegalCardPlay(chosen card){
    if discard empty{
        reutrn true
    }
    let topDiscard = end of discard array
    if chosen card >= topDiscard return true
    if chosen card = 2 return true
    if chosen card = 10 return true
}



canPlayCard() {
    if current player has a hand {
        loop hand{
            if isLegalCardPlay{
                return true
            } 
        } else return false
    } else if current player has faceup cards{
        loop hand{
            if isLegalCardPlay{
                return true
            } 
        } else return false
    }
    return true
}


checkForSet{
    if discardlength >= 3 {
        if last 3 cards in array are the same{
            return true
        }
    }
}

playCard(){
    if have duplicate prompt want to play both? = y{
        add both to discard array
    }
    add to discard array
    if checkForSet() || chosencard === 10{
        discardPile = []
    }
}



event listener restricted to currentplayer {
    chosenAction = target.id
    if chosenAction = nolegalmoves{
        if canPlayCard{
                alert you can play something. pick a card
            }
        }
        pickUp(currentPlayer)
        changecurrentPlayer(-1)
    } else if isLegalCardPlay(chosenAction){
        playCard()
        if doneWithGame(currentPlayer){
            removecurrentPlayer of player arr
            add player to finishedplayer
            display position in which ended
            if players.length = 0 {
                gameOverDisplay()
            }
        }
        changeCurrentPlayer(+1)
    }else{
        prompt. not a legal move, choose something else
    }
}
