module.exports = {
    
    getRank: (cards) => {
        const cardOrder = "23456789TJQKA";
        const cardRanks = [
            "5 of a kind", 
            "Royal Flush", 
            "4 of a kind", 
            "Full House", 
            "Flush", 
            "Straight", 
            "3 of a kind", 
            "2 pairs", 
            "Pair", 
            "High Card"  
        ];
        const faces = cards.map(a => String.fromCharCode([77 - cardOrder.indexOf(a[0])])).sort();
        const suits = cards.map(a => a[1]).sort();
        const counts = faces.reduce(count, {});
        const duplicates = Object.values(counts).reduce(count, {});
        const flush = suits[0] === suits[4];
        const first = faces[0].charCodeAt(0);
        //Also handle low straight
        const lowStraight = faces.join("") === "AJKLM";
        faces[0] = lowStraight ? "N" : faces[0];
        const straight = lowStraight || faces.every((f, index) => f.charCodeAt(0) - first === index);

        let rank = 9;
        if (cards.length < 5) {
            rank =
                (duplicates[4] && 2) ||
                (duplicates[3] && 6) ||
                (duplicates[2] > 1 && 7) ||
                (duplicates[2] && 8) ||
                9;
        } else {
            rank =
                (flush && straight && 1) ||
                (duplicates[4] && 2) ||
                (duplicates[3] && duplicates[2] && 3) ||
                (flush && 4) ||
                (straight && 5) ||
                (duplicates[3] && 6) ||
                (duplicates[2] > 1 && 7) ||
                (duplicates[2] && 8) ||
                9;
        } 
            
        let rankName = cardRanks[rank];

        return { rank, rankName, value: faces.sort(byCountFirst).join("") };
    
        function byCountFirst(a, b) {
            //Counts are in reverse order - bigger is better
            const countDiff = counts[b] - counts[a];
            if (countDiff) return countDiff // If counts don't match return
            return b > a ? -1 : b === a ? 0 : 1;
        }
        function count(c, a) {
            c[a] = (c[a] || 0) + 1;
            return c;
        }
    },
    
    compareHands: (d1, d2) => {
        // win = 1, draw = 0, lose = -1
        if (d1.rank === d2.rank) {
            if (d1.value < d2.value) {
                return 1;
            } else if (d1.value > d2.value) {
                return -1;
            } else {
                return 0;
            }
        }
        return d1.rank < d2.rank ? 1 : -1;
    }

}