cc.Class({
    extends: cc.Component,

    properties: {
        
        sceneName: cc.String
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onClick, this);
    },

    onClick (e) {
        console.log("mouse clicked", e.currentTarget);
        e.bubbles = false;

        cc.director.loadScene(this.sceneName);
    },

    // update (dt) {},
});
