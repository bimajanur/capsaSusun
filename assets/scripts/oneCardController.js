cc.Class({
    extends: cc.Component,

    properties: {
        
        cardShapeSprite: {
            default: null,
            type: cc.Sprite
        },
        cardNumberNode: {
            default: null,
            type: cc.Node
        },
        cardNumberLabel: {
            default: null,
            type: cc.Label
        },
        spade: {
            default: null,
            type: cc.SpriteFrame
        },
        heart: {
            default: null,
            type: cc.SpriteFrame
        },
        diamond: {
            default: null,
            type: cc.SpriteFrame
        },
        clover: {
            default: null,
            type: cc.SpriteFrame
        },
        playerIndex:{
            default: 0,
            type: cc.Integer
        },
        cardIndex:{
            default: 0,
            type: cc.Integer
        },
        selected:{
            default:false,
            type:cc.Boolean
        }
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let handoutCard = cc.sys.localStorage.getItem("handoutCard");
        handoutCard = JSON.parse(handoutCard);

        let playerCard = handoutCard[this.playerIndex];
        let thisCard = playerCard[this.cardIndex];
        this.setCard(thisCard.number, this[thisCard.shape], cc.Color[thisCard.color]);

        let gotoX = 55 + (this.cardIndex * 55);
        let gotoY = 50;
        cc.tween(this.node)
            .to(0.3, { position: cc.v2(gotoX, gotoY) })
            .start();

        //set default position
        this.originalPosX = gotoX;
        this.originalPosY = gotoY;
    },

    setCard(number, shape, color) {
        this.cardShapeSprite.spriteFrame = shape;
        this.cardNumberLabel.string = number;
        this.cardNumberNode.color = color;
    },

});
