let gamexhr = require('./gamexhr');
let CryptoJS = require('./CryptoJS');
cc.Class({
    extends: cc.Component,

    properties: {
        labelUsername: cc.Label,
        labelCoin: cc.Label,
        labelGainTotal: cc.Label,

        labelGain: cc.Label,
        labelTip: cc.Label,
        labelSelected: cc.Label,

        btnClose: cc.Button,
        btnOpen: cc.Button,
        btnCancel: cc.Button,

        btnTypeOne: cc.Button,
        btnTypeTwo: cc.Button,
        btnTypeThree: cc.Button,

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
        this.btnCancel.node.on('click', () => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            this.nodeTip.active = false;
            this.nodeLucky.active = false;
            this.nodeThanks.active = false;
            this.btnCancel.node.active = false;
        })

        this.btnOpen.node.on('click', () => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            if (this.type == 1 || this.type == 2 || this.type == 3) {
                if (this.timer && (new Date().getTime() - this.timer < 3000)) {
                    
                    this.labelTip.string = '点击间隔为3秒';
                    this.nodeTip.active = true;
                    this.btnCancel.node.active = true;
                    return;
                }else{
                    this.timer = new Date().getTime();
                }

                let url = gamexhr.yuming + gamexhr.bonus;
                let data = {
                    uid: this.uid,
                    type: this.type,
                    key: CryptoJS.MD5(new Date().getDate() + '' + 'wancll').toString(CryptoJS.enc.Hex)
                }
                gamexhr.async(url, (resp) => {
                    this.btnCancel.node.active = true;
                    if (resp.msg == 'success') {
                        if (resp.data == 0) {
                            this.nodeThanks.active = true;
                            this.labelCoin.string = resp.extra.rest;
                        } else {
                            this.nodeLucky.active = true;
                            this.labelGain.string = resp.data;
                            this.labelGainTotal.string += parseInt(resp.data);
                            this.labelCoin.string = resp.extra.rest;
                        }
                    } else {
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

        this.btnTypeOne.node.on('click', () => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            this.type = 1;
            this.labelSelected.string = '当前选择：200';

        })
        this.btnTypeTwo.node.on('click', () => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            this.type = 2;
            this.labelSelected.string = '当前选择：500';

        })
        this.btnTypeThree.node.on('click', () => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            this.type = 3;
            this.labelSelected.string = '当前选择：1000';

        })

    },

    onEnable: function () {
        this.radio = cc.sys.localStorage.getItem('radio');
        this.labelUsername.string = window.gameObj.username;
        this.labelCoin.string = window.gameObj.money;
        this.uid = window.gameObj.uid;
        this.labelGainTotal.string = 0;
        this.labelGain.string = 0;
        this.type = '';
        this.nodeLucky.active = false;
        this.nodeThanks.active = false;
        this.nodeTip.active = false;
        this.labelTip.string = ''
        this.labelGain.string = '';
    },

    // use this for initialization
    onLoad: function () {
        this.btnController();
    },


});
