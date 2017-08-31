var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
        btnClose: cc.Button,

        btnFriend: cc.Button,
        btnCommunicate: cc.Button,
        btnModifyPwd: cc.Button,
        btnModifyNicename: cc.Button,
        btnInvited: cc.Button,

        btnBank: cc.Button,

        labelUsername: cc.Label,
        labelUsercode: cc.Label,


        nodeHome: cc.Node,
        nodeFriend: cc.Node,
        nodeCommunity: cc.Node,
        nodeInvite: cc.Node,
        nodeModifypwd: cc.Node,
        nodeModifyUsername: cc.Node,


        btnReturn: cc.Button,



        btnSuccessConfirm: cc.Button,
        btnErrorConfirm: cc.Button,
        labelError: cc.Label,
        labelSuccess: cc.Label,
        nodeSuccess: cc.Node,
        nodeError: cc.Node,

        audio: cc.AudioClip,

        spritePhoto: cc.Sprite,


    },

    btnController: function () {
        var self = this;
        var userinfo = com.getUser();
        var uid = userinfo.ID;

        this.btnClose.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            cc.director.loadScene("hall");
        });
        this.btnReturn.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            self.nodeFriend.active = false;
            self.nodeCommunity.active = false;
            self.nodeInvite.active = false;
            self.nodeModifypwd.active = false;
            self.nodeModifyUsername.active = false;
            self.nodeHome.active = true;
        });

        this.btnFriend.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            self.nodeHome.active = false;
            self.nodeFriend.active = true;

        });

        this.btnCommunicate.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            self.nodeHome.active = false;
            self.nodeCommunity.active = true;

        });

        this.btnInvited.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            self.nodeHome.active = false;
            self.nodeInvite.active = true;

        });

        this.btnModifyNicename.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            self.nodeModifyUsername.active = true;
            self.nodeHome.active = false;

        });

        this.btnModifyPwd.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            self.nodeModifypwd.active = true;
            self.nodeHome.active = false;

        });

        this.btnSuccessConfirm.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            self.nodeError.active = false;
            self.nodeSuccess.active = false;

        });
        this.btnErrorConfirm.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            self.nodeError.active = false;
            self.nodeSuccess.active = false;
        });
        this.btnBank.node.on('click',(event)=>{
            if (this.radio == 2) { } else { cc.audioEngine.play(this.audio, false, 1); }
            cc.director.loadScene('account')
        })
    },

    loadUserinfo: function () {
        var userinfo = com.getUser();
        this.labelUsername.string = userinfo.UserName;
        this.labelUsercode.string = userinfo.UserCode;
    },


    updatePhoto: function () {
        var self = this;
        var userinfo = com.getUser();
        var photoUrl = userinfo.Photo;

        if (photoUrl != '') {

            cc.loader.load(photoUrl, function (err, texture) {
                var frame = new cc.SpriteFrame(texture);
                self.spritePhoto.node.getComponent(cc.Sprite).spriteFrame = frame;
            });
        }


    },

    onEnable: function () {
        this.radio = cc.sys.localStorage.getItem('radio');
        this.timer = 0;
        this.updatePhoto();
        this.loadUserinfo();
    },

    // use this for initialization
    onLoad: function () {

        this.btnController();

    },

    // called every frame, uncomment this function to activate update callback
    //  update: function (dt) {
    //      this.timer += dt;
    //      if(this.timer > 2){
    //          this.loadUserinfo();
    //          this.timer = 0;
    //      }
    //  },
});
