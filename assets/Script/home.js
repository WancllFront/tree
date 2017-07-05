var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
        btnClose: {
            default:null,
            type:cc.Button
        },

        btnFriend: {
            default: null,
            type: cc.Button
        },
        btnCommunicate: {
            default: null,
            type: cc.Button
        },
        btnModifyPwd: {
            default: null,
            type: cc.Button
        },
        btnModifyNicename: {
            default: null,
            type: cc.Button
        },
        btnInvited: {
            default: null,
            type: cc.Button
        },

        labelUsername: {
            default: null,
            type: cc.Label
        },
        labelUsercode: {
            default: null,
            type: cc.Label
        },


        nodeHome: {
            default: null,
            type: cc.Node
        },
         nodeFriend: {
            default: null,
            type: cc.Node
        },
         nodeCommunity: {
            default: null,
            type: cc.Node
        },
         nodeInvite: {
            default: null,
            type: cc.Node
        },
         nodeModifypwd: {
            default: null,
            type: cc.Node
        },
         nodeModifyUsername: {
            default: null,
            type: cc.Node
        },


        btnReturn: {
            default: null,
            type: cc.Button
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
         audio: {
            url: cc.AudioClip,
            default: null
        },

        
    },

    btnController: function(){
        var self = this;
        var userinfo = com.getUser();
        var uid = userinfo.ID;

        this.btnClose.node.on('click',function(){
            if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
             cc.director.loadScene("hall");
        });
        this.btnReturn.node.on('click',function(){
            console.log(this.radio);
            if(self.radio == 2){
            }else{
                console.log('------------------------------');
                    cc.audioEngine.play(self.audio, false, 1);
                }
            self.nodeFriend.active = false;
            self.nodeCommunity.active = false;
            self.nodeInvite.active = false;
            self.nodeModifypwd.active = false;
            self.nodeModifyUsername.active = false;
            self.nodeHome.active = true;
        });

        this.btnFriend.node.on('click',function(){
            console.log('好友');
            if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
             self.nodeHome.active = false;
             self.nodeFriend.active = true;
             
        });

        this.btnCommunicate.node.on('click',function(){
            console.log('互动');
            if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
             self.nodeHome.active = false;
             self.nodeCommunity.active = true;
             
        });

         this.btnInvited.node.on('click',function(){
            console.log('邀请');
            if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
             self.nodeHome.active = false;
             self.nodeInvite.active = true;
             
        });

        this.btnModifyNicename.node.on('click',function(){
            console.log('修改昵称');
            if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
             self.nodeModifyUsername.active = true;
             self.nodeHome.active = false;
            
        });

        this.btnModifyPwd.node.on('click',function(){
            console.log('修改密码');
            if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
             self.nodeModifypwd.active = true;
             self.nodeHome.active = false;
             
        });

        this.btnSuccessConfirm.node.on('click',function(){
            console.log('确认');
            if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
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
    },

    loadUserinfo: function(){
        var userinfo = com.getUser();
        this.labelUsername.string = userinfo.UserName;
        this.labelUsercode.string = userinfo.UserCode;
    },

    onEnable:function(){
         this.radio = cc.sys.localStorage.getItem('radio');
        this.timer = 0;
        
        this.loadUserinfo();
    },

    // use this for initialization
    onLoad: function () {
         this.radio = cc.sys.localStorage.getItem('radio');
        this.timer = 0;
        
        this.btnController();
        this.loadUserinfo();
    },

    // called every frame, uncomment this function to activate update callback
     update: function (dt) {
         this.timer += dt;
         if(this.timer > 2){
             this.loadUserinfo();
             this.timer = 0;
         }
     },
});
