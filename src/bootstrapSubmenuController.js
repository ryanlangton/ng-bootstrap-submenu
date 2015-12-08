(function(){
  angular
  .module('bootstrapSubmenu')
  .controller('bootstrapSubmenuController', bootstrapSubmenuController);

  function bootstrapSubmenuController($scope, submenuTrigger){
      submenuTrigger.trigger();
          
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