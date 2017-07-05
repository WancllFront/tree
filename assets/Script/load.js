cc.Class({
    extends: cc.Component,

    properties: {
       btnLogin:{
           default:null,
           type: cc.Button
       },
    //    // 得分音效资源
    //     scoreAudio: {
    //         default: null,
    //         url: cc.AudioClip
    //     }
    },

    // use this for initialization
    onLoad: function () {
        var self = this;

        //console.log(cc.audioEngine.play(this.scoreAudio, true,0.2));
        
        this.btnLogin.node.on('click',function(){
        cc.director.loadScene("index");
            
        });
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
