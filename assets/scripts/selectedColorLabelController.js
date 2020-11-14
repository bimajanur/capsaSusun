cc.Class({
    extends: cc.Component,

    properties: {

        labelWarna: {
            default: null,
            type: cc.Label
        },
        tulisan:cc.String,

    },

    // LIFE-CYCLE CALLBACKS:

    start () {
        this.labelWarna.string = this.tulisan.toUpperCase();
    },

    changeText(labelString, labelColor) {
        this.labelWarna.string = labelString.toUpperCase();
        this.node.color = labelColor;
    }

});
