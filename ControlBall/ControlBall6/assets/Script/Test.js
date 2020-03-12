cc.Class({
    extends: cc.Component,

    properties: {
        speed: 5,
    },

    // LIFE-CYCLE CALLBACKS:

    onKeyDown: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.left = true;
                break;
            case cc.macro.KEY.d:
                this.right = true;
                break;
            case cc.macro.KEY.w:
                this.up = true;
                break;
            case cc.macro.KEY.s:
                this.down = true;
                break;
        }
    },

    onKeyUp: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.left = false;
                break;
            case cc.macro.KEY.d:
                this.right = false;
                break;
            case cc.macro.KEY.w:
                this.up = false;
                break;
            case cc.macro.KEY.s:
                this.down = false;
                break;
        }
    },

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        this.right = false;
        this.left = false;
        this.up = false;
        this.down = false;
    },

    start() {

    },

    update(dt) {
        if (this.right) {
            this.node.x += this.speed;
        };
        if (this.left) {
            this.node.x -= this.speed;
        };
        if (this.up) {
            this.node.y += this.speed;
        };
        if (this.down) {
            this.node.y -= this.speed;
        };
    },
});
