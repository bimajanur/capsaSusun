module.exports = {
    
    functionList: [
        { func: "sortPlayerCardByShapeCode" },
        { func: "sortPlayerCardByNumberCode" },
    ],

    sortPlayerCardByShapeCode: (playerCard) => {
        let sortedPlayerCard = playerCard;
        byProp = "shapeCode";
        sortedPlayerCard.sort( (a,b) => {
            if (a[byProp] < b[byProp]) { 
                return -1;
            }
            if (a[byProp] > b[byProp]) {
                return 1;
            }
            return 0;
        });
        
        return sortedPlayerCard
    },

    sortPlayerCardByNumberCode: (playerCard) => {
        let sortedPlayerCard = playerCard;
        byProp = "numberCode";
        sortedPlayerCard.sort( (a,b) => {
            if (a[byProp] < b[byProp]) { 
                return -1;
            }
            if (a[byProp] > b[byProp]) {
                return 1;
            }
            return 0;
        });
        
        return sortedPlayerCard
    },
    
    compareObj (a, b, byProp) {
        if (a[byProp] < b[byProp]) { 
            return -1;
        }
        if (a[byProp] > b[byProp]) {
            return 1;
        }
        return 0;
    }
}