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

        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onClick, this);
    },

    setCard(number, shape, color) {
        this.cardShapeSprite.spriteFrame = shape;
        this.cardNumberLabel.string = number;
        this.cardNumberNode.color = color;
    },

    onClick () {
        console.log("selected card index:", this.cardIndex);

        // set position if clicked, set back to initial position if clicked twice
        let gotoY = this.selected? this.node.position.y - 10: this.node.position.y + 10;
        cc.tween(this.node)
            .to(0.1, { position: cc.v2(this.node.position.x, gotoY) })
            .start()
        
        this.selected = this.selected? false : true;
        
        // get data from localStorage
        let selectedCard = cc.sys.localStorage.getItem("selectedCard");
        
        // save to localStorage
        cc.sys.localStorage.setItem("selectedCard", JSON.stringify(selectedCard));
    },
});
