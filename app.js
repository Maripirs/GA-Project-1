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



const defineDeck =() =>{
    for (let i = 0; i < suits.length; i++){
        for(let j = 0; j<13; j++){
            let newCard = new Card (suits[i], j+1)
            completeDeck.push(newCard)
        }
    }
}

defineDeck()
console.log(completeDeck)