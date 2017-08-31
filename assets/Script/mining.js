let gamexhr = require('./gamexhr');
let CryptoJS = require('./CryptoJS');
cc.Class({
    extends: cc.Component,

    properties: {
        btnClose: cc.Button,
        btnConfirm: cc.Button,
        btnStart: cc.Button,

        nodeTip: cc.Node,
        labelTip: cc.Label,

        labelGain: cc.Label,
        labelCoin: cc.Label,

        audio: cc.AudioClip,
        nodeAnimation: cc.Node,

        btnType1: cc.Button,
        btnType2: cc.Button
    },

    btnController: function () {
        this.btnClose.node.on('click', () => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            cc.director.loadScene('gamehall')
        })
        this.btnConfirm.node.on('click', () => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            this.btnConfirm.node.active = false;
            this.nodeTip.active = false;
        })

        this.btnStart.node.on('click', () => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            if (this.type == 1 || this.type == 2) {
                if (this.timer && (new Date().getTime() - this.timer < 3000)) {

                    this.labelTip.string = '点击间隔为3秒';
                    this.nodeTip.active = true;
                    this.btnConfirm.node.active = true;
                    return;
                } else {
                    this.timer = new Date().getTime();
                }

                this.nodeAnimation.getComponent(cc.Animation).play('jin');
                setTimeout(() => {
                    let url = gamexhr.yuming + gamexhr.mining;
                    let data = {
                        uid: this.uid,
                        type: this.type,
                        key: CryptoJS.MD5(new Date().getDate() + '' + 'wancll').toString(CryptoJS.enc.Hex)
                    }
                    gamexhr.async(url, (resp) => {
                        console.log(JSON.stringify(resp))
                        if (resp.msg == 'success') {
                            if (resp.data == 0) {
                                this.nodeAnimation.getComponent(cc.Animation).play('you');
                            } else {
                                this.nodeAnimation.getComponent(cc.Animation).play('wu');
                               
                            }
                            setTimeout(() => {
                                this.btnConfirm.node.active = true;
                                if (resp.data == 0) {
                                    this.nodeTip.active = true;
                                    this.labelTip.string = '很遗憾，您没有挖到'
                                    this.labelCoin.string = resp.extra.rest;
                                    this.btnConfirm.node.active = true;
                                } else {
                                    this.nodeTip.active = true;
                                    this.labelTip.string = '恭喜您挖到了价值'+resp.data+'的金矿'
                                    this.labelGain.string += parseInt(resp.data)
                                    this.labelCoin.string = resp.extra.rest;
                                    this.btnConfirm.node.active = true;
                                }
                            }, 1000);

                        } else {
                            this.btnConfirm.node.active = true;
                            this.labelTip.string = resp.data;
                            this.nodeTip.active = true;
                        }
                    }, 'POST', data);
                }, 2000)

            } else {
                this.nodeTip.active = true;
                this.labelTip.string = '请选择金额'
                this.btnConfirm.node.active = true;
            }
        })

        this.btnType1.node.on('click', () => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            this.btnType1.interactable = false
            this.btnType2.interactable = true
            this.type = 1;
        })
        this.btnType2.node.on('click', () => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            this.btnType2.interactable = false
            this.btnType1.interactable = true
            this.type = 2;
        })
    },

    onEnable: function () {
        this.radio = cc.sys.localStorage.getItem('radio');
        this.labelCoin.string = window.gameObj.money;
        this.uid = window.gameObj.uid;
        this.type = -1;
        this.labelGain.string = 0;
    },
    // use this for initialization
    onLoad: function () {
        this.btnController();
    },

});
