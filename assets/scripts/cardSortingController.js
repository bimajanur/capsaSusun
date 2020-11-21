
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
        
        // get pickedIdxCard
        let pickedIdxCard = cc.sys.localStorage.getItem("pickedIdxCard");
        pickedIdxCard = pickedIdxCard? JSON.parse(pickedIdxCard) : [];

        // get placedIdxCard
        let placedIdxCard = cc.sys.localStorage.getItem("placedIdxCard");
        placedIdxCard = placedIdxCard ? JSON.parse(placedIdxCard) : [];
        
        let startPlaceIndex = this.placeIndex;
        for(let i = 0; i < pickedIdxCard.length; i++){
       
            let idPos = startPlaceIndex > 12 ? startPlaceIndex - 13 : startPlaceIndex;
            
            // cari di placedIdxCard apakah sudah terpilih, lalu hapus dari tempat sebelumnya
            let currentPos = placedIdxCard.indexOf(pickedIdxCard[i]);
            placedIdxCard[currentPos] = null;

            // simpan penghuni sebelumnya, dan replace dengan yang baru 
            let penghuniSebelumnya = placedIdxCard[idPos] ? placedIdxCard[idPos] : undefined; 
            placedIdxCard[idPos] = pickedIdxCard[i];

            // get position of place card
            let placeCardNode = cc.find("Canvas/sortedDeck/cardPlace" + (idPos + 1));
            let gotoX = placeCardNode.position.x;
            let gotoY = placeCardNode.position.y;
            
            // move card to place card
            let movedCardNode = cc.find("Canvas/cardDeck/card" + (pickedIdxCard[i] + 1));
            cc.tween(movedCardNode)
                .to(0.1, { position: cc.v2(gotoX, gotoY) })
                .start();

            // set picked false for moved card
            movedCardNode.oneCard = movedCardNode.getComponent("oneCardController");
            movedCardNode.oneCard.picked = false;

            // handle kartu bertumpuk di placeCard, kembalikan posisi ke original
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
        
        // empty `pickedIdxCard` localStorage
        cc.sys.localStorage.removeItem("pickedIdxCard");
        // save placedIdxCard to localStorage
        cc.sys.localStorage.setItem("placedIdxCard", JSON.stringify(placedIdxCard));

        let isFull = false;
        for (let i = 0; i < 13; i++) {
            if (placedIdxCard[i] != undefined) isFull = true;
            else {
                isFull = false;
                break;
            }
        }
        if (isFull) {
            let doneBtnNode = cc.find("Canvas/doneButton");
            doneBtnNode.active = true;
        }
    },

});
