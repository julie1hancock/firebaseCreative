var myApp = angular.module("myApp",["firebase"]);
myApp.controller("chatController", ["$scope", "$firebaseArray",
 function($scope, $firebaseArray) {
   var ref = firebase.database().ref().child("messages");
   $scope.chats = $firebaseArray(ref);
   
  
 
   $scope.register = function(user) {
     console.log("script.js register");
     var badreq = false;
     angular.element(document.querySelector("#err")).html("");
     
     /*check all fields filled out*/     
     if(user == undefined || user.name == undefined || user.username == undefined || user.password == undefined || user.email == undefined || user == undefined || user.name == "" || user.username == "" || user.password == "" || user.email == ""){
       angular.element(document.querySelector("#err")).html("<p>please enter all 4 fields</p>");
       badreq = true;
     }
     
      /*check user doesn't already exist*/
     ref.on("value", function(snapshot) {
      snapshot.forEach(function (child){
        if(child.val().username == user.username){
          badreq = true;
          angular.element(document.querySelector("#err")).html("<p>username already in system. Pick new username or try logging in</p>");
        }
        else if(child.val().email == user.email){
          badreq = true;
          angular.element(document.querySelector("#err")).html("<p>email already in system. Pick new email or try logging in</p>");
        }
      })
     }, function (errorObject) {
     angular.element(document.querySelector("#err")).html("<p>internal error :-( pls try again</p>");
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
       window.location.replace("http://3.16.38.185:4201/x.html");
     }
   }
   
   
   
   
   
   
   
   
   
   
   
   
   
   $scope.login = function(user) {
     console.log("script.js login");
     var badreq = false;
     angular.element(document.querySelector("#err")).html("");
     
     /*check data was inputted*/
     if(user == undefined || user.username == "" || user.password == ""){
       angular.element(document.querySelector("#err")).html("<p>please enter username and password</p>");
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
       angular.element(document.querySelector("#err")).html("<p>internal error. Please try again</p>");
       badreq = true;
     });
 
     if(!exists){
       angular.element(document.querySelector("#err")).html("<p>Incorrect username or password</p>");
     }
     else{
       window.location.replace("http://3.16.38.185:4201/x.html");
     }
   }
 }//end login
 
 
 

 
]);