module.exports = {
    
    cardNumbers: [
        "2", "3", "4", 
        "5", "6", "7", 
        "8", "9", "10", 
        "J", "Q", "K", "A",  
    ],

    cardShapes: [
        { shape: "club", color: "BLACK" }, 
        { shape: "spade", color: "BLACK" }, 
        { shape: "heart", color: "RED" }, 
        { shape: "diamond", color: "RED" }, 
    ],

    getCardDeck: (cardShapes, cardNumbers) => {
        let cardDeck = cardShapes.reduce((total, shape) => {
            let shapeNumberCombined = cardNumbers.map((number) => {
                return {
                    number: number,
                    shape: shape.shape, 
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