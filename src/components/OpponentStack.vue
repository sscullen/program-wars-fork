<template>
  <div @dragover.prevent @drop="drop" @ontouchend="drop" id="stack" :class="stackCss" @click="stackClicked()" @click.stop>
    <ul id="example-1">

      <span>Stack Score: {{ score }}</span>


      <button v-if="activeCardIsHack" class="btn btn-danger" :class="buttonStyle" v-on:click="hackStackClicked">
        HACK
      </button>
      <br>

      <li v-for="card in cards">
            <card :cardData="card" v-on:cardClicked="cardClickedInStack(card, $event)" :inStack="true"></card>
      </li>


    </ul>
  </div>
</template>

<script>

  import { bus } from './Bus';
import Card from './Card'


export default {
  name: 'opponent-stack',
  props: ['playfieldBoolean', 'stackId', 'playerId'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      title: 'Stack',
      id: this.stackId,
    }
  },
  computed: {
    cards () {

      if (this.playerId === this.$store.getters.getCurrentPlayerId ) {
        if (this.$store.getters.getCurrentPlayerStacks.length !== 0) {
          let stack = this.$store.getters.getCurrentPlayerStacks.find(stack => stack.stackId === this.stackId)
          if (stack !== undefined) {
            return stack.cards
          } else {
            return []
          }
        }
      } else {
        let stack = this.$store.getters.getStacks.find(stack => stack.stackId === this.stackId)
        if (stack !== undefined) {
          return stack.cards
        } else {
          return []
        }

      }

    },
    activeCardIsHack() {
        if (this.$store.getters.getActiveCard !== undefined && this.$store.getters.getActiveCard.type === 'H') {
          let stack = this.$store.getters.getStacks.find(stack => stack.stackId === this.stackId)
            if(stack !== undefined && stack.cards[0].type !== 'G') {
              return true
            } else {
                return false
            }
        } else {
            return false
        }
    },
    stackCss () {
      return 'stack'
    },
    buttonStyle() {
      return ''
    },
    score() {
        let thisStack = this.$store.getters.getStacks.find(stack => stack.stackId === this.stackId)
         thisStack.calculateStackScore()
          return thisStack.score
    },
    selectedStacksLength () {
      let selectedStacks = this.$store.getters.getSelectedStacks

      for (let stack of selectedStacks) {
          if (stack.stackId === this.stackId)
              return true
      }
      return false
    }
  },
  created: function () {
    bus.$on('cardClickedStack', (event, card) => {
      // a card was selected
      if (card.category !== 'stack') {
        if (card.selected === true) {
          this.activeCard = Object.assign({}, card);

          this.activeCard.category = 'stack'
          this.activeCard.selected = false
        }
      }
    })

    bus.$on('cardDeselected', () => {
      this.activeCard = undefined
      this.$store.commit('setActiveCardUndefined')
      this.$store.commit('removeAllSelectedStacks')
    })
  },
  methods: {
    cardAddClicked () {
      this.$emit('cardAddClicked', this.id)

    },
    hide () {
    },
    stackClicked () {
    },
    cardClickedInStack(event, card) {
    },
    addToStack() {

      if (this.$store.getters.getActiveCard !== undefined) {
        let activeCard = this.$store.getters.getActiveCard
        // get the stack data model that goes with this stack component
        let thisStack = this.$store.getters.getStacks.find(stack => this.stackId === stack.stackId)

        switch (activeCard.type) {
          case 'H':
              this.$store.commit('stackDiscard', {stackId: this.stackId})
              this.$store.commit('removeStack', {stackId: this.stackId})
              this.$store.commit('removeActiveCardFromHand')
              // the previous stack has an instruction card, give the player a new empty stack
              bus.$emit('cardDeselected')
              this.$store.commit('setHasPlayed', {hasPlayed: true})
            break;
          default:
              return '';
              break;
        }
        if(this.$store.getters.getHasPlayed) {
          bus.$emit('playerHasPlayed');
        }
      }
    },
    hackStackClicked() {
        this.addToStack()
    },
    drop () {
      this.addToStack()
    }
  },
  components: {
    'card': Card
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#stack{
    background-color: #cff;
    width: 100%;

    color: #000;
}


h1, h2 {
  font-weight: normal;
  font-size: 1em;
}

ul {
  list-style-type: none;
  padding: 0;
  width: 100%;
}


li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.value {
    font-weight: bold;
    font-size: 5em;
}
.type {
    font-weight: bold;
    font-size: 2em;
}

.selected {
    -webkit-box-shadow: 0px 0px 25px 4px rgba(119,194,6,1);
    -moz-box-shadow: 0px 0px 25px 4px rgba(119,194,6,1);
    box-shadow: 0px 0px 25px 4px rgba(119,194,6,1);
}


</style>
