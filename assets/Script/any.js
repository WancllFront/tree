var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
         nodeTipSuccess: {
            default: null,
            type: cc.Node
        },
        nodeTipError: {
            default: null,
            type: cc.Node
        },
        btnTipSuccess:{
            default:null,
            type: cc.Button
        },
        btnTipError: {
            default:null,
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

        btnPull:{
            default: null,
            type: cc.Button
        },

        btnConfirm:{
            default: null,
            type: cc.Button
        },
        nodePull:{
            default: null,
            type: cc.Node
        },
        btnShubei:{
            default: null,
            type: cc.Button
        },
        btnDibei:{
            default: null,
            type: cc.Button
        },

        editboxCode:{
            default: null,
            type:cc.EditBox
        },
         editboxNumber:{
            default: null,
            type:cc.EditBox
        },
         editboxPwd:{
            default: null,
            type:cc.EditBox
        },

        labelWay:{
            default: null,
            type: cc.Label
        },
         audio: {
            url: cc.AudioClip,
            default: null
        },


    },

    btnController: function(){
        var self = this;
        var accounttype = 1;
        var uid = com.getUser().ID;
        this.btnConfirm.node.on('click',function(){
            var usercode = self.editboxCode.string;
            var number = self.editboxNumber.string;
            var pwd = self.editboxPwd.string;

            if(usercode != '' && number!='' && pwd!=''){
                var list = {};
                list.usercode = usercode;
                list.uid = uid;
                list.pwd = pwd;
                list.accounttype = accounttype;
                list.price = number;

                var url = com.yuming + com.hzhuan;
                com.async(url,function(resp){
                    if(resp.msg1 == 'success'){
                        self.nodeTipSuccess.active = true;
                        self.labelTipSuccess.string = '成功';
                        
                    }else{
                         self.nodeTipError.active = true;
                        self.labelTipError.string = resp.msg2;
                    }
                    //转账更新数据 
                        com.updateUser();
                },list);
            }

            
        });

        this.btnPull.node.on('click',function(){
            if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            self.nodePull.active = !self.nodePull.active;
        });
        this.btnDibei.node.on('click',function(){
            if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            accounttype = 4;
            self.labelWay.string = '地呗';
            self.nodePull.active = false;
        });
         this.btnShubei.node.on('click',function(){
             if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            self.labelWay.string = '树呗';
            accounttype = 1;
            self.nodePull.active = false;
        });

        
         this.btnTipSuccess.node.on('click',function(){
             if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            self.editboxCode.string = '';
            self.editboxPwd.string = '';
            self.editboxNumber.string = ''
            self.nodeTipSuccess.active = false;
        });
         this.btnTipError.node.on('click',function(){
             if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
              self.editboxCode.string = '';
            self.editboxPwd.string = '';
            self.editboxNumber.string = ''
            self.nodeTipError.active = false;
        });
    },

    onEnable:function(){
         this.radio = cc.sys.localStorage.getItem('radio');
        if(window.moveUserCode){
             console.log('来自转账');
             this.editboxCode.string = window.moveUserCode;
         }
    },

    onDisable:function(){
        this.editboxCode.string = '';
         this.editboxPwd.string = '';
         this.editboxNumber.string = ''
    },

    // use this for initialization
    onLoad: function () {
         this.radio = cc.sys.localStorage.getItem('radio');

         this.editboxCode.string = '';
         this.editboxPwd.string = '';
         this.editboxNumber.string = ''

         
        this.btnController();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
