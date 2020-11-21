
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

        // fill empty array
        for(let i = 0; i < 13; i++) {
            placedIdxCard[i] = placedIdxCard[i] != undefined ? placedIdxCard[i] : null; 
        }

        // set row cards
        let rowIdx = [
            placedIdxCard.slice(0, 3),
            placedIdxCard.slice(3, 8),
            placedIdxCard.slice(8, 13)
        ];
        
        // ANIMATION PART

        for(let i = 3; i < 8; i++) {
            if(placedIdxCard[i] != null) {

                // move card to place card
                let placeCardNode = cc.find("Canvas/sortedDeck/cardPlace" + (i + 5 + 1));
                let gotoX = placeCardNode.position.x;
                let gotoY = placeCardNode.position.y;

                let movedCardNode = cc.find("Canvas/cardDeck/card" + (placedIdxCard[i] + 1));
                cc.tween(movedCardNode)
                    .to(0.1, { position: cc.v2(gotoX, gotoY) })
                    .start();
                    
            }
        }

        for(let i = 8; i < 13; i++) {
            if(placedIdxCard[i] != null) {

                // move card to place card
                let placeCardNode = cc.find("Canvas/sortedDeck/cardPlace" + (i - 5 + 1));
                let gotoX = placeCardNode.position.x;
                let gotoY = placeCardNode.position.y;

                let movedCardNode = cc.find("Canvas/cardDeck/card" + (placedIdxCard[i] + 1));
                cc.tween(movedCardNode)
                    .to(0.1, { position: cc.v2(gotoX, gotoY) })
                    .start();
                    
            }
        }

        // DATA PART

        // replace row 1 -> 2
        [rowIdx[1], rowIdx[2]] = [rowIdx[2], rowIdx[1]];

        // save to localStorage
        placedIdxCard = [...rowIdx[0], ...rowIdx[1], ...rowIdx[2]];
        cc.sys.localStorage.setItem("placedIdxCard", JSON.stringify(placedIdxCard));

    }
});
