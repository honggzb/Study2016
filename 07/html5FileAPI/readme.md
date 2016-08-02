## HTML5 File API 

有了FileSystemAPI，网络应用就可以创建、读取、导航用户本地文件系统中的沙盒部分以及向其中写入数据。

API 被分为以下不同的主题：

- 读取和处理文件：File/Blob、FileList、FileReader
- 创建和写入：BlobBuilder、FileWriter
- 目录和文件系统访问：DirectoryReader、FileEntry/DirectoryEntry、LocalFileSystem

如果要通过 file://调试您的应用，可能需要--allow-file-access-from-files标记。不使用这些标记会导致SECURITY_ERR或QUOTA_EXCEEDED_ERRFileError。

参考规范

- [FileSystem](http://dev.w3.org/2009/dap/file-system/pub/FileSystem/)
- [FileWriter](http://dev.w3.org/2009/dap/file-system/file-writer.html)
- [BlobBuilder](http://dev.w3.org/2009/dap/file-system/file-writer.html#idl-def-BlobBuilder)
- [FileReader](http://dev.w3.org/2006/webapi/FileAPI/#dfn-filereader)
- [File](http://dev.w3.org/2006/webapi/FileAPI/)
- [Blob](http://dev.w3.org/2006/webapi/FileAPI/#dfn-Blob)

### 上传基本是项目中经常出现的，一般采用：

1. form提交 : form提交会刷新页面，很难做到异步上传
2. flash :  flash可能是用得比较多了，因为可以兼顾到几乎所有的浏览器
3. html5: 现在html5提供了API以及File，FileReader，XMLHttpRequest等强大的API，为我们拖放实现上传提供了可能

之前一直会用jQuery的uploadify作为项目中的上传工具，uploadify也有基于html5好像是收费的

** 兼容性： http://caniuse.com/#feat=fileapi **

### 1.FileList对象和File对象

　　FileList对象表示用户选择的文件列表，在HTML4中file控件内只允许放置一个文件，但在HTML5中通过添加multiple属性，file控件内允许放置多个文件。控件内的每一个用户选择的文件都是一个file对象，而FileList就是这些file对象的列表，代表用户选择的所有文件。

- `type="file" multiple="multiple"`
- file对象有两个属性，一个是name，代表文件名不包含文件的路径；一个是lastModifiedDate，表示文件最后被修改的日期。

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset='UTF-8'/>
        <title>FileList and File </title>
        <script type="text/javascript" language="JavaScript">
        function showFiles(){
        var file, len = document.getElementById('file').files.length;     //返回FileList文件列表对象
        for (var i=0; i < len; i++) {
              file = document.getElementById('file').files[i];
              alert(file.name);
          };
        }
</script>
    </head>
    <body>
        <input type="file" id='file' multiple="multiple" width="80px"/>
        <input type="button" id="bt1" value="click" onclick="showFiles();"/>
    </body>
</html>
```

### 2.Blob对象

　　HTML5中Blob表示二进制原始数据，它提供一个slice()方法，可以通过这个方法访问到字节内部的原始数据块。事实上，上面提到的file对象继承了Blob对象。

- Blob对象的两个属性，size：表示一个对象的字节长度。type：表示一个对象的MIME类型，如若是未知类型返回空字符串。
- 对于图像类型的文件，Blob对象的type属性都是以image/开头，可以利用这个特性对用户选择的文件类型做判断
- file控件在HTML5标准中添加了accept属性，用来限制接受的文件类型，但目前各浏览器对齐支持都仅限于在打开文件选择窗口时默认的选择图像文件而已，如果选择其他类型，控件也能接受。

```javascript
  function showFileInfo(){
    var file = document.getElementById('file').files[0];
    if(checkImage(file)){
      var size = document.getElementById('fileType');
      var type = document.getElementById('fileSize');
      size.innerHTML = file.size;
      type.innerHTML = file.type;
    }
    else{
        return ;
    }
   }
   
   function checkImage(file){
    if(!/img\/\w+/.test(file.type)){
        alert(file.name + "不是图片");
        return false;
    }
    return true;
  }
```

### 3. FileReader接口

FileReader对象专门用于读取文件，同时可以将文件转化为各种格式信息。

**3.1 接口方法**  -FileReader对象实例一共包含4个方法

方法名|参数|描述
---|---|---
readAsBinaryString()|file|将文件读取为二进制字符串，通常将它传到后端，后端可以通过这段字符串存储文件
readAsDataURL()|file|将文件读取为一段data url字符串，事实上是将小文件以一种特格式的URL地址直接读取到页面。小文件通常指图片与html等格式文件
readAsText()|file[encoding]|将文件以文本的方式读取，其中第二个参数为文本的编码
abort()|(none)|中断读取操作

**3.2 接口事件**

事件|描述
---|---
onabort|数据读取中断时发生
onerror|数据读取出错时发生
onloadstart|数据读取开始时发生
onload|数据读取成功完成时发生
onloadend|数据读取完成时发生无论读取成功还是失败
onprogess|数据读取中

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<title>FileReader</title>
<meta name="description" content="" />
<meta name="viewport" content="width=device-width; initial-scale=1.0" />
<script type="text/javascript" language="JavaScript">
var file ,result; 
function  myLoad() {
     file = document.getElementById('file').files[0];
     result = document.getElementById('result');
}
if(typeof FileReader == 'undefined'){
    result.innerHTML = "你的浏览器不支持 FileReader";
    file.setAttribute("disabled","disabled");
}
function readAsDataURL(){
  if(!/image\/\w+/.test(file.type)){
          alert(file.name + '不是一个图片类型的文件');
  }else{
    var reader = new FileReader();    // 新建FileReader对象实例
    reader.readAsDataURL(file);       // 读取文件内容
    reader.onload = function(e){      // 监听实例loadend事件
      //document.getElementById("img").src = e.target.result;       // 设置图片base64值
      result.innerHTML = "<img src=" + reader.result +"/>";
    };
  }
}
function readAsBinaryString(){
  var reader = new FileReader();         // 新建FileReader对象实例
    reader.readAsBinaryString(file);
    reader.onload = function(e){         // 监听实例loadend事件
        result.innerHTML = reader.result;
    };
}
function readAsText(){
  var reader = new FileReader();
  reader.readAsText(file);
  reader.onload=function(e){
      result.innerHTML = reader.result;
  };
}
</script>
    </head>
    <body onload="myLoad();">
        <p>
            <input type="file" id='file'/>
            <input type='button' id="bt_DataURL" value="读取图片" onclick="readAsDataURL();"/>
            <input type="button" id="bt_BinaryString" value="读取二进制字符串" onclick="readAsBinaryString();"/>
            <input type="button" id="bt_textString" value="读取文本信息" onclick="readAsText();"/>
        </p>   
        <div id="result"></div>
    </body>
</html>
```

> reference

- [HTML5 FileAPI](http://www.cnblogs.com/MrBackKom/archive/2012/03/20/2407249.html)
- [探索 FileSystem API](http://www.html5rocks.com/zh/tutorials/file/filesystem/#toc-requesting-quota)
