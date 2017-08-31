var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
        nodeTipSuccess: cc.Node,
        nodeTipError: cc.Node,
        btnTipSuccess: cc.Button,
        btnTipError: cc.Button,
        labelTipSuccess: cc.Label,
        labelTipError: cc.Label,

        btnPull: cc.Button,

        btnConfirm: cc.Button,
        nodePull: cc.Node,
        btnShubei: cc.Button,
        btnDibei: cc.Button,

        editboxCode: cc.EditBox,
        editboxNumber: cc.EditBox,
        editboxPwd: cc.EditBox,

        labelWay: cc.Label,
        audio: cc.AudioClip,


    },

    btnController: function () {
        var self = this;
        var accounttype = 1;
        var uid = com.getUser().ID;
        this.btnConfirm.node.on('click', function () {
            var usercode = self.editboxCode.string;
            var number = self.editboxNumber.string;
            var pwd = self.editboxPwd.string;

            if (usercode != '' && number != '' && pwd != '') {
                self.editboxPwd.string = '';
                self.editboxNumber.string = ''

                var list = {};
                list.usercode = usercode;
                list.uid = uid;
                list.pwd = pwd;
                list.accounttype = accounttype;
                list.price = number;

                var url = com.yuming + com.hzhuan;
                com.async(url, function (resp) {
                    if (resp.msg1 == 'success') {
                        self.nodeTipSuccess.active = true;
                        self.labelTipSuccess.string = '成功';

                    } else {
                        self.nodeTipError.active = true;
                        self.labelTipError.string = resp.msg2;
                    }
                    //转账更新数据 
                    com.updateUser();
                }, list);
            }


        });

        this.btnPull.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            self.nodePull.active = !self.nodePull.active;
        });
        this.btnDibei.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            accounttype = 4;
            self.labelWay.string = '地呗';
            self.nodePull.active = false;
        });
        this.btnShubei.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            self.labelWay.string = '树呗';
            accounttype = 1;
            self.nodePull.active = false;
        });


        this.btnTipSuccess.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }


            self.editboxPwd.string = '';
            self.editboxNumber.string = ''
            self.nodeTipSuccess.active = false;
        });
        this.btnTipError.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }

            self.editboxPwd.string = '';
            self.editboxNumber.string = ''
            self.nodeTipError.active = false;
        });
    },

    onEnable: function () {
        this.radio = cc.sys.localStorage.getItem('radio');
        if (window.moveUserCode) {

            this.editboxCode.string = window.moveUserCode;
        }
    },

    onDisable: function () {
        this.editboxCode.string = '';
        this.editboxPwd.string = '';
        this.editboxNumber.string = ''
    },

    // use this for initialization
    onLoad: function () {
        this.radio = cc.sys.localStorage.getItem('radio');




        this.btnController();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
