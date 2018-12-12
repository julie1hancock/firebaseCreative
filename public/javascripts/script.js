var myApp = angular.module("myApp",["firebase"]);
myApp.controller("chatController", ["$scope", "$firebaseArray",
 function($scope, $firebaseArray) {
   var ref = firebase.database().ref().child("messages");
   $scope.chats = $firebaseArray(ref);
   $scope.curUser = null;
   


   $scope.register = function(user) {
     console.log("script.js register");
     var badreq = false;
     angular.element(document.querySelector("#err")).html("");
     angular.element(document.querySelector("#third")).html("");
     
     /*check all fields filled out*/     
     if(user == undefined || user.name == undefined || user.username == undefined || user.password == undefined || user.email == undefined 
     || user.name == "" || user.username == "" || user.password == "" || user.email == ""){
       angular.element(document.querySelector("#err")).html("<p>please enter all 4 fields</p>");
       badreq = true;
     }
     
      
      
      var message = "<p>successfully registered!</p>";
      /*check user doesn't already exist*/
      ref.on("value", function(snapshot) {
      snapshot.forEach(function (child){

        if(child.val().username == user.username){
          badreq = true;
          message = "<p>username already in system. Pick new username or try logging in</p>";
        }
        else if(child.val().email == user.email){
          badreq = true;
          message = "<p>email already in system. Pick new email or try logging in</p>";
        }
      })
     }, function (errorObject) {
     message = "<p>internal error :-( pls try again</p>";
     badreq = true;
     });
   
     angular.element(document.querySelector("#err")).html(message);
    
     if(!badreq){
       var newmessage = {name:user.name, username:user.username, password:user.password, email:user.email};
       $scope.chats.$add(newmessage);
       $scope.curUser = user;
     }
     user.name = "";
     user.username = "";
     user.password = "";
     user.email = "";
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
       angular.element(document.querySelector("#err")).html("<p>internal error. Please try again</p>");
       badreq = true;
     });
 
     if(!exists)
       angular.element(document.querySelector("#err")).html("<p>Incorrect username or password</p>");
     else{
         $scope.curUser = user;
         return true;
     }
     return false;
   }//end login
 
    $scope.loginView = function(user) {
        console.log("loginView");  
        if(!$scope.login(user))
            return;
        angular.element(document.querySelector("#err")).html("");
        angular.element(document.querySelector("#third")).html("");

        
            
        var everything = "<h1>" + $scope.curUser.username + "'s posts</h1>"
        angular.element(document.querySelector("#err")).html(everything);

        
        
        everything = "<ul>";
        var exists = false;
        ref.on("value", function(snapshot) {
            snapshot.forEach(function (child){
                if(child.val().username == $scope.curUser.username && child.val().date != null){
                    everything+= "<li>" + child.val().date + ": " + child.val().entry;
                }
            })
        }, function (errorObject) { 
        angular.element(document.querySelector("#err")).html("<p>internal error. Please try again</p>");
     });
        
     angular.element(document.querySelector("#third")).html(everything+"</ul>");

        
        
    }
    
    $scope.loginPost = function(user) {
        angular.element(document.querySelector("#err")).html("");
        angular.element(document.querySelector("#third")).html("");
        if(!$scope.login(user))
            return;
        if(user == undefined || user.date == undefined || user.entry == undefined || user.date == "" || user.entry == ""){
            angular.element(document.querySelector("#err")).html("<h2>Post was not added. Please fill out ALL fields.</h2>");
            return;
        }
        
        var newmessage = {username:user.username, date:user.date, entry:user.entry}; 
        $scope.chats.$add(newmessage);
        angular.element(document.querySelector("#err")).html("<h2>Post added. Login & View to see your posts!</h2>");
    }

 
 
 

  

 }

 
]);