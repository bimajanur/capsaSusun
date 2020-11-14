cc.Class({
    extends: cc.Component,

    properties: {
        
        labelWarna: {
            default: null,
            type: cc.Label
        },
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        let playerString = cc.sys.localStorage.getItem("playerString");
        this.labelWarna.string = (playerString || "").toUpperCase();

        let playerColor = cc.sys.localStorage.getItem("playerColor");
        this.node.color = cc.color(playerColor || "#ffffff");

    },

});
