module.exports = {
    
    cardNumbers: [
        { display: "2", code: "2" },
        { display: "3", code: "3" },
        { display: "4", code: "4" },
        { display: "5", code: "5" },
        { display: "6", code: "6" },
        { display: "7", code: "7" },
        { display: "8", code: "8" },
        { display: "9", code: "9" },
        { display: "10", code: "T" },
        { display: "J", code: "J" },
        { display: "Q", code: "Q" },
        { display: "K", code: "K" },
        { display: "A", code: "A" },
    ],

    cardShapes: [
        { shape: "club", code: "C", color: "BLACK" }, 
        { shape: "spade", code: "S", color: "BLACK" }, 
        { shape: "heart", code: "H", color: "RED" }, 
        { shape: "diamond", code: "D", color: "RED" }, 
    ],

    getCardDeck: (cardShapes, cardNumbers) => {
        let cardDeck = cardShapes.reduce((total, shape) => {
            let shapeNumberCombined = cardNumbers.map((number) => {
                return {
                    number: number.display,
                    numberCode: number.code,
                    shape: shape.shape, 
                    shapeCode: shape.code, 
                    color: shape.color
                }
            });

            return [...total, ...shapeNumberCombined]
        }, []);

        return cardDeck;
    },

    shuffleDeck: (cardDeck) => {
        let shuffleCardDeck = cardDeck;

        for (let i = shuffleCardDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffleCardDeck[i], shuffleCardDeck[j]] = [shuffleCardDeck[j], shuffleCardDeck[i]];
        }

        return shuffleCardDeck;
    },

    handoutCard: (cardDeck) => {
        const size = 13;
        let splittedDeck = [];
        for(let i = 0; i < cardDeck.length; i += size) {
            splittedDeck.push(cardDeck.slice(i, i + size));
        }
        return splittedDeck;
    },

}