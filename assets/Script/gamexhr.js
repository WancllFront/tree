module.exports = {
    // yuming: "http://192.168.0.104:3000/",
    // yuming: 'http://119.28.16.44:3000/',
    yuming:'http://120.77.177.87:3000/',
    // yuming:'http://wancll.vicp.io:14592/',


    transform: 'users/transform',
    users: 'users',
    bonus: 'game/bonus',
    mixgame: 'game/mixgame',
    vent: 'game/vent',
    records:'users/records',
    transformrecords:'users/transformrecords',
    top:'users/top/top',
    mining:'game/mining',
    buy:'game/buy',
    fish:'game/fish',
    fisharray:'game/fisharray',

    //-------------------------异步回调-------------------
    async: function (url, fun, method, data) {
        //网络加载中
        let scene_ = cc.director.getScene();
        let loadingNode = new cc.Node();
        loadingNode.addComponent(cc.Label);
        loadingNode.getComponent(cc.Label).string = '网络加载中,请稍后...';
        loadingNode.getComponent(cc.Label).fontSize = 25;
        loadingNode.setPosition(600, 400);
        loadingNode.color = new cc.Color(255, 0, 0);
        scene_.addChild(loadingNode);

        let xhr = new XMLHttpRequest();
        xhr.timeout = 5000;
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    loadingNode.destroy();
                    let response = xhr.responseText;
                    //console.log(response);
                    response = JSON.parse(response);
                    fun(response)
                } else {
                    loadingNode.destroy();
                    let response = { 'status': '0', 'msg': 'error', 'data': '连接超时' };
                    fun(response)
                }

            }
            loadingNode.destroy();
        };
        xhr.ontimeout = (e) => {
            loadingNode.destroy();
          
            let response = { 'status': '0', 'msg': 'error', 'data': '连接超时，网络繁忙，请稍后再试' };
            fun(response)
        }
        xhr.onerror = (e) => {
            loadingNode.destroy();
           
            let response = { 'status': '0', 'msg': 'error', 'data': '网路错误，请检查网络设置' };
            fun(response)
        }
        xhr.open(method, url, true);
        if (data) {
            let body = '';
            for (let key in data) {
                body += key + '=';
                body += data[key];
                body += '&'
            }
            body = body.substr(0, body.length - 1)
            
            xhr.send(body);
        } else {
            xhr.send();
        }

    },
}