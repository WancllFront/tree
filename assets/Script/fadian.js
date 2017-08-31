var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
        btnRent:{
            default: null,
            type: cc.Button
        },
        btnGain:{
            default: null,
            type: cc.Button
        },
        labelGain:{
            default:null,
            type: cc.Label
        },
        labelRest:{
            default: null,
            type: cc.Label
        },

        nodeShow: {
            default: null,
            type: cc.Node
        },

        btnClose: {
            default: null,
            type: cc.Button
        },

        editboxPwd: {
            default: null,
            type: cc.EditBox
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

    onEnable:function(){
          this.radio = cc.sys.localStorage.getItem('radio');
        var self = this;
        var url  = com.yuming + com.treelst;
        var grade = 30;
        var uid = com.getUser().ID;



         var list = {};
        list.grade = 30;
        list.uid = uid;
        console.log('载入')

        com.async(url,function(resp){
            if(resp.msg1 == 'success'){

                if(resp.msg3.length == 0){
                     self.nodeShow.active = false;
                    self.btnGain.node.active = false;
                    self.btnRent.node.active = true;
                }else{
                    var info = resp.msg3[0];
                    self.labelRest.string = 24 - info.lunshu;
                    self.labelGain.string = info.lunshu * 3750;
                    self.nodeShow.active = true;
                    self.btnGain.node.active = true;
                    self.btnRent.node.active = false;
                }
            }
        },list);

    },

    // use this for initialization
    onLoad: function () {

         this.radio = cc.sys.localStorage.getItem('radio');

        var self = this;
        var url  = com.yuming + com.treelst;
        var grade = 30;
        var uid = com.getUser().ID;
        //uid = 144

        var list = {};
        list.grade = 30;
        list.uid = uid;
       

      
        this.btnGain.node.on('click',function(){
            var granUrl = com.yuming + com.shouhuo;
             com.async(granUrl,function(resp){
                 if(resp.msg1 == 'success'){
                     
                      self.nodeTipSuccess.active = true;
                      self.labelTipSuccess.string = resp.msg2;
                 }else{
                     self.nodeTipError.active = true;
                     self.labelTipError.string = resp.msg2;
                 }
                 com.updateUser();
             },list);
        });
        this.btnRent.node.on('click',function(){
            if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            var list2 = {};
            list2.uid = uid;
            list2.grade = 30;
            list2.pwd = self.editboxPwd.string;
            if(list2.pwd != ''){
                var rentUrl = com.yuming + com.zhu;
                com.async(rentUrl,function(resp){
                    if(resp.msg1 == 'success'){
                       
                        self.labelRest.string = 24;
                        self.labelGain.string = 0;
                        self.nodeShow.active = true;
                        self.btnGain.node.active = true;
                        self.btnRent.node.active = false;
                         self.nodeTipSuccess.active = true;
                      self.labelTipSuccess.string = resp.msg2;
                    }else{
                        self.nodeTipError.active = true;
                        self.labelTipError.string = resp.msg2;
                    }
                    com.updateUser();
                },list2)
            }else{
                 self.nodeTipError.active = true;
                        self.labelTipError.string = '请输入交易密码';
            }
            
            
        });

        this.btnClose.node.on('click',function(){
            if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
           
            cc.director.loadScene('hall');
        });


         this.btnTipSuccess.node.on('click',function(){
             if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            self.nodeTipSuccess.active = false;
        });
         this.btnTipError.node.on('click',function(){
             if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            self.nodeTipError.active = false;
        });
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
