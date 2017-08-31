cc.Class({
    extends: cc.Component,

    properties: {
        btnUpdate: cc.Button,
        btnUpdate2: cc.Button,
        audio: cc.AudioClip,
    },

    // use this for initialization
    onLoad: function () {
        var url = window.url;
        var self = this;

        var radio = cc.sys.localStorage.getItem('radio');
        this.btnUpdate.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1) }

            if (url[0]) {
                cc.sys.openURL(url[0]);
            }
        })
        this.btnUpdate2.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1) }

            if (url[1]) {
                cc.sys.openURL(url[1]);
            }
        })
    },
});
