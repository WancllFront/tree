var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
       editboxName: {
           default: null,
           type: cc.EditBox
       },
       

      
       btnConfirm: {
           default: null,
           type: cc.Button
       },

       nodeParent:{
           default: null,
           type: cc.Component
       },
        audio: {
            url: cc.AudioClip,
            default: null
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
        var uid = com.getUser().ID;

        this.btnConfirm.node.on('click',function(){
             if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            var list = {};
            
           list.name = self.editboxName.string;

           if(list.name != ''){
                list.uid = uid;
                var url = com.yuming  + com.changname;
                com.async(url,function(resp){
                    if(resp.msg1 == 'success'){
                        console.log('修改成功');
                         
                        com.updateUser();
                        
                        self.nodeTipSuccess.active = true;
                        self.labelTipSuccess.string = resp.msg2 || '修改成功';
                    }else{
                        self.nodeTipError.active = true;
                        self.labelTipError.string = resp.msg2 || '失败';
                    }
                },list);
           }else{
              
                
           }
        });


         ///提示框
        this.btnTipSuccess.node.on('click',function(){
             console.log('成功确认');
           
            self.nodeTipSuccess.active = false;
        });
        this.btnTipError.node.on('click',function(){
             console.log('失败确认');
             
            self.nodeTipError.active = false;
        });
    },

    onEnable:function(){
          this.radio = cc.sys.localStorage.getItem('radio');
        this.editboxName.string = com.getUser().UserName;

    },

    // use this for initialization
    onLoad: function () {
         this.radio = cc.sys.localStorage.getItem('radio');
        
        this.editboxName.string = com.getUser().UserName;
        this.btnController();
    },


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
