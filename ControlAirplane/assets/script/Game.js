cc.Class({
    extends: cc.Component,

    properties: {
        speed: 0,
        plane: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

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


    start() {

    },

    update: function (dt) {
        if (this.left) {
            this.plane.x -= this.speed;
        };
        if (this.right) {
            this.plane.x += this.speed;
        };
        if (this.up) {
            this.plane.y += this.speed;
        };
        if (this.down) {
            this.plane.y -= this.speed;
        }
    },
});
