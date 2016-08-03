```html
<!DOCTYPE html>
<html >
<head>
    <title></title>
    <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
</head>
<body >
    <div id="Lilei"  ng-controller="Textcontroller">
        <p></p>
    </div>
    <div id="Hanmeimei" ng-controller="Textcontroller">
        <p></p>
    </div>
<script src="http://code.angularjs.org/1.2.0/angular.min.js"></script>
<script>
    var myapp1mod = angular.module('Lilei',[]);
    myapp1mod.controller('Textcontroller',function($scope){
        var content= {};
        content.message = "Hello Lilei";
        $scope.content= content;
    });
 
    var myapp2mod = angular.module('Hanmeimei',[]);
    myapp2mod.controller('Textcontroller',function($scope){
        var content= {};
        content.message = "Hello Hanmeimei";
        $scope.content= content;
    });
 
    angular.bootstrap(angular.element("#Lilei"),["Lilei"]);
    angular.bootstrap(angular.element("#Hanmeimei"),["Hanmeimei"]);
</script>
</body>
</html>
```
