var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {

        btnClose: cc.Button,
        btnMove: cc.Button,
        btnAny: cc.Button,

        btnMoveRecord: cc.Button,
        btnAccountDetail: cc.Button,

        btnRefresh: cc.Button,

        labelDebei: cc.Label,
        labelShubei: cc.Label,
        labelFund: cc.Label,
        labelPoint: cc.Label,

        //bank主页
        nodeAccount: cc.Node,
        //转账页面
        nodeMove: cc.Node,
        //任转页面
        nodeAny: cc.Node,

        //转账记录
        nodeMoveRecord: cc.Node,
        //账户明细
        nodeAccountDetail: cc.Node,

        btnReturn: cc.Button,
        audio: cc.AudioClip,

        nodeTipSuccess: cc.Node,
        nodeTipError: cc.Node,
        btnTipSuccess: cc.Button,
        btnTipError: cc.Button,
        labelTipSuccess: cc.Label,
        labelTipError: cc.Label,

        //待确认相关
        btnWaitingIncome: cc.Button,
        btnWaitingOutcome: cc.Button,
        nodeWaitingConfirm: cc.Node,

        labelId: cc.Label,
        labelCreatetime: cc.Label,
        labelUsercode1: cc.Label,
        labelUsercode2: cc.Label,
        labelType: cc.Label,
        labelMoney: cc.Label,
        btnTransConfirm: cc.Button,
        btnTransCancel: cc.Button,
        btnTransClose: cc.Button,
        btnTransNext:cc.Button,
        btnTransPrev:cc.Button
    },

    tranHandler: function () {
        if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1); }
        com.async(this.transUrl, (resp) => {
            if (resp.msg1 == 'success') {
                this.nodeAccount.active = false;
                this.nodeWaitingConfirm.active = true;

                this.labelId.string = resp.msg3.ID;
                this.labelCreatetime.string = '时间:'+resp.msg3.createtime;
                this.labelUsercode1.string = '待转入会员账号:'+resp.msg3.usercode1;
                this.labelUsercode2.string = '待转出会员账号:'+resp.msg3.usercode2;
                this.labelType.string = '呗种:'+ (resp.msg3.accountid == 1 ? '树呗' : '地呗');
                this.labelMoney.string = '金额:'+resp.msg3.money;
            } else {
                this.nodeTipError.active = true;
                this.labelTipError.string = resp.msg2;
            }
        }, { uid: com.getUser().ID,page:this.page})
    },

    btnController: function () {
        var self = this;

        this.btnTransNext.node.on('click',()=>{
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1); }
            this.page ++ ;
            this.tranHandler()
        })
        this.btnTransPrev.node.on('click',()=>{
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1); }
            if(this.page > 1){
                this.page -- ;
                this.tranHandler()
            }
        })

        this.btnTransConfirm.node.on('click', () => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1); }
            var url = com.yuming + com.confirm;
            com.async(url, (resp) => {
                
                if (resp.msg1 == 'success') {
                    this.nodeTipSuccess.active = true;
                    this.labelTipSuccess.string = resp.msg2 || '确认交易成功'
                    this.nodeWaitingConfirm.active = false;
                    this.nodeAccount.active = true;
                } else {
                    this.nodeTipError.active = true;
                    this.labelTipError.string = resp.msg2;
                }
            }, { uid: com.getUser().ID, Id: this.labelId.string })
        })
        this.btnTransCancel.node.on('click', () => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1); }
            var url = com.yuming + com.cancel;
            com.async(url, (resp) => {
                if (resp.msg1 == 'success') {
                    this.nodeTipSuccess.active = true;
                    this.labelTipSuccess.string = resp.msg2 || '确认取消交易成功'
                    this.nodeWaitingConfirm.active = false;
                    this.nodeAccount.active = true;
                } else {
                    this.nodeTipError.active = true;
                    this.labelTipError.string = resp.msg2;
                }
            }, { uid: com.getUser().ID, Id: this.labelId.string })
        })

        this.btnTransClose.node.on('click', () => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1); }
            this.labelId.string = ''
            this.labelCreatetime.string = '';
            this.labelUsercode1.string = '';
            this.labelUsercode2.string = '';
            this.labelType.string = '';
            this.labelMoney.string = '';

            this.page = 1;

            this.nodeAccount.active = true;
            this.nodeWaitingConfirm.active = false;
        })
        this.btnWaitingIncome.node.on('click', () => {
            this.transUrl = com.yuming + com.tranzr;
            this.tranHandler()
            this.btnTransCancel.node.active = true;
            this.btnTransConfirm.node.active = true;
        })
        this.btnWaitingOutcome.node.on('click', () => {
            this.transUrl = com.yuming + com.tranzc;
            this.tranHandler()
            this.btnTransCancel.node.active = false;
            this.btnTransConfirm.node.active = false;
        })

        this.btnTipError.node.on('click', (event) => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1); }
            this.nodeTipError.active = false;
        })
        this.btnTipSuccess.node.on('click', (event) => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1); }
            this.nodeTipSuccess.active = false;
        })
        //刷新
        this.btnRefresh.node.on('click', (event) => {
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1); }
            if (!this.timer) {
                this.timer = new Date().getTime()
            } else {
                if (new Date().getTime() - this.timer < 3000) {
                    this.nodeTipError.active = true;
                    this.labelTipError.string = '两次刷新间隔为3秒'
                    return;
                } else {
                    this.timer = new Date().getTime();
                }
            }
            com.updateUser();
            setTimeout(() => {
                var userinfo = com.getUser();
                this.labelDebei.string = userinfo.JhCredits;
                this.labelShubei.string = userinfo.XjCredits;
                this.labelFund.string = userinfo.JJCredits;
                this.labelPoint.string = userinfo.CxCredits;
            }, 1500)

        });

        this.btnMove.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            self.nodeMove.active = true;
            self.nodeAccount.active = false;
        });
        this.btnAny.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            self.nodeAny.active = true;
            self.nodeAccount.active = false;
        });


        this.btnMoveRecord.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }

            self.nodeMoveRecord.active = true;
            self.nodeAccount.active = false;
        });
        this.btnAccountDetail.node.on('click', function () {
            if (self.radio == 2) {
            } else {
                cc.audioEngine.play(self.audio, false, 1);
            }

            self.nodeAccountDetail.active = true;
            self.nodeAccount.active = false;
        });

        this.btnClose.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            cc.director.loadScene('home');

        });

        this.btnReturn.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            window.moveUserCode = null;

            self.nodeAccount.active = true;

            self.nodeMove.active = false;
            self.nodeAny.active = false;

            self.nodeMoveRecord.active = false;
            self.nodeAccountDetail.active = false;

        });


    },

    updateData: function () {
        var userinfo = com.getUser();
        this.labelDebei.string = userinfo.JhCredits;
        this.labelShubei.string = userinfo.XjCredits;
        this.labelFund.string = userinfo.JJCredits;
        this.labelPoint.string = userinfo.CxCredits;
    },

    onEnable: function () {
        this.updateData();
        this.page = 1;
        this.radio = cc.sys.localStorage.getItem('radio');
    },

    // use this for initialization
    onLoad: function () {

        this.btnController();

    },


});
