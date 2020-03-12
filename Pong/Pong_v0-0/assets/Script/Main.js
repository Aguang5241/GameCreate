cc.Class({
  extends: cc.Component,

  properties: {
    player: {
      default: null,
      type: cc.Node
    },
    speed: 3,
  },

  // LIFE-CYCLE CALLBACKS:

  touchStart: function (event) {
    this.startPos = cc.v2(event.getLocationY())
  },

  touchMove: function (event) {
    this.movePos = cc.v2(event.getLocationY());
    // 判断移动方向
    if (this.movePos > this.startPos) {
      this.moveDir = 1
    } else if (this.movePos < this.startPos) {
      this.moveDir = -1
    } else {
      this.moveDir = 0
    }
  },

  touchEnd: function(event) {
    this.moveDir = 0
  },

  onLoad() {
    // 注册用户监听
    this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    // 初始化
    this.startPos = 0;
    this.movePos = 0;
    this.moveDir = 0;
  },

  start() {

  },

  update (dt) {
    if (this.moveDir == -1) {
      this.player.y -= this.speed
    } else if (this.moveDir == 1) {
      this.player.y += this.speed
    }
  },
});
