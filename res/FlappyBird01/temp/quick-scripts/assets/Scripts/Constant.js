(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Constant.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1f331Khw8ZPUpFSgo3Y95tw', 'Constant', __filename);
// Scripts/Constant.js

'use strict';

var Constant = cc.Enum({
    // 地板移动时间间隔
    GROUND_MOVE_INTERVAL: 0.05,
    // 单位时间地板移动速度
    GROUND_VX: -5,
    // 上端管道序号为0
    PIPE_UP: 0,
    // 下端管道序号为1
    PIPE_DOWN: 1,
    // 游戏失败文字
    GAMEOVER_TXT: 'GAME OVER',
    // 最高分文字
    HIGHSCORE_TXT: 'HighScore: '
});

module.exports = Constant;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Constant.js.map
        