var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {

        labelTree11: {
            default: null,
            type: cc.Label
        },
        labelTree12: {
            default: null,
            type: cc.Label
        },
        labelTree13: {
            default: null,
            type: cc.Label
        },
        labelTree14: {
            default: null,
            type: cc.Label
        },
        labelTree15: {
            default: null,
            type: cc.Label
        },
        labelTree16: {
            default: null,
            type: cc.Label
        },
        labelTree21: {
            default: null,
            type: cc.Label
        },
        labelTree22: {
            default: null,
            type: cc.Label
        },
        labelTree23: {
            default: null,
            type: cc.Label
        },
        labelTree24: {
            default: null,
            type: cc.Label
        },
        labelTree25: {
            default: null,
            type: cc.Label
        },
        labelTree26: {
            default: null,
            type: cc.Label
        },


        //跳转按钮
         btnTudi:{
            default:null,
            type:cc.Button
        },
         btnFeiliao:{
            default:null,
            type:cc.Button
        },
         btnShumiao:{
            default:null,
            type:cc.Button
        },
         btnCangku: {
            default: null,
            type: cc.Button
        },

        nodeTudi:{
            default:null,
            type:cc.Node
        },
        nodeFeiliao:{
            default:null,
            type:cc.Node
        },
        nodeShumiao:{
            default:null,
            type:cc.Node
        },
        nodeCangku:{
            default:null,
            type:cc.Node
        },
         

        //土地

        btnTudi1: {
            default: null,
            type: cc.Button
        },
        btnTudi2: {
            default: null,
            type: cc.Button
        },
        btnTudi3: {
            default: null,
            type: cc.Button
        },
        btnTudi4: {
            default: null,
            type: cc.Button
        },
        btnTudi5: {
            default: null,
            type: cc.Button
        },
        btnTudi6: {
            default: null,
            type: cc.Button
        },

        //肥料
        btnFeiliao1: {
             default: null,
            type: cc.Button
        },
        btnFeiliao2: {
             default: null,
            type: cc.Button
        },
        btnFeiliao3: {
             default: null,
            type: cc.Button
        },
        btnFeiliao4: {
             default: null,
            type: cc.Button
        },
        btnFeiliao5: {
             default: null,
            type: cc.Button
        },
        btnFeiliao6: {
             default: null,
            type: cc.Button
        },

        //树苗
        btnShumiao1: {
             default: null,
            type: cc.Button
        },
        btnShumiao2: {
             default: null,
            type: cc.Button
        },
        btnShumiao3: {
             default: null,
            type: cc.Button
        },
        btnShumiao4: {
             default: null,
            type: cc.Button
        },
        btnShumiao5: {
             default: null,
            type: cc.Button
        },
        btnShumiao6: {
             default: null,
            type: cc.Button
        },



        //确认框
        nodeConfirm: {
            default: null,
            type: cc.Node
        },
        btnConfirm: {
            default: null,
            type: cc.Button
        },
        btnCancel: {
            default: null,
            type: cc.Button
        },
         



        btnShopClose: {
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

    alertor: function(resp){
         if(resp.msg1 == 'success'){
                console.log('成功')
                com.updateUser();
                this.nodeTipSuccess.active = true;
                this.labelTipSuccess.string = '购买成功';
        }else{
             com.updateUser();
            console.log('失败');
            this.nodeTipError.active = true;
            this.labelTipError.string = resp.msg2;
        }
    },

    btnController: function(){
        var userinfo = com.getUser();
        var self = this;

        var grade;
        var type;
        var uid = userinfo.ID;

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

         this.btnCancel.node.on('click',function(){
             if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            self.nodeConfirm.active = false;
        });


        //确认
        this.btnConfirm.node.on('click',function(){
            if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            console.log('点击确认'+uid+'--'+type+'--'+grade);
           
            com.doShop(uid,type,grade,function(resp){
                self.alertor(resp);
            });
            self.nodeConfirm.active = false;
        });

        //树苗购买点击
        this.btnShumiao1.node.on('click',function(){
            if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            grade = 1;
            type = 2;
            self.nodeConfirm.active = true;
        });
         this.btnShumiao2.node.on('click',function(){
             if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            grade = 2;
            type = 2;
            self.nodeConfirm.active = true;

        });
         this.btnShumiao3.node.on('click',function(){
             if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            grade = 3;
            type = 2;
            self.nodeConfirm.active = true;

        });
         this.btnShumiao4.node.on('click',function(){
             if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            grade = 4;
            type = 2;
            self.nodeConfirm.active = true;

        });
         this.btnShumiao5.node.on('click',function(){
             if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            grade = 5;
            type = 2;
            self.nodeConfirm.active = true;

        });
         this.btnShumiao6.node.on('click',function(){
             if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            grade = 6;
            type = 2;
            self.nodeConfirm.active = true;

        });

        //土地购买点击
        this.btnTudi1.node.on('click',function(){
            if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            grade = 1;
            type = 3;
            self.nodeConfirm.active = true;
        });
         this.btnTudi2.node.on('click',function(){
             if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
              grade = 2;
            type = 3;
            self.nodeConfirm.active = true;
        });
         this.btnTudi3.node.on('click',function(){
             if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
              grade = 3;
            type = 3;
            self.nodeConfirm.active = true;
        });
         this.btnTudi4.node.on('click',function(){
             if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
              grade = 4;
            type = 3;
            self.nodeConfirm.active = true;
        });
         this.btnTudi5.node.on('click',function(){
             if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
              grade = 5;
            type = 3;
            self.nodeConfirm.active = true;
        });
         this.btnTudi6.node.on('click',function(){
             if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            grade = 6;
            type = 3;
            self.nodeConfirm.active = true;
        });

        //肥料购买点击
         this.btnFeiliao1.node.on('click',function(){
             if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            grade = 1;
            type = 1;;
            self.nodeConfirm.active = true;
        });
         this.btnFeiliao2.node.on('click',function(){
             if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
               grade = 2;
            type = 1;
            self.nodeConfirm.active = true;
        });
         this.btnFeiliao3.node.on('click',function(){
             if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
               grade = 3;
            type = 1;
            self.nodeConfirm.active = true;
        });
         this.btnFeiliao4.node.on('click',function(){
             if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
               grade = 4;
            type = 1;
            self.nodeConfirm.active = true;
        });
         this.btnFeiliao5.node.on('click',function(){
             if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
               grade = 5;
            type = 1;
            self.nodeConfirm.active = true;
        });
         this.btnFeiliao6.node.on('click',function(){
             if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
               grade = 6;
            type = 1;
            self.nodeConfirm.active = true;
        });

        this.btnShopClose.node.on('click',function(){
            if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            console.log('关闭商城');
            cc.director.loadScene("hall");
        })

        //仓库点击
        this.btnCangku.node.on('click',function(){
            if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            console.log('点击仓库');

            var userinfo = com.getUser();
            var uid = userinfo.ID;
            var url = com.yuming + com.getwareh;
            com.async(url,function(resp){
                if(resp.msg1 == 'success'){
                    var cangkuInfo = resp.msg3;
                    for(var i = 0; i< cangkuInfo.length; i++){
                        var index = ('labelTree'+cangkuInfo[i].type)+cangkuInfo[i].grade;
                        console.log(index);
                        self[index].string = cangkuInfo[i].znum;
                    }
                }else{

                }
            },{'uid':uid});

           self.nodeCangku.active = true;
           self.nodeTudi.active = false;
           self.nodeFeiliao.active = false;
           self.nodeShumiao.active = false;
        });
        //土地点击
        this.btnTudi.node.on('click',function(){
            if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            console.log('点土地')
            self.nodeCangku.active = false;
           self.nodeTudi.active = true;
           self.nodeFeiliao.active = false;
           self.nodeShumiao.active = false;
        });
        //肥料点击
         this.btnFeiliao.node.on('click',function(){
             if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
             console.log('点肥料')
           self.nodeCangku.active = false;
           self.nodeTudi.active = false;
           self.nodeFeiliao.active = true;
           self.nodeShumiao.active = false;
        });
        //树苗点击
         this.btnShumiao.node.on('click',function(){
             if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
             console.log('点击树苗')
            self.nodeCangku.active = false;
           self.nodeTudi.active = false;
           self.nodeFeiliao.active = false;
           self.nodeShumiao.active = true;
        });


    },

    onEnable:function(){
        this.radio = cc.sys.localStorage.getItem('radio');
    },

    // use this for initialization
    onLoad: function () {
         this.radio = cc.sys.localStorage.getItem('radio');
        this.btnController();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
