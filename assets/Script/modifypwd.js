var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
        editboxpwd0: cc.EditBox,
        editboxpwd1: cc.EditBox,
        editboxpwd2: cc.EditBox,
        editboxpwd3: cc.EditBox,
        editboxpwd4: cc.EditBox,
        editboxpwd5: cc.EditBox,

        btnConfirm: cc.Button,

        nodeTipSuccess: cc.Node,
        nodeTipError: cc.Node,
        btnTipSuccess: cc.Button,
        btnTipError: cc.Button,
        labelTipSuccess: cc.Label,
        labelTipError: cc.Label,
        audio: cc.AudioClip,

    },

    btnController: function () {
        var self = this;
        var usercode = com.getUser().UserCode;


        this.btnConfirm.node.on('click', function () {
           if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            var list = {};

            list.pwd0 = self.editboxpwd0.string;
            list.pwd1 = self.editboxpwd1.string;
            list.pwd2 = self.editboxpwd2.string;
            list.pwd3 = self.editboxpwd3.string;
            list.pwd4 = self.editboxpwd4.string;
            list.pwd5 = self.editboxpwd5.string;
            list.usercode = usercode;

            var url = com.yuming + com.changpwd;
            com.async(url, function (resp) {
                if (resp.msg1 == 'success') {

                    self.nodeTipSuccess.active = true;
                    self.labelTipSuccess.string = '修改成功';
                } else {

                    self.nodeTipError.active = true;
                    self.labelTipError.string = resp.msg2;
                }

            }, list);

        });

        ///提示框
        this.btnTipSuccess.node.on('click', function () {

            self.editboxpwd0.string = '';
            self.editboxpwd1.string = '';
            self.editboxpwd2.string = '';
            self.editboxpwd3.string = '';
            self.editboxpwd4.string = '';
            self.editboxpwd5.string = '';
            self.nodeTipSuccess.active = false;
        });
        this.btnTipError.node.on('click', function () {

            self.editboxpwd0.string = '';
            self.editboxpwd1.string = '';
            self.editboxpwd2.string = '';
            self.editboxpwd3.string = '';
            self.editboxpwd4.string = '';
            self.editboxpwd5.string = '';
            self.nodeTipError.active = false;
        });
    },

    onEnable: function () {
        this.radio = cc.sys.localStorage.getItem('radio');

        this.editboxpwd0.string = '';
        this.editboxpwd1.string = '';
        this.editboxpwd2.string = '';
        this.editboxpwd3.string = '';
        this.editboxpwd4.string = '';
        this.editboxpwd5.string = '';

    },

    // use this for initialization
    onLoad: function () {
        this.radio = cc.sys.localStorage.getItem('radio');

        this.editboxpwd0.string = '';
        this.editboxpwd1.string = '';
        this.editboxpwd2.string = '';
        this.editboxpwd3.string = '';
        this.editboxpwd4.string = '';
        this.editboxpwd5.string = '';

        this.btnController();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
