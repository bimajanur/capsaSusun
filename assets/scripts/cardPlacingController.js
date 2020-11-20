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
        cc.log("picked card index:", thisCard.cardIndex);

        // set position if clicked, set back to initial position if clicked twice
        let gotoY = thisCard.picked? this.node.position.y - 10: this.node.position.y + 10;
        let gotoX = this.node.position.x;
        cc.tween(this.node)
            .to(0.1, { position: cc.v2(gotoX, gotoY) })
            .start();
        
        // get saved data from localStorage
        let pickedIdxCard = cc.sys.localStorage.getItem("pickedIdxCard");
        pickedIdxCard = pickedIdxCard? JSON.parse(pickedIdxCard) : [];

        // generate new array for saving
        let processedCardArr = [];
        if(!thisCard.picked){
            
            // add to array if not existed in localStorage
            processedCardArr = [...pickedIdxCard, thisCard.cardIndex];

            if(processedCardArr.length>5){
                
                // set earliest card position to normal and picked value to false
                this.earliestCard = this.node.parent.getChildByName("card" + (processedCardArr[processedCardArr.length - 1] + 1));
                this.earliestCard.oneCard = this.earliestCard.getComponent("oneCardController");
                cc.tween(this.earliestCard)
                    .to(0.1, { position: cc.v2(this.earliestCard.position.x, this.earliestCard.position.y - 10) })
                    .start();
                this.earliestCard.oneCard.picked = false;

                // remove earliest item
                processedCardArr.shift();
            }
            
        } else {
            // remove from array if not existed in localStorage
            processedCardArr = pickedIdxCard.filter((value)=>{ 
                return value != thisCard.cardIndex;
            });
        }
        // save data to localStorage
        cc.sys.localStorage.setItem("pickedIdxCard", JSON.stringify(processedCardArr));
        
        thisCard.picked = thisCard.picked? false : true;
    },
});
