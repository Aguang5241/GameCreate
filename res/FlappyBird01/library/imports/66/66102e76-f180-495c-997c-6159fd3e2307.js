"use strict";
cc._RF.push(module, '66102528YBJXJl8YVn9PiMH', 'Storage');
// Scripts/Storage.js

'use strict';

var Storage = {
    getHighScore: function getHighScore() {
        var score = cc.sys.localStorage.getItem('HighScore') || 0;
        return parseInt(score);
    },

    setHighScore: function setHighScore(score) {
        cc.sys.localStorage.setItem('HighScore', score);
    }
};

module.exports = Storage;

cc._RF.pop();