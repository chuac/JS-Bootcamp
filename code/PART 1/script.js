function rollDie() {
    let roll = Math.floor(Math.random() * 6) + 1
    console.log(`Rolled: ${roll}`)
}

function greet(person) {
    console.log(`Hello ${person}!`)
}

function isValidPassword(password, username) {
    if ( password.length >= 8 && password.indexOf(' ') === -1 && password.indexOf(username) === -1) {
        return true
    }
    return false
}

function avg(array) {
    let sum = 0
    for (let i = 0; i < array.length; i++) {
        sum = sum + array[i];
    }
    return sum / array.length;
}

function isPangram(sentence) {
    let sen = sentence.toLowerCase();
    for (let char of 'abcdefghijklmnopqrstuvwxyz') {
        if (sen.indexOf(char) === -1) {
            return false
        }
    }
    return true
}

function getCard() {
    let value = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
    let suit = ['clubs', 'spades', 'hearts', 'diamonds']
    let value_i = Math.floor(Math.random() * (value.length)) 
    let suit_i = Math.floor(Math.random() * (suit.length))
    let res = {
        value : value[value_i],
        suit : suit[suit_i]
    }
    return res;
}

// functions as return values
function multiplyBy(num) {
    return function(x) {
        return x * num;
    }
}

const triple = multiplyBy(3); // then can call triple(5) which would give 15

// callbacks
function blah() {
    alert("Blah");
}

const btn = document.querySelector('button');
btn.addEventListener('click', blah)

// forEach accepts a callback
const numbers1 = [1, 2, 3, 4, 5];

numbers1.forEach(function (num) {
    //console.log(num);
})

// map (applying functions to collections of data)
const numbers2 = [20, 21, 22, 23, 24, 25, 26];
const words = ['lol', 'abc', 'def', 'asap'];

const doubles = numbers2.map(function (num) {
    return num * 2;
})

const numDetail = numbers2.map(function (num) {
    return { value : num, isEven: (num % 2 === 0)};
})

const newWords = words.map(function (word) {
    return word.toUpperCase().split('').join('.');
})

// Arrow functions
const square = (x) => {
    return x * x;
}

const square2 = (x) => (
    x * x
) // implicit return so no need for curly braces and return statement

const square3 = (x) => x * x;

const numbers3 = [20, 21, 22, 23, 24, 25, 26];

const doubles2 = numbers3.map((n) => {
    return n * 2;
})

const doubles3 = numbers3.map((n) => n * 2)

// Array.find
const books = [{
    title: 'Good Omens',
    authors: ['Terry Pratchett', 'Neil Gaiman'],
    rating: 4.25
  },
  {
    title: 'Bone: The Complete Edition',
    authors: ['Jeff Smith'],
    rating: 4.42
  },
  {
    title: 'American Gods',
    authors: ['Neil Gaiman'],
    rating: 4.11
  },
  {
    title: 'A Gentleman in Moscow',
    authors: ['Amor Towles'],
    rating: 4.36
  }
]

const goodBook = books.find((b) => {
    return b.rating >= 4.3;
})

// filter
const goodBooks = books.filter( (b) => {
    return b.rating > 4.3;
})

// every
const words2 = ['dog', 'wag', 'rag', 'log', 'dig'];

const allEndInG = words2.every((word) => {
    const last = word.length-1;
    return word[last] === 'g';
})

// some
const someStartWithD = words2.some((word) => {
    return word[0] === 'd';
})

// sort, revisited
const prices = [400.50, 3000, 99.99, 35.99, 12.00, 9500];

const ascSort = prices.slice().sort((a, b) => a - b);
const descSort = prices.slice().sort((a, b) => b - a);

// reduce
const numbers4 = [3, 4, 5, 6, 7];

const product = numbers4.reduce((total, currentVal) => {
    return total * currentVal;
})

const grades = [87, 64, 96, 92, 88, 99, 73, 70, 64]

const maxGrade = grades.reduce((max, currentVal) => {
    if (currentVal > max) return currentVal;
    return max;
})

const sum = [10, 20, 30, 40, 50].reduce((sum, currentVal) => {
    return sum + currentVal;
}, 1000) // same reduce but the "accumulator" now has starting value of 1000

const votes = ['y', 'y', 'n', 'y', 'n', 'y', 'n', 'n', 'n', 'y'];

const results = votes.reduce((tally, val) => {
    if (tally[val]) {
        tally[val]++;
    } else { // the key for val doesn't exist yet in tally object
        tally[val] = 1;
    }
    return tally;
}, {}) // default accumulator is an empty object

// rest parameters
function sum2(...nums) {
    return nums.reduce((total, currVal) => {
        return total + currVal;
    })
}

// destructuring arrays
const raceResults = [
    'John Doe',
    'Ben Dinh',
    'Alan Jones',
    'James Packer'
] // hypothetical results from a marathon. John is the winner, then descending

const [gold, silver, bronze] = raceResults;
const [first, , , fourth] = raceResults; // skipping over a few elements
const [winner, ...others] = raceResults; // using rest to capture the other elements

//destructuring objects
const racer = {
    firstName: 'Lewis',
    lastName: 'Hamilton',
    country: 'England',
    age: '33'
}

const {firstName, lastName} = racer; // firstName is 'Lewis', lastName is 'Hamilton'
const {
    country: nation, // uses key of country to access racer object and save it as nation
    ...other // rest will pick up everything else about racer and put it into an object
} = racer;

// computed object properties
const role = 'Director';
const person = 'James Cameron';

const team = {
    [role] : person // the computed key will now be value of role variable which is 'Director'
}

// adding methods to objects
const math = {
    add: function (x, y) {
        return x + y;
    },
    multiply: function (x, y) {
        return x * y;
    }
}
// shorthand way of adding methods to objects
const mathShorthand = {
    add(x, y) {
        return x + y;
    },
    multiply(x, y) {
        return x * y;
    }
}

// 'this' keyword
function sayHi() {
    console.log('HI');
    console.log(this); // this refers to the window (global scope ofject in the browser)
}
// using 'this' keyword in methods
const person2 = {
    first: 'James',
    last: 'Hunt',
    nickName: 'Jimmy',
    test() {
        console.log(this);
    },
    fullName() {
        console.log(`${this.first} ${this.last} AKA ${this.nickName}`)
    }, // would be dynamically updated if we called person.nickName = 'JIMMYYY' later on, for e.g.
    printBio() {
        const fullName = this.fullName(); // this wouldn't work without 'this' keyword
        console.log(`${fullName} is a person!`)
    }
}
const printBio = person2.printBio; // calling just printBio() in the console returns global window scope'd 'this'!!

// seeing how arrow functions can be helpful with 'this'
// setInterval is a global window method so if we didn't use arrow function, calling this 
// inside it would refer to the global scope window, not our printer object
// we dynamically add timerID to this object (printer) so we can stop the automatic timing method in stop()
const printer = {
    phrases: ["lol", "lmao", "ayy", "yoo"],
    pickPhrase() {
        const {phrases} = this; // deconstruct this object and store phrases into phrases
        const index = Math.floor(Math.random() * phrases.length);
        return phrases[index];
    },
    start() {
        this.timerId = setInterval(() => { // setInterval is a global window method so if we didn't use arrow function, calling this inside it would refer to the global scope window, not our printer object
            console.log(this.pickPhrase())
        }, 3000)
    },
    stop() {
        clearInterval(this.timerId);
        console.log("Printer stopped");
    }
}

// putting it all together: Deck of Cards
function makeDeck() {
    const deck = []
    const suits = ['hearts', 'clubs', 'spades', 'diamonds'];
    const values = "2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A";
    for (let value of values.split(',')) {
        for (let suit of suits) {
            deck.push({
                value,
                suit
            }) // shorthand object properties
        }
    }
    return deck;
}

function drawCard(deck) {
    return deck.pop();
}

// const myDeck = makeDeck(); // old way without using this keyword
// const card1 = drawCard(myDeck); // tedious having to pass around our deck to draw card

// vvv new way using this
const myDeck = {
    deck: [],
    drawnCards: [],
    suits: ['hearts', 'clubs', 'spades', 'diamonds'],
    values: "2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A",
    initDeck() {
        const {deck, suits, values} = this;
        for (let value of values.split(',')) {
            for (let suit of suits) {
                deck.push({
                    value,
                    suit
                }) // shorthand object properties
            }
        }
    },
    drawCard() {
        const drawnCard = this.deck.pop();
        this.drawnCards.push(drawnCard);
        return drawnCard;
    },
    drawMultiple(numCards) {
        const cards = [];
        for (let i = 0; i < numCards; i++) {
            cards.push(this.drawCard());
        }
        return cards;
    },
    shuffle() {
        const {deck} = this;
        // loop over array backwards. Fisher-Yates Shuffle
        for (let i = deck.length - 1; i > 0; i--) {
            // pick random index before current element
            let j = Math.floor(Math.random() * (i + 1));
            // swap, using shorthand
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }
    // don't need return statement because the deck will be stored in deck property
}

// how to create more of these deck objects?? put it in a function (quick & dirty way)
function deckFactory() {
    return {
        deck: [],
        drawnCards: [],
        suits: ['hearts', 'clubs', 'spades', 'diamonds'],
        values: "2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A",
        initDeck() {
            const {deck, suits, values} = this;
            for (let value of values.split(',')) {
                for (let suit of suits) {
                    deck.push({
                        value,
                        suit
                    }) // shorthand object properties
                }
            }
        },
        drawCard() {
            const drawnCard = this.deck.pop();
            this.drawnCards.push(drawnCard);
            return drawnCard;
        },
        drawMultiple(numCards) {
            const cards = [];
            for (let i = 0; i < numCards; i++) {
                cards.push(this.drawCard());
            }
            return cards;
        },
        shuffle() {
            const {deck} = this;
            // loop over array backwards. Fisher-Yates Shuffle
            for (let i = deck.length - 1; i > 0; i--) {
                // pick random index before current element
                let j = Math.floor(Math.random() * (i + 1));
                // swap, using shorthand
                [deck[i], deck[j]] = [deck[j], deck[i]];
            }
        }
    }
}

const myNewDeck = deckFactory(); // would hold a new deck object with all those methods too
const myNewDeck2 = deckFactory(); // can create multiple objects