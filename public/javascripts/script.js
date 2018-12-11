var myApp = angular.module("myApp",["firebase"]);
myApp.controller("chatController", ["$scope", "$firebaseArray",
 function($scope, $firebaseArray) {
   console.log("script.js first");
   var ref = firebase.database().ref().child("messages");
   $scope.chats = $firebaseArray(ref);
   $scope.update = function(user) {
       console.log("script.js update");
       var newmessage = {from:user.name, body:user.chat, last:user.last};

    //   var newmessage = {from:user.name || "anonymous",body:user.chat};
       console.log(newmessage);
       $scope.chats.$add(newmessage);
       user.chat = "";
   }
 }
]);