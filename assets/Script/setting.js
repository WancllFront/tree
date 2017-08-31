var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
        btnClose: cc.Button,
        btnActive: cc.Button,
        btnLogout: cc.Button,

        btnMusic: cc.Button,
        btnRadio: cc.Button,

        nodeTipSuccess: cc.Node,
        nodeTipError: cc.Node,
        btnTipSuccess: cc.Button,
        btnTipError: cc.Button,
        labelTipSuccess: cc.Label,
        labelTipError: cc.Label,

        nodeMusicOn: cc.Node,
        nodeMusicOff: cc.Node,
        nodeRadioOn: cc.Node,
        nodeRadioOff: cc.Node,

        audio: cc.AudioClip,

        music1: cc.AudioClip,

        music2: cc.AudioClip,

        music3: cc.AudioClip,
        music4: cc.AudioClip,
        music5: cc.AudioClip,
        music6: cc.AudioClip,

        btnExit: cc.Button,
        nodeExit: cc.Node,
        btnCancle: cc.Button,

        btnConfirm: cc.Button,

        toggleOne: cc.Toggle,
        toggleTwo: cc.Toggle,
        toggleThree: cc.Toggle,
        toggleFour: cc.Toggle,
        toggleFive: cc.Toggle,
        toggleSix: cc.Toggle,
    },

    btnController: function () {
        var isLogout = false;
        var self = this;
        var userinfo = com.getUser();
        this.btnClose.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            cc.director.loadScene('hall');
        });
        this.btnActive.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }

            com.activeDebei(userinfo.ID, function (resp) {

                if (resp.msg1 == 'success') {
                    self.nodeTipSuccess.active = true;
                    self.labelTipSuccess.string = resp.msg2 || '激活成功';
                } else {
                    self.nodeTipError.active = true;
                    self.labelTipError.string = resp.msg2;
                }
            });
        });

        //音乐开关
        this.btnMusic.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }

            var music = cc.sys.localStorage.getItem('music');
            if (self.music == 2) {
                self.music = 1;

                cc.audioEngine.resumeAll();
                cc.sys.localStorage.setItem('music', 1);
            } else {

                cc.audioEngine.pauseAll();
                self.music = 2;
                cc.sys.localStorage.setItem('music', 2);
            }

            self.nodeMusicOff.active = !self.nodeMusicOff.active;
            self.nodeMusicOn.active = !self.nodeMusicOn.active;
        });

        //音效开关
        this.btnRadio.node.on('click', function () {
            var radio = cc.sys.localStorage.getItem('radio');
            if (self.radio == 2) {
                cc.audioEngine.play(self.audio, false, 1);
                self.radio = 1;
                cc.sys.localStorage.setItem('radio', 1);
            } else {

                self.radio = 2;
                cc.sys.localStorage.setItem('radio', 2);
            }

            self.nodeRadioOff.active = !self.nodeRadioOff.active;
            self.nodeRadioOn.active = !self.nodeRadioOn.active;
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


        this.btnLogout.node.on('click', function () {
            if (self.radio == 2) {
            } else {
                cc.audioEngine.play(self.audio, false, 1);
            }

            isLogout = true;
            self.nodeExit.active = true;

        });


        //退出游戏
        this.btnExit.node.on('click', function () {
           if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            isLogout = false;
            self.nodeExit.active = true;
        });
        //取消
        this.btnCancle.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            self.nodeExit.active = false;
        });
        //确定
        this.btnConfirm.node.on('click', function () {
           if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }

            if (isLogout) {
                com.logout();
                window.cacheTree = null;
                cc.director.loadScene('index');
            } else {
                cc.game.end();
            }


        });


        this.toggleOne.node.on('toggle', function (event) {
            var toggle = event.detail;
            cc.audioEngine.stopAll();
            cc.audioEngine.playMusic(self.music1, true, 1);

        }, this);

        this.toggleTwo.node.on('toggle', function (event) {
            var toggle = event.detail;
            cc.audioEngine.stopAll();
            cc.audioEngine.playMusic(self.music2, true, 1);

        }, this);

        this.toggleThree.node.on('toggle', function (event) {
            var toggle = event.detail;
            cc.audioEngine.stopAll();
            cc.audioEngine.playMusic(self.music3, true, 1);

        }, this);
        this.toggleThree.node.on('toggle', function (event) {
            var toggle = event.detail;
            cc.audioEngine.stopAll();
            cc.audioEngine.playMusic(self.music3, true, 1);

        }, this);
        this.toggleFour.node.on('toggle', function (event) {
            var toggle = event.detail;
            cc.audioEngine.stopAll();
            cc.audioEngine.playMusic(self.music4, true, 1);

        }, this);
        this.toggleFive.node.on('toggle', function (event) {
            var toggle = event.detail;
            cc.audioEngine.stopAll();
            cc.audioEngine.playMusic(self.music5, true, 1);

        }, this);
        this.toggleSix.node.on('toggle', function (event) {
            var toggle = event.detail;
            cc.audioEngine.stopAll();
            cc.audioEngine.playMusic(self.music6, true, 1);

        }, this);

    },

    // use this for initialization
    onLoad: function () {
        this.music = cc.sys.localStorage.getItem('music');
        this.radio = cc.sys.localStorage.getItem('radio');
        if (this.music == 2) {
            this.nodeMusicOff.active = true;
            this.nodeMusicOn.active = false;
        } else {
            this.nodeMusicOff.active = false;
            this.nodeMusicOn.active = true;
        }

        if (this.radio == 2) {
            this.nodeRadioOff.active = true;
            this.nodeRadioOn.active = false;
        } else {
            this.nodeRadioOff.active = false;
            this.nodeRadioOn.active = true;
        }

        this.btnController();
    },
    
});
