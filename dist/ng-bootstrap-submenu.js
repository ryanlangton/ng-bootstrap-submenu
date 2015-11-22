(function(){
	angular.module('bootstrapSubmenu', []);
})();
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
  bootstrapSubmenuController.$inject = ["$scope", "$timeout"];
})();
(function(){
	angular
	.module('bootstrapSubmenu')
	.directive('bootstrapSubmenu', bootstrapSubmenu);

	function bootstrapSubmenu($compile) {
	    return {
	        restrict: 'E',
	        scope: {
	            menuItem: '=menuItem',
	            isSubMenu: '=isSubMenu'
	        },
	        replace: true,
	        templateUrl: 'bootstrapSubmenu.html',
	        controller: 'bootstrapSubmenuController',
	        compile: function (el) {
	            var contents = el.contents().remove();
	            var compiled;
	            return function(scope,el){
	                if(!compiled)
	                    compiled = $compile(contents);

	                compiled(scope,function(clone){
	                    el.append(clone);
	                });
	            };
	        }
	    };
	}
	bootstrapSubmenu.$inject = ["$compile"];
})();