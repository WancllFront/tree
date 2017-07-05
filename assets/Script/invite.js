var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
       
       grap:{
           default: null,
           type: cc.Graphics
       }
    },


    // use this for initialization
    onLoad: function () {
        
        var self = this;  
        var uid = com.getUser().ID;
        var qrcode = new QRCode(-1, QRErrorCorrectLevel.H);
        var qrurl = com.yuming + '/Mobile/Register.aspx?tjid='+uid;
       // qrcode.addData('http://www.baidu.com');
       qrcode.addData(qrurl);
        qrcode.make();

        var ctx = this.grap;

        // compute tileW/tileH based on node width and height
        // var tileW = this.node.width / qrcode.getModuleCount();
        // var tileH = this.node.height / qrcode.getModuleCount();
         var tileW = ctx.node.width / qrcode.getModuleCount();
        var tileH = ctx.node.height / qrcode.getModuleCount();

        // draw in the Graphics
        for (var row = 0; row < qrcode.getModuleCount(); row++) {
            for (var col = 0; col < qrcode.getModuleCount(); col++) {
                if (qrcode.isDark(row, col)) {
                    ctx.fillColor = cc.Color.BLACK;
                } else {
                    ctx.fillColor = cc.Color.WHITE;
                }
                var w = (Math.ceil((col + 1) * tileW) - Math.floor(col * tileW));
                var h = (Math.ceil((row + 1) * tileW) - Math.floor(row * tileW));
                ctx.rect(Math.round(col * tileW), Math.round(row * tileH), w, h);
                ctx.fill();
            }
        } 
        /* 
        var url = com.yuming  + com.qrcode;
        var qrcodeUrl = ''
        com.async(url,function(resp){
            if(resp.msg1 == 'success'){
                qrcodeUrl = resp.msg3;
               // qrcodeUrl = 'http://www.quanminzhishu.com/QrCode/201707/21716.jpg';

                if(qrcodeUrl == ''){

                }else{
                    cc.loader.load(qrcodeUrl,function (err, texture) {
                        console.log('----------'+err)
                        var frame=new cc.SpriteFrame(texture);
                        self.spriteQR.node.getComponent(cc.Sprite).spriteFrame=frame;
                    });

                }
            }
        },{'id':com.getUser().ID});
        */
        
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
