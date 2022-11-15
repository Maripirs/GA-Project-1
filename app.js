const completeDeck = []
let gameDeck =[]
let discardPile = []
let cardsInDiscard = 0
const suits = ['spades', 'clubs', 'hearts', 'diamonds']



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
  


const defineDeck =() =>{
    for (let i = 0; i < suits.length; i++){
        for(let j = 0; j<13; j++){
            let newCard = new Card (suits[i], j+2)
            completeDeck.push(newCard)
        }
    }
}

const shuffleDeck = (deck) =>{
    newDeck = [...deck]
    while (newDeck.length >0){
        let randomIndex= randomNum(0,newDeck.length-1)
        gameDeck.push(newDeck[randomIndex]);
        newDeck.splice(randomIndex,1)
    }
}

defineDeck()
shuffleDeck(completeDeck)
// console.log(completeDeck)
console.log(gameDeck)