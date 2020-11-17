const cardPlacement = require("./lib/cardPlacementHandler");

cc.Class({
    extends: cc.Component,

    properties: {
        placeIndex:{
            default: 0,
            type: cc.Integer
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onClick, this);
    },

    onClick () {
        cc.log("selected place index:", this.placeIndex);
        
        // get selectedCard
        let selectedCard = cc.sys.localStorage.getItem("selectedCard");
        selectedCard = selectedCard? JSON.parse(selectedCard) : [];

        // get player index
        let playerIndex = 0;

        // get player card
        let handoutCard = cc.sys.localStorage.getItem("handoutCard");
        handoutCard = JSON.parse(handoutCard);
        let playerCard = handoutCard[playerIndex];

        // getPlacedcard
        let placedCard = cc.sys.localStorage.getItem("placedCard");
        placedCard = placedCard ? JSON.parse(placedCard) : [];
        
        // get selectedCardDetail
        let selectedCardDetail = playerCard[selectedCard[0]];
        cc.log("selectedCardDetail:", selectedCardDetail);

        // put selectedCardDetail to placedCard
        placedCard[this.placeIndex] = selectedCardDetail;
        cc.log("placedCard:", placedCard);

        // save placedCard to localStorage
        cc.sys.localStorage.setItem("placedCard", JSON.stringify(placedCard));
        

    },
});
