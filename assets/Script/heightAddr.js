var com  = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
        editboxName:{
            default:null,
            type: cc.EditBox
        },

        editboxBankname:{
             default: null,
            type: cc.EditBox
        },
        editboxBankaddr:{
             default: null,
            type: cc.EditBox
        },
        editboxBankid:{
             default: null,
            type: cc.EditBox
        },

        editboxPwd:{
            default: null,
            type: cc.EditBox
        },
       
        editboxPwd:{
            default:null,
            type: cc.EditBox
        },
        

        btnAdd:{
            default: null,
            type: cc.Button
        },
        btnSub:{
            default: null,
            type: cc.Button
        },
        btnMroe:{
            default: null,
            type: cc.Button
        },

        btnConfirm:{
            default: null,
            type: cc.Button
        },
        btnReturn:{
            default: null,
            type: cc.Button
        },


        audio:{
            default: null,
            url: cc.AudioClip
        },


        labelPrice:{
            default: null,
            type: cc.Label
        },
        labelNumber:{
            default: null,
            type: cc.Label
        },


          btnSuccessConfirm: {
            default: null,
            type: cc.Button
        },
        btnErrorConfirm: {
            default: null,
            type: cc.Button
        },
        labelError:{
            default:null,
            type:cc.Label
        },
        labelSuccess: {
            default: null,
            type: cc.Label
        },
        nodeSuccess: {
            default: null,
            type: cc.Node
        },
        nodeError: {
            default: null,
            type: cc.Node
        },

        nodeParent:{
            default: null,
            type: cc.Node
        }

    },


    btnController : function(){
        var self = this;

        self.btnConfirm.node.on('click',function(){
            if(self.radio == 2){
                
            }else{
                cc.audioEngine.play(self.audio,false,1);
            }

            if(window.pid){
                console.log('pid==============='+window.pid)
                if(self.editboxBankaddr.string != '' && self.editboxBankname.string != '' 
                && self.editboxBankid.string !='' && self.labelNumber.string != '' 
                && self.editboxPwd.string != '' && self.editboxName != ''){
                    var url = com.yuming + com.byshopgood;
                    var list = {};
                    list.bank = self.editboxBankname.string;
                    list.bankno = self.editboxBankid.string;
                    list.bankname = self.editboxName.string;
                    list.pwd = self.editboxPwd.string;
                    list.num = self.labelNumber.string;
                    list.uid = self.uid;
                    list.goodid = window.pid;
                    console.log('list===================='+JSON.stringify(list));

                    var url  = com.yuming + com.byhieghgood;
                    com.async(url,function(resp){
                        if(resp.msg1 == 'success'){
                            self.nodeSuccess.active = true;
                            self.labelSuccess.string = resp.msg2 || '兑换成功';
                        }else{
                            self.nodeError.active = true;
                            self.labelError.string = resp.msg2 || '兑换失败';
                        }
                    },list);
                }else{
                    self.nodeError.active = true;
                    self.labelError.string = '请填写完整的信息';
                }
            }
        });

        self.btnAdd.node.on('click',function(){
            if(self.radio == 2){
                
            }else{
                cc.audioEngine.play(self.audio,false,1);
            }

            self.labelPrice.string = parseInt(self.labelPrice.string || 0) + window.price;
            
            self.labelNumber.string  = parseInt(self.labelNumber.string || 0) + 1;
        });

        self.btnSub.node.on('click',function(){
            if(self.radio == 2){
                
            }else{
                cc.audioEngine.play(self.audio,false,1);
            }

            if(parseInt(self.labelNumber.string ) > 1){
                self.labelPrice.string = parseInt(self.labelPrice.string || 0) - window.price;
                self.labelNumber.string = parseInt(self.labelNumber.string || 0) - 1;
            }

        });

        self.btnMroe.node.on('click',function(){
             if(self.radio == 2){
                
            }else{
                cc.audioEngine.play(self.audio,false,1);
            }

           // var url = com.yuming + com.getwareh;
            //com.async(url,)

              self.labelNumber.string = 10;
            self.labelPrice.string = window.price * 10;
        });


        
        this.btnSuccessConfirm.node.on('click',function(){
            console.log('确认');
            if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }

           
            self.editboxName.string = '';
            self.editboxBankaddr.string = '';
            self.editboxBankid.string = '';
            self.editboxBankname.string = '';
            self.editboxPwd.string = '';
            self.labelNumber.string = 1;
            self.labelPrice.string = window.price;
            self.nodeError.active = false;
            self.nodeSuccess.active = false;

        });
        this.btnErrorConfirm.node.on('click',function(){
            console.log('确认');
            if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            self.nodeError.active = false;
            self.nodeSuccess.active = false;
        });

        //返回按钮
        this.btnReturn.node.on('click',function(){
             if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            self.editboxName.string = '';
            self.editboxBankaddr.string = '';
            self.editboxBankid.string = '';
            self.editboxBankname.string = '';
            self.editboxPwd.string = '';
            self.labelNumber.string = 1;
            self.labelPrice.string = window.price;
            self.node.active = false;
            self.nodeParent.active = true;
        });

        
    },

    onEnable:function(){
         this.uid = com.getUser().ID;
          this.radio = cc.sys.localStorage.getItem('radio');

    },

    // use this for initialization
    onLoad: function () {

        this.radio = cc.sys.localStorage.getItem('radio');
        this.uid = com.getUser().ID;
        this.btnController();

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
