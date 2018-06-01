var app = angular.module("app", ["xeditable"]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

app.controller('EditableRowCtrl', function($scope, $filter, $http) {
  $scope.users = [
    {id: 1, name: 'awesome user1', company: 'Agile Solutions', group: 4, groupName: 'admin', document: '35.546.792-5', img: "https://scontent.fssa7-1.fna.fbcdn.net/v/t1.0-1/16196015_10154888128487744_6901111466535510271_n.png?_nc_cat=0&oh=0d72338b2a9162de88513558cdd919d3&oe=5BB77159"},
    {id: 2, name: 'awesome user2', company: 'SAP', group: 3, groupName: 'vip', document: '35.546.792-5', img: "https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg"},
    {id: 3, name: 'awesome user3', company: 'Amazon', group: null, document: '35.546.792-5', img: "https://www.ienglishstatus.com/wp-content/uploads/2018/04/Sad-Profile-Pic-for-Whatsapp.png"}
  ]; 
  
  $scope.selectedUser = {id: 1, img: 'https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg', name: 'awesome user1', company: 'Agile Solutions', group: 4, groupName: 'admin', document: '35.546.792-5'};

  $scope.statuses = [
    {value: 1, text: 'status1'},
    {value: 2, text: 'status2'},
    {value: 3, text: 'status3'},
    {value: 4, text: 'status4'}
  ]; 

  $scope.visualize =  function(user){
    console.log(user);
    $scope.selectedUser = user;
  };

  $scope.groups = [];
  $scope.loadGroups = function() {
    return $scope.groups.length ? null : $http.get('http://localhost:5001').success(function(data) {
      $scope.groups = data;
    });
  };

  $scope.showGroup = function(user) {
    if(user.group && $scope.groups.length) {
      var selected = $filter('filter')($scope.groups, {id: user.group});
      return selected.length ? selected[0].text : 'Not set';
    } else {
      return user.groupName || 'Not set';
    }
  };

  $scope.showStatus = function(user) {
    var selected = [];
    if(user.status) {
      selected = $filter('filter')($scope.statuses, {value: user.status});
    }
    return selected.length ? selected[0].text : 'Not set';
  };

  $scope.checkName = function(data, id) {
    if (id === 2 && data !== 'awesome') {
      return "Username 2 should be `awesome`";
    }
  };

  $scope.saveUser = function(data, id) {
    //$scope.user not updated yet
    angular.extend(data, {id: id});
    return $http.post('/saveUser', data);
  };

  // remove user
  $scope.removeUser = function(index) {
    $scope.users.splice(index, 1);
  };

  // add user
  $scope.addUser = function() {
    $scope.inserted = {
      id: $scope.users.length+1,
      name: '',
      status: null,
      group: null 
    };
    $scope.users.push($scope.inserted);
  };

  $scope.addImage = function() {
    //TODO edit this function
    var f = document.getElementById('imageFile').files[0],
        r = new FileReader();

    r.onloadend = function(e) {
      var data = e.target.result;
      //send your binary data via $http or $resource or do anything else with it
    }

    r.readAsBinaryString(f);
}
});