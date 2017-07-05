var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
       editboxpwd0: {
           default: null,
           type: cc.EditBox
       },
        editboxpwd1: {
           default: null,
           type: cc.EditBox
       },
        editboxpwd2: {
           default: null,
           type: cc.EditBox
       },
        editboxpwd3: {
           default: null,
           type: cc.EditBox
       },
        editboxpwd4: {
           default: null,
           type: cc.EditBox
       },
        editboxpwd5: {
           default: null,
           type: cc.EditBox
       },

      
       btnConfirm: {
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
          audio: {
            url: cc.AudioClip,
            default: null
        },

    

    },

    btnController: function(){
        var self = this;
        var usercode = com.getUser().UserCode;


        this.btnConfirm.node.on('click',function(){
            if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            var list = {};
            
           list.pwd0 = self.editboxpwd0.string;
           list.pwd1 = self.editboxpwd1.string;
           list.pwd2 = self.editboxpwd2.string;
           list.pwd3 = self.editboxpwd3.string;
           list.pwd4 = self.editboxpwd4.string;
           list.pwd5 = self.editboxpwd5.string;
           list.usercode = usercode;

           var url = com.yuming  + com.changpwd;
           com.async(url,function(resp){
               if(resp.msg1 == 'success'){
                    console.log('成功');
                    self.nodeTipSuccess.active = true;
                    self.labelTipSuccess.string = '修改成功';
               }else{
                    console.log('失败');
                    self.nodeTipError.active = true;
                    self.labelTipError.string = resp.msg2;
               }
               
           },list);

        });

         ///提示框
        this.btnTipSuccess.node.on('click',function(){
             console.log('成功确认');
             self.editboxpwd0.string = '';
            self.editboxpwd1.string = '';
            self.editboxpwd2.string = '';
            self.editboxpwd3.string = '';
            self.editboxpwd4.string = '';
            self.editboxpwd5.string = '';
            self.nodeTipSuccess.active = false;
        });
        this.btnTipError.node.on('click',function(){
             console.log('失败确认');
             self.editboxpwd0.string = '';
            self.editboxpwd1.string = '';
            self.editboxpwd2.string = '';
            self.editboxpwd3.string = '';
            self.editboxpwd4.string = '';
            self.editboxpwd5.string = '';
            self.nodeTipError.active = false;
        });
    },

    onEnable:function(){
           this.radio = cc.sys.localStorage.getItem('radio');

        this.editboxpwd0.string = '';
        this.editboxpwd1.string = '';
        this.editboxpwd2.string = '';
        this.editboxpwd3.string = '';
        this.editboxpwd4.string = '';
        this.editboxpwd5.string = '';

    },

    // use this for initialization
    onLoad: function () {
         this.radio = cc.sys.localStorage.getItem('radio');

        this.editboxpwd0.string = '';
        this.editboxpwd1.string = '';
        this.editboxpwd2.string = '';
        this.editboxpwd3.string = '';
        this.editboxpwd4.string = '';
        this.editboxpwd5.string = '';

        this.btnController();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
