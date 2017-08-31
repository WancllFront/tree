var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
        btnFriend1: cc.Button,
        btnFriend2: cc.Button,

        nodeContent: cc.Node,

        prefabItem: cc.Prefab,

        btnNext: cc.Button,
        btnPrev: cc.Button,
        nodeFriend1: cc.Node,
        nodeFriend2: cc.Node,
        

        audio: cc.AudioClip,

        nodeAny: cc.Node
    },

    btnController: function () {
        var self = this;

        this.btnFriend1.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            self.type = 1;
            self.getFriend();
            self.nodeFriend2.active = false;
            
            self.nodeFriend1.active = true;
        });
        this.btnFriend2.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            self.type = 2;
            self.getFriend();
            self.nodeFriend1.active = false;
            
            self.nodeFriend2.active = true;
        });

        this.btnNext.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            self.page += 1;
            self.getFriend();
        });
        this.btnPrev.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            self.page -= 1;
            self.getFriend();
        });
    },

    getFriend: function () {
        var self = this;
        var userinfo = com.getUser();
        var list = {};
        list.uid = userinfo.ID;
        list.type = this.type;
        list.page = this.page;

        self.nodeContent.removeAllChildren();

        if (this.page == 1) {
            this.btnPrev.node.active = false;
        } else {
            this.btnPrev.node.active = true;
        }

        var url = com.yuming + com.donwuser;
        com.async(url, function (resp) {
            if (resp.msg1 == 'success') {
                var friendInfo = resp.msg3;

                if (friendInfo.length < 10) {
                    self.btnNext.node.active = false;
                } else {
                    self.btnNext.node.active = true;
                }
                self.nodeContent.removeAllChildren();
                for (var i = 0; i < friendInfo.length; i++) {
                    var pref = cc.instantiate(self.prefabItem);
                    pref.getComponent(cc.Label).string = '点击转赠给好友：' + friendInfo[i].UserName + '【' + friendInfo[i].UserCode + '】' + '   【' + (friendInfo[i].tlevel == 0 ? '未激活' : '已激活') + '】';
                    pref.getComponent(cc.Label).fontSize = 20;

                    var nodeUsercode = new cc.Node();
                    nodeUsercode.name = 'nodeusercode';
                    nodeUsercode.addComponent(cc.Label);
                    nodeUsercode.getComponent(cc.Label).string = friendInfo[i].UserCode;

                    nodeUsercode.active = false;

                    pref.addChild(nodeUsercode);

                    pref.getComponent(cc.Button).node.on('click', function (event) {
                        if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
                        var button = event.detail;
                        window.moveUserCode = button.node.getChildByName('nodeusercode').getComponent(cc.Label).string;

                        self.node.active = false;
                        self.nodeAny.active = true;

                    });
                    pref.setPosition(50, -50 * (i + 1));
                    self.nodeContent.addChild(pref);
                }

            }
        }, list);
    },

    onEnable: function () {
        this.nodeContent.removeAllChildren();
        this.page = 1;
        this.type = 1;
        this.btnPrev.node.active = false;
        this.nodeFriend2.active = false;
        
        this.nodeFriend1.active = true;
        this.getFriend();
    },

    // use this for initialization
    onLoad: function () {
        this.radio = cc.sys.localStorage.getItem('radio');

        this.page = 1;
        this.type = 1;
        this.btnPrev.node.active = false;
        this.btnController();


    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
