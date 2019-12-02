var Global = require("Global");

cc.Class({
    extends: cc.Component,

    properties: {
        maxSpeed: 800,
        score: {
            default: null,
            type: cc.Label
        },
        maxHealthValue: 100,
        progressBar: {
            default: null,
            type: cc.ProgressBar
        },
        healthMinusValue: 0.2,
        healthPlusOfScoreBall: 5,
        bounceAudio: {
            default: null,
            type: cc.AudioClip
        },
        healthPlusAudio: {
            default: null,
            type: cc.AudioClip
        },
        harmAudio: {
            default: null,
            type: cc.AudioClip
        },
        bgm: {
            default: null,
            type: cc.AudioClip
        },
        scorePlus5: {
            default: null,
            type: cc.Node
        },
        scorePlus10: {
            default: null,
            type: cc.Node
        },
        healthPlus: {
            default: null,
            type: cc.Node
        },
        healthSuperPlus: {
            default: null,
            type: cc.Node
        },
        bar: {
            default: null,
            type: cc.Node
        },
        camera: {
            default: null,
            type: cc.Camera
        },
    },

    // LIFE-CYCLE CALLBACKS:

    getArrowRotation: function () {
        var rotation;
        if (this.speed.y > 0) {
            rotation = Math.acos((-this.speed.x) / this.speed.mag()) * (180 / Math.PI);
        } else {
            rotation = -Math.acos((-this.speed.x) / this.speed.mag()) * (180 / Math.PI);
        };
        return rotation;
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        if (otherCollider.tag == 1 || otherCollider.tag == 2 || otherCollider.tag == 3 || otherCollider.tag == 4 || otherCollider.tag == 5 || otherCollider.tag == 6) {
            this.control.controlActive = true;
            if (this.control.speedBackToNormal) {
                this.rbody.linearVelocity = this.rbody.linearVelocity.mul(1 / 20);

                this.playerAnim.play();
                this.control.speedBackToNormal = false;
            }
        };
        if (otherCollider.tag == 0) { // hit the boundary
            cc.audioEngine.play(this.bounceAudio, false, 1);
        };
        if (otherCollider.tag == 1) { // hit the scoreBall
            cc.audioEngine.play(this.bounceAudio, false, 1);

            this.scoreValue += 5;
            Global.endScore = this.scoreValue;

            this.starsNum += 1;
            Global.endStarsNum = this.starsNum;

            this.score.string = "祝福：" + this.scoreValue;
            this.scorePlus5Anim.play();
            this.healthPlusAnim.play();

            this.currentHealth += this.healthPlusOfScoreBall;
        };
        if (otherCollider.tag == 2) { // hit the medicineBall
            cc.audioEngine.play(this.healthPlusAudio, false, 1);

            this.healthSuperPlusAnim.play();

            this.currentHealth += this.healthPlusOfScoreBall * 6;
        };
        if (otherCollider.tag == 3) { // hit the enermyBall
            cc.audioEngine.play(this.harmAudio, false, 1);

            this.healthMinusAnim.play();
            this.currentHealth -= this.healthPlusOfScoreBall * 2;
        };
        if (otherCollider.tag == 4) { // hit the block
            cc.audioEngine.play(this.harmAudio, false, 1);

            this.healthMinusAnim.play();
            this.currentHealth -= this.healthPlusOfScoreBall * 5;
        };
        if (otherCollider.tag == 5) { // hit the sliderBall
            cc.audioEngine.play(this.harmAudio, false, 1);

            this.healthMinusAnim.play();
            this.currentHealth -= this.healthPlusOfScoreBall * 2;
        };
        if (otherCollider.tag == 6) { // hit the superPlusBall
            cc.audioEngine.play(this.healthPlusAudio, false, 1);

            this.scoreValue += 10;
            Global.endScore = this.scoreValue;

            this.starsNum += 2;
            Global.endStarsNum = this.starsNum;

            this.score.string = "祝福：" + this.scoreValue;
            this.scorePlus10Anim.play();
            this.healthPlusAnim.play();

            this.currentHealth += this.healthPlusOfScoreBall;
        }
    },

    onEndContact: function(contact, selfCollider, otherCollider) {
        if (otherCollider.tag != 0) { // not hit the boundary
            // 碰撞开始开启箭头
            this.control.Arrow.active = true;
            this.control.Arrow.rotation = this.getArrowRotation();
        };
    },

    onLoad() {
        // 开启物理系统
        cc.director.getPhysicsManager().enabled = true;

        // 获取本刚体
        this.rbody = this.node.getComponent(cc.RigidBody);

        // 初始化速度
        this.speed = cc.v2(0, 0);

        // 获取动画组件
        this.playerAnim = this.node.getComponent(cc.Animation);
        this.scorePlus5Anim = this.scorePlus5.getComponent(cc.Animation);
        this.scorePlus10Anim = this.scorePlus10.getComponent(cc.Animation);
        this.healthPlusAnim = this.healthPlus.getComponent(cc.Animation);
        this.healthSuperPlusAnim = this.healthSuperPlus.getComponent(cc.Animation);
        this.healthMinusAnim = this.bar.getComponent(cc.Animation);

        // 初始化分数
        this.scoreValue = 0;
        this.starsNum = 0;
        Global.endScore = this.scoreValue;

        // 初始化寿命
        this.currentHealth = this.maxHealthValue;
        this.progressBar.progress = 1;

        // 定义颜色
        this.redColor = new cc.Color(255, 0, 0);
        this.normalColor = new cc.Color(0, 255, 235);
    },

    start() {

    },

    update(dt) {
        // 实时获取速度
        this.speed = this.rbody.linearVelocity;
        // 限制最大线速度
        if (this.speed.mag() > this.maxSpeed) {
            this.rbody.linearVelocity = this.speed.normalize().mul(this.maxSpeed);
        };

        // 生命值上限
        if (this.currentHealth > this.maxHealthValue) {
            this.currentHealth = this.maxHealthValue;
        };

        // 生命值下限
        if (this.currentHealth <= 0) {
            this.currentHealth = 0;
            if (this.control.speedBackToNormal) {
                this.rbody.linearVelocity = this.rbody.linearVelocity.mul(1 / 20);
            };
            this.camera.zoomRatio += 0.01
            if (this.camera.zoomRatio > 1.7) {
                this.camera.zoomRatio = 1.7;
            };
            this.scheduleOnce(function () {
                cc.director.loadScene("End")
            }, 3)
        };

        // 生命值递减
        if (!this.control.controlActive) {
            this.currentHealth -= this.healthMinusValue;
        } else if (this.control.controlActive && this.control.firstTouch) {
            this.currentHealth -= this.healthMinusValue / 10;
        }
        this.progressBar.progress = this.currentHealth / this.maxHealthValue;

        // 生命值降低到以读程度血条变色
        if (this.progressBar.progress <= 0.3) {
            this.bar.color = this.redColor;
        } else {
            this.bar.color = this.normalColor;
        }
    },
});