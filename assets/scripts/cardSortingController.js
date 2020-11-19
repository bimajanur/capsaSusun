const { Hand } = require("./lib/pokerBig2solver");

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

        let hand1 = Hand.solve(['Ad', '5d', '2d', '3d', '4d']);
        let hand2 = Hand.solve(['As', 'Ks', 'Qs', 'Js', '10s']);
        let winner = Hand.winners([hand1, hand2]); // hand2

        cc.log("hand1:", hand1);
        cc.log("hand2:", hand2);
        cc.log("winner:", winner);
    },

    onClick (e) {
        // e.stopPropagation();
        cc.log("selected place index:", this.placeIndex);
        
        // get selectedIdxCard
        let selectedIdxCard = cc.sys.localStorage.getItem("selectedIdxCard");
        selectedIdxCard = selectedIdxCard? JSON.parse(selectedIdxCard) : [];

        // // get player index
        // let playerIndex = 0;

        // // get player card
        // let handoutCard = cc.sys.localStorage.getItem("handoutCard");
        // handoutCard = JSON.parse(handoutCard);
        // let playerCard = handoutCard[playerIndex];

        // get placedIdxCard
        let placedIdxCard = cc.sys.localStorage.getItem("placedIdxCard");
        placedIdxCard = placedIdxCard ? JSON.parse(placedIdxCard) : [];
        
        let startPlaceIndex = this.placeIndex;
        for(let i = 0; i < selectedIdxCard.length; i++){
            // // get selectedCardDetail
            // let selectedCardDetail = playerCard[selectedIdxCard[i]];
            
            let idPos = startPlaceIndex > 12 ? startPlaceIndex - 13 : startPlaceIndex;
            
            // simpan penghuni sebelumnya, dan replace dengan yang baru 
            let penghuniSebelumnya = placedIdxCard[idPos] ? placedIdxCard[idPos] : undefined; 
            placedIdxCard[idPos] = selectedIdxCard[i];

            // get position of place card
            let placeCardNode = cc.find("Canvas/sortedDeck/cardPlace" + (idPos + 1));
            let gotoX = placeCardNode.position.x;
            let gotoY = placeCardNode.position.y;
            
            // move card to place card
            let movedCardNode = cc.find("Canvas/cardDeck/card" + (selectedIdxCard[i] + 1));
            cc.tween(movedCardNode)
                .to(0.1, { position: cc.v2(gotoX, gotoY) })
                .start();

            // set selected false for moved card
            movedCardNode.oneCard = movedCardNode.getComponent("oneCardController");
            movedCardNode.oneCard.selected = false;

            //handle kartu bertumpuk di placeCard, kembalikan posisi ke original
            if(penghuniSebelumnya){
                let stackCardNode = cc.find("Canvas/cardDeck/card" + (penghuniSebelumnya + 1));
                let originalPosX = stackCardNode.oneCard.originalPosX;
                let originalPosY = stackCardNode.oneCard.originalPosY;
                cc.tween(stackCardNode)
                    .to(0.1, { position: cc.v2(originalPosX, originalPosY) })
                    .start();
            }

            startPlaceIndex++;
        }
            
        // empty `selectedIdxCard` localStorage
        cc.sys.localStorage.removeItem("selectedIdxCard");

        // save placedIdxCard to localStorage
        cc.log("placedIdxCard", placedIdxCard);
        cc.sys.localStorage.setItem("placedIdxCard", JSON.stringify(placedIdxCard));
        
        // determined rank card arrangement

    },
});
