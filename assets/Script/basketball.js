let gamexhr = require('./gamexhr');
let CryptoJS = require('./CryptoJS');
cc.Class({
    extends: cc.Component,

    properties: {
        btnClose: cc.Button,
        btnStart: cc.Button,
        btnTypeOne: cc.Button,
        btnTypeTwo: cc.Button,
        btnTypeThree: cc.Button,
        btnTypeFour: cc.Button,
        btnCancel: cc.Button,

        nodeAnimation: cc.Node,

        labelTip: cc.Label,
        labelGainTotal: cc.Label,
        labelCoin: cc.Label,

        nodeTip: cc.Node,

        audio: cc.AudioClip,

    },

    btnController: function () {
        this.btnClose.node.on('click', () => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            cc.director.loadScene('gamehall');
        })
        this.btnStart.node.on('click', () => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            this.btnStart.interactable = false;
            if (this.type > 0 && this.type < 5) {
                if (this.timer && (new Date().getTime() - this.timer < 3000)) {

                    this.labelTip.string = '点击间隔为3秒';
                    this.nodeTip.active = true;
                    this.btnCancel.node.active = true;
                    return;
                } else {
                    this.timer = new Date().getTime();
                }

                let url = gamexhr.yuming + gamexhr.mixgame;
                let data = {
                    uid: this.uid,
                    type: this.type,
                    game: 'basketball',
                    key: CryptoJS.MD5(new Date().getDate() + '' + 'wancll').toString(CryptoJS.enc.Hex)
                }
                gamexhr.async(url, (resp) => {

                    if (resp.msg == 'success') {
                        if (resp.data == 0) {
                            if (Math.random() < 0.5) {
                                this.nodeAnimation.getComponent(cc.Animation).play('zuo');
                            } else {
                                this.nodeAnimation.getComponent(cc.Animation).play('you');
                            }
                        } else {
                            this.nodeAnimation.getComponent(cc.Animation).play('zhong');
                        }
                        setTimeout(() => {
                            this.btnCancel.node.active = true;
                            if (resp.data == 0) {
                                this.labelTip.string = '很遗憾，您没有投中';
                                this.nodeTip.active = true;
                                this.labelCoin.string = resp.extra.rest;
                            } else {
                                this.nodeTip.active = true;
                                this.labelTip.string = '投中了，获得' + resp.data + '金币';
                                this.labelGainTotal.string += parseInt(resp.data);
                                this.labelCoin.string = resp.extra.rest;
                            }
                        }, 1500);

                    } else {
                        this.btnCancel.node.active = true;
                        this.labelTip.string = resp.data;
                        this.nodeTip.active = true;
                    }
                }, 'POST', data);
            } else {
                this.btnCancel.node.active = true;
                this.labelTip.string = '请选择金额';
                this.nodeTip.active = true;
            }
        })
        this.btnTypeOne.node.on('click', (event) => {
            this.btnHandler('One')
            this.type = 1;
        });
        this.btnTypeTwo.node.on('click', (event) => {
            this.btnHandler('Two')
            this.type = 2;
        });
        this.btnTypeThree.node.on('click', (event) => {
            this.btnHandler('Three')
            this.type = 3;
        });
        this.btnTypeFour.node.on('click', (event) => {
            this.btnHandler('Four')
            this.type = 4;
        });

        this.btnCancel.node.on('click', () => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            this.nodeTip.active = false;
            this.btnCancel.node.active = false;
            this.btnStart.interactable = true;
        });

    },

    btnHandler: function (level) {
        if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
        let index = 'btnType' + level;
        this.btnTypeOne.interactable = true;
        this.btnTypeTwo.interactable = true;
        this.btnTypeThree.interactable = true;
        this.btnTypeFour.interactable = true;
        this[index].interactable = false;
    },


    onEnable: function () {
        this.radio = cc.sys.localStorage.getItem('radio');
        this.labelCoin.string = window.gameObj.money;
        this.uid = window.gameObj.uid;
        this.type = -1;
        this.labelGainTotal.string = 0;
    },

    // use this for initialization
    onLoad: function () {
        this.btnController();
    },


});
