(function(){
	angular
	.module('bootstrapSubmenu')
	.directive('bootstrapSubmenu', bootstrapSubmenu);

	function bootstrapSubmenu($compile) {
	    return {
	        restrict: 'E',
	        scope: {
	            menuItem: '=menuItem',
	            isSubMenu: '@isSubMenu'
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
})();