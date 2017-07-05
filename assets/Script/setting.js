var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
        
        btnClose: {
            default: null,
            type: cc.Button
        },
        btnActive:{
            default: null,
            type: cc.Button
        },
        btnLogout:{
            default: null,
            type: cc.Button
        },

        btnMusic:{
            default: null,
            type: cc.Button
        },
        btnRadio:{
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

        nodeMusicOn:{
            default: null,
            type: cc.Node
        },
         nodeMusicOff:{
            default: null,
            type: cc.Node
        },
         nodeRadioOn:{
            default: null,
            type: cc.Node
        },
         nodeRadioOff:{
            default: null,
            type: cc.Node
        },

         audio: {
            url: cc.AudioClip,
            default: null
        },

        music1: {
            url:cc.AudioClip,
            default: null
        },

        music2:{
            url:cc.AudioClip,
            default: null
        },

        music3:{
            url:cc.AudioClip,
            default: null
        },



        btnExit:{
            default: null,
            type: cc.Button
        },
        nodeExit:{
            default: null,
            type: cc.Node
        },
        btnCancle:{
            default: null,
            type: cc.Button
        },

        btnConfirm:{
             default: null,
            type: cc.Button
        },

        toggleOne: cc.Toggle,
        toggleTwo: cc.Toggle,
        toggleThree: cc.Toggle,
    },

    btnController: function(){

        var self = this;
        var userinfo = com.getUser();
        this.btnClose.node.on('click',function(){
            if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            cc.director.loadScene('hall');
        });
         this.btnActive.node.on('click',function(){
             if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }

              com.activeDebei(userinfo.ID,function(resp){
                console.log('激活回调:'+JSON.stringify(resp));
                if(resp.msg1 == 'success'){
                    self.nodeTipSuccess.active = true;
                    self.labelTipSuccess.string = resp.msg2 || '激活成功';
                }else{
                     self.nodeTipError.active = true;
                    self.labelTipError.string = resp.msg2;
                }
            });
        });
         this.btnLogout.node.on('click',function(){
              if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
             com.logout();
              cc.director.loadScene('index');
        });

        //音乐开关
         this.btnMusic.node.on('click',function(){
              if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }

             var music = cc.sys.localStorage.getItem('music');
             if(self.music == 2){
                 self.music = 1;
                 console.log('play-------------')
                  cc.audioEngine.resumeAll();
                 cc.sys.localStorage.setItem('music',1);
             }else{
                 console.log('stop-----------');
                  cc.audioEngine.pauseAll();
                  self.music = 2;
                 cc.sys.localStorage.setItem('music',2);
             }

             self.nodeMusicOff.active = !self.nodeMusicOff.active;
             self.nodeMusicOn.active = !self.nodeMusicOn.active;
        });

        //音效开关
         this.btnRadio.node.on('click',function(){
             var radio = cc.sys.localStorage.getItem('radio');
             if(self.radio == 2){
                 cc.audioEngine.play(self.audio, false, 1);
                 self.radio =1 ;
                 cc.sys.localStorage.setItem('radio',1);
             }else{
                 
                 self.radio = 2;
                 cc.sys.localStorage.setItem('radio',2);
             }

             self.nodeRadioOff.active = !self.nodeRadioOff.active;
             self.nodeRadioOn.active = !self.nodeRadioOn.active;
        });


        
        ///提示框
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


        this.btnExit.node.on('click',function(){
            if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }

              self.nodeExit.active = true;
        });
        
        this.btnCancle.node.on('click',function(){
            if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            self.nodeExit.active = false;
        });
        this.btnConfirm.node.on('click',function(){
            if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }

                cc.game.end();

        });


        this.toggleOne.node.on('toggle',function(event){
                  var toggle = event.detail;
                  cc.audioEngine.stopAll();
                  cc.audioEngine.playMusic(self.music1,true,1);

        },this);

        this.toggleTwo.node.on('toggle',function(event){
                  var toggle = event.detail;
                  cc.audioEngine.stopAll();
                  cc.audioEngine.playMusic(self.music2,true,1);

        },this);

         this.toggleThree.node.on('toggle',function(event){
                  var toggle = event.detail;
                  cc.audioEngine.stopAll();
                  cc.audioEngine.playMusic(self.music3,true,1);

        },this);
        
    },

    // use this for initialization
    onLoad: function () {
         this.music = cc.sys.localStorage.getItem('music');
         this.radio = cc.sys.localStorage.getItem('radio');
         if(this.music == 2){
             this.nodeMusicOff.active = true;
             this.nodeMusicOn.active = false;
         }else{
             this.nodeMusicOff.active = false;
             this.nodeMusicOn.active = true;
         }

        if(this.radio == 2){
             this.nodeRadioOff.active = true;
             this.nodeRadioOn.active = false;
         }else{
             this.nodeRadioOff.active = false;
             this.nodeRadioOn.active = true;
         }

        this.btnController();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
