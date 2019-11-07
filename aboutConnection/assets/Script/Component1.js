cc.Class({
    extends: cc.Component,

    properties: {
        innerLabel: {
            default: null,
            type: cc.Label
        },
        newStr: 'aguang'
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // console.log(this.node.string);
        // this.node.string = 'new string changed by component1';
        // console.log(this.node.string);        
        // this.innerLabel.string = this.newStr
    },
    
    start() {

        // this.node.x = 100;

        // var label = this.getComponent('Component2');
        // if (label) {
        //     console.log('yes')
        //     label.string = "Hello";
        // }
        // else {
        //     console.log('no')
        //     cc.error("Something wrong?");
        // }
    },

    // update (dt) {},
});
