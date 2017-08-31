var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
        btnRent: cc.Button,
        btnGain: cc.Button,
        labelGain: cc.Label,
        labelRest: cc.Label,

        nodeShow: cc.Node,

        btnClose: cc.Button,

        editboxPwd: cc.EditBox,
        nodeTipSuccess: cc.Node,
        nodeTipError: cc.Node,
        btnTipSuccess: cc.Button,
        btnTipError: cc.Button,
        labelTipSuccess: cc.Label,
        labelTipError: cc.Label,
        audio: cc.AudioClip,
    },

    onEnable: function () {
        this.radio = cc.sys.localStorage.getItem('radio');

        var self = this;
        var url = com.yuming + com.treelst;
        var grade = 20;
        var uid = com.getUser().ID;
        //uid = 144

        var list = {};
        list.grade = 20;
        list.uid = uid;


        com.async(url, function (resp) {
            if (resp.msg1 == 'success') {

                if (resp.msg3.length == 0) {
                    self.nodeShow.active = false;
                    self.btnGain.node.active = false;
                    self.btnRent.node.active = true;
                } else {
                    var info = resp.msg3[0];
                    self.labelRest.string = 36 - info.lunshu;
                    self.labelGain.string = info.lunshu * 2000;
                    self.nodeShow.active = true;
                    self.btnGain.node.active = true;
                    self.btnRent.node.active = false;
                }
            }
        }, list);

    },

    // use this for initialization
    onLoad: function () {

        this.radio = cc.sys.localStorage.getItem('radio');
        var self = this;
        var url = com.yuming + com.treelst;
        var grade = 20;
        var uid = com.getUser().ID;
        //uid = 144

        var list = {};
        list.grade = 20;
        list.uid = uid;



        this.btnGain.node.on('click', function () {
            if (self.radio == 2) {
            } else {
                cc.audioEngine.play(self.audio, false, 1);
            }
            var granUrl = com.yuming + com.shouhuo;
            com.async(granUrl, function (resp) {
                if (resp.msg1 == 'success') {

                    self.nodeTipSuccess.active = true;
                    self.labelTipSuccess.string = resp.msg2 || '收获成功';

                    self.labelGain.string = parseInt(self.labelGain.string) + 2000;
                    self.labelRest.string = parseInt(self.labelRest.string) - 1;

                } else {
                    self.nodeTipError.active = true;
                    self.labelTipError.string = resp.msg2 || '收获失败，请稍后再试';
                }
                //更新数据 
                com.updateUser();
            }, list);
        });
        //租赁

        this.btnRent.node.on('click', function () {

            if (self.radio == 2) {
            } else {
                cc.audioEngine.play(self.audio, false, 1);
            }
            var list2 = {};
            list2.uid = uid;
            list2.grade = 20;
            list2.pwd = self.editboxPwd.string;
            self.editboxPwd.string = '';
            if (list2.pwd != '') {
                var rentUrl = com.yuming + com.zhu;
                com.async(rentUrl, function (resp) {
                    if (resp.msg1 == 'success') {

                        self.labelRest.string = 36;
                        self.labelGain.string = 0;
                        self.nodeShow.active = true;
                        self.btnGain.node.active = true;
                        self.btnRent.node.active = false;
                        self.nodeTipSuccess.active = true;
                        self.labelTipSuccess.string = resp.msg2 || '租赁成功';
                    } else {
                        self.nodeTipError.active = true;
                        self.labelTipError.string = resp.msg2 || '租赁失败，请稍后再试';
                    }
                    //更新数据 
                    com.updateUser();
                }, list2)
            } else {
                self.nodeTipError.active = true;
                self.labelTipError.string = '请输入交易密码';
            }


        });

        this.btnClose.node.on('click', function () {

            if (self.radio == 2) {
            } else {
                cc.audioEngine.play(self.audio, false, 1);
            }
            cc.director.loadScene('hall');
        });


        this.btnTipSuccess.node.on('click', function () {
            if (self.radio == 2) {
            } else {
                cc.audioEngine.play(self.audio, false, 1);
            }
            self.nodeTipSuccess.active = false;
        });
        this.btnTipError.node.on('click', function () {
            if (self.radio == 2) {
            } else {
                cc.audioEngine.play(self.audio, false, 1);
            }
            self.nodeTipError.active = false;
        });
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
