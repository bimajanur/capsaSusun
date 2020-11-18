cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onClick, this);
    },

    onClick (e) {
        e.stopPropagation();
        var thisCard = this.getComponent("oneCardController");
        cc.log("selected card index:", thisCard.cardIndex);

        // set position if clicked, set back to initial position if clicked twice
        let gotoY = thisCard.selected? this.node.position.y - 10: this.node.position.y + 10;
        let gotoX = this.node.position.x;
        cc.tween(this.node)
            .to(0.1, { position: cc.v2(gotoX, gotoY) })
            .start();
        
        // get saved data from localStorage
        let selectedCard = cc.sys.localStorage.getItem("selectedCard");
        selectedCard = selectedCard? JSON.parse(selectedCard) : [];

        // generate new array for saving
        let processedCardArr = [];
        if(!thisCard.selected){
            
            // add to array if not existed in localStorage
            processedCardArr = [...selectedCard, thisCard.cardIndex];

            if(processedCardArr.length>5){
                
                // set earliest card position to normal and selected value to false
                this.earliestCard = this.node.parent.getChildByName("card" + (processedCardArr[processedCardArr.length - 1] + 1));
                this.earliestCard.oneCard = this.earliestCard.getComponent("oneCardController");
                cc.tween(this.earliestCard)
                    .to(0.1, { position: cc.v2(this.earliestCard.position.x, this.earliestCard.position.y - 10) })
                    .start();
                this.earliestCard.oneCard.selected = false;

                // remove earliest item
                processedCardArr.shift();
            }
            
        } else {
            // remove from array if not existed in localStorage
            processedCardArr = selectedCard.filter((value)=>{ 
                return value != thisCard.cardIndex;
            });
        }
        // save data to localStorage
        cc.sys.localStorage.setItem("selectedCard", JSON.stringify(processedCardArr));
        
        thisCard.selected = thisCard.selected? false : true;
    },
});
