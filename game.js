const deck = [];
const suits = ['♥', '♦', '♣', '♠'];
const values = [
    { name: '2', rank: 2 },
    { name: '3', rank: 3 },
    { name: '4', rank: 4 },
    { name: '5', rank: 5 },
    { name: '6', rank: 6 },
    { name: '7', rank: 7 },
    { name: '8', rank: 8 },
    { name: '9', rank: 9 },
    { name: '10', rank: 10 },
    { name: 'J', rank: 11 },
    { name: 'Q', rank: 12 },
    { name: 'K', rank: 13 },
    { name: 'A', rank: 14 },
];

// إنشاء مجموعة البطاقات
for (let suit of suits) {
    for (let value of values) {
        deck.push({ suit: suit, value: value.name, rank: value.rank });
    }
}

// خلط البطاقات
function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

shuffle(deck);

// تقسيم البطاقات بين اللاعبين
const player1Deck = deck.slice(0, 26);
const player2Deck = deck.slice(26);

function playRound() {
    if (player1Deck.length === 0 || player2Deck.length === 0) {
        document.getElementById('winner').innerText = 'اللعبة انتهت!';
        return;
    }

    const player1Card = player1Deck.shift();
    const player2Card = player2Deck.shift();

    document.getElementById('player1Card').innerText = `${player1Card.value}${player1Card.suit}`;
    document.getElementById('player2Card').innerText = `${player2Card.value}${player2Card.suit}`;

    if (player1Card.rank > player2Card.rank) {
        player1Deck.push(player1Card, player2Card);
        document.getElementById('winner').innerText = 'اللاعب 1 يفوز بالجولة!';
    } else if (player1Card.rank < player2Card.rank) {
        player2Deck.push(player1Card, player2Card);
        document.getElementById('winner').innerText = 'اللاعب 2 يفوز بالجولة!';
    } else {
        document.getElementById('winner').innerText = 'تعادل!';
    }
}
