cc.Class({
    extends: cc.Component,

    properties: {
        ballAudio: {
            default: null,
            type: cc.AudioClip
        },

        targetNode: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onload: function () {

    },

    // 播放音效
    playBallAudio: function() {
        cc.audioEngine.playEffect(this.ballAudio, false);
    },

    start() {
        // 获得节点对象
        var ball = this.node;

        // 普通动作
        // var action = cc.moveTo(2, 100, 100);
        // ball.runAction(action);

        // 顺序动作
        // var action1 = cc.moveBy(1, 200, 0);
        // var action2 = cc.moveBy(1, -200, 0);
        // var seq = cc.sequence(action2, action1);
        // ball.runAction(seq);

        // 同步动作
        // var action1 = cc.moveBy(1, 0, 100);
        // var action2 = cc.scaleTo(1, 1.5, 1.5);
        // var spawn = cc.spawn(action1, action2);
        // ball.runAction(spawn);

        // 重复动作（指定次数）
        // var action1 = cc.moveBy(1, 200, 0);
        // var action2 = cc.moveBy(1, -200, 0);
        // var seq = cc.sequence(action2, action1);
        // var rep = cc.repeat(seq, 5);
        // ball.runAction(rep);

        // 重复动作（无限重复）
        // var action1 = cc.moveBy(1, 200, 0);
        // var action2 = cc.moveBy(1, -200, 0);
        // var seq = cc.sequence(action2, action1);
        // var rep = cc.repeatForever(seq);
        // ball.runAction(rep);

        // 提速动作
        // var action = cc.moveTo(4, 200, 200);
        // var spd = cc.speed(action, 2);
        // ball.runAction(spd);

        // 通过给动作绑定标签
        // var Action_Tag = 1;
        // var action = cc.moveTo(2, 100, 100);
        // action.setTag(Action_Tag);
        // // 节点通过标签获取动作
        // ball.getActionByTag(Action_Tag);
        // ball.runAction(action);

        // 结束动作
        // ball.stopAction(action);
        // ball.stopAllAction();

        // 示例
        // var jumpAction = cc.sequence(
        //     cc.spawn(
        //         cc.scaleTo(0.1, 0.8, 1.2),
        //         cc.moveTo(0.1, 0, -10)
        //     ),
        //     cc.spawn(
        //         cc.scaleTo(0.2, 1, 1),
        //         cc.moveTo(0.2, 0, 0)
        //     ),
        //     cc.delayTime(0.5),
        //     cc.spawn(
        //         cc.scaleTo(0.1, 1.2, 0.8),
        //         cc.moveTo(0.1, 0, -10)
        //     ),
        //     cc.spawn(
        //         cc.scaleTo(0.2, 1, 1),
        //         cc.moveTo(0.2, 0, 0)
        //     )
        // ).speed(2).repeatForever();
        // ball.runAction(jumpAction);

        // 动作回调
        var action1 = cc.moveBy(0.5, cc.v2(0, 400)).easing(cc.easeOut(3));
        var action1 = cc.moveBy(0.5, cc.v2(0, 400)).easing(cc.easeCubicActionOut());
        var action1_1 = cc.scaleTo(0.5, 0.9, 1.1);
        var action2 = cc.moveBy(0.5, cc.v2(0, -400)).easing(cc.easeIn(3));
        var action2 = cc.moveBy(0.5, cc.v2(0, -400)).easing(cc.easeCubicActionIn());
        var action2_2 = cc.scaleTo(0.5, 1.1, 0.9);
        var spawn1 = cc.spawn(action1, action1_1);
        var spawn2 = cc.spawn(action2, action2_2);
        var finished = cc.callFunc(this.playBallAudio, this);
        var seq = cc.sequence(spawn1, spawn2, finished);
        var rep = cc.repeatForever(seq);
        ball.runAction(rep);

        // 即时动作
        // var act = cc.show();
        // var act = cc.hide();
        // var act = cc.toggleVisibility();
        // var act = cc.flipX(true);
        // var act = cc.flipY(true);
        // var act = cc.place(cc.v2(200, 200));

        // 时间间隔动作
        // var act = cc.skewTo(1, 37.2, -37.2);
        // var act = cc.jumpTo(2, cc.v2(300, 0), 50, 4);
        
        // var act = cc.follow(this.targetNode, cc.rect(0, 0, cc.winSize.width * 2 - 100, cc.winSize.height));

        // 缓动系统
        // cc.tween(this.node)
        //     .to(1, {position: cc.v2(200, 200), rotation: 360})
        //     .to(1, {scale: 2})
        //     .start

        // 计时器
        // ball.schedule(function(){}, this, 5, 3, 3)

        // ball.runAction(act);
    },

    update: function (dt) {

    }
});
