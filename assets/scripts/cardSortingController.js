const CardRanking = require("./lib/cardRankingHandler");

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
        cc.log("picked place index:", this.placeIndex);
        
        // get pickedIdxCard
        let pickedIdxCard = cc.sys.localStorage.getItem("pickedIdxCard");
        pickedIdxCard = pickedIdxCard? JSON.parse(pickedIdxCard) : [];

        // get placedIdxCard
        let placedIdxCard = cc.sys.localStorage.getItem("placedIdxCard");
        placedIdxCard = placedIdxCard ? JSON.parse(placedIdxCard) : [];
        
        let startPlaceIndex = this.placeIndex;
        for(let i = 0; i < pickedIdxCard.length; i++){
            // // get pickedCardDetail
            // let pickedCardDetail = playerCard[pickedIdxCard[i]];
            
            let idPos = startPlaceIndex > 12 ? startPlaceIndex - 13 : startPlaceIndex;
            
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
            // TODO: data di pickedCard diupdate
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
        
        // get player card
        let playerIndex = 0;
        let handoutCard = cc.sys.localStorage.getItem("handoutCard");
        handoutCard = JSON.parse(handoutCard);
        let playerCard = handoutCard[playerIndex]; 

        // get placed card detail
        let placedCardDetail = placedIdxCard.map((pcId) => {
            return playerCard[pcId];
        });
        
        let rowDetails = [
            placedCardDetail.slice(0, 3),
            placedCardDetail.slice(3, 8),
            placedCardDetail.slice(8, 13)
        ];
        
        let rowRanks = rowDetails.map(this.determinedRankCard);

        let benarSusun = true; 
        rowRanks.forEach((rank, i, arr) => {
            let rankLabelNode = this.node.parent.getChildByName("row" + (i + 1) + "RankLabel");
            let rankLabel = rankLabelNode.getComponent(cc.Label);
            
            rankLabel.string = rank.rankName;
    
            if (i > 0) {
                let isWin = CardRanking.compareHands(rank, arr[i - 1]);
                benarSusun = benarSusun ? isWin >= 0 : false;
            } else {
                benarSusun = true;
            }
        });

        for(let i = 0; i < 3; i++){
            let rankLabelNode = this.node.parent.getChildByName("row" + (i + 1) + "RankLabel");
            if(!benarSusun){
                rankLabelNode.color = cc.Color.RED;
            } else {
                rankLabelNode.color = cc.Color.WHITE;
            }
        }
    },

    determinedRankCard (rowCards) {
        let rowCardCodes = rowCards.reduce((row, card) => {
            if (card && card.numberCode && card.numberCode){
                return [...row, card.numberCode + card.shapeCode];
            } else {
                return [...row];
            }
        }, []);

        // determined rank card arrangement
        let hand = { rankName: "" };
        if(rowCardCodes.length > 0)
            hand = CardRanking.getRank(rowCardCodes);
        
        return hand;
    }

    // update(){
    //     cc.log("re-render");
    // }
});
