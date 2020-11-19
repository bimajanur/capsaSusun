module.exports = {
    
    cardNumbers: [
        "2", "3", "4", 
        "5", "6", "7", 
        "8", "9", "10", 
        "J", "Q", "K", "A",  
    ],

    setCardToPlace: (currectPlaceArray, cardObject, placeIndex) => {
        currectPlaceArray[placeIndex] = cardObject;

        return currectPlaceArray;
    }

}