var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
        //树列表
        nodeTreeList: cc.Node,

        btnTree1: cc.Button,
        btnTree2: cc.Button,
        btnTree3: cc.Button,
        btnTree4: cc.Button,
        btnTree5: cc.Button,
        btnTree6: cc.Button,

        //树操作
        btnTreeList: cc.Button,
        btnPlaint: cc.Button,
        btnWater: cc.Button,
        btnFeed: cc.Button,
        btnGain: cc.Button,


        //土地
        btnTudi1: cc.Button,  nodeKuang1: cc.Node, labelkuang11: cc.Label, labelkuang12: cc.Label,
        btnTudi2: cc.Button,  nodeKuang2: cc.Node, labelkuang21: cc.Label, labelkuang22: cc.Label,
        btnTudi3: cc.Button,  nodeKuang3: cc.Node, labelkuang31: cc.Label, labelkuang32: cc.Label,
        btnTudi4: cc.Button,  nodeKuang4: cc.Node, labelkuang41: cc.Label, labelkuang42: cc.Label,
        btnTudi5: cc.Button,  nodeKuang5: cc.Node, labelkuang51: cc.Label, labelkuang52: cc.Label,
        btnTudi6: cc.Button,  nodeKuang6: cc.Node, labelkuang61: cc.Label, labelkuang62: cc.Label,


        nodeTipSuccess: cc.Node,
        nodeTipError: cc.Node,
        btnTipSuccess: cc.Button,
        btnTipError: cc.Button,
        labelTipSuccess: cc.Label,
        labelTipError: cc.Label,

        prefabTree13: cc.Prefab,
        prefabTree23: cc.Prefab,
        prefabTree33: cc.Prefab,
        prefabTree43: cc.Prefab,
        prefabTree53: cc.Prefab,
        prefabTree63: cc.Prefab,

        audio: cc.AudioClip,

        nodeTreeSelect1: cc.Node,
        nodeTreeSelect2: cc.Node,
        nodeTreeSelect3: cc.Node,
        nodeTreeSelect4: cc.Node,
        nodeTreeSelect5: cc.Node,
        nodeTreeSelect6: cc.Node,

        nodeTree: cc.Node
    },

    btnTreeHandler: function (grade) {
        var self = this;
        if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }

        window.treeGrade = grade;

        var nodeTreeSelectindex = 'nodeTreeSelect' + grade;
        self[nodeTreeSelectindex].active = true;
        for (var i = 1; i < 7; i++) {
            if (i != grade) {
                self['nodeTreeSelect' + i].active = false;
            }
        }
        self.updateTree(window.cacheTree[grade], grade);
        self.nodeTreeList.active = false;
        for (var oo = 1; oo < 7; oo++) {
            self['nodeKuang' + oo].active = false;
        }
    },

    btnController: function () {
        var self = this;
        var userinfo = com.getUser();
        var uid = userinfo.ID;
        //操作类型，1种树，2浇水，3施肥，4采摘
        var actype = '';
        //土地编号
        var no = '';
        //树编号
        var grade = window.treeGrade || userinfo.tlevel || 1;
        //初始化树的显示
        self['nodeTreeSelect' + grade].active = true;
        for (var i = 1; i < 7; i++) {
            if (i != grade) {
                self['nodeTreeSelect' + i].active = false;
            }
        }

        self.updateTree(window.cacheTree[grade], grade);

        this.btnTreeList.node.on('click', function () {
            if (self.radio == 2) {
            } else {
                cc.audioEngine.play(self.audio, false, 1);
            }
            self.nodeTreeList.active = !self.nodeTreeList.active;
        });

        //选择树
        this.btnTree1.node.on('click', function () {
            self.btnTreeHandler(1);
        });
        this.btnTree2.node.on('click', function () {
            self.btnTreeHandler(2);
        });
        this.btnTree3.node.on('click', function () {
            self.btnTreeHandler(3);
        });
        this.btnTree4.node.on('click', function () {
            self.btnTreeHandler(4);
        });
        this.btnTree5.node.on('click', function () {
            self.btnTreeHandler(5);
        });
        this.btnTree6.node.on('click', function () {
            self.btnTreeHandler(6);
        });

        //树操作

        this.btnPlaint.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            actype = 1;
        });
        this.btnWater.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            actype = 2;
        });
        this.btnFeed.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            actype = 3;
        });
        this.btnGain.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            actype = 4;
        });

        //点击土地
        this.btnTudi1.node.on('click', function () {
            self.tudiAction(uid, 1, grade, actype)
        });
        this.btnTudi2.node.on('click', function () {
            self.tudiAction(uid, 2, grade, actype)
        });
        this.btnTudi3.node.on('click', function () {
            self.tudiAction(uid, 3, grade, actype)
        });
        this.btnTudi4.node.on('click', function () {
            self.tudiAction(uid, 4, grade, actype)
        });
        this.btnTudi5.node.on('click', function () {
            self.tudiAction(uid, 5, grade, actype)
        });
        this.btnTudi6.node.on('click', function () {
            self.tudiAction(uid, 6, grade, actype)
        });

        ///提示框
        this.btnTipSuccess.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            self.nodeTipSuccess.active = false;
        });
        this.btnTipError.node.on('click', function () {
            if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
            self.nodeTipError.active = false;
        });
    },

    tudiAction: function (uid, no, grade, actype) {
        var self = this;
        if (self.radio == 2) { } else { cc.audioEngine.play(self.audio, false, 1); }
        if (actype != '') {
            self.treeAction(uid, no, grade, actype);
            actype = '';
        }
        var nodeKuangIndex = 'nodeKuang' + no;
        self[nodeKuangIndex].active = true;
        for (var oo = 1; oo < 7; oo++) {
            if (oo != no) {
                self['nodeKuang' + oo].active = false;
            }
        }
    },

    treeAction: function (uid, no, grade, actype) {
        var self = this;
        if (actype == 2) {
            this.nodeTipSuccess.active = true;
            this.labelTipSuccess.string = '浇水成功';
        } else if (actype == 3) {
            this.nodeTipSuccess.active = true;
            this.labelTipSuccess.string = '施肥成功';
        } else if (actype == 4) {
            this.nodeTipSuccess.active = true;
            this.labelTipSuccess.string = '已默认采摘';
        }
        else if (actype == 1) {
            this.nodeTipSuccess.active = true;
            this.labelTipSuccess.string = '已经种植';
        }
    },

    //从服务端加载树信息
    loadTreeInfo: function (grade) {
        var self = this;
        var uid = com.getUser().ID;
        var url = com.yuming + com.treelst;
        var list = {};
        list.uid = uid;
        list.grade = grade;

        //移除所有树
        for (var j = 1; j < 7; j++) {
            self['btnTudi' + (j)].node.removeAllChildren(true);
        }

        com.async(url, function (resp) {
            if (resp.msg1 == 'success') {

                var treeInfo = resp.msg3;
                //更新本地缓存树
                window.cacheTree[list.grade] = treeInfo;

                self.updateTree(treeInfo, list.grade);

            }
        }, list);
    },

    //渲染树
    updateTree: function (treeInfo, grade) {

        if(!treeInfo){
            this.cacheTree()
            return;
        }

        var self = this;
        self.nodeTree.removeAllChildren();
        for (var j = 1; j < 7; j++) {

            for (var i = 0; i < treeInfo.length; i++) {
                if (treeInfo[i].no == j) {

                    //新建树对象
                    var index2 = 'prefabTree' + grade + '' + 3//('prefabTree'+grade)+3//treeInfo[i].status;
                    var tree = cc.instantiate(self[index2]);
                    tree.setPosition(-2, 0);
                    //添加树
                    self.nodeTree.addChild(tree);

                    //距离收获
                    var labelKuangIndex1 = ('labelkuang' + j) + 1;

                    if (treeInfo[i].lunshu == 10) {
                        self[labelKuangIndex1].string = '';
                    } else {
                        self[labelKuangIndex1].string = 6 - treeInfo[i].shifei;
                    }

                    var labelKuangIndex2 = ('labelkuang' + j) + 2;
                    self[labelKuangIndex2].string = treeInfo[i].lunshu;

                    break;
                }
            }
            if (i == treeInfo.length) {
                var labelKuangIndex1 = ('labelkuang' + j) + 1;
                self[labelKuangIndex1].string = '';
                var labelKuangIndex2 = ('labelkuang' + j) + 2;
                self[labelKuangIndex2].string = '';
            }

        }
    },

    //本地缓存树信息
    cacheTree: function () {
        var self = this;
        window.isFinishLoad = false;
        window.cacheTree = [];
        var uid = com.getUser().ID;
        var url = com.yuming + com.treelst;
        var list = {};
        list.uid = uid;
        for (var i = 1; i <= 6; i++) {
            list.grade = i;
            self.asyncTree(url, list, i);
        }
    },

    asyncTree: function (url, list, i) {
        var self = this;
        com.async(url, (resp) => {

            if (resp.msg1 == 'success') {
                window.cacheTree[i] = resp.msg3;
            } else {
                window.isFinishLoad = false;
                self.nodeTipError.active = true;
                self.labelTipError.string = resp.msg2 || '加载失败,请退出游戏检查网络';
                setTimeout(function () {
                    cc.director.loadScene('index');
                }, 2000);
            }
            this.count++;
            if (self.count == 6) {
                window.isFinishLoad = true;
                window.loadDate = new Date().getDate();
                self.btnController();
            }
        }, list)
    },

    onEnable: function () {
        this.radio = cc.sys.localStorage.getItem('radio');
        this.timer = 0;
    },

    onLoad: function () {
        this.count = 0;
       // console.log(JSON.stringify(window.cacheTree))
        if (!window.cacheTree || !window.isFinishLoad || window.loadDate != new Date().getDate()) {
           // this.btnController();
            this.cacheTree();
        } else {
            this.btnController();
        }
    },

});
