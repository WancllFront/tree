var com = require('./common')
cc.Class({
    extends: cc.Component,

    properties: {
        btnLogin: cc.Button,
        music: cc.AudioClip,

        toggleAgree: cc.Toggle,
        btnRead:cc.Button,

        nodeError:cc.Node,
        btnConfirm:cc.Button,

    },

    // use this for initialization
    onLoad: function () {
        
        if (cc.sys.localStorage.getItem('music') == 2) { } else { cc.audioEngine.play(this.music, true, 1) };
        if(cc.sys.localStorage.getItem('isChecked') != 1){
            this.toggleAgree.isChecked = false;
        }else{
            this.toggleAgree.isChecked = true;
        }
       
        this.btnLogin.node.on('click',  (event)=> {
            
            if (this.toggleAgree.isChecked) {
                cc.audioEngine.stopAll();
                cc.sys.localStorage.setItem('isChecked',1)
                cc.director.loadScene("index");
            }else{
                this.nodeError.active = true;
            }
        });
        this.btnConfirm.node.on('click',(event)=>{
            this.nodeError.active = false
        })
        this.btnRead.node.on('click',(event)=>{

            cc.sys.openURL(com.yuming + '/Mobile/mui/xieyi.html');
        })
        
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
