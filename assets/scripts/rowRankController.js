const CardRanking = require("./lib/cardRankingHandler");

cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onClick, this);
    },

    onClick () {
        
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
        
        // set row cards
        let rowDetails = [
            placedCardDetail.slice(0, 3),
            placedCardDetail.slice(3, 8),
            placedCardDetail.slice(8, 13)
        ];
        
        let rowRanks = rowDetails.map(this.determinedRankCard);

        // calculate rank label
        rowRanks.forEach(this.getRowRank);

    },

    getRowRank (rank, i, arr) {

        let benarSusun = true; 

        let thisNode = cc.find("Canvas/sortedDeck");

        let rankLabelNode = thisNode.getChildByName("row" + (i + 1) + "RankLabel");
        let rankLabel = rankLabelNode.getComponent(cc.Label);
        
        rankLabel.string = rank.rankName;

        if (i > 0) {
            let isWin = CardRanking.compareHands(rank, arr[i - 1]);
            benarSusun = benarSusun ? isWin >= 0 : false;

            if(!benarSusun){
                let rankLabelNodeUp = thisNode.getChildByName("row" + i + "RankLabel");
                rankLabelNodeUp.color = cc.Color.RED;
                rankLabelNode.color = cc.Color.RED;
            } else {
                rankLabelNode.color = cc.Color.WHITE;
            }
        } else {
            benarSusun = true;
            rankLabelNode.color = cc.Color.WHITE;
        }
    },

    determinedRankCard (rowCards) {
        let rowCardCodes = CardRanking.generateCodeRow(rowCards);

        // determined rank card arrangement
        let hand = { rankName: "" };
        if(rowCardCodes.length > 0) hand = CardRanking.getRank(rowCardCodes);
        
        return hand;
    }

});
