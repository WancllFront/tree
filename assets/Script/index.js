var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
        //注册
        regNode: {
            default: null,
            type: cc.Node
        },
        regid: {
            default: null,
            type: cc.EditBox
        },
        regpwd: {
            default: null,
            type: cc.EditBox
        }
        ,
        varicode: {
            default: null,
            type: cc.EditBox
        }
        ,
        reffer: {
            default: null,
            type: cc.EditBox
        },
        btnReturnLogin: {
            default: null,
            type: cc.Button
        },
        btnReg: {
            default: null,
            type: cc.Button
        },
        btnGetcode: {
            default: null,
            type: cc.Button
        },

        //登陆
        loginNode: {
            default: null,
            type: cc.Node
        },
        loginid: {
            default: null,
            type: cc.EditBox
        },
        loginpwd: {
            default: null,
            type: cc.EditBox
        },
        btnGoReg: {
            default: null,
            type: cc.Button
        },
        btnGoGame: {
            default: null,
            type: cc.Button
        },
        btnResetPwd: {
            default: null,
            type: cc.Button
        },

        //重置密码
        nodeReset: {
            default: null,
            type: cc.Node
        },
        editboxUsercode: {
            default: null,
            type: cc.EditBox
        },
        editboxpwd: {
            default: null,
            type: cc.EditBox
        },
        editboxVaricode: {
            default: null,
            type: cc.EditBox
        },
        btnResetReturnLogin: {
            default: null,
            type: cc.Button
        },
        btnExcuteReset: {
            default: null,
            type: cc.Button
        },
        btnResetGetcode: {
            default: null,
            type: cc.Button
        },


        nodeTipSuccess: {
            default: null,
            type: cc.Node
        },
        nodeTipError: {
            default: null,
            type: cc.Node
        },
        btnTipSuccess: {
            default: null,
            type: cc.Button
        },
        btnTipError: {
            default: null,
            type: cc.Button
        },
        labelTipSuccess: {
            default: null,
            type: cc.Label
        },
        labelTipError: {
            default: null,
            type: cc.Label
        },

        audio: {
            url: cc.AudioClip,
            default: null
        },


        music: {
            url: cc.AudioClip,
            default: null
        },


        labelRegVaricode: {
            default: null,
            type: cc.Label
        },
        editboxRegVaricode: {
            default: null,
            type: cc.EditBox
        },


        labelResetVaricode: {
            default: null,
            type: cc.Label
        },
        editboxResetVaricode: {
            default: null,
            type: cc.EditBox
        },


        toggleRemPwd: {
            default: null,
            type: cc.Toggle
        }
    },





    //按钮点击事件注册
    btnController: function () {
        var self = this;
        //this.loginNode.active = true;
        var randomVaricode = '';
        var randomResetVaricode = '';

        //返回登陆
        this.btnReturnLogin.node.on('click', function () {

            if (self.radio == 2) {
            } else {
                cc.audioEngine.play(self.audio, false, 1);
            }


            // self.loginid.string= '';
            // self.loginpwd.string = '';
            self.loginNode.active = true;
            self.regNode.active = false;

        });

        //返回登陆
        this.btnResetReturnLogin.node.on('click', function () {
            if (self.radio == 2) {
            } else {
                cc.audioEngine.play(self.audio, false, 1);
            }


            // self.loginid.string= '';
            // self.loginpwd.string = '';
            self.nodeReset.active = false;
            self.loginNode.active = true;
            self.regNode.active = false;

        });

        //去注册页面

        this.btnGoReg.node.on('click', function () {
            if (self.radio == 2) {
            } else {
                cc.audioEngine.play(self.audio, false, 1);
            }

            randomVaricode = com.getrandom(4);
            self.labelRegVaricode.string = randomVaricode;

            self.editboxRegVaricode.string = '';
            self.regid.string = '';
            self.regpwd.string = '';
            self.reffer.string = '';
            self.varicode.string = '';
            self.loginNode.active = false;
            self.regNode.active = true;
        });

        //---------------------------获取注册验证码--------------------------------
        this.btnGetcode.node.on('click', function () {
            if (self.radio == 2) {
            } else {
                cc.audioEngine.play(self.audio, false, 1);
            }


            var tel = self.regid.string;
            var regVaricode = self.editboxRegVaricode.string;

            if (tel != '') {
                if (regVaricode != '' && randomVaricode == regVaricode) {

                    //刷新图形验证码

                    randomVaricode = com.getrandom(4);
                    self.labelRegVaricode.string = randomVaricode;


                    com.sendregcode(tel, function (resp) {
                        if (resp.msg1 == 'success') {
                            self.nodeTipSuccess.active = true;
                            self.labelTipSuccess.string = resp.msg2 || '获取验证码成功,请注意查收';
                        } else {
                            self.nodeTipError.active = true;
                            self.labelTipError.string = resp.msg2 || '获取验证码失败';
                        }

                    });
                } else {
                    self.nodeTipError.active = true;
                    self.labelTipError.string = '请输入正确的图形验证码!';
                }

            } else {
                self.nodeTipError.active = true;
                self.labelTipError.string = '请输入手机号码!';
            }
        });

        //重置密码获取验证码
        this.btnResetGetcode.node.on('click', function () {
            if (self.radio == 2) {
            } else {
                cc.audioEngine.play(self.audio, false, 1);
            }


            var tel = self.editboxUsercode.string;
            var editResetVaricode = self.editboxResetVaricode.string;

            if (tel != '') {
                if (editResetVaricode != '' && editResetVaricode == self.labelResetVaricode.string) {

                    //清空验证吗
                    randomResetVaricode = com.getrandom(4);
                    self.labelResetVaricode.string = randomResetVaricode;


                    com.sendBackcode(tel, function (resp) {
                        if (resp.msg1 == 'success') {
                            self.nodeTipSuccess.active = true;
                            self.labelTipSuccess.string = resp.msg2 || '获取验证码成功,请注意查收';
                        } else {
                            self.nodeTipError.active = true;
                            self.labelTipError.string = resp.msg2 || '获取验证码失败';
                        }
                    });
                } else {
                    console.log(editResetVaricode);
                    console.log(self.labelResetVaricode.string)
                    self.nodeTipError.active = true;
                    self.labelTipError.string = '请输入正确的图形验证码';

                }

            } else {
                self.nodeTipError.active = true;
                self.labelTipError.string = '请输入手机号码';
            }
        });

        //-----------------------------重置密码-------------------------
        this.btnExcuteReset.node.on('click', function () {
            if (self.radio == 2) {
            } else {
                cc.audioEngine.play(self.audio, false, 1);
            }


            if (self.editboxUsercode.string != '' && self.editboxpwd.string != '' && self.editboxVaricode != '') {
                if (self.editboxVaricode.string != cc.sys.localStorage.getItem('regcode')) {
                    self.nodeTipError.active = true;
                    self.labelTipError.string = '请输入正确的验证码';
                } else {
                    var list = {};
                    list.usercode = self.editboxUsercode.string;
                    list.pwd = self.editboxpwd.string;
                    var url = com.yuming + com.backpwd;

                    com.async(url, function (resp) {
                        if (resp.msg1 == 'success') {
                            self.nodeTipSuccess.active = true;
                            self.labelTipSuccess.string = resp.msg2 || '重置成功';
                        } else {
                            self.nodeTipError.active = true;
                            self.labelTipError.string = resp.msg2 || '重置失败';
                        }
                    }, list);
                }
            } else {
                self.nodeTipError.active = true;
                self.labelTipError.string = '请输入完整的信息';
            }


        });

        //---------------------------------登陆--------------------------------
        this.btnGoGame.node.on('click', function () {
            if (self.radio == 2) {
            } else {
                cc.audioEngine.play(self.audio, false, 1);
            }


            var usercode = self.loginid.string;
            var pwd = self.loginpwd.string;
            if (usercode != '' && pwd != '') {
                var list = [];
                list.usercode = usercode;
                list.pwd = pwd;
                com.login(list, function (resp) {

                    if (resp.msg1 == 'success') {
                        cc.sys.localStorage.setItem('current_user', JSON.stringify(resp.msg3));
                        self.nodeTipSuccess.active = true;
                        self.labelTipSuccess.string = resp.msg2 || '登陆成功';
                        //判断是否记住密码
                        if (self.toggleRemPwd.isChecked) {
                            cc.sys.localStorage.setItem('usercode', self.loginid.string);
                            cc.sys.localStorage.setItem('userpwd', self.loginpwd.string);
                        } else {
                            cc.sys.localStorage.setItem('usercode', null);
                            cc.sys.localStorage.setItem('userpwd', null);
                        }
                        com.updateUser();
                        cc.director.loadScene("hall");
                    } else {
                        self.nodeTipError.active = true;
                        self.labelTipError.string = resp.msg2 || '登陆失败';
                    }
                });
            } else {
                self.nodeTipError.active = true;
                self.labelTipError.string = '请输入完整的信息';
            }

        });

        //--------------------------------------注册----------------------------------
        this.btnReg.node.on('click', function () {
            if (self.radio == 2) {
            } else {
                cc.audioEngine.play(self.audio, false, 1);
            }


            var tel = self.regid.string;
            var pwd = self.regpwd.string;
            var varicode = self.varicode.string;
            var reffer = self.reffer.string;


            if (tel != '' && pwd != '' && varicode != '' && reffer != '') {

                if (varicode != cc.sys.localStorage.getItem('regcode')) {

                    self.nodeTipError.active = true;
                    self.labelTipError.string = '请输入正确的验证码';
                } else {
                    var list = [];
                    list.usercode = tel;
                    list.pwd1 = pwd;
                    list.tjuser = reffer;
                    com.reg(list, function (resp) {
                        if (resp.msg1 == 'success') {
                            self.nodeTipSuccess.active = true;
                            self.labelTipSuccess.string = resp.msg2 || '注册成功';

                            self.loginNode.active = true;
                            self.regNode.active = false;

                        } else {
                            self.nodeTipError.active = true;
                            self.labelTipError.string = resp.msg2 || '注册失败';
                        }
                    })
                }
            } else {

                self.nodeTipError.active = true;
                self.labelTipError.string = '请输入完整的信息';
            }

        });


        //去重置密码界面
        this.btnResetPwd.node.on('click', function () {
            if (self.radio == 2) {
            } else {
                cc.audioEngine.play(self.audio, false, 1);
            }
            randomResetVaricode = com.getrandom(4);
            self.labelResetVaricode.string = randomResetVaricode;
            self.editboxResetVaricode.string = '';
            self.editboxpwd.string = '';
            self.editboxUsercode.string = '';
            self.editboxVaricode.string = '';
            self.nodeReset.active = true;
            self.loginNode.active = false;

        });


        this.btnTipSuccess.node.on('click', function () {
            if (self.radio == 2) {
            } else {
                cc.audioEngine.play(self.audio, false, 1);
            }


            self.labelTipSuccess.string = '';
            self.nodeTipSuccess.active = false;
        });
        this.btnTipError.node.on('click', function () {
            if (self.radio == 2) {
            } else {
                cc.audioEngine.play(self.audio, false, 1);
            }

            self.labelTipError.string = '';
            self.nodeTipError.active = false;
        });
    },

    onEnable: function () {
        if (cc.sys.localStorage.getItem('music') == 2) { } else { cc.audioEngine.playMusic(this.music, true, 1); }

        this.radio = cc.sys.localStorage.getItem('radio');

        var usercode = cc.sys.localStorage.getItem('usercode');
        var userpwd = cc.sys.localStorage.getItem('userpwd');

        this.loginid.string = usercode;
        this.loginpwd.string = userpwd;
    },

    // use this for initialization
    onLoad: function () {

        this.btnController();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
