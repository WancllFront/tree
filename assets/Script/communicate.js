var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
      prefabItem: {
            default: null,
            type: cc.Prefab
        },
        nodeContent:{
            default:null,
            type: cc.Node
        },
        scrollview:{
            default: null,
            type:cc.ScrollView
        },
        prefabButton:{
            default: null,
            type: cc.Prefab
        },

        nodeneirong:{
            default: null,
            type: cc.Node
        },
          audio: {
            url: cc.AudioClip,
            default: null
        },

       
    },

    loadInfo: function(){
        var self = this;
        var url = com.yuming + com.newlist;
        com.async(url,function(resp){
            if(resp.msg1 == 'success'){
                 self.nodeContent.removeAllChildren();
                for(var i = 0 ; i<resp.msg3.length ;i++){
                    /*
                     var pref = cc.instantiate(self.prefabItem);
                     pref.getComponent(cc.Label).string = resp.msg3[i].Title;
                     pref.setPosition(-100,-50*(i+1));
                     self.nodeContent.addChild(pref);
                     */
                    var title = resp.msg3[i].Title;
                    var id = resp.msg3[i].ID;
                    var text = resp.msg3[i].Text;
                    var pref = cc.instantiate(self.prefabButton);
                    pref.getComponent(cc.Label).string = title;
                    //pref.getComponent(cc.Label).string = title;  


                    //注册点击事件
                    var clickEventHandler = new cc.Component.EventHandler();
                    clickEventHandler.target = self.node; //这个 node 节点是你的事件处理代码组件所属的节点
                    clickEventHandler.component = "communicate";//这个是代码文件名
                    clickEventHandler.handler = "callback";
                    var data = {'id':id,'text':text,'title':title}
                    clickEventHandler.customEventData = data;
                    
                    pref.getComponent(cc.Button) .clickEvents.push(clickEventHandler);
                    
                    pref.setPosition(0,-50*(i+1));
                    self.nodeContent.addChild(pref);

                }
            }
        });
    },

    callback: function(event, customEventData){
        var node = event.target;
        var button = node.getComponent(cc.Button);

        window.communityDData = customEventData;
       
       cc.director.loadScene('content');
    },

    onEnable:function(){
           this.radio = cc.sys.localStorage.getItem('radio');
       this.loadInfo();
    },

    // use this for initialization
    onLoad: function () {
          this.radio = cc.sys.localStorage.getItem('radio');
       this.loadInfo();

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
