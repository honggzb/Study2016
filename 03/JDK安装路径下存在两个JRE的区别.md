## "两个jre"和"三个lib"的功能简单扼要的解释

    安装JDK后，Java目录下有jdk和jre两个文件夹，但jdk下还有一个jre文件夹，而且这个jre比前面那个jre在bin目录下多了个server文件夹！

    普通用户装jre即可。开发人员需要安装jdk，其中包括jre。所以jdk目录下包括jre目录。两个jre大体相同，有细微的差别。

    两套 jre ，是针对不同的工作职责！不同的 jre 负责各自范围的内容。

    当用户只需要执行 java 的程序时，那么C:\Program Files\Java\jre1.5.0_08的 jre 就 ok ！

    当用户是 java 程序员，则需要 java 开发环境。编译时，系统就会优先去找`C:\Program Files\Java\jdk1.5.0_08\bin`下的“ java 、 javac ”这些命令所在目录或者他们的父目录的 jre 。即开发环境下运行的是 jdk 下的 jre 。

## 再说三个lib目录：

1. JDK下的lib包括java开发环境的jar包，是给JDK用的，例如JDK下有一些工具，可能要用该目录中的文件。例如，编译器等。
2. JRE下的lib只是运行java程序的jar包，是为JVM运行时候用的。包括所有的标准类库，和扩展类。  
3. JDK下的JRE下的lib是开发环境中，运行时需要的jar包。最典型的就是导入的外部驱动jar包。因为编译时，系统找的是jdk下的jre。而不是最外层的jre。
-----------------------------------------
最后我在这里补充几点:

1. 在使用Eclipse的时候不需要指定的CLASSPATH,Eclipse会自己搜索.
2. 独立目录下的jre是通用jre,安装时是可选的（选择了，则会覆盖已有版本）。jdk目录下的jre则是必须的。如果你在eclipse里指定jdk的路径（jre的路径不用你指定，会自己去找的），那么用的就是这个jre。而java, web, start等，用的则是通用jre。
