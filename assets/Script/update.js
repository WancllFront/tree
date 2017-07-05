cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...

        btnUpdate:{
            default: null,
            type:cc.Button
        },
         btnUpdate2:{
            default: null,
            type:cc.Button
        },

         audio: {
            url: cc.AudioClip,
            default: null
        },
        
    },

    // use this for initialization
    onLoad: function () {
        var url = window.url;
        var self = this;
        console.log('url====================='+url);
        var radio = cc.sys.localStorage.getItem('radio');
        this.btnUpdate.node.on('click',function(){
            if(self.radio == 2){} else{cc.audioEngine.play(self.audio,false,1)}
            console.log('url==='+url[0]);
            if(url[0]){
                cc.sys.openURL(url[0]);
            }
            
        })
         this.btnUpdate2.node.on('click',function(){
              if(self.radio == 2){} else{cc.audioEngine.play(self.audio,false,1)}
              console.log('url==='+url[1]);
             if(url[1]){
                cc.sys.openURL(url[1]);
             }
            
        })
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
