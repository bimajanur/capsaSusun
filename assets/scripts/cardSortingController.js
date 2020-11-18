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

    onClick (e) {
        // e.stopPropagation();
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
        
        let startPlaceIndex = this.placeIndex;
        for(let i = 0; i < selectedCard.length; i++){
            // get selectedCardDetail
            let selectedCardDetail = playerCard[selectedCard[i]];
            
            // simpan penghuni sebelumnya 
            let penghuniSebelumnya = placedCard[idPos] ? selectedCard[i] : undefined; 
                        
            // put selectedCardDetail to placedCard
            let idPos = startPlaceIndex > 12 ? startPlaceIndex - 13 : startPlaceIndex;
            placedCard[idPos] = selectedCardDetail;

            // get position of place card
            let placeCardNode = cc.find("Canvas/sortedDeck/cardPlace" + (idPos + 1));
            let gotoX = placeCardNode.position.x;
            let gotoY = placeCardNode.position.y;
            
            // move card to place card
            let movedCardNode = cc.find("Canvas/cardDeck/card" + (selectedCard[i] + 1));
            cc.tween(movedCardNode)
                .to(0.1, { position: cc.v2(gotoX, gotoY) })
                .start();

            // set selected false for moved card
            movedCardNode.oneCard = movedCardNode.getComponent("oneCardController");
            movedCardNode.oneCard.selected = false;

            cc.log("penghuniSebelumnya:", penghuniSebelumnya);
            // //handle kartu bertumpuk di placeCard, kembalikan posisi ke original
            // if(penghuniSebelumnya){
            //     let stackCardNode = cc.find("Canvas/cardDeck/card" + (penghuniSebelumnya + 1));
            //     cc.log("penghuniSebelumnya:", stackCardNode);
            //     let originalPosX = stackCardNode.oneCard.originalPosX;
            //     let originalPosY = stackCardNode.oneCard.originalPosY;
            //     cc.tween(stackCardNode)
            //         .to(0.1, { position: cc.v2(originalPosX, originalPosY) })
            //         .start();
            // }

            startPlaceIndex++;
        }
            
        // empty `selectedCard` localStorage
        cc.sys.localStorage.removeItem("selectedCard");

        // save placedCard to localStorage
        cc.sys.localStorage.setItem("placedCard", JSON.stringify(placedCard));
        
    },
});
