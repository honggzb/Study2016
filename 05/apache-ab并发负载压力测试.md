Apache的ab命令模拟多线程并发请求，测试服务器负载压力，也可以测试nginx、lighthttp、IIS等其它Web服务器的压力。 
ab命令对发出负载的计算机要求很低，既不会占用很多CPU，也不会占用太多的内存，但却会给目标服务器造成巨大的负载，因此是某些DDOS攻击之必备良药，老少皆宜。自己使用也须谨慎。否则一次上太多的负载，造成目标服务器直接因内存耗光死机，而不得不硬重启，得不偿失。

在带宽不足的情况下，最好是本机进行测试，建议使用内网的另一台或者多台服务器通过内网进行测试，这样得出的数据，准确度会高很多。远程对web服务器进行压力测试，往往效果不理想（因为网络延时过大或带宽不足）

- 下载安装： `http://mirror.bit.edu.cn/apache//httpd/binaries/win32/?C=M;O=A `,  找到 `httpd-2.2.21-win32-x86-no_ssl.msi ` 
- 参数文档： `http://httpd.apache.org/docs/2.2/programs/ab.html`
- 运行： 在Windows系统下，打开cmd命令行窗口，定位到apache安装目录的bin目录下 , `cd C:\Program Files (x86)\Apache Software Foundation\Apache2.2\bin`
- ab 的用法是：`ab [options] [http://]hostname[:port]/path`
  - n ：总共的请求执行数，缺省是1；
  - c： 并发数，缺省是1；
  - t：测试所进行的总时间，秒为单位，缺省50000s
  - p：POST时的数据文件
  - w: 以HTML表的格式输出结果

```javascript
ab -n 5000 -c 200 -t 60 http://localhost/index.php
//-t 在60秒内发请求, -n发出5000个请求，-c模拟200并发，相当200人同时访问，后面是测试url）
ab -n 1000 -c 100 -w http://localhost/index.php >>c:\1.html
//将测试结果保存到c:\1.html文件中
ab -t 60 -c 100 -T "text/plain" -p p.txt http://192.168.0.10/hello.html 
//如果需要在url中带参数，这样做 
```
