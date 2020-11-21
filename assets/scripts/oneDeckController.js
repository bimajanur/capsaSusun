const cardHandler = require("./lib/cardDealerHandler");

cc.Class({
    extends: cc.Component,

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // remove the item of the key
        cc.sys.localStorage.removeItem("pickedIdxCard");
        cc.sys.localStorage.removeItem("placedIdxCard");
        
        // set done button unvisible
        let doneBtnNode = cc.find("Canvas/doneButton");
        doneBtnNode.active = false;

        let cardDeck = cardHandler.getCardDeck(cardHandler.cardShapes, cardHandler.cardNumbers);
        let shuffledCardDeck = cardHandler.shuffleDeck(cardDeck);
        let handoutCard = cardHandler.handoutCard(shuffledCardDeck);

        // save to localStorage
        cc.sys.localStorage.setItem("handoutCard", JSON.stringify(handoutCard));

        //handling handout animation
        for(let i = 0; i < 13; i++) {
            cardNode = this.node.getChildByName("card" + (i + 1));
            cardNode.oneCard = cardNode.getComponent("oneCardController");

            let gotoX = 55 + (i * 55);
            let gotoY = 50;
            cc.tween(cardNode)
                .to(0.3, { position: cc.v2(gotoX, gotoY) })
                .start();

            //set default position
            cardNode.oneCard.originalPosX = gotoX;
            cardNode.oneCard.originalPosY = gotoY;
        }

    },
});
