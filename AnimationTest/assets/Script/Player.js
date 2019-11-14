cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log(this.node.getComponent(dragonBones.ArmatureDisplay).getArmatureNames());
        console.log(this.node.getComponent(dragonBones.ArmatureDisplay).armatureName);
        this.node.getComponent(dragonBones.ArmatureDisplay).armatureName = 'StayStill';
        this.node.getComponent(dragonBones.ArmatureDisplay).armatureName = 'Walk';
        this.node.getComponent(dragonBones.ArmatureDisplay).playAnimation('Walk', 0);
        // this.node.getComponent(dragonBones.ArmatureDisplay).armatureName = 'Jump';
        // this.node.getComponent(dragonBones.ArmatureDisplay).playAnimation('Jump', 0);
        // this.node.getComponent(dragonBones.ArmatureDisplay).armature('StayStill').playAnimation('StayStill', 1);
    },

    start () {

    },

    // update (dt) {},
});
