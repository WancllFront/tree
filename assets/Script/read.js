cc.Class({
    extends: cc.Component,

    properties: {
       btnClose:cc.Button
    },

    // use this for initialization
    onLoad: function () {
        this.btnClose.node.on('click',(event)=>{
            cc.director.loadScene('load')
        })
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
