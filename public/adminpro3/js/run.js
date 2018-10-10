'use strict';
angular.module('app')

.run(function ($rootScope,$state,$stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;        
    }
)

.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event,next,nextParams,fromState) {
 
    if ('data' in next && 'authorizedRoles' in next.data) {
      var authorizedRoles = next.data.authorizedRoles;
      if (!AuthService.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        $state.go($state.current, {}, {reload: true});
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      }
    }
 
    if (!AuthService.isAuthenticated()) {
      if (next.name != 'login') {
        event.preventDefault();
        $state.go('login');
      }
    }
  });
});