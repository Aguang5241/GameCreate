# 游戏开发笔记
## 关于节点和组件
* `getComponent()`方法针对于获得所在节点上的组件
* 对于获得其他节点，最简单的方法就是在属性检查器中引用
* `this.node.parent`可以获取当前节点的父节点
* 对于label节点，无法直接在其绑定的组件（脚本）中使用`this.node.string = 'xxx'`进行修改，应该将label作为节点进行引用后再修改其文本内容，而且必须事先声明其type为cc.Label
## 组件之间的通讯方法：
* 发送方使用module.export，接收方使用require
```javascript
// 发送方
module.exports = {
    backNode: null,
    backLabel: null,
};
// 接收方
var Global = require("Global");
```
* 在目标组件中暂存本地组件的this，使得在目标组件也能访问到本地组件的属性和方法
```javascript
newStar.getComponent('Star').game = this;
```
## 对象池
* 对象池的使用会有点问题，有待解决
```JavaScript
onLoad() {
    this.enemyPool = new cc.NodePool();
    let initCount = 5;
    for (let i = 0; i < initCount; ++i) {
        let enemy = cc.instantiate(this.enemyPrefab); // 创建节点
        this.enemyPool.put(enemy); // 通过 put 接口放入对象池
    }
    this.createEnemy();
},

createEnemy: function () {
    console.log('生成');
    let enemy = null;
    if (this.enemyPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
        enemy = this.enemyPool.get();
    } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
        enemy = cc.instantiate(this.enemyPrefab);
    }
    this.node.addChild(enemy); // 将生成的敌人加入节点树
    // enemy.getComponent('Enemy').init(); // 接下来就可以调用 enemy 身上的脚本进行初始化
    enemy.getComponent('Enemy').game = this; // 在Enemy组件上暂存Game组件的引用
},

onEnemyKilled: function (enemy) {
    console.log('回收前：' + this.enemyPool.size());
    this.enemyPool.put(enemy);
    console.log('回收后：' + this.enemyPool.size());
    // enemy 应该是一个 cc.Node
    // this.enemyPool.put(enemy); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
},
```
## 碰撞检测
* 设置碰撞边缘及tag
* 在被检测节点设置组件，内容如下
```JavaScript
onCollisionEnter: function(other, self) {
    if (other.tag == 1) {
        cc.director.loadScene('End')
    }
},

onLoad () {
    cc.director.getCollisionManager().enabled = true;
},
```