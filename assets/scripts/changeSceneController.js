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
        e.bubbles = false;
        
        let gotoYA = this.node.position.y - 10;
        let gotoYB = this.node.position.y + 10;
        cc.tween(this.node)
            .to(0.1, { position: cc.v2(this.node.position.x, gotoYA) })
            .to(0.1, { position: cc.v2(this.node.position.x, gotoYB) })
            .start()
        

        cc.director.loadScene(this.sceneName);
    },

    // update (dt) {},
});
