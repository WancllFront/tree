var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
        
        btnJingbi:{
            default: null,
            type: cc.Button
        },
        btnFangka:{
            default: null,
            type: cc.Button
        },
        
        btnGdmj:{
            default: null,
            type: cc.Button
        },
        btnBjl:{
            default: null,
            type: cc.Button
        },
        btnNn:{
            default: null,
            type: cc.Button
        },
        btnBy:{
            default: null,
            type: cc.Button
        },
        btnHzmj:{
            default: null,
            type: cc.Button
        },
        btnPhz:{
            default: null,
            type: cc.Button
        },
        btnPdk:{
            default: null,
            type: cc.Button
        },

        btnClose:{
            default: null,
            type: cc.Button
        },
        btnSSetting:{
            default: null,
            type: cc.Button
        },

        btnAddJinbi:{
            default:null,
            type: cc.Button
        },

        btnAddOther:{
            default: null,
            type: cc.Button
        },
        btnxinfeng:{
            default: null,
            type: cc.Button
        },

        labelName:{
            default: null,
            type: cc.Label
        },

        spritePhoto:{
            default: null,
            type: cc.Sprite
        },

        audio:{
            default: null,
            url: cc.AudioClip
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

    },

    btnController:function(){
        var self = this;

        this.btnAddJinbi.node.on('click',function(){
            if(self.radio == 2){

            }else{
                cc.audioEngine.play(self.audio,false,1);
            }

            self.nodeTipError.active = true;
            self.labelTipError.string = '暂未开放，敬请期待';
        });
        this.btnxinfeng.node.on('click',function(){
            if(self.radio == 2){

            }else{
                cc.audioEngine.play(self.audio,false,1);
            }

            self.nodeTipError.active = true;
            self.labelTipError.string = '暂未开放，敬请期待';
        });
         this.btnBjl.node.on('click',function(){
            if(self.radio == 2){

            }else{
                cc.audioEngine.play(self.audio,false,1);
            }

            self.nodeTipError.active = true;
            self.labelTipError.string = '暂未开放，敬请期待';
        });
         this.btnBy.node.on('click',function(){
            if(self.radio == 2){

            }else{
                cc.audioEngine.play(self.audio,false,1);
            }

            self.nodeTipError.active = true;
            self.labelTipError.string = '暂未开放，敬请期待';
        });
         this.btnFangka.node.on('click',function(){
            if(self.radio == 2){

            }else{
                cc.audioEngine.play(self.audio,false,1);
            }

            self.nodeTipError.active = true;
            self.labelTipError.string = '暂未开放，敬请期待';
        });
         this.btnGdmj.node.on('click',function(){
            if(self.radio == 2){

            }else{
                cc.audioEngine.play(self.audio,false,1);
            }

            self.nodeTipError.active = true;
            self.labelTipError.string = '暂未开放，敬请期待';
        });
         this.btnHzmj.node.on('click',function(){
            if(self.radio == 2){

            }else{
                cc.audioEngine.play(self.audio,false,1);
            }

            self.nodeTipError.active = true;
            self.labelTipError.string = '暂未开放，敬请期待';
        });
         this.btnJingbi.node.on('click',function(){
            if(self.radio == 2){

            }else{
                cc.audioEngine.play(self.audio,false,1);
            }

            self.nodeTipError.active = true;
            self.labelTipError.string = '暂未开放，敬请期待';
        });
         this.btnNn.node.on('click',function(){
            if(self.radio == 2){

            }else{
                cc.audioEngine.play(self.audio,false,1);
            }

            self.nodeTipError.active = true;
            self.labelTipError.string = '暂未开放，敬请期待';
        });
         this.btnPdk.node.on('click',function(){
            if(self.radio == 2){

            }else{
                cc.audioEngine.play(self.audio,false,1);
            }

            self.nodeTipError.active = true;
            self.labelTipError.string = '暂未开放，敬请期待';
        });
         this.btnPhz.node.on('click',function(){
            if(self.radio == 2){

            }else{
                cc.audioEngine.play(self.audio,false,1);
            }

            self.nodeTipError.active = true;
            self.labelTipError.string = '暂未开放，敬请期待';
        });

         this.btnSSetting.node.on('click',function(){
            if(self.radio == 2){

            }else{
                cc.audioEngine.play(self.audio,false,1);
            }

            self.nodeTipError.active = true;
            self.labelTipError.string = '暂未开放，敬请期待';
        });


         this.btnAddOther.node.on('click',function(){
            if(self.radio == 2){

            }else{
                cc.audioEngine.play(self.audio,false,1);
            }

            self.nodeTipError.active = true;
            self.labelTipError.string = '暂未开放，敬请期待';
        });



        this.btnClose.node.on('click',function(){
             if(self.radio == 2){

            }else{
                cc.audioEngine.play(self.audio,false,1);
            }
            cc.director.loadScene('hall');
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

    onEnable:function(){
        
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        this.radio = cc.sys.localStorage.getItem('radio');
        var userinfo = com.getUser();
        var photoUrl = userinfo.Photo;
        if(photoUrl != ''){
             cc.loader.load(photoUrl,function (err, texture) {
                var frame=new cc.SpriteFrame(texture);
                self.spritePhoto.node.getComponent(cc.Sprite).spriteFrame=frame;
            });

        }
        this.labelName.string = userinfo.UserName;
        this.btnController();

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
