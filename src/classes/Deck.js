/**
 * @file Deck.js file
 * @author Lance on 2017-03-10.
 */
import Card from './Card'

const instruction1 = 7;
const instruction2 = 7;
const instruction3 = 7;
const instruction4 = 0;

const group2 = 1;
const group3 = 2;
const group4 = 3;
const group5 = 2;
const group6 = 1;
const group7 = 0;
const group8 = 0;

const repetition2 = 4;
const repetition3 = 4;
const repetition4 = 0;
const repetitionX = 4;

const variable2 = 2;
const variable3 = 2;
const variable4 = 1;

const hack = 3;

const cardDeck = [
  {type:'I', cardValue: 1, cardImg: '', howMany: instruction1},
  {type:'I', cardValue: 2, cardImg: '', howMany: instruction2},
  {type:'I', cardValue: 3, cardImg: '', howMany: instruction3},
  {type:'I', cardValue: 4, cardImg: '', howMany: instruction4},

  {type:'R', cardValue: 2, cardImg: '', howMany: repetition2},
  {type:'R', cardValue: 3, cardImg: '', howMany: repetition3},
  {type:'R', cardValue: 4, cardImg: '', howMany: repetition4},
  {type:'R', cardValue: 1, cardImg: '', howMany: repetitionX},

  {type:'G', cardValue: 2, cardImg: '', howMany: group2},
  {type:'G', cardValue: 3, cardImg: '', howMany: group3},
  {type:'G', cardValue: 4, cardImg: '', howMany: group4},
  {type:'G', cardValue: 5, cardImg: '', howMany: group5},
  {type:'G', cardValue: 6, cardImg: '', howMany: group6},
  {type:'G', cardValue: 7, cardImg: '', howMany: group7},
  {type:'G', cardValue: 8, cardImg: '', howMany: group8},

  {type:'V', cardValue: 2, cardImg: '', howMany: variable2},
  {type:'V', cardValue: 3, cardImg: '', howMany: variable3},
  {type:'V', cardValue: 4, cardImg: '', howMany: variable4},

  {type:'H', cardValue: 0, cardImg: '', howMany: hack},
]

export default class Deck {
  /**
   * The constructor for the Deck class
   * @constructor Deck
   */
  constructor(){
    //this.initDeck();
    this.cards = [];
    this.discard_cards = [];
  };

  /**
   * initDeck function to initialize the deck with a pre determined number and type of cards
   * @memberOf Deck
   */
  initDeck(value) {
    let cardId = 0;
    for(let k = 0; k < value; k++) {
      for (var i = 0; i < cardDeck.length; i++) {
        for (var j = 0; j < cardDeck[i].howMany; j++) {
          this.cards.push(new Card(cardId, cardDeck[i].cardValue, cardDeck[i].type));
          cardId++;
        }
      }
    }
    this.shuffle();
  };//end Init game

  /**
   * draw function returns the card at the front (top) of the deck and removes it from the deck
   * @memberOf Deck
   * @returns {Card}
   */
  draw() {
    let card = this.cards[0];//[0] is the top of the deck
    this.cards.shift();//unshift removes the first element.
    return card;
  };

  /**
   * shuffle function that will psuedo shuffle the contents of the deck into a random order
   * @memberOf Deck
   */
  shuffle() {
    for (let i = this.cards.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [this.cards[i - 1], this.cards[j]] = [this.cards[j], this.cards[i - 1]];
    }
  }

}
