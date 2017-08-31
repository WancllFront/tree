let gamexhr = require('./gamexhr');
let CryptoJS = require('./CryptoJS');
cc.Class({
    extends: cc.Component,

    properties: {
        btnClose: cc.Button,
        btnQK: cc.Button,
        btnDYD: cc.Button,

        nodeQK: cc.Node,
        nodeDYD: cc.Node,

        btnQKCancel: cc.Button,
        btnDYDCancel: cc.Button,

        labelQKCoin: cc.Label,
        labelDYDCoin: cc.Label,


        btnQKTypeOne: cc.Button,
        btnQKTypeThree: cc.Button,
        btnQKTypeFour: cc.Button,


        btnDYDTypeOne: cc.Button,
        btnDYDTypeThree: cc.Button,
        btnDYDTypeFour: cc.Button,

        nodeTip: cc.Node,
        labelTip: cc.Label,

        audio: cc.AudioClip,

        nodeAnimation1: cc.Node,
        nodeAnimation2: cc.Node,
        nodeAnimation3: cc.Node,

        nodeAnimation4: cc.Node,
        nodeAnimation5: cc.Node,
    },

    btnController: function () {
        this.btnClose.node.on('click', (event) => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            cc.director.loadScene('gamehall')
        })
        this.btnQK.node.on('click', (event) => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            this.nodeQK.active = true;
        })
        this.btnDYD.node.on('click', (event) => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            this.nodeDYD.active = true;
        })
        this.btnQKCancel.node.on('click', (event) => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            this.labelTip.string = '';
            this.nodeQK.active = false;
        })
        this.btnDYDCancel.node.on('click', (event) => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            this.nodeDYD.active = false;
            this.labelTip.string = '';
        })

        this.btnQKTypeOne.node.on('click', (event) => {
            this.async(1, 1)
        })
        this.btnQKTypeThree.node.on('click', (event) => {
            this.async(3, 2)
        })
        this.btnQKTypeFour.node.on('click', (event) => {
            this.async(4, 3)
        })
        this.btnDYDTypeOne.node.on('click', (event) => {
            this.async(1, 4)
        })
        this.btnDYDTypeThree.node.on('click', (event) => {
            this.async(3, 5)
        })
        this.btnDYDTypeFour.node.on('click', (event) => {
            this.async(4)
        })
    },

    async: function (type, aniLevel) {
        if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
        let data = {
            uid: this.uid,
            type: type,
            key: CryptoJS.MD5(new Date().getDate() + '' + 'wancll').toString(CryptoJS.enc.Hex)
        }
        let url = gamexhr.yuming + gamexhr.vent;
        gamexhr.async(url, (resp) => {
            if (resp.msg == 'success') {
                this.labelDYDCoin.string = resp.extra.rest;
                this.labelQKCoin.string = resp.extra.rest;

                this['nodeAnimation' + aniLevel].getComponent(cc.Animation).play();
            } else {
                this.nodeTip.active = true;
                this.labelTip.string = resp.data;
            }
        }, 'POST', data);
    },

    onLoad: function () {
        this.radio = cc.sys.localStorage.getItem('radio');

        this.labelDYDCoin.string = window.gameObj.money;
        this.labelQKCoin.string = window.gameObj.money;
        this.uid = window.gameObj.uid;

        this.btnController();
    },


});
