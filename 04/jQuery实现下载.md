
```html
    <a href="http://sishuok.com/forum/download?filename=2012/8/3/59e99e4584d24c982bba2ecbb52459ee__hadoop%E5%88%9D%E7%BA%A7ppt.rar">a标签下载</a>  
    <input   
       type='button'   
       value="修改地址栏下载"   
       onclick="window.location.href='http://sishuok.com/forum/download?filename=2012/8/3/59e99e4584d24c982bba2ecbb52459ee__hadoop%E5%88%9D%E7%BA%A7ppt.rar'">  
    <input   
       type='button'   
       value="打开新窗口下载"   
       onclick="window.open('http://sishuok.com/forum/download?filename=2012/8/3/59e99e4584d24c982bba2ecbb52459ee__hadoop%E5%88%9D%E7%BA%A7ppt.rar')">  
    ajax利用iframe下载
    <iframe id="fileDownFrame" src="" style="display:none; visibility:hidden;"></iframe>        
    <input   
        type='button'   
        value="ajax下载"  
        onclick='$("#fileDownFrame").attr("src","http://sishuok.com/forum/download?filename=2012/8/3/59e99e4584d24c982bba2ecbb52459ee__hadoop%E5%88%9D%E7%BA%A7ppt.rar");'>  
    <!--  
        ajax下载或者使用 jquery.fileDownload 插件  
        http://johnculviner.com/post/2012/03/22/Ajax-like-feature-rich-file-downloads-with-jQuery-File-Download.aspx  
        服务器端设置不缓存  
        header("Pragma: public");  
        header("Expires: 0");  
        header("Cache-Control: must-revalidate, post-check=0, pre-check=0");   
    -->  
    <script src="http://jqueryfiledownload.apphb.com/Scripts/jquery.fileDownload.js"></script>
    <a class="fileDownloadLink" href="javascript:;">Download</a>
    <script language="javascript">
     $(document).on("click", "a.fileDownloadLink", function () {
         $.fileDownload("http://jqueryfiledownload.apphb.com/FileDownload/DownloadReport/2");
     });
    </script>
```
