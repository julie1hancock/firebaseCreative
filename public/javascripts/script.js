var myApp = angular.module("myApp",["firebase"]);
myApp.controller("chatController", ["$scope", "$firebaseArray",
 function($scope, $firebaseArray) {
   var ref = firebase.database().ref().child("messages");
   $scope.chats = $firebaseArray(ref);
   
    $scope.curUser = null;
 
   $scope.register = function(user) {
     console.log("script.js register");
     var badreq = false;
     angular.element(document.querySelector("#second")).html("");
     
     /*check all fields filled out*/     
     if(user == undefined || user.name == undefined || user.username == undefined || user.password == undefined || user.email == undefined || user == undefined || user.name == "" || user.username == "" || user.password == "" || user.email == ""){
       angular.element(document.querySelector("#second")).html("<p>please enter all 4 fields</p>");
       badreq = true;
     }
     
      /*check user doesn't already exist*/
     ref.on("value", function(snapshot) {
      snapshot.forEach(function (child){
        if(child.val().username == user.username){
          badreq = true;
          angular.element(document.querySelector("#second")).html("<p>username already in system. Pick new username or try logging in</p>");
        }
        else if(child.val().email == user.email){
          badreq = true;
          angular.element(document.querySelector("#second")).html("<p>email already in system. Pick new email or try logging in</p>");
        }
      })
     }, function (errorObject) {
     angular.element(document.querySelector("#second")).html("<p>internal error :-( pls try again</p>");
     badreq = true;
     console.log("The read failed: " + errorObject.code);
     });
   
   
     if(!badreq){
       var newmessage = {name:user.name, username:user.username, password:user.password, email:user.email}; //   var newmessage = {from:user.name || "anonymous",body:user.chat};
       $scope.chats.$add(newmessage);
       user.name = "";
       user.username = "";
       user.password = "";
       user.email = "";
     }
   }
   
   
   
   
   
   
   
   
   
   
   
   
   $scope.go = function(user) {
     console.log("go");  
     angular.element(document.querySelector("#first")).html("<p>sup</p>");

   }
   
   
   $scope.login = function(user) {
     console.log("script.js login");
     var badreq = false;
     angular.element(document.querySelector("#second")).html("");
     
     /*check data was inputted*/
     if(user == undefined || user.username == "" || user.password == ""){
       angular.element(document.querySelector("#second")).html("<p>please enter username and password</p>");
       badreq = true; 
     }
     var exists = false;
     ref.on("value", function(snapshot) {
       snapshot.forEach(function (child){
         if(child.val().username == user.username && child.val().password == user.password){
           exists = true;
        }
       })
     }, function (errorObject) { 
     console.log("The read failed: " + errorObject.code);
       angular.element(document.querySelector("#second")).html("<p>internal error. Please try again</p>");
       badreq = true;
     });
 
     if(!exists)
       angular.element(document.querySelector("#second")).html("<p>Incorrect username or password</p>");
     else
        $scope.go(user);
   }//end login
 

    $scope.setUpLogReg = function(){
        var lr = " <div ng-controller=\"chatController\"> <div class=\"row\"> <div class=\"column\" id=\"col1\">"
      + "<form novalidate class=\"simple-form\"> Username: <input type=\"text\" ng-model=\"user.username\" /><br />"
      + "Password: <input type=\"password\" ng-model=\"user.password\" /><br /> <input type=\"submit\" ng-click=\"login(user)\" value=\"Login\" />"
      + "</form> </div> <div class=\"column\" id=\"col2\"> <form novalidate class=\"simple-form\">"
      + "Name: <input type=\"text\" ng-model=\"user.name\" /><br /> Username: <input type=\"text\" ng-model=\"user.username\" /><br />"
      + "Email: <input type=\"text\" ng-model=\"user.email\" /><br /> Password: <input type=\"password\" ng-model=\"user.password\" /><br />"
      + "<input type=\"submit\" ng-click=\"register(user)\" value=\"Register\" /></form></div></div>";
      angular.element(document.querySelector("#first")).html(lr);
    }


 }

 
]);