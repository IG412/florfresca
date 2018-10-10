angular.module('app')
.factory('myModal', function (btfModal) {
  return btfModal({
    controller: 'MyModalCtrl',
    controllerAs: 'modal',
    templateUrl: 'tpl/modal.html'
  });
})