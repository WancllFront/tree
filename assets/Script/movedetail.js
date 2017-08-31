var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
        prefabItem: cc.Prefab,
        nodeContent: cc.Node,
        scrollview: cc.ScrollView,
        btnNext: cc.Button,
        btnPrev: cc.Button,
        audio: cc.AudioClip,
    },

    loadInfo: function () {
        var self = this;
        var url = com.yuming + com.account_zx;
        var uid = com.getUser().ID;

        self.nodeContent.removeAllChildren();

        if (this.page == 1) {
            this.btnPrev.node.active = false;
        } else {
            this.btnPrev.node.active = true;
        }

        var list = {};
        list.uid = uid;
        list.page = this.page;

        com.async(url, function (resp) {
            if (resp.msg1 == 'success') {
                var acInfo = resp.msg3;

                if (acInfo.length < 10) {
                    self.btnNext.node.active = false;
                } else {
                    self.btnNext.node.active = true;
                }

                self.nodeContent.removeAllChildren();
                for (var i = 0; i < acInfo.length; i++) {
                    var pref = cc.instantiate(self.prefabItem);
                    pref.getComponent(cc.Label).string = acInfo[i].CreateTime + '          ' + acInfo[i].TypeName + '          ' + acInfo[i].Money + '          ' + acInfo[i].Remarks
                    pref.getComponent(cc.Label).fontSize = 20;
                    pref.setPosition(50, -50 * (i + 1));
                    self.nodeContent.addChild(pref);
                }
            }
        }, list);
    },
    onEnable: function () {
        var self = this;
        this.page = 1;
        this.loadInfo();



    },
    // use this for initialization
    onLoad: function () {

        this.radio = cc.sys.localStorage.getItem('radio');
        var self = this;
        this.page = 1;

        this.btnNext.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            self.page += 1;
            self.loadInfo();
        });
        this.btnPrev.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            self.page -= 1;
            self.loadInfo();
        });

    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

    },
});
