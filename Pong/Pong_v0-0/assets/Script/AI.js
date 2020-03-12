cc.Class({
  extends: cc.Component,

  properties: {
    target: {
      default: null,
      type: cc.Node
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    cc.director.getPhysicsManager().enabled = true
  },
  
  start() {

  },

  update (dt) {
    this.node.y = this.target.y
  },
});
