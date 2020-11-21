
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onClick, this);
    },

    onClick (e) {
        cc.log("sort");
        
        // get player card
        let playerIndex = 0;
        let handoutCard = cc.sys.localStorage.getItem("handoutCard");
        handoutCard = JSON.parse(handoutCard);
        let playerCard = handoutCard[playerIndex]; 
        cc.log("playerCard:", playerCard);
        
        // get placedIdxCard
        let placedIdxCard = cc.sys.localStorage.getItem("placedIdxCard");
        placedIdxCard = placedIdxCard ? JSON.parse(placedIdxCard) : [];

        // // exclude the placedCard
        // let handPlayerCard = playerCard.map((pc, i) => {
        //     let placed = placedIdxCard.includes(i);

        //     return placed ? undefined : pc;
        // });
        // cc.log("handPlayerCard:", handPlayerCard);

        // sort card
        // let sortedPlayerCard = [...handPlayerCard];
        let sortedPlayerCard = [...playerCard];
        sortedPlayerCard.sort( this.compareObj );
        cc.log("sortedPlayerCard:", sortedPlayerCard);

        for (let i = 0; i < playerCard.length; i++) {
            let newPos = sortedPlayerCard.indexOf(playerCard[i]);
            cc.log("newPos:", newPos);
            let newCardNode = cc.find("Canvas/cardDeck/card" + (newPos + 1));
            newCardNode.oneCard = newCardNode.getComponent("oneCardController");
            let gotoX = newCardNode.position.x;
            let gotoY = newCardNode.position.y;

            let stackCardNode = cc.find("Canvas/cardDeck/card" + (i + 1));
            stackCardNode.oneCard = stackCardNode.getComponent("oneCardController");

            // switch the original position
            stackCardNode.oneCard.originalPosX = gotoX;
            stackCardNode.oneCard.originalPosY = gotoY;

            newCardNode.oneCard.originalPosX = stackCardNode.position.x;
            newCardNode.oneCard.originalPosY = stackCardNode.position.y;

            cc.tween(stackCardNode)
                .to(0.1, { position: cc.v2(gotoX, gotoY) })
                .start();
        }

    },
    
    compareObj (a, b) {
        if (a.shapeCode < b.shapeCode) { 
            return -1;
        }
        if (a.shapeCode > b.shapeCode) {
            return 1;
        }
        return 0;
    }
      
});
