var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {

         audio: {
            url: cc.AudioClip,
            default: null
        },
       username: {
           default: null,
           type: cc.Label
       },
       shubei: {
           default: null,
           type: cc.Label
       },
       dibei: {
           default: null,
           type: cc.Label
       },
      

       //进入游戏大厅
       btnGame:{
           default: null,type: cc.Button
       },

       //进入商城
       btnShop: {
           default: null,
           type: cc.Button
       },
      

       //进入我的家
       btnHome: {
           default: null,
           type:cc.Button
       },

       //橡胶林
       btnXiangjiaolin: {
           default: null,
           type: cc.Button
       },

       //风车
       btnFengche: {
           default: null,
           type: cc.Button
       },

    //农商银行
       btnBank:{
           default: null,
           type: cc.Button
       },

       btnSetting:{
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


        spritePhoto:{
            default: null,
            type: cc.Sprite
        }
      


    },

    loadUserInfo: function(){
        var self = this;
        //console.log('userinfo:'+cc.sys.localStorage.getItem('current_user'));
        var userinfo = com.getUser();
        //console.log(userinfo.Photo);
      
        
        this.username.string = userinfo.UserName;
        this.shubei.string = userinfo.XjCredits;
        this.dibei.string = userinfo.JhCredits;
    },


    updatePhoto: function(){
        var self = this;
        var userinfo = com.getUser();
        var photoUrl = userinfo.Photo;

        if(photoUrl != ''){
             console.log('头像url=='+photoUrl)
            cc.loader.load(photoUrl,function (err, texture) {
                var frame=new cc.SpriteFrame(texture);
                self.spritePhoto.node.getComponent(cc.Sprite).spriteFrame=frame;
            });
        }
           

    },

    btnController: function(){
        var self = this;
        var userinfo = com.getUser();
        var uid = userinfo.ID;

       //设置按钮
       this.btnSetting.node.on('click',function(){

            if(self.radio == 2){
            }else{
                cc.audioEngine.play(self.audio, false, 1);
            }

            
           cc.director.loadScene('setting');
       });


        //进入游戏大厅
        this.btnGame.node.on('click',function(){
             if(self.radio == 2){
            }else{
                cc.audioEngine.play(self.audio, false, 1);
            }

            // self.nodeTipError.active = true;
            // self.labelTipError.string = '暂未开放，敬请期待';
             cc.director.loadScene("gamehall");
            
        });

        //进入商城
        this.btnShop.node.on('click',function(){
             if(self.radio == 2){
            }else{
                cc.audioEngine.play(self.audio, false, 1);
            }

             cc.director.loadScene("shop");
            
        });

         //进入银行
        this.btnBank.node.on('click',function(){

             if(self.radio == 2){
            }else{
                cc.audioEngine.play(self.audio, false, 1);
            }

            cc.director.loadScene("account");
        });

        //进入我的家
        this.btnHome.node.on('click',function(){
             if(self.radio == 2){
            }else{
                cc.audioEngine.play(self.audio, false, 1);
            }

            cc.director.loadScene("home");
        });

        //租风车
        this.btnFengche.node.on('click',function(){

             if(self.radio == 2){
            }else{
                cc.audioEngine.play(self.audio, false, 1);
            }

            self.nodeTipError.active = true;
            self.labelTipError.string = '暂未开放，敬请期待';
           //cc.director.loadScene('fadian');
        });

        //租橡胶林
        this.btnXiangjiaolin.node.on('click',function(){
             if(self.radio == 2){
            }else{
                cc.audioEngine.play(self.audio, false, 1);
            }


           cc.director.loadScene('rent');
        });


          ///提示框
         this.btnTipSuccess.node.on('click',function(){
            self.nodeTipSuccess.active = false;

              if(self.radio == 2){
            }else{
                cc.audioEngine.play(self.audio, false, 1);
            }
        });
         this.btnTipError.node.on('click',function(){
            self.nodeTipError.active = false;

              if(self.radio == 2){
            }else{
                cc.audioEngine.play(self.audio, false, 1);
            }
        });

    },


    // use this for initialization
    onLoad: function () {
        this.timer = 0;
        this.loadUserInfo();
        this.btnController();
        this.updatePhoto();

         this.music = cc.sys.localStorage.getItem('music');
        this.radio = cc.sys.localStorage.getItem('radio');
       
    },

     update: function (dt) {
         this.timer += dt;
         if(this.timer > 2){
             this.loadUserInfo();
             this.timer = 0;
         }
     },
});
