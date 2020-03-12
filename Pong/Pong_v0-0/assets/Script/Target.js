cc.Class({
  extends: cc.Component,

  properties: {
    speedRadio: 2,
    scoreLabel: {
      default: null,
      type: cc.Label
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onBeginContact: function (contact, selfCollider, otherCollider) {
    if (otherCollider.tag == 1) { // wall
      console.log('wall')
    } else if (otherCollider.tag == 2) { // player
      console.log('player')
      this.score += 1
      this.scoreLabel.string = this.score
    }
  },

  onLoad() {
    cc.director.getPhysicsManager().enabled = true
    this.score = 0
    this.rbody = this.node.getComponent(cc.RigidBody)
    this.vx = -(Math.random() * (100 - 50) + 50)
    this.vy = Math.sqrt(10000 - this.vx ** 2)
    this.rbody.linearVelocity = cc.v2(this.vx * this.speedRadio, this.vy * this.speedRadio)
  },

  start() {

  },

  // update (dt) {},
});
