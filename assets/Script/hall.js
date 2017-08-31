var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {

        audio: cc.AudioClip,
        username: cc.Label,
        shubei: cc.Label,
        dibei: cc.Label,

        btnGame: cc.Button,
        btnShop: cc.Button,
        btnXiangjiaolin: cc.Button,
        //风车
        btnFengche: cc.Button,
        //农商银行
        btnBank: cc.Button,
        btnSetting: cc.Button,

        nodeTipSuccess: cc.Node,
        nodeTipError: cc.Node,
        btnTipSuccess: cc.Button,
        btnTipError: cc.Button,
        labelTipSuccess: cc.Label,
        labelTipError: cc.Label,

        spritePhoto: cc.Sprite,

        btnSign: cc.Button
    },

    loadUserInfo: function () {
        var self = this;

        var userinfo = com.getUser();

        this.username.string = userinfo.UserName;
        this.shubei.string = userinfo.XjCredits;
        this.dibei.string = userinfo.JhCredits;
    },


    updatePhoto: function () {
        var self = this;
        var userinfo = com.getUser();
        var photoUrl = userinfo.Photo;

        if (photoUrl != '') {

            cc.loader.load(photoUrl, function (err, texture) {
                var frame = new cc.SpriteFrame(texture);
                self.spritePhoto.node.getComponent(cc.Sprite).spriteFrame = frame;
            });
        }
    },

    btnController: function () {
        var self = this;
        var userinfo = com.getUser();
        var uid = userinfo.ID;

        //设置按钮
        this.btnSetting.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            cc.director.loadScene('setting');
        });

        //签到
        this.btnSign.node.on('click', (resp) => {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            var url = com.yuming + com.goSign;
            com.async(url, (resp) => {

                if (resp.msg1 == 'success') {
                    this.nodeTipSuccess.active = true;
                    this.labelTipSuccess.string = resp.msg2 || '签到成功'
                } else {
                    this.nodeTipError.active = true;
                    this.labelTipError.string = resp.msg2 || '签到失败'
                }
            }, { uid: uid })
        })


        //进入游戏大厅
        this.btnGame.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }

            cc.director.loadScene("gamehall");

        });

        //进入商城
        this.btnShop.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }

            cc.director.loadScene("shop");

        });

        //进入我的家
        this.btnBank.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            cc.director.loadScene("home");
        });

        //租风车
        this.btnFengche.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }

            self.nodeTipError.active = true;
            self.labelTipError.string = '暂未开放，敬请期待';
            //cc.director.loadScene('fadian');
        });

        this.btnXiangjiaolin.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }


            cc.director.loadScene('rent');
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
        this.timer = 0;
        this.dog = 0;
        this.bird = 0;
        this.loadUserInfo();
        this.updatePhoto();
        this.radio = cc.sys.localStorage.getItem('radio');
        //  cc.audioEngine.play(this.audioBird,true,0.5);
    },


    // use this for initialization
    onLoad: function () {
        this.btnController();
    },
});
