var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {

        prefabShp:{
            default: null,
            type: cc.Prefab
        },

        btnShopgood:{
            default: null,
            type: cc.Button
        },
        
        btnHieghgood:{
            default: null,
            type: cc.Button
        },

        nodeContent:{
            default: null,
            type: cc.Node
        },

        audio:{
            default: null,
            url: cc.AudioClip
        },

        
        btnReturn:{
            default: null,
            type: cc.Button
        },
        nodeParent:{
            default: null,
            type: cc.Node
        },


        nodeNormalGood:{
            default:null,
            type: cc.Node
        },
        nodeHeightGood:{
            default: null,
            type: cc.Node
        },


        //子页面价格显示
        labelPrice:{
            default: null,
            type: cc.Label
        },
        labelHeightPrice:{
            default: null,
            type:cc.Label
        }
       
       
    },

    btnController: function(){
        var self = this;
        //点击高级商品
        this.btnHieghgood.node.on('click',function(){
            if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            
            self.hieghgood();
            self.nodeContent.removeAllChildren();

        });

        //点击普通商品
        this.btnShopgood.node.on('click',function(){
            if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            
            self.shopgood();
            self.nodeContent.removeAllChildren();
        });

         this.btnReturn.node.on('click',function(){
              if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
            self.node.active = false;
            self.nodeParent.active = true;
        });
    },

//高级商品列表
    hieghgood: function(){
        this.radio = cc.sys.localStorage.getItem('radio');
        var self = this;
        var url = com.yuming + com.hieghgood;

        com.async(url,function(resp){
             if(resp.msg1 == 'success'){
                 self.nodeContent.removeAllChildren();
                var shopInfo = resp.msg3;
                for(var i = 0; i< shopInfo.length; i++){
                    var prefabGood = cc.instantiate(self.prefabShp);
                    prefabGood.getChildByName('title').getComponent(cc.Label).string = shopInfo[i].GoodName;
                    prefabGood.getChildByName('price').getComponent(cc.Label).string = shopInfo[i].GoodPric;
                    
                     self.heightBtnCallback(prefabGood,shopInfo[i].id,shopInfo[i].GoodPric);
                     self.goodCallback(prefabGood,shopInfo[i].GoodPic);
                    
                   prefabGood.setPosition((i%4)*180,-250 * parseInt(i / 4));
                    self.nodeContent.addChild(prefabGood);
                }

            }
        });
    },
     //点击具体高级商品
    heightBtnCallback:function(btn,pid,price){
        var self = this;
        btn.getComponent(cc.Button).node.on('click',function(){
                if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
                self.labelHeightPrice.string = btn.getChildByName('price').getComponent(cc.Label).string;
                window.price = parseInt(self.labelHeightPrice.string);
                window.pid = pid;
                self.nodeHeightGood.active = true;
                self.node.active  = false;
        });

    },

    //点击具体普通商品
    normalBtnCallback:function(btn,pid,price){
        var self = this;
        btn.getComponent(cc.Button).node.on('click',function(){
                if(self.radio == 2){
                }else{
                    cc.audioEngine.play(self.audio, false, 1);
                }
                self.labelPrice.string = btn.getChildByName('price').getComponent(cc.Label).string;
                window.price = parseInt(self.labelPrice.string);
                window.pid = pid;
                self.nodeNormalGood.active = true;
                self.node.active  = false;
        });

    },


    shopgood : function(){
        var self = this;
        var url = com.yuming + com.shopgood;

        com.async(url,function(resp){

            if(resp.msg1 == 'success'){
                var shopInfo = resp.msg3;
                self.nodeContent.removeAllChildren();
                for(var i = 0; i< shopInfo.length; i++){
                    var prefabGood = cc.instantiate(self.prefabShp);
                    prefabGood.getChildByName('title').getComponent(cc.Label).string = shopInfo[i].GoodName;
                    prefabGood.getChildByName('price').getComponent(cc.Label).string = shopInfo[i].GoodPric;

                    self.normalBtnCallback(prefabGood,shopInfo[i].id,shopInfo[i].GoodPric);
                    
                    prefabGood.setPosition((i%4)*180,-250 * parseInt(i / 4));

                    self.goodCallback(prefabGood,shopInfo[i].GoodPic);
                    self.nodeContent.addChild(prefabGood);
                }

            }
            
        });
    },

    goodCallback:function(shop,url){

         cc.loader.load(url,null,function (err, texture) {
                       
            var frame=new cc.SpriteFrame(texture);
            shop.getChildByName('img').getComponent(cc.Sprite).spriteFrame=frame;
                       
        });

    },
    

    onEnable:function(){
        var self = this;
        self.nodeContent.removeAllChildren();
        this.shopgood();
          this.radio = cc.sys.localStorage.getItem('radio');
       
       
    },

   

    // use this for initialization
    onLoad: function () {
        this.shopgood();
        this.btnController();
        this.radio = cc.sys.localStorage.getItem('radio');
       
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
