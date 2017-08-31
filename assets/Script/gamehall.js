let com = require('./common')
let CryptoJS = require('./CryptoJS')
let gamexhr = require('./gamexhr')
cc.Class({
    extends: cc.Component,

    properties: {
        btnClose: cc.Button,
        audio: cc.AudioClip,

        nodeChongzhi: cc.Node,
        nodeTitleChongzhi: cc.Node,
        nodeTitleTixian: cc.Node,
        btnCoinAdd: cc.Button,
        btnCoinsub: cc.Button,
        labelCoin: cc.Label,

        editboxCoin: cc.EditBox,
        editboxPwd: cc.EditBox,
        btnCoinConfirm: cc.Button,
        btnCoinCancel: cc.Button,


        labelShubei: cc.Label,
        labelUsername: cc.Label,
        spritePhoto: cc.Sprite,


        btnBonus: cc.Button,
        btnbasketball: cc.Button,
        btnWawa: cc.Button,
        btnFish: cc.Button,
        btnMining: cc.Button,
        btnVent: cc.Button,


        nodeTipSuccess: cc.Node,
        nodeTipError: cc.Node,
        btnTipSuccess: cc.Button,
        btnTipError: cc.Button,
        labelTipSuccess: cc.Label,
        labelTipError: cc.Label,

        //记录界面
        nodeRecord: cc.Node,
        labelTile: cc.Label,
        nodeContent: cc.Node,
        btnGameRecord: cc.Button,
        btnChongzhiRecord: cc.Button,
        btnNext: cc.Button,
        btnPre: cc.Button,
        btnRecordClose: cc.Button,

        prefabItem: cc.Prefab,

        //排行榜
        labelNameFirst: cc.Label,
        labelCoinFirst: cc.Label,
        labelNameSecond: cc.Label,
        labelCoinSecond: cc.Label,
        labelNameThird: cc.Label,
        labelCoinThird: cc.Label,


        //棋牌游戏
        btnQipaiCoinAdd:cc.Button,
        labelQipaiCoin:cc.Label,

        nodeQipaiChonzhi:cc.Node,
        btnQipaiConfirm:cc.Button,
        btnQipaiCancel:cc.Button,
        editboxQipaiShubei:cc.EditBox,
        editboxQipaiPassword:cc.EditBox,


    },

    btnController: function () {
        this.btnQipaiCoinAdd.node.on('click',()=>{
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            this.nodeQipaiChonzhi.active = true;
        })
        this.btnQipaiCancel.node.on('click',()=>{
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            this.editboxQipaiPassword.string = '';
            this.editboxQipaiShubei.string = '';
            this.nodeQipaiChonzhi.active = false;
        })
        this.btnQipaiConfirm.node.on('click',()=>{
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            let money = this.editboxQipaiShubei.string;
            let pwd = this.editboxQipaiPassword.string;
            if(money != '' && pwd != ''){
                this.editboxQipaiPassword.string = '';
                let url = com.yuming + com.czqp;
                com.async(url,(resp)=>{
                    if(resp.msg1 == 'success'){
                        this.nodeTipSuccess.active = true;
                        this.labelTipSuccess.string = resp.msg2;
                    }else{
                        this.nodeTipError.active = true;
                        this.labelTipError.string = resp.msg2
                    }
                },{uid:this.uid,money:money,pwd:pwd})
            }
        })


        this.btnClose.node.on('click', () => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            cc.director.loadScene('hall');
        })

        this.btnCoinAdd.node.on('click', () => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }

            if (parseInt(this.labelShubei.string) < 1) {
                this.nodeTipError.active = true;
                this.labelTipError.string = '树呗不足';
            } else {
                this.type = 'add'
                this.node.active = false;
                this.nodeChongzhi.active = true;
                this.nodeTitleChongzhi.active = true;
                this.editboxCoin.string = '';
                this.editboxPwd.string = '';
            }
        })
        this.btnCoinsub.node.on('click', () => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            if (this.labelCoin.string == '...' || parseInt(this.labelCoin.string) < 10) {
                this.nodeTipError.active = true;
                this.labelTipError.string = '金币不足';
            } else {
                this.type = 'sub'
                this.node.active = false;
                this.nodeChongzhi.active = true;
                this.nodeTitleTixian.active = true;
                this.editboxCoin.string = '';
                this.editboxPwd.string = '';
            }
        })
        this.btnCoinConfirm.node.on('click', () => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            let coin = this.editboxCoin.string;
            let pwd = this.editboxPwd.string;
            let type = this.type

            if (type == 'sub') {
                if (parseInt(coin) * 10 > parseInt(this.labelCoin.string)) {
                    this.nodeTipError.active = true;
                    this.labelTipError.string = '金币不足或网络连接错误';
                    return
                }
            } else {
                if (parseInt(coin) > parseInt(this.labelShubei.string)) {
                    this.nodeTipError.active = true;
                    this.labelTipError.string = '树呗不足';
                    return
                }
            }

            if (coin != '' && pwd != '') {
                let signcode = new Date().getTime();
                let list = {
                    uid: this.uid,
                    signcode: signcode,
                    type: type,
                    money: this.editboxCoin.string * 10,
                    key: CryptoJS.MD5(new Date().getDate() + '' + 'wancll').toString(CryptoJS.enc.Hex)
                }
                let list2 = {
                    uid: this.uid,
                    signcode: signcode,
                    type: type,
                    money: this.editboxCoin.string,
                    password: CryptoJS.MD5(this.editboxPwd.string).toString(CryptoJS.enc.Hex)
                }

                this.editboxPwd.string = '';


                gamexhr.async(gamexhr.yuming + gamexhr.transform, (resp) => {
                    if (resp.msg == 'success') {

                        com.async(com.yuming + com.chongzhi, (resp) => {
                            if (resp.msg1 == 'success') {
                                this.nodeTipSuccess.active = true;
                                this.labelTipSuccess.string = resp.msg2 || '成功'
                                com.updateUser();
                            } else {
                                this.nodeTipError.active = true;
                                this.labelTipError.string = resp.msg2 || '失败'
                            }
                        }, list2)
                    } else {
                        this.nodeTipError.active = true;
                        this.labelTipError.string = resp.data;
                    }
                }, 'POST', list)
            }

        })
        this.btnCoinCancel.node.on('click', () => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
            this.nodeTitleChongzhi.active = false;
            this.nodeTitleTixian.active = false;
            this.nodeChongzhi.active = false;
            this.node.active = true;
        })


        this.btnBonus.node.on('click', () => {
            this.gameButtonHandler(1);

        })
        this.btnbasketball.node.on('click', () => {
            this.gameButtonHandler(2);

        })
        this.btnWawa.node.on('click', () => {
            this.gameButtonHandler(3);
        })
        this.btnFish.node.on('click', () => {
            this.gameButtonHandler(4);

        })
        this.btnMining.node.on('click', () => {
            this.gameButtonHandler(5);
        })
        this.btnVent.node.on('click', () => {
            this.gameButtonHandler(6);
        })

        ///提示框
        this.btnTipSuccess.node.on('click', () => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1); }
            this.nodeTipSuccess.active = false;
        });
        this.btnTipError.node.on('click', () => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1); }
            this.nodeTipError.active = false;
        });

        //明细
        this.btnGameRecord.node.on('click', (event) => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1); }
            this.page = 1;
            this.labelTile.string = '游戏记录';
            this.recordType = 'records';
            this.nodeRecord.active = true;
            this.loadRecord()
        });
        this.btnChongzhiRecord.node.on('click', (event) => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1); }
            this.page = 1;
            this.labelTile.string = '充值记录';
            this.recordType = 'transformrecords';
            this.nodeRecord.active = true;
            this.loadRecord()
        });
        this.btnRecordClose.node.on('click', (event) => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1); }
            this.nodeRecord.active = false;
        });
        this.btnPre.node.on('click', (event) => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1); }
            this.page--;
            this.loadRecord()
        });
        this.btnNext.node.on('click', (event) => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1); }
            this.page++;
            this.loadRecord()
        })
    },

    loadRecord: function () {
        if (this.page == 1) {
            this.btnPre.node.active = false;
        } else {
            this.btnPre.node.active = true;
        }
        this.nodeContent.removeAllChildren();
        let url = gamexhr.yuming + gamexhr[this.recordType];
        let data = {
            uid: this.uid,
            page: this.page
        }
        gamexhr.async(url, (resp) => {
            if (resp.msg == 'success') {
                let records = resp.data.result;
                if (records.length < 10) {
                    this.btnNext.node.active = false;
                } else {
                    this.btnNext.node.active = true;
                }
                for (var i = 0; i < records.length; i++) {
                    let pref = cc.instantiate(this.prefabItem);
                    if (this.recordType == 'transformrecords') {
                        pref.getComponent(cc.Label).string = records[i].createtime + '          ' + (records[i].type == 'add' ? '充值' : '提现') + '          ' + records[i].money
                    } else {
                        pref.getComponent(cc.Label).string = records[i].createtime + '          ' + this.recordsMap[records[i].game] + '          ' + (records[i].type == 'add' ? '+' : '-') + '          ' + records[i].money
                    }

                    pref.getComponent(cc.Label).fontSize = 20;
                    pref.setPosition(80, -50 * (i));
                    this.nodeContent.addChild(pref);
                }
            } else {
                this.nodeTipError.active = true;
                this.labelTipError.string = resp.data;
            }
        }, 'POST', data);
    },

    gameButtonHandler: function (type) {
        if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1) }
        if (this.labelCoin.string == '...' || parseInt(this.labelCoin.string) < 10) {
            this.nodeTipError.active = true;
            this.labelTipError.string = '金币不足或网络连接错误';
        } else {

            window.gameObj = {
                money: this.labelCoin.string,
                type: type,
                username: this.labelUsername.string,
                uid: this.uid
            }
           
            cc.director.loadScene('game')
        }
    },

    loadUserInfo: function () {
        var userinfo = com.getUser();

        this.labelUsername.string = userinfo.UserName;
        this.labelShubei.string = userinfo.XjCredits;
        this.uid = userinfo.ID;

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

    loadCoinInfo: function () {
        let url = gamexhr.yuming + gamexhr.users + '/' + com.getUser().ID + '?tel=' + com.getUser().UserCode + '&username=' + encodeURI(com.getUser().UserName);

        gamexhr.async(url, (resp) => {
            if (resp.msg == 'success') {
                this.labelCoin.string = resp.data.money;
            } else {
                this.nodeTipError.active = true;
                this.labelTipError.string = resp.data;
            }
        }, 'GET');
    },

    loadRank: function () {
        let url = gamexhr.yuming + gamexhr.top;
        gamexhr.async(url, (resp) => {
            if (resp.msg == 'success') {
                if (resp.data[0]) {
                    this.labelNameFirst.string = resp.data[0].username;
                    this.labelCoinFirst.string = resp.data[0].money;
                }
                if (resp.data[1]) {
                    this.labelNameSecond.string = resp.data[1].username;
                    this.labelCoinSecond.string = resp.data[1].money;
                }
                if (resp.data[2]) {
                    this.labelNameThird.string = resp.data[2].username;
                    this.labelCoinThird.string = resp.data[2].money;
                }
            }
        }, 'GET')
    },

    loadQipaiCoin: function(){
        let url = com.yuming + com.getyb;
        com.async(url,(resp)=>{
          console.log(JSON.stringify(resp))  
          if(resp.msg1 == 'success'){
              this.labelQipaiCoin.string = resp.msg3;
          }
        },{uid:this.uid})
    },

    onEnable: function () {
        this.radio = cc.sys.localStorage.getItem('radio');
        this.loadUserInfo();
        this.updatePhoto();
        this.loadCoinInfo();
        this.loadRank();
        this.loadQipaiCoin();

        this.recordsMap = {
            bonus: '红包',
            fish: '钓鱼',
            fisharray: '捕鱼',
            mining: '挖矿',
            basketball: '篮球',
            wawa: '抓娃娃',
            vent: '发泄',
            buy: '购买鱼竿'
        }

    },
    // use this for initialization
    onLoad: function () {
        this.btnController();
    },


});
