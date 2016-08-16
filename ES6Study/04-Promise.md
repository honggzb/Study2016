### 男神求婚历程的Promise实现

```javascript
// 男神的各项参数
var NanShen = {
    "身高": 180,
    "体重": 80,
    "年薪": "200K",
    request: function(obj) {
        // 成功与否随机决定
        // 执行成功的概率为80%
        if (Math.random() > 0.2) {
            obj.success();
        } else {
            obj.error();
        }
    }
};
var Request = function(name) {
    return new Promise(function(resolve, reject) {
        var failed = 0, request = function() {            
            NanShen.request({
                name: name,
                success: function() {
                    console.log(name + "攻略成功！");
                    failed = 0;
                    resolve();
                },
                error: function() {
                    if (failed == 0) {
                        console.log("第一次攻略" + name + "失败，重试一次！");
                        failed = 1;
                        // 重新攻略一次
                        request();                       
                    } else {
                        console.log("依然没有拿下" + name + "，求婚失败！");
                        reject();
                    }
                }
            });
        };
		
        request();
    });
};
Request("岳父")                                // 搞定岳父，然后...
.then(function() { return Request("大伯"); })  // 搞定大伯，然后...
.then(function() { return Request("大姑"); })  // 搞定大姑，然后...
.then(function() {                            // 长辈们全部KO后，攻略女神
    NanShen.request({
        name: "女神",
        success: function() {
            console.log("女神同意，求婚成功！");
        },
        error: function() {
            console.log("女神不同意，求婚失败！");
        }
    });
});
```

运行结果

```
岳父攻略成功！
大伯攻略成功！
大姑攻略成功！
女神同意，求婚成功！
```

