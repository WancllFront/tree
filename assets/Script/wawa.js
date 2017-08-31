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

        labelTip: cc.Label,
        labelGain: cc.Label,
        labelGainTotal: cc.Label,
        labelCoin: cc.Label,

        //动画节点
        nodeXia: cc.Node,
        nodeThanks: cc.Node,
        nodeLucky: cc.Node,
        nodeTip: cc.Node,

        audio: cc.AudioClip,

    },

    btnController: function () {
        this.btnClose.node.on('click', () => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            cc.director.loadScene('gamehall');
        })
        this.btnStart.node.on('click', () => {
            this.btnStart.interactable = false;
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }

            if (this.type > 0 && this.type < 5) {
                if (this.timer && (new Date().getTime() - this.timer < 3000)) {

                    this.labelTip.string = '点击间隔为3秒';
                    this.nodeTip.active = true;
                    this.btnCancel.node.active = true;
                    return;
                } else {
                    this.timer = new Date().getTime();
                }

                this.nodeXia.getComponent(cc.Animation).play('xia');

                setTimeout(() => {
                    let url = gamexhr.yuming + gamexhr.mixgame;
                    let data = {
                        uid: this.uid,
                        type: this.type,
                        game: 'wawa',
                        key: CryptoJS.MD5(new Date().getDate() + '' + 'wancll').toString(CryptoJS.enc.Hex)
                    }
                    gamexhr.async(url, (resp) => {

                        if (resp.msg == 'success') {
                            if (resp.data == 0) {
                                this.nodeXia.getComponent(cc.Animation).play('wu');
                            } else {
                                if (this.type == 1) {
                                    this.nodeXia.getComponent(cc.Animation).play('mao');
                                } else if (this.type == 2) {
                                    this.nodeXia.getComponent(cc.Animation).play('tu');
                                } else if (this.type == 3) {
                                    this.nodeXia.getComponent(cc.Animation).play('shi');
                                } else if (this.type == 4) {
                                    this.nodeXia.getComponent(cc.Animation).play('xiong');
                                }
                            }
                            setTimeout(() => {
                                this.btnCancel.node.active = true;
                                if (resp.data == 0) {
                                    this.nodeThanks.active = true;
                                    this.labelCoin.string = resp.extra.rest;
                                } else {

                                    this.nodeLucky.active = true;
                                    this.labelGain.string = resp.data;
                                    this.labelGainTotal.string += parseInt(resp.data);
                                    this.labelCoin.string = resp.extra.rest;
                                }
                            }, 2200);

                        } else {
                            this.btnCancel.node.active = true;
                            this.labelTip.string = resp.data;
                            this.nodeTip.active = true;
                        }
                    }, 'POST', data);
                }, 2000);


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
            this.nodeLucky.active = false;
            this.nodeTip.active = false;
            this.nodeThanks.active = false;
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
