var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {

        btnClose:{
            default: null,
            type: cc.Button
        },


       btnMove:{
           default: null,
           type: cc.Button
       },
       btnAny:{
           default: null,
           type: cc.Button
       },
      
       btnConvert:{
           default: null,
           type: cc.Button
       },
       btnConvertRecord:{
           default: null,
           type: cc.Button
       },
        btnMoveRecord:{
           default: null,
           type: cc.Button
       },
       btnAccountDetail:{
           default: null,
           type: cc.Button
       },


       labelDebei:{
           default: null,
           type: cc.Label
       },
       labelShubei:{
           default: null,
           type: cc.Label
       },
       labelFund:{
           default: null,
           type: cc.Label
       },
       labelPoint:{
           default: null,
           type: cc.Label
       },


       //bank主页
       nodeAccount: {
           default: null,
           type: cc.Node
       },


       //转账页面
       nodeMove: {
           default: null,
           type: cc.Node
       },
       //任转页面
       nodeAny: {
           default: null,
           type: cc.Node
       },
       //兑换
       nodeConvert: {
           default: null,
           type: cc.Node
       },
       //兑换记录
       nodeConvertRecord: {
           default: null,
           type: cc.Node
       },
       //转账记录
       nodeMoveRecord: {
           default: null,
           type: cc.Node
       },
       //账户明细
       nodeAccountDetail: {
           default: null,
           type: cc.Node
       },


       btnReturn: {
           default: null,
           type: cc.Button
       },



        audio: {
            url: cc.AudioClip,
            default: null
        },


       

       
    },

    btnController: function(){
        var self = this;

        this.btnMove.node.on('click',function(){
             if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            console.log('点击转账');
            self.nodeMove.active = true;
            //self.nodeAny.active = true;
            self.nodeAccount.active = false;
        });
         this.btnAny.node.on('click',function(){
              if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            console.log('点击任转');
            self.nodeAny.active = true;
            self.nodeAccount.active = false;
        });
         this.btnConvert.node.on('click',function(){
              if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            console.log('点击兑换');
            self.nodeConvert.active = true;
            self.nodeAccount.active = false;
        });
         this.btnConvertRecord.node.on('click',function(){
              if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            console.log('点击兑换记录');
            self.nodeConvertRecord.active = true;
            self.nodeAccount.active = false;
        });
         this.btnMoveRecord.node.on('click',function(){
              if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            console.log('点击转账记录');
            self.nodeMoveRecord.active = true;
            self.nodeAccount.active = false;
        });
         this.btnAccountDetail.node.on('click',function(){
              if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            console.log('点击账户明细');
            self.nodeAccountDetail.active = true;
            self.nodeAccount.active = false;
        });

        this.btnClose.node.on('click',function(){
             if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            cc.director.loadScene('hall');
            
        });

        this.btnReturn.node.on('click',function(){
             if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            window.moveUserCode = null;

            self.nodeAccount.active = true;

            self.nodeMove.active = false;
            self.nodeAny.active = false;
            self.nodeConvert.active = false;
            self.nodeConvertRecord.active = false;
            self.nodeMoveRecord.active = false;
            self.nodeAccountDetail.active = false;
            
        });
        
        
    },

    updateData: function(){
         var userinfo = com.getUser();
        this.labelDebei.string = userinfo.JhCredits;
        this.labelShubei.string = userinfo.XjCredits;
        this.labelFund.string = userinfo.JJCredits;
        this.labelPoint.string = userinfo.CxCredits;
    },


    

    // use this for initialization
    onLoad: function () {
        this.timer = 0;

        this.music = cc.sys.localStorage.getItem('music');
        this.radio = cc.sys.localStorage.getItem('radio');

        this.btnController();
        var userinfo = com.getUser();
        this.labelDebei.string = userinfo.JhCredits;
        this.labelShubei.string = userinfo.XjCredits;
        this.labelFund.string = userinfo.JJCredits;
        this.labelPoint.string = userinfo.CxCredits;
    },

     update: function (dt) {
         this.timer += dt;
         if(this.timer > 2){
             this.updateData();
             this.timer = 0;
         }
     },
});
