cc.Class({
    extends: cc.Component,

    properties: {
        camera: {
            default: null,
            type: cc.Camera
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.sprite = this.node.getComponent(cc.Sprite);
    },

    start () {
        let texture = new cc.RenderTexture();
        texture.initWithSize(200, 200);

        let spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture)

        this.sprite.spriteFrame = spriteFrame;
        
        this.camera.targetTexture = texture;
    },  

    // update (dt) {},
});
