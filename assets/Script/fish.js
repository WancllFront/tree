let gamexhr = require('./gamexhr');
let CryptoJS = require('./CryptoJS');
cc.Class({
    extends: cc.Component,

    properties: {
        //购买界面
        nodeShop: cc.Node,
        btnShopClose: cc.Button,
        btnBuy1: cc.Button,
        btnBuy2: cc.Button,
        btnBuy3: cc.Button,
        btnBuy4: cc.Button,
        btnBuy5: cc.Button,
        btnBuy6: cc.Button,

        nodeKuang: cc.Node,
        labelKuang: cc.Label,
        btnConfirm: cc.Button,

        labelCoin: cc.Label,
        labelGain: cc.Label,

        btnShop: cc.Button,
        btnClose: cc.Button,

        //鱼竿切换
        nodeGanKuang: cc.Node,
        nodeGan1: cc.Node, btnGan1: cc.Button, nodeGanPic1: cc.Node,
        nodeGan2: cc.Node, btnGan2: cc.Button, nodeGanPic2: cc.Node,
        nodeGan3: cc.Node, btnGan3: cc.Button, nodeGanPic3: cc.Node,
        nodeGan4: cc.Node, btnGan4: cc.Button, nodeGanPic4: cc.Node,
        nodeGan5: cc.Node, btnGan5: cc.Button, nodeGanPic5: cc.Node,
        nodeGan6: cc.Node, btnGan6: cc.Button, nodeGanPic6: cc.Node,
        nodeGan7: cc.Node, btnGan7: cc.Button, nodeGanPic7: cc.Node,
        btnChangeGan: cc.Button,

        btnStartFish: cc.Button,
        btnEndFish: cc.Button,
        btnFishArray: cc.Button,

        labelTime: cc.Label,
        nodeFloat: cc.Node,

        nodeFishNet:cc.Node,

        audio: cc.AudioClip,
    },

    btnController: function () {
        this.btnShopClose.node.on('click', () => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            this.nodeShop.active = false;
        })
        this.btnBuy1.node.on('click', () => {
            this.buy(2)
        })
        this.btnBuy2.node.on('click', () => {
            this.buy(3)
        })
        this.btnBuy3.node.on('click', () => {
            this.buy(4)
        })
        this.btnBuy4.node.on('click', () => {
            this.buy(5)
        })
        this.btnBuy5.node.on('click', () => {
            this.buy(6)
        })
        this.btnBuy6.node.on('click', () => {
            this.buy(7)
        })

        this.btnConfirm.node.on('click', () => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            this.labelTime.string = ''
            this.nodeKuang.active = false;
        })

        this.btnClose.node.on('click', () => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            cc.director.loadScene('gamehall')
        })
        this.btnShop.node.on('click', () => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            this.nodeShop.active = true;
        })

        this.btnGan1.node.on('click', () => {
            this.ganSelect(1);
        })
        this.btnGan2.node.on('click', () => {
            this.ganSelect(2);
        })
        this.btnGan3.node.on('click', () => {
            this.ganSelect(3);
        })
        this.btnGan4.node.on('click', () => {
            this.ganSelect(4);
        })
        this.btnGan5.node.on('click', () => {
            this.ganSelect(5);
        })
        this.btnGan6.node.on('click', () => {
            this.ganSelect(6);
        })
        this.btnGan7.node.on('click', () => {
            this.ganSelect(7);
        })

        this.btnChangeGan.node.on('click', () => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            this.nodeGanKuang.active = !this.nodeGanKuang.active;
        })

        this.btnFishArray.node.on('click', () => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            this.nodeFishNet.getComponent(cc.Animation).play()
            setTimeout(() => {
                let url = gamexhr.yuming + gamexhr.fisharray;
                let data = {
                    uid: this.uid,
                    type: 1,
                    key: CryptoJS.MD5(new Date().getDate() + '' + 'wancll').toString(CryptoJS.enc.Hex)
                }

                gamexhr.async(url, (resp) => {
                    this.nodeKuang.active = true;
                    if(resp.msg == 'success'){
                        if(resp.data == 0){
                            this.labelKuang.string = '很遗憾，您没有捕到鱼'
                        }else{
                            this.labelKuang.string = '恭喜您，捕到价值'+resp.data+'的鱼'
                            this.labelCoin.string = resp.extra.rest
                            this.labelGain.string += parseInt(resp.data)
                        }
                    }else{
                        this.labelKuang.string = resp.data
                    }
                }, 'POST', data);
            }, 1500)

        })

        this.btnStartFish.node.on('click', () => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            this.nodeFloat.active = true;
            this.nodeFloat.getComponent(cc.Animation).play()
            this.time = 10;
            this.intervalInt = setInterval(() => {
                this.labelTime.string = this.time;
                if (this.time != 0) {
                    this.time--
                } else {
                    this.labelTime.string == ''
                }
            }, 1000)
            this.btnStartFish.node.active = false;
            this.btnEndFish.node.active = true;
        })

        this.btnEndFish.node.on('click', () => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            clearInterval(this.intervalInt);
            this.nodeFloat.active = false;

            this['nodeGanPic' + this.type].getComponent(cc.Animation).play();
            setTimeout(() => {

                if (this.time >= 8) {
                    let url = gamexhr.yuming + gamexhr.fish;
                    let data = {
                        uid: this.uid,
                        type: this.type,
                        isNoFish:1,
                        key: CryptoJS.MD5(new Date().getDate() + '' + 'wancll').toString(CryptoJS.enc.Hex)
                    }
                    gamexhr.async(url, (resp) => {
                        console.log('还没上钩')
                        this.nodeKuang.active = true;
                        this.btnStartFish.node.active = true;
                        this.btnEndFish.node.active = false;
                        if(resp.msg == 'success'){
                            this.labelKuang.string = '对不起,鱼还没上钩'
                            this.labelCoin.string = resp.extra.rest
                        }else{
                            this.labelKuang.string = resp.data;
                        }
                    },'POST',data);
                    return;
                } else if (this.time <= 3) {
                    let url = gamexhr.yuming + gamexhr.fish;
                    let data = {
                        uid: this.uid,
                        type: this.type,
                        isNoFish:1,
                        key: CryptoJS.MD5(new Date().getDate() + '' + 'wancll').toString(CryptoJS.enc.Hex)
                    }
                    gamexhr.async(url, (resp) => {
                        console.log('跑了')
                        this.nodeKuang.active = true;
                        this.btnStartFish.node.active = true;
                        this.btnEndFish.node.active = false;
                        if(resp.msg == 'success'){
                            this.labelKuang.string = '对不起,鱼已经跑了'
                            this.labelCoin.string = resp.extra.rest
                        }else{
                            this.labelKuang.string = resp.data;
                        }
                    },'POST',data);

                } else {
                    let url = gamexhr.yuming + gamexhr.fish;
                    let data = {
                        uid: this.uid,
                        type: this.type,
                        key: CryptoJS.MD5(new Date().getDate() + '' + 'wancll').toString(CryptoJS.enc.Hex)
                    }
                    gamexhr.async(url, (resp) => {
                        this.btnStartFish.node.active = true;
                        this.btnEndFish.node.active = false;
                        this.nodeKuang.active = true;
                        if (resp.msg == 'success') {
                            this.labelCoin.string = resp.extra.rest;
                            this.labelGain.string += parseInt(resp.data)
                            if (resp.data == 0) {
                                this.labelKuang.string = '很遗憾您，没有钓到鱼'
                            } else {
                                this.labelKuang.string = '恭喜您，钓到价值' + resp.data + '金币的鱼'
                            }
                        } else {
                            this.labelKuang.string = resp.data
                        }
                    }, 'POST', data);
                }
            }, 600)
        })
    },

    ganSelect: function (type) {
        if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
        this.nodeGanKuang.active = !this.nodeGanKuang.active;
        this.nodeGan1.active = false;
        this.nodeGan2.active = false;
        this.nodeGan3.active = false;
        this.nodeGan4.active = false;
        this.nodeGan5.active = false;
        this.nodeGan6.active = false;
        this.nodeGan7.active = false;
        this.nodeGanPic1.active = false;
        this.nodeGanPic2.active = false;
        this.nodeGanPic3.active = false;
        this.nodeGanPic4.active = false;
        this.nodeGanPic5.active = false;
        this.nodeGanPic6.active = false;
        this.nodeGanPic7.active = false;

        this['nodeGan' + type].active = true;
        this['nodeGanPic' + type].active = true;

        this.type = type;
    },

    buy: function (level) {
        if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
        let url = gamexhr.yuming + gamexhr.buy;
        let data = {
            uid: this.uid,
            type: level,
            key: CryptoJS.MD5(new Date().getDate() + '' + 'wancll').toString(CryptoJS.enc.Hex)
        }

        gamexhr.async(url, (resp) => {
            this.nodeKuang.active = true;
            this.labelKuang.string = resp.data
            if (resp.msg == 'success') {
                this.labelCoin.string = resp.extra.rest
            }
        }, 'POST', data);
    },

    onEnable: function () {
        this.radio = cc.sys.localStorage.getItem('radio');
        this.labelCoin.string = window.gameObj.money;
        this.uid = window.gameObj.uid;
        this.type = 1;
        this.labelGain.string = 0;
    },

    // use this for initialization
    onLoad: function () {
        this.btnController();
    },


});
