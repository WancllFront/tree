var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
        editboxName: cc.EditBox,

        btnConfirm: cc.Button,

        nodeParent: cc.Component,
        audio: cc.AudioClip,

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
        var uid = com.getUser().ID;

        this.btnConfirm.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            var list = {};

            list.name = self.editboxName.string;

            if (list.name != '') {
                list.uid = uid;
                var url = com.yuming + com.changname;
                com.async(url, function (resp) {
                    if (resp.msg1 == 'success') {
                        com.updateUser();

                        self.nodeTipSuccess.active = true;
                        self.labelTipSuccess.string = resp.msg2 || '修改成功';
                    } else {
                        self.nodeTipError.active = true;
                        self.labelTipError.string = resp.msg2 || '失败';
                    }
                }, list);
            } else {


            }
        });


        ///提示框
        this.btnTipSuccess.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            self.nodeTipSuccess.active = false;
        });
        this.btnTipError.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            self.nodeTipError.active = false;
        });
    },

    onEnable: function () {
        this.radio = cc.sys.localStorage.getItem('radio');
        this.editboxName.string = com.getUser().UserName;

    },

    // use this for initialization
    onLoad: function () {
        this.radio = cc.sys.localStorage.getItem('radio');

        this.editboxName.string = com.getUser().UserName;
        this.btnController();
    },

});
