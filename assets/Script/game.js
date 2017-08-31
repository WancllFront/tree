cc.Class({
    extends: cc.Component,

    properties: {
        nodeBonus: cc.Node,
        nodeMining: cc.Node,
        nodeVent: cc.Node,
        nodeBasketball: cc.Node,
        nodeFish: cc.Node,
        nodeWawa: cc.Node,
    },


    onEnable: function () {
        let gameObj = window.gameObj;
        let type = gameObj.type || 1; //1bonus 2basketball 3wawa 4fish 5mining 6vent
        let money = gameObj.money

        switch (type) {
            case 1: this.nodeBonus.active = true; break;
            case 2: this.nodeBasketball.active = true; break;
            case 3: this.nodeWawa.active = true; break;
            case 4: this.nodeFish.active = true; break;
            case 5: this.nodeMining.active = true; break;
            case 6: this.nodeVent.active = true; break;
        }
    },

    onDisable: function () {
        this.nodeBasketball.active = false;
        this.nodeBonus.active = false;
        this.nodeVent.active = false;
        this.nodeFish.active = false;
        this.nodeMining.active = false;
        this.nodeWawa.active = false;
    },

    // use this for initialization
    onLoad: function () {

    },

});
