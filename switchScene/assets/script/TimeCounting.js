cc.Class({
    extends: cc.Component,

    properties: {
       timeLabel: {
           default: null,
           type: cc.Label
       }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        var time = 5;
        this.schedule(function() {
            time -= 1;
            this.timeLabel.string = time;
            if (time == 0) {
                cc.director.loadScene('Scene3')
            }
        }, 1)
    },

    start () {

    },

    // update (dt) {},
});
