module.exports = {
    
    initCardPlace: [ {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ],

    setCardToPlace: (currectPlaceArray, cardObject, placeIndex) => {
        currectPlaceArray[placeIndex] = cardObject;

        return currectPlaceArray;
    }

}