const cardHandler = require("./lib/cardDealerHandler");

cc.Class({
    extends: cc.Component,

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // remove the item of the key
        cc.sys.localStorage.removeItem("selectedCard");
        cc.sys.localStorage.removeItem("placedCard");
        cc.sys.localStorage.removeItem("handedCard");
        
        let cardDeck = cardHandler.getCardDeck(cardHandler.cardShapes, cardHandler.cardNumbers);
        let shuffledCardDeck = cardHandler.shuffleDeck(cardDeck);
        let handoutCard = cardHandler.handoutCard(shuffledCardDeck);

        console.log("handoutCard:", handoutCard);
        
        // save to localStorage
        cc.sys.localStorage.setItem("handoutCard", JSON.stringify(handoutCard));
    },
});
