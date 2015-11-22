(function(){
  angular
  .module('bootstrapSubmenu')
  .controller('bootstrapSubmenuController', bootstrapSubmenuController);

  function bootstrapSubmenuController($scope, $timeout){
      $timeout(function(){
        $('[data-submenu]').submenupicker();    
      }, 100);
          
      $scope.getDropdownClass = function(){
        if  (!$scope.hasChildren()) return '';
        return $scope.isSubMenu ? 'dropdown-submenu': 'dropdown';
      };
      
      $scope.showCaret = function(){
        return (!$scope.isSubMenu && $scope.hasChildren());
      };
      
      $scope.hasChildren = function(){
        return ($scope.menuItem.children !== undefined && $scope.menuItem.children.length > 0);
      };
  }
})();