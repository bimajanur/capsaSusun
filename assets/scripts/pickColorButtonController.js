cc.Class({
    extends: cc.Component,

    properties: {
        
        myColor: cc.Color,
        myTextColor: cc.String,

        buttonController: {
            default: null,
            type: cc.Node
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onClick, this);
        
        // remove the item of the key (username)
        cc.sys.localStorage.removeItem("playerString");
        cc.sys.localStorage.removeItem("playerColor");
        cc.sys.localStorage.clear();

    },

    onClick () {

        let selectedColorLabelController = this.buttonController.getComponent("selectedColorLabelController");
        selectedColorLabelController.changeText(this.myTextColor, this.myColor);
        
        // save to localStorage
        cc.sys.localStorage.setItem("playerString", this.myTextColor);
        cc.sys.localStorage.setItem("playerColor", this.myColor.toHEX("#rrggbb"));

    },

});
