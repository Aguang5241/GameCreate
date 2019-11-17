cc.Class({
    extends: cc.Component,

    properties: {
        moveForce: 10,
        jumpForce: 10,
        maxSpeed: 500,
    },

    // LIFE-CYCLE CALLBACKS:

    runAction: function(left, right) {
        if (left && !right) {
            this.rigidBody.applyForceToCenter(cc.v2(-this.moveForce, 0), true);
        } else if (!left && right) {
            this.rigidBody.applyForceToCenter(cc.v2(this.moveForce, 0), true);
        } else if (!left && !right) {
            // this.rigidBody.linearVelocity = cc.v2(0, 0);
        }
    },

    keyDown: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.space:
                this.rigidBody.applyForceToCenter(cc.v2(0, this.jumpForce), true);
                break;
            case cc.macro.KEY.a:
                this.moveLeft = true;
                break;
            case cc.macro.KEY.d:
                this.moveRight = true;
                break;
        }
    },

    keyUp: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.space:
                // this.jump = false;
                break;
            case cc.macro.KEY.a:
                this.moveLeft = false;
                break;
            case cc.macro.KEY.d:
                this.moveRight = false;
                break;
        }
    },

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.keyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.keyUp, this);

        // this.jump = false;
        this.moveLeft = false;
        this.moveRight = false;

        cc.director.getPhysicsManager().enabled = true;
        this.rigidBody = this.node.getComponent(cc.RigidBody);
    },

    start() {

    },

    update (dt) {
        var currentSpeed = this.rigidBody.linearVelocity;
        if (Math.abs(currentSpeed.x) < this.maxSpeed) {
            this.runAction(this.moveLeft, this.moveRight)
        }
    },
});
