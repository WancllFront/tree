var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
        btnTudi: cc.Button,
        btnFeiliao: cc.Button,
        btnShumiao: cc.Button,
        nodeTudi: cc.Node,
        nodeFeiliao: cc.Node,
        nodeShumiao: cc.Node,
        btnShopClose: cc.Button,
        audio: cc.AudioClip,
    },


    btnController: function () {
        var self = this;
        this.btnShopClose.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            cc.director.loadScene("hall");
        })

        //土地点击
        this.btnTudi.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }

            self.nodeTudi.active = true;
            self.nodeFeiliao.active = false;
            self.nodeShumiao.active = false;
        });
        //肥料点击
        this.btnFeiliao.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            
            self.nodeTudi.active = false;
            self.nodeFeiliao.active = true;
            self.nodeShumiao.active = false;
        });
        //树苗点击
        this.btnShumiao.node.on('click', function () {
            if (self.radio == 2) {
            } else {
                cc.audioEngine.play(self.audio, false, 1);
            }
           
            self.nodeTudi.active = false;
            self.nodeFeiliao.active = false;
            self.nodeShumiao.active = true;
        });
    },

    onEnable: function () {
        this.radio = cc.sys.localStorage.getItem('radio');
    },

    // use this for initialization
    onLoad: function () {
        this.btnController();
    },

});
