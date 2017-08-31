var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
        labelTitle: cc.Label,
        labelContent: cc.RichText,
        btnClose: cc.Button,

        audio: cc.AudioClip,


    },

    btnController: function () {
        var self = this;

        this.btnClose.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }

            cc.director.loadScene('home');

        });
    },

    loadInfo: function () {
        var self = this;

        var data = window.communityDData
        self.labelTitle.string = data.title;

        self.labelContent.string = data.text;

    },
    onEnable: function () {
        this.radio = cc.sys.localStorage.getItem('radio');
        this.loadInfo()
    },

    // use this for initialization
    onLoad: function () {
        this.btnController();

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
