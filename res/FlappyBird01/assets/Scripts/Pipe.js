cc.Class({
    extends: cc.Component,

    properties: {
        // 小鸟通过管道与否的标志位
        isPassed: false,
    },

    // use this for initialization
    onLoad: function () {

    },

    init: function (type) {
        // 设置管道的类型（上或下）
        this.type = type;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
