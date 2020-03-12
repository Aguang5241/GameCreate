"use strict";
cc._RFpush(module, '66102528YBJXJl8YVn9PiMH', 'Storage');
// Scripts\Storage.js

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

cc._RFpop();