cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onClick, this);
    },

    onClick (e) {

        // get placedIdxCard
        let placedIdxCard = cc.sys.localStorage.getItem("placedIdxCard");
        placedIdxCard = placedIdxCard ? JSON.parse(placedIdxCard) : [];
        
        // get player card
        let playerIndex = 0;
        let handoutCard = cc.sys.localStorage.getItem("handoutCard");
        handoutCard = JSON.parse(handoutCard);
        let playerCard = handoutCard[playerIndex]; 
        
        // get placed card detail
        let placedCardDetail = placedIdxCard.map((pcId) => {
            return playerCard[pcId];
        });
        
        handoutCard[playerIndex] = placedCardDetail;
        
        // save updated handout to localStorage
        cc.sys.localStorage.setItem("handoutCard", JSON.stringify(handoutCard));

    },

    // update (dt) {},
});
