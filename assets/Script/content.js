var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
       labelTitle: {
           default: null,
           type: cc.Label
       },
       labelContent: {
           default: null,
           type: cc.RichText
       },
       btnClose:{
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

      this.btnClose.node.on('click',function(){
          
             if(self.radio == 2){
            }else{
                
                cc.audioEngine.play(self.audio, false, 1);
            }

         cc.director.loadScene('home');
          
      }) ; 

    },

    loadInfo: function(){
        var self = this;
        /*
        var url = com.yuming + com.newinfo;
        com.async(url,function(resp){
            if(resp.msg1 == 'success'){
                self.labelTitle = resp.msg3.Title;
                self.labelContent = resp.msg3.Text;
            }
        },{'id':this.cid});
        */
        var data = window.communityDData
        self.labelTitle.string = data.title;
        self.labelContent.string = data.text;

    },
    onEnable: function(){
          this.radio = cc.sys.localStorage.getItem('radio');
        this.loadInfo()
    },

    // use this for initialization
    onLoad: function () {
        this.radio = cc.sys.localStorage.getItem('radio');
       
        this.loadInfo()
        this.btnController();

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
