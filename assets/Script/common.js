
module.exports = {
    // yuming:"http://47.89.18.53:8082",
    // onekey:'wancll2',
    //  yuming:"http://192.168.0.136:8081",
    // onekey:"wancll2017072301",
    //   yuming:"http://120.77.177.87:8082",
    //   onekey:"wancll2017071902",
    // yuming: "http://wancll.55555.io",
    // onekey: "wancll2017080701",
     yuming: "http://www.quanminzhishu.com",
    onekey: "wancll2017082601",

    loginurl: "/game/g_user.ashx?action=login&usercode={usercode}&pwd={pwd}",
    regurl: '/game/g_user.ashx?action=reg&username={username}&tjuser={tjuser}&usercode={usercode}&pwd1={pwd1}&pwd2={pwd2}',
    regcode: "/game/g_sendsms.ashx?action=regcheck&tel={tel}&yzm={yzm}",
    backcode: "/game/g_sendsms.ashx?action=backcheck&tel={tel}&yzm={yzm}",
    ruser: "/game/g_user.ashx?action=ruser&uid={uid}",//获取会员余额信息 
    geturl: '/game/g_user.ashx?action=getuser&uid={uid}', //获得会员信息
    hzhuan: "/game/g_user.ashx?action=hzhuan&usercode={usercode}&pwd={pwd}&uid={uid}&accounttype={accounttype}&price={price}",//转账 1树呗 4地呗
    donwuser: "/game/g_user.ashx?action=donwuser&type={type}&page={page}&uid={uid}",//）获取下面指定层数人员（如 一  级好友 二级好友）
    changpwd: "/game/g_user.ashx?action=changpwd&pwd0={pwd0}&pwd1={pwd1}&pwd2={pwd2}&pwd3={pwd3}&pwd4={pwd4}&pwd5={pwd5}&usercode={usercode}",//修改密码
    backpwd: "/game/g_user.ashx?action=backpwd&pwd={pwd}&usercode={usercode}",//找回密码
    changname: "/game/g_user.ashx?action=changname&name={name}&uid={uid}",//修改姓名
    jhuo: "/game/g_user.ashx?action=jhuo&uid={uid}",//激活
    photo: "/game/g_user.ashx?action=photo&uid={uid}&extion={extion}&img={img}",//设置头像
    //------------明细接口 -------------------------
    account: "/game/g_accoun.ashx?action=account&page={page}&uid={uid}&accountid={accountid}",//获取指定会员账户明细
    account_zx: "/game/g_accoun.ashx?action=account_zx&page={page}&uid={uid}",////获取指定会员转账明细
    account_dh: "/game/g_accoun.ashx?action=account_dh&page={page}&uid={uid}",//获取指定会员兑换明细


    //-----------游戏主界面接口--------------
    treelst: "/game/g_game.ashx?action=gettreelst&grade={grade}&uid={uid}", //获取指定场景 所有树信息(电话，回调函数（返回 json 值）)
    caozuo: "/game/g_game.ashx?action=caozuo&grade={grade}&uid={uid}&no={no}&actype={actype}",//游戏操作(1 种树  2浇水，3施肥   4采摘 11一键施肥 22一键采摘 可以不传No参数) (grade 等级，no 编号,actype 操作类型)-
    flnum: "/game/g_game.ashx?action=getnum&grade={grade}&uid={uid}",         //获取指定等级的肥料数量
    shouhuo: "/game/g_game.ashx?action=shouhuo&uid={uid}&grade={grade}",   //收获租借收益
    zhujie: "/game/g_game.ashx?action=zhujie&uid={uid}&grade={grade}",   //获取租借信息 操作编号（租橡胶树 :20   租风力发电 ：30）
    buygamegood: "/game/g_shop.ashx?action=buygamegood&grade={grade}&type={type}&uid={uid}",//游戏商城购买 （肥料，树苗 ，地）grade等级，type大类1肥料2树苗3土地
    getwareh: "/game/g_shop.ashx?action=getwareh&uid={uid}", //库存
    shopgood: "/game/g_shop.ashx?action=shopgood",         //兑换商城普通商品列表
    hieghgood: "/game/g_shop.ashx?action=hieghgood", //兑换商城高级商品信息
    byshopgood: "/game/g_shop.ashx?action=byshopgood&name={name}&usertel={usertel}&pwd={pwd}&province={province}&Area={Area}&City={City}&Addr={Addr}&num={num}&uid={uid}&goodid={goodid}",//购买普通商品
    byhieghgood: "/game/g_shop.ashx?action=byhieghgood&bankname={bankname}&bankno={bankno}&bankname={bankname}&pwd={pwd}&num={num}&goodid={goodid}&uid={uid}",   //购买高级商品
    zhu: "/game/g_shop.ashx?action=zhu&uid={uid}&grade={grade}&pwd={pwd}", //租橡胶林 grade
    //-----------------公告信息----------------------------
    newlist: "/game/g_new.ashx?action=newlist",//公告信息
    newinfo: "/game/g_new.ashx?action=newinfo&id={id}",//获取新闻公告详细信息

    //签到
    goSign: '/game/g_user.ashx?action=sign&uid={uid}',
    chongzhi: '/game/qmzsgame.ashx?action=xjconvert&uid={uid}&money={money}&password={password}&type={type}&signcode={signcode}',

    //棋牌
    getyb:'/game/qmzsgame.ashx?action=getyb&uid={uid}',//获取元宝数量
    czqp:'/game/qmzsgame.ashx?action=czqp&uid={uid}&money={money}&pwd={pwd}',//充值元宝
    
    //确认转账
    tranzr:'/game/qp_game.ashx?action=tranzr&uid={uid}&page={page}',//待确认转入
    tranzc:'/game/qp_game.ashx?action=tranzc&uid={uid}&page={page}',//待确认转出
    confirm:'/game/qp_game.ashx?action=confirm&uid={uid}&Id={Id}',//确认
    cancel:'/game/qp_game.ashx?action=cancel&uid={uid}&Id={Id}',//取消

    //--------------------------二维码--------------------------------
    qrcode: '/game/qrcode.aspx?id={id}',

    //------------------------获取指定长度随机数-获取-------------------// 
    getrandom: function (length) { var Num = ""; for (var i = 0; i < length; i++) { Num += Math.floor(Math.random() * 10); } return Num; },


    //--------------------------参数替换（url,参数数组）----------------------------//
    urlreplace: function (url, lst) {
        var newurl = url; for (var name in lst) { newurl = newurl.replace("{" + name + "}", lst[name]); }

        return newurl + '&key=' + this.onekey;

    },

    //-------------------------异步回调-------------------
    async: function (url, fun, panm) {
        var url1 = this.urlreplace(url, panm)

        console.log('执行url:' + url1)
        //网络加载中
        var scene_ = cc.director.getScene();

        var loadingNode = new cc.Node();
        loadingNode.name = 'loadingNode';
        loadingNode.addComponent(cc.Label);
        loadingNode.getComponent(cc.Label).string = '网络加载中,请稍后...';
        loadingNode.getComponent(cc.Label).fontSize = 25;
        loadingNode.setPosition(600, 400);
        loadingNode.color = new cc.Color(255, 0, 0);
        scene_.addChild(loadingNode);


        var xhr = new XMLHttpRequest();
        xhr.timeout = 5000;
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {

                    loadingNode.destroy();

                    var response = xhr.responseText;
                   // console.log(response);
                    response = JSON.parse(response);
                    if (response.msg2 == '非法操作') {
                        window.url = response.msg3;
                        cc.director.loadScene('update');

                    } else {
                        fun(response);
                    }


                } else {
                    loadingNode.destroy();
                    var response = { 'msg1': 'error', 'msg2': '网络连接错误', 'msg3': '' };

                    fun(response)
                }

            }
            loadingNode.destroy();
        };
        xhr.ontimeout = (e) => {
            loadingNode.destroy();
            let response = { 'msg1': 'error', 'msg2': '连接超时，网络繁忙，请稍后再试', 'msg3': '' };

            fun(response)
        }
        xhr.onerror = (e) => {
            loadingNode.destroy();
            let response = { 'msg1': 'error', 'msg2': '网路错误，请检查网络设置', 'msg3': '' };

            fun(response)
        }
        xhr.open("GET", url1, true);
        xhr.send();
    },
    //-------------------------调取数据-------------------------------------------- 
    geturldata: function (url, lst, fun) {
        var url2 = this.yuming + url;
        var user = cc.sys.localStorage.getItem('current_user');
        lst["uid"] = user.ID;
        com.async(url2, fun, lst);
    },
    //--------------------------------------------会员信息 ---------------------------------------
    getUser: function () {
        if (!cc.sys.localStorage.getItem('current_user')) {
            cc.director.loadScene('index');
        } else {
            return JSON.parse(cc.sys.localStorage.getItem("current_user"));
        }
    },

    updateUser: function (fun) {
        var userinfo = this.getUser();
        var uid = userinfo.ID;
        var url = this.yuming + this.geturl;
        this.async(url, function (resp) {
            if (resp.msg1 == 'success') {
                cc.sys.localStorage.setItem('current_user', JSON.stringify(resp.msg3));
                if (fun) {
                    fun(resp);
                }
            }
        }, { 'uid': uid });
    },

    logout: function () {
        cc.sys.localStorage.setItem('current_user', null);
    },


    //-----------------------------------------------原有接口函数----------------------------------------------------------------------------------//


    //-------------------------注册短信(电话，回调函数（返回 json 值）)--------------------------------------------
    sendregcode: function (tel, fun) {
        if (tel !== null && tel !== "") {
            var code2 = this.getrandom(6);
            cc.sys.localStorage.setItem('regcode', code2);


            var url = this.yuming + this.regcode;
            this.async(url, fun, { "tel": tel, "yzm": code2 });
        }
    },
    //-------------------------找回密码(电话，回调函数（返回 json 值）)--------------------------------------------
    sendBackcode: function (tel, fun) {
        if (tel !== null && tel !== "") {
            var code2 = this.getrandom(6);
            cc.sys.localStorage.setItem('regcode', code2);

            var url = this.yuming + this.backcode;
            this.async(url, fun, { "tel": tel, "yzm": code2 });
        }
    },
    //-------------------------登陆--------------------------------------------
    login: function (lst, fun) {
        if (lst["usercode"] !== null && lst["usercode"] !== "" && lst["pwd"] !== null && lst["pwd"] !== "") {

            var url = this.yuming + this.loginurl;
            this.async(url, fun, lst);

        }
    },

    //-------------------------注册--------------------------------------------
    reg: function (lst, fun) {
        if (lst.tjuser && lst.usercode && lst.pwd1) {
            lst.username = lst.usercode;
            lst.pwd2 = lst.pwd1;
            var url = this.yuming + this.regurl;
            this.async(url, fun, lst);
        }
    },

    //----------------------------激活--------------------------
    activeDebei: function (uid, fun) {
        if (uid != '') {
            var url = this.yuming + this.jhuo;
            var list = [];
            list.uid = uid;
            this.async(url, fun, list);
        }
    },

    //---------------------------------商城购买-------------------------------
    doShop: function (uid, type, grade, fun) {
        var list = {};
        list.uid = uid;
        list.type = type;
        list.grade = grade;

        var url = this.yuming + this.buygamegood;
        this.async(url, fun, list);
    },

    treeAction: function (list, fun) {


        var url = this.yuming + this.caozuo;
        this.async(url, fun, list);
    }

};

