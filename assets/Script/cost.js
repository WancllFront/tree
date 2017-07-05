var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
        //树列表
        nodeTreeList: {
            default: null,
            type:cc.Node
        },

         btnTree1: {
            default: null,
            type: cc.Button
        },
          btnTree2: {
            default: null,
            type: cc.Button
        },
          btnTree3: {
            default: null,
            type: cc.Button
        },
          btnTree4: {
            default: null,
            type: cc.Button
        },
          btnTree5: {
            default: null,
            type: cc.Button
        },
          btnTree6: {
            default: null,
            type: cc.Button
        },

       
        
        //树操作
        btnTreeList: {
            default: null,
            type: cc.Button
        },
        btnPlaint: {
            default: null,
            type: cc.Button
        },
        btnWater: {
            default: null,
            type: cc.Button
        },
        btnFeed: {
            default: null,
            type: cc.Button
        },
        btnGain: {
            default: null,
            type: cc.Button
        },
         btnFeedAll: {
            default: null,
            type: cc.Button
        },
        
        //土地
        btnTudi1: {
            default: null,
            type: cc.Button
        },  labelTudi1:{default:null,type:cc.Node}, nodeKuang1:{default:null,type:cc.Node},labelkuang11:{default:null,type: cc.Label},labelkuang12:{default:null,type: cc.Label},
         btnTudi2: {
            default: null,
            type: cc.Button
        },  labelTudi2:{default:null,type:cc.Node},nodeKuang2:{default:null,type:cc.Node},labelkuang21:{default:null,type: cc.Label},labelkuang22:{default:null,type: cc.Label},
         btnTudi3: {
            default: null,
            type: cc.Button
        },  labelTudi3:{default:null,type:cc.Node},nodeKuang3:{default:null,type:cc.Node},labelkuang31:{default:null,type: cc.Label},labelkuang32:{default:null,type: cc.Label},
         btnTudi4: {
            default: null,
            type: cc.Button
        },  labelTudi4:{default:null,type:cc.Node},nodeKuang4:{default:null,type:cc.Node},labelkuang41:{default:null,type: cc.Label},labelkuang42:{default:null,type: cc.Label},
         btnTudi5: {
            default: null,
            type: cc.Button
        },  labelTudi5:{default:null,type:cc.Node},nodeKuang5:{default:null,type:cc.Node},labelkuang51:{default:null,type: cc.Label},labelkuang52:{default:null,type: cc.Label},
         btnTudi6: {
            default: null,
            type: cc.Button
        },  labelTudi6:{default:null,type:cc.Node},nodeKuang6:{default:null,type:cc.Node},labelkuang61:{default:null,type: cc.Label},labelkuang62:{default:null,type: cc.Label},



        nodeTipSuccess: {
            default: null,
            type: cc.Node
        },
        nodeTipError: {
            default: null,
            type: cc.Node
        },
        btnTipSuccess:{
            default:null,
            type: cc.Button
        },
        btnTipError: {
            default:null,
            type: cc.Button
        },
        labelTipSuccess: {
            default: null,
            type: cc.Label
        },
         labelTipError: {
            default: null,
            type: cc.Label
        },


        prefabTree11:{
            default: null,
            type: cc.Prefab
        },
         prefabTree12:{
            default: null,
            type: cc.Prefab
        },
         prefabTree13:{
            default: null,
            type: cc.Prefab
        },

        prefabTree21:{
            default: null,
            type: cc.Prefab
        },
         prefabTree22:{
            default: null,
            type: cc.Prefab
        },
         prefabTree23:{
            default: null,
            type: cc.Prefab
        },

        prefabTree31:{
            default: null,
            type: cc.Prefab
        },
         prefabTree32:{
            default: null,
            type: cc.Prefab
        },
         prefabTree33:{
            default: null,
            type: cc.Prefab
        },

        prefabTree41:{
            default: null,
            type: cc.Prefab
        },
         prefabTree42:{
            default: null,
            type: cc.Prefab
        },
         prefabTree43:{
            default: null,
            type: cc.Prefab
        },

        prefabTree51:{
            default: null,
            type: cc.Prefab
        },
         prefabTree52:{
            default: null,
            type: cc.Prefab
        },
         prefabTree53:{
            default: null,
            type: cc.Prefab
        },

        prefabTree61:{
            default: null,
            type: cc.Prefab
        },
         prefabTree62:{
            default: null,
            type: cc.Prefab
        },
         prefabTree63:{
            default: null,
            type: cc.Prefab
        },

        audio: {
            url: cc.AudioClip,
            default: null
        },




        nodeTreeSelect1:{
            default: null,
            type: cc.Node
        },
         nodeTreeSelect2:{
            default: null,
            type: cc.Node
        },
         nodeTreeSelect3:{
            default: null,
            type: cc.Node
        },
         nodeTreeSelect4:{
            default: null,
            type: cc.Node
        },
         nodeTreeSelect5:{
            default: null,
            type: cc.Node
        },
         nodeTreeSelect6:{
            default: null,
            type: cc.Node
        },



    },

    btnController: function(){
        var self = this;
        var userinfo = com.getUser();
        var uid = userinfo.ID;
        //操作类型，1种树，2浇水，3施肥，4采摘
        var actype = '';
        //土地编号
        var no = '';
        //树编号
        var grade =   window.treeGrade ||userinfo.tlevel || 1;
        //初始化树的显示
       self['nodeTreeSelect'+grade].active = true;
            for(var i = 1; i<7;i++){
                if(i != grade){
                    self['nodeTreeSelect'+i].active = false;
                }
            }


        this.loadTreeInfo(grade);

        this.btnTreeList.node.on('click',function(){
            if(self.radio == 2){
            }else{
                cc.audioEngine.play(self.audio, false, 1);
            }
            self.nodeTreeList.active = ! self.nodeTreeList.active;
        });

        //选择树
        this.btnTree1.node.on('click',function(){
            if(self.radio == 2){
            }else{
                cc.audioEngine.play(self.audio, false, 1);
            }


            grade = 1;
            window.treeGrade = 1;

            var nodeTreeSelectindex = 'nodeTreeSelect'+grade;
            self[nodeTreeSelectindex].active = true;
            for(var i = 1; i<7;i++){
                if(i != grade){
                    self['nodeTreeSelect'+i].active = false;
                }
            }

           
            self.loadTreeInfo(grade);
            self.nodeTreeList.active = false;


             
             for(var oo = 1; oo < 7; oo++){
                     self['nodeKuang'+oo].active = false;
             }


        });
         this.btnTree2.node.on('click',function(){
              if(self.radio == 2){
            }else{
                cc.audioEngine.play(self.audio, false, 1);
            }

             grade = 2;
             window.treeGrade = 2;
              var nodeTreeSelectindex = 'nodeTreeSelect'+grade;
            self[nodeTreeSelectindex].active = true;
            for(var i = 1; i<7;i++){
                if(i != grade){
                    self['nodeTreeSelect'+i].active = false;
                }
            }
            
            self.loadTreeInfo(grade);
            self.nodeTreeList.active = false;
             for(var oo = 1; oo < 7; oo++){
                     self['nodeKuang'+oo].active = false;
             }

        });
         this.btnTree3.node.on('click',function(){
              if(self.radio == 2){
            }else{
                cc.audioEngine.play(self.audio, false, 1);
            }


             grade = 3;
             window.treeGrade = 3;
              var nodeTreeSelectindex = 'nodeTreeSelect'+grade;
            self[nodeTreeSelectindex].active = true;
            for(var i = 1; i<7;i++){
                if(i != grade){
                    self['nodeTreeSelect'+i].active = false;
                }
            }
           
            self.loadTreeInfo(grade);
            self.nodeTreeList.active = false;

             for(var oo = 1; oo < 7; oo++){
                     self['nodeKuang'+oo].active = false;
             }

        });
         this.btnTree4.node.on('click',function(){
              if(self.radio == 2){
            }else{
                cc.audioEngine.play(self.audio, false, 1);
            }

             grade = 4;
             window.treeGrade = 4;
              var nodeTreeSelectindex = 'nodeTreeSelect'+grade;
            self[nodeTreeSelectindex].active = true;
            for(var i = 1; i<7;i++){
                if(i != grade){
                    self['nodeTreeSelect'+i].active = false;
                }
            }
            
            self.loadTreeInfo(grade);
            self.nodeTreeList.active = false;

             for(var oo = 1; oo < 7; oo++){
                     self['nodeKuang'+oo].active = false;
             }

        });
         this.btnTree5.node.on('click',function(){
              if(self.radio == 2){
            }else{
                cc.audioEngine.play(self.audio, false, 1);
            }

             grade = 5;
             window.treeGrade = 5;
              var nodeTreeSelectindex = 'nodeTreeSelect'+grade;
            self[nodeTreeSelectindex].active = true;
            for(var i = 1; i<7;i++){
                if(i != grade){
                    self['nodeTreeSelect'+i].active = false;
                }
            }
            
            self.loadTreeInfo(grade);
            self.nodeTreeList.active = false;

             for(var oo = 1; oo < 7; oo++){
                     self['nodeKuang'+oo].active = false;
             }

        });
         this.btnTree6.node.on('click',function(){
              if(self.radio == 2){
            }else{
                cc.audioEngine.play(self.audio, false, 1);
            }

             grade = 6;
             window.treeGrade = 6;
              var nodeTreeSelectindex = 'nodeTreeSelect'+grade;
            self[nodeTreeSelectindex].active = true;
            for(var i = 1; i<7;i++){
                if(i != grade){
                    self['nodeTreeSelect'+i].active = false;
                }
            }
            
            self.loadTreeInfo(grade);
            self.nodeTreeList.active = false;

             for(var oo = 1; oo < 7; oo++){
                     self['nodeKuang'+oo].active = false;
             }

        });


        //树操作
        this.btnPlaint.node.on('click',function(){
            console.log('种植');
            
            if(self.radio == 2){
            }else{
                 
                cc.audioEngine.play(self.audio, false, 1);
            }
            actype = 1;
        });
        this.btnWater.node.on('click',function(){
            console.log('浇水');
            actype = 2;
            
            if(self.radio == 2){
            }else{
                
                cc.audioEngine.play(self.audio, false, 1);
            }

        });
        this.btnFeed.node.on('click',function(){
            console.log('施肥');
            actype = 3;
           
            if(self.radio == 2){
            }else{
                
                cc.audioEngine.play(self.audio, false, 1);
            }

        });
        this.btnGain.node.on('click',function(){
            console.log('采摘');
            actype = 4;
            
            if(self.radio == 2){
            }else{
                
                cc.audioEngine.play(self.audio, false, 1);
            }

        });

        //一键施肥
         this.btnFeedAll.node.on('click',function(){
           
            console.log(' -  -------一键施肥');
            
            actype = 11;
            
            if(self.radio == 2){
            }else{
                
                cc.audioEngine.play(self.audio, false, 1);
            }
            self.treeAction(uid,'',grade,actype);
            actype = '';

        });

        //点击土地
         this.btnTudi1.node.on('click',function(){
               if(self.radio == 2){
            }else{
                cc.audioEngine.play(self.audio, false, 1);
            }

            no = 1;
             if(actype != ''){
                console.log('点击土地1');
                self.treeAction(uid,no,grade,actype);   
                actype = '';
             }
            

             var nodeKuangIndex = 'nodeKuang'+no;
             self[nodeKuangIndex].active = true;
             for(var oo = 1; oo < 7; oo++){
                 if(oo!=no){
                     self['nodeKuang'+oo].active = false;
                 }
             }

           
        });

         this.btnTudi2.node.on('click',function(){
               if(self.radio == 2){
            }else{
                cc.audioEngine.play(self.audio, false, 1);
            }

             
            no = 2;
            if(actype != ''){
                console.log('点击土地2');
                self.treeAction(uid,no,grade,actype);   
               actype = '';
             }
           


             var nodeKuangIndex = 'nodeKuang'+no;
             self[nodeKuangIndex].active = true;
             for(var oo = 1; oo < 7; oo++){
                 if(oo!=no){
                     self['nodeKuang'+oo].active = false;
                 }
             }

        });
         this.btnTudi3.node.on('click',function(){

               if(self.radio == 2){
            }else{
                cc.audioEngine.play(self.audio, false, 1);
            }
                no = 3;
           if(actype != ''){
               console.log('点击土地3');
                
                self.treeAction(uid,no,grade,actype);   
               actype = '';
             }
           


             var nodeKuangIndex = 'nodeKuang'+no;
             self[nodeKuangIndex].active = true;
             for(var oo = 1; oo < 7; oo++){
                 if(oo!=no){
                     self['nodeKuang'+oo].active = false;
                 }
             }
        });
         this.btnTudi4.node.on('click',function(){

              if(self.radio == 2){
            }else{
                cc.audioEngine.play(self.audio, false, 1);
            }

                no = 4;
           if(actype != ''){
               console.log('点击土地4');
                self.treeAction(uid,no,grade,actype);   
               actype = '';
             }
           


             var nodeKuangIndex = 'nodeKuang'+no;
             self[nodeKuangIndex].active = true;
             for(var oo = 1; oo < 7; oo++){
                 if(oo!=no){
                     self['nodeKuang'+oo].active = false;
                 }
             }
        });
         this.btnTudi5.node.on('click',function(){
              if(self.radio == 2){
            }else{
                cc.audioEngine.play(self.audio, false, 1);
            }

                no = 5;
           if(actype != ''){
               console.log('点击土地5');
                self.treeAction(uid,no,grade,actype);   
               actype = '';
             }
            

             var nodeKuangIndex = 'nodeKuang'+no;
             self[nodeKuangIndex].active = true;
             for(var oo = 1; oo < 7; oo++){
                 if(oo!=no){
                     self['nodeKuang'+oo].active = false;
                 }
             }
        });
         this.btnTudi6.node.on('click',function(){
              if(self.radio == 2){
            }else{
                cc.audioEngine.play(self.audio, false, 1);
            }


                no = 6;
           if(actype != ''){
               console.log('点击土地6');
               self.treeAction(uid,no,grade,actype);   
               actype = '';
             
            }
           

             var nodeKuangIndex = 'nodeKuang'+no;
             self[nodeKuangIndex].active = true;
             for(var oo = 1; oo < 7; oo++){
                 if(oo!=no){
                     self['nodeKuang'+oo].active = false;
                 }
             }
        });



        ///提示框
         this.btnTipSuccess.node.on('click',function(){
            self.nodeTipSuccess.active = false;

              if(self.radio == 2){
            }else{
                cc.audioEngine.play(self.audio, false, 1);
            }
        });
         this.btnTipError.node.on('click',function(){
            self.nodeTipError.active = false;

              if(self.radio == 2){
            }else{
                cc.audioEngine.play(self.audio, false, 1);
            }
        });
        
        

    },

    treeAction: function(uid,no,grade,actype){
        var self = this;
        if(actype == 2){
                 this.nodeTipSuccess.active = true;
                 this.labelTipSuccess.string = '浇水成功';
        }else{
            var list = [];
            list.uid = uid;
            list.no = no;
            list.actype = actype;
            list.grade = grade;
            com.treeAction(list,function(resp){
                    if(resp.msg1 == 'success'){
                       
                        if(actype == 1){
                            self.nodeTipSuccess.active = true;
                            self.labelTipSuccess.string = '种植成功';
                            self.loadTreeInfo(grade);
                        }else if(actype ==3){
                          
                            self.loadTreeInfo(grade);
                        }else if(actype == 4){
                            com.updateUser();
                            self.nodeTipSuccess.active = true;
                            self.labelTipSuccess.string = '采摘成功！树呗余额:'+resp.msg3.XjCredits;
                            
                            self.loadTreeInfo(grade);
                        }else if(actype == 11){
                            self.nodeTipSuccess.active = true;
                            self.labelTipSuccess.string = resp.msg2;
                          
                             self.loadTreeInfo(grade);
                        }
                    }else{
                        self.nodeTipError.active = true;
                        self.labelTipError.string = resp.msg2 || '失败';
                    }
            });
        }
        
    },

     loadTreeInfo: function(grade){
        var self = this;
        var uid = com.getUser().ID;
        var url = com.yuming + com.treelst;
        var list = {};
        console.log('grade == '+ grade+'--'+'uid == '+uid);
        list.uid = uid;
        list.grade = grade;
        com.async(url,function(resp){
            if(resp.msg1 == 'success'){

                var treeInfo = resp.msg3;
                console.log(resp.msg3.length);
                for(var j =1 ;j<7;j++){
                     self['btnTudi'+(j)].node.removeAllChildren(true);
                     for(var i = 0 ;i<treeInfo.length;i++){

                         if(treeInfo[i].no == j){
                           // var index = 'labelTudi'+(j);
                           // self[index].string = ' status:'+treeInfo[i].status+' 第:'+(treeInfo[i].lunshu)+'轮'+' 施肥'+treeInfo[i].shifei+(treeInfo[i].shifei == 6 ? '成熟':'');
                            var labelKuangIndex1 = ('labelkuang'+j)+1;
                            self[labelKuangIndex1].string = 6-treeInfo[i].shifei;
                            var labelKuangIndex2 = ('labelkuang'+j)+2;
                            self[labelKuangIndex2].string = treeInfo[i].lunshu;

                            var index = 'labelTudi'+(j);
                            if(treeInfo[i].shifei == 6){
                                 
                                 self[index].active = true;
                            }else{
                                self[index].active = false;
                            }
                            
                            
                                //新建树对象
                                var index2 = ('prefabTree'+grade)+treeInfo[i].status;
                                var tree = cc.instantiate(self[index2]);
                                //console.log('index2 == '+index2+' j=='+j)
                                
                                if(j == 1){
                                    tree.setPosition(-2,0);
                                }else if(j == 2){
                                    tree.setPosition(-8,5);
                                }else if(j == 3){
                                    tree.setPosition(0,0);
                                }else if(j == 4){
                                    tree.setPosition(-5,33);
                                }else if(j == 5){
                                    tree.setPosition(15,5);
                                }else if(j == 6){
                                    tree.setPosition(-3,10);
                                }
                                
                               //添加树
                               self['btnTudi'+(j)].node.addChild(tree);
                            break;
                         }
                    }
                    if(i == treeInfo.length){
                          var labelKuangIndex1 = ('labelkuang'+j)+1;
                            self[labelKuangIndex1].string = '';
                            var labelKuangIndex2 = ('labelkuang'+j)+2;
                            self[labelKuangIndex2].string = '';
                            var index = 'labelTudi'+(j);
                            self[index].active = false;
                    }

                }
               
            }
        },list);
    },

    // use this for initialization
    onLoad: function () {

        this.music = cc.sys.localStorage.getItem('music');
        this.radio = cc.sys.localStorage.getItem('radio');
       
        this.btnController();
        this.timer = 0;
    },



    // called every frame, uncomment this function to activate update callback
     update: function (dt) {

     },
});
