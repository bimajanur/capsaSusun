
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
        
        // ANIMATION PART

        for(let i = 0; i < placedIdxCard.length; i++) {
            let movedCardNode = cc.find("Canvas/cardDeck/card" + (placedIdxCard[i] + 1));
            movedCardNode.oneCard = movedCardNode.getComponent("oneCardController");

            let originalPosX = movedCardNode.oneCard.originalPosX;
            let originalPosY = movedCardNode.oneCard.originalPosY;

            cc.tween(movedCardNode)
                .to(0.1, { position: cc.v2(originalPosX, originalPosY) })
                .start();

            // remove in placedcard
            placedIdxCard[i] = null;
        }
        
        cc.sys.localStorage.setItem("placedIdxCard", JSON.stringify(placedIdxCard));
    }
});
