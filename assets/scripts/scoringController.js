const CardRanking = require("./lib/cardRankingHandler");
const AutoMove = require("./lib/autoMoveHandler");

cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // get player card
        let handoutCard = cc.sys.localStorage.getItem("handoutCard");
        handoutCard = JSON.parse(handoutCard);

        // do some enemy auto move
        handoutCard = this.playerAutoMove(handoutCard, 1);
        handoutCard = this.playerAutoMove(handoutCard, 2);
        handoutCard = this.playerAutoMove(handoutCard, 3);

        // save data to localStorage
        cc.sys.localStorage.setItem("handoutCard", JSON.stringify(handoutCard));
    
        // do the scoring
        let playerPoints = [
            { playerId: 1, rowPoint: [ 0, 0, 0 ], totalPoint: 0, salahSusun: false, },
            { playerId: 2, rowPoint: [ 0, 0, 0 ], totalPoint: 0, salahSusun: false, },
            { playerId: 3, rowPoint: [ 0, 0, 0 ], totalPoint: 0, salahSusun: false, },
            { playerId: 4, rowPoint: [ 0, 0, 0 ], totalPoint: 0, salahSusun: false, },
        ];
        
        for (let i = 0; i < handoutCard.length; i++){
            let idPlayer = i;
            let deckPlayer = handoutCard[idPlayer];
            let rowsPlayer = this.getRowCardDetail(deckPlayer);
            
            let rowRanksPlayer = rowsPlayer.map(this.determinedRankCard);
            let salahSusunPlayer = !rowRanksPlayer.every(this.getSalahSusun);
            
            playerPoints[i].salahSusun = salahSusunPlayer;
        }

        cc.log("playerPoints", playerPoints);
  
        for (let i = 1; i < handoutCard.length; i++){

            let idPlayerA = i - 1;
            let deckPlayerA = handoutCard[idPlayerA];
            let rowsPlayerA = this.getRowCardDetail(deckPlayerA);

            for (let j = i+1; j <= handoutCard.length; j++){

                let idPlayerB = j - 1;
                let deckPlayerB = handoutCard[idPlayerB];
                let rowsPlayerB = this.getRowCardDetail(deckPlayerB);
                
                for (let idxRow = 0; idxRow < rowsPlayerA.length; idxRow++){
                    let rowA = rowsPlayerA[idxRow];
                    let rowB = rowsPlayerB[idxRow];

                    let rowCodeA = CardRanking.generateCodeRow(rowA);
                    let rowCodeB = CardRanking.generateCodeRow(rowB);

                    let rankA = CardRanking.getRank(rowCodeA);
                    let rankB = CardRanking.getRank(rowCodeB);
                    
                    let isWin = CardRanking.compareHands(rankA, rankB);
                    let rewardPoint = this.getPointReward(idxRow, rankA.rank);

                    // handle scoring salah susun 
                    if(playerPoints[idPlayerA].salahSusun && playerPoints[idPlayerB].salahSusun){
                        isWin = 0;
                        rewardPoint = 0;
                    } else if(playerPoints[idPlayerA].salahSusun) {
                        isWin = -1;
                        rewardPoint = 3;
                    } else if(playerPoints[idPlayerB].salahSusun) {
                        isWin = 1;
                        rewardPoint = 3;
                    }

                    // cc.log("salahSusunPlayerAB", playerPoints[idPlayerA].salahSusun);
                    // cc.log("salahSusunPlayerAB", playerPoints[idPlayerB].salahSusun);
                    // cc.log("rewardPoint", rewardPoint);

                    if (isWin > 0) { // player A win
                        // calculate total points
                        playerPoints[idPlayerA].totalPoint += rewardPoint;
                        playerPoints[idPlayerB].totalPoint -= rewardPoint;

                        //calculate row Points
                        playerPoints[idPlayerA].rowPoint[idxRow] += rewardPoint;
                        playerPoints[idPlayerB].rowPoint[idxRow] -= rewardPoint;
                    
                    } else if (isWin < 0) { // player B win
                        // calculate total points
                        playerPoints[idPlayerA].totalPoint -= rewardPoint;
                        playerPoints[idPlayerB].totalPoint += rewardPoint;
                        
                        //calculate row Points
                        playerPoints[idPlayerA].rowPoint[idxRow] -= rewardPoint;
                        playerPoints[idPlayerB].rowPoint[idxRow] += rewardPoint;
                    } 
                }

            }
        }

        playerPoints.forEach((plaPo, i) => {
            
            let pointNode = this.node.getChildByName("cardDeck" + (i+1));
            
            let pointNodeLabelA = pointNode.getChildByName("frontScoreLabel");
            let pointLabelA = pointNodeLabelA.getComponent(cc.Label);
            pointLabelA.string = plaPo.rowPoint[0];

            let pointNodeLabelB = pointNode.getChildByName("middleScoreLabel");
            let pointLabelB = pointNodeLabelB.getComponent(cc.Label);
            pointLabelB.string = plaPo.rowPoint[1];

            let pointNodeLabelC = pointNode.getChildByName("rearScoreLabel");
            let pointLabelC = pointNodeLabelC.getComponent(cc.Label);
            pointLabelC.string = plaPo.rowPoint[2];

            let totalNodeLabel = pointNode.getChildByName("totalPointLabel");
            let totalLabel = totalNodeLabel.getComponent(cc.Label);
            totalLabel.string = plaPo.totalPoint;

            // jika salah susun
            if(plaPo.salahSusun){
                let salahsusunNode = pointNode.getChildByName("salahSusun");
                salahsusunNode.active = true;
            }        
        });

        //get the winner
        let playerPointsOnly = playerPoints.map((plaPo) => plaPo.totalPoint);
        let winnerResult = this.getWinner(playerPointsOnly);


        // set winner badge
        winnerResult.winnerIdx.forEach((wId) => {
            let pointNode = this.node.getChildByName("cardDeck" + (wId + 1));
            
            if(!playerPoints[wId].salahSusun){
                
                let winnerBadgeNode = pointNode.getChildByName("trophy");
                winnerBadgeNode.active = true;
                
                let gotoX = 202; 
                let gotoY = 97; 
                
                winnerBadgeNode.position.x = 0;
                winnerBadgeNode.position.y = 0;
                
                cc.tween(winnerBadgeNode)
                .to(0.5, { position: cc.v2(gotoX, gotoY) })
                .start();
            }
        });
            
        // smile or cry
        if (winnerResult.winnerIdx.includes(0)){
            let smilingNode = cc.find("Canvas/plaverAvatar/smiling");
            smilingNode.active = true;
        } else {
            let cryingNode = cc.find("Canvas/plaverAvatar/crying");
            cryingNode.active = true;
        }
    },

    getSalahSusun (rank, i, arr) {

        let benarSusun = true; 

        if (i > 0) {
            let isWin = CardRanking.compareHands(rank, arr[i - 1]);
            benarSusun = benarSusun ? isWin >= 0 : false;
        } else {
            benarSusun = true;
        }

        return benarSusun
    },

    getPointReward ( rowId, winnerRank) {
        const pointList = [
            { row: 0, rank: 6, point: 3 },
            { row: 1, rank: 3, point: 2 },
            { row: 1, rank: 2, point: 4 },
            { row: 1, rank: 1, point: 5 },
            { row: 2, rank: 2, point: 4 },
            { row: 2, rank: 1, point: 5 },
        ];
        
        let specialPoint = pointList.find((sp) => sp.row == rowId && sp.rank == winnerRank);
        
        let pointReward = specialPoint ? specialPoint.point : 1;

        return pointReward;
    },

    getWinner (playerPointsArr) {

        //find the winnerScore num;
        let winnerScore = 0;
        for(let i = 0; i < playerPointsArr.length; i++){
          let comp=(playerPointsArr[i] - winnerScore) > 0;
            if (comp) {
                winnerScore = playerPointsArr[i];
            }
        }
        
        //find the index of 'playerPointsArr'
        let winnerIdx = [];
        for(let i = 0; i < playerPointsArr.length; i++){
            let comp = playerPointsArr[i] - winnerScore==0;
            if (comp ){
                winnerIdx.push(i);
            }
        }

        if(winnerIdx.length == 4){
            winnerIdx = [];
        }
        
        return {winnerIdx, winnerScore}
    },

    getRowCardDetail (deckCards) {
        // set row cards
        let rowDetails = [
            deckCards.slice(0, 3),
            deckCards.slice(3, 8),
            deckCards.slice(8, 13)
        ];

        return rowDetails;
    },

    determinedRankCard (rowCards) {
        let rowCardCodes = CardRanking.generateCodeRow(rowCards);

        // determined rank card arrangement
        let hand = { rankName: "" };
        if(rowCardCodes.length > 0) hand = CardRanking.getRank(rowCardCodes);
        
        return hand;
    },

    playerAutoMove (handoutCard, idPlayer) {
        let playerCard = handoutCard[idPlayer];

        // add AI here
        let rand = Math.floor(Math.random() * 2); 
        let logicFunction = AutoMove.functionList[rand].func; 
        let sortedPlayerCard = AutoMove[logicFunction](playerCard);
        
        handoutCard[idPlayer] = sortedPlayerCard;
        return handoutCard;
    },

});
