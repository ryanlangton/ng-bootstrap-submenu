(function(){
	angular.module('bootstrapSubmenu', []);
})();
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
  bootstrapSubmenuController.$inject = ["$scope", "submenuTrigger"];
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
	bootstrapSubmenu.$inject = ["$compile"];
})();
(function(){
  angular
  .module('bootstrapSubmenu')
  .factory('submenuTrigger', submenuTrigger);

  function submenuTrigger($timeout){
	  var triggered = false; 
	  
	  return {
		  trigger: function(){
			  if (triggered) return;
			  
			  // after angularjs digest, trigger submenupicker
			  $timeout(function(){
				  $('[data-submenu]').submenupicker();    
			  }, 100);
		  }
	  };
  }
  submenuTrigger.$inject = ["$timeout"];
})();
angular.module("bootstrapSubmenu").run(["$templateCache", function($templateCache) {$templateCache.put("bootstrapSubmenu.html","<li ng-class=\"getDropdownClass()\">\r\n  <a ng-if=\"!hasChildren()\" tabindex=\"0\" ng-href=\"{{menuItem.href}}\">{{menuItem.display}}</a>\r\n  <a ng-if=\"hasChildren()\" tabindex=\"0\" ng-attr-data-toggle=\"{{ showCaret() ? \'dropdown\' : undefined }}\" ng-attr-data-submenu=\"{{ showCaret() ? \'\' : undefined }}\">\r\n     {{menuItem.display}}<span ng-if=\"showCaret()\" class=\"caret\"></span>\r\n   </a>\r\n  <ul ng-if=\"hasChildren()\" class=\"dropdown-menu\">\r\n    <bootstrap-submenu ng-repeat=\"child in menuItem.children\" menu-item=\"child\" is-sub-menu=\"true\">\r\n    </bootstrap-submenu>\r\n  </ul>\r\n</li>");}]);
/*!
 * Bootstrap-submenu v2.0.1 (http://vsn4ik.github.io/bootstrap-submenu)
 * Copyright 2015 Vasily A. (https://github.com/vsn4ik)
 * Licensed under the MIT license
 */

/**
 * $.inArray: friends with IE8. Use Array.prototype.indexOf in future.
 * $.proxy: friends with IE8. Use Function.prototype.bind in future.
 */

'use strict';

(function(factory) {
  if (typeof define == 'function' && define.amd) {
    // AMD. Register as an anonymous module
    define(['jquery'], factory);
  }
  else if (typeof exports == 'object') {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  }
  else {
    // Browser globals
    factory(jQuery);
  }
})(function($) {
  function Item(element) {
    this.$element = $(element);
    this.$menu = this.$element.closest('.dropdown-menu');
    this.$main = this.$menu.parent();
    this.$items = this.$menu.children('.dropdown-submenu');

    this.init();
  }

  Item.prototype = {
    init: function() {
      this.$element.on('keydown', $.proxy(this, 'keydown'));
    },
    close: function() {
      this.$main.removeClass('open');
      this.$items.trigger('hide.bs.submenu');
    },
    keydown: function(event) {
      // 27: Esc

      if (event.keyCode == 27) {
        event.stopPropagation();

        this.close();
        this.$main.children('a, button').trigger('focus');
      }
    }
  };

  function SubmenuItem(element) {
    this.$element = $(element);
    this.$main = this.$element.parent();
    this.$menu = this.$main.children('.dropdown-menu');
    this.$subs = this.$main.siblings('.dropdown-submenu');
    this.$items = this.$menu.children('.dropdown-submenu');

    this.init();
  }

  $.extend(SubmenuItem.prototype, Item.prototype, {
    init: function() {
      this.$element.on({
        click: $.proxy(this, 'click'),
        keydown: $.proxy(this, 'keydown')
      });

      this.$main.on('hide.bs.submenu', $.proxy(this, 'hide'));
    },
    click: function(event) {
      event.stopPropagation();

      this.toggle();
    },
    hide: function(event) {
      // Stop event bubbling
      event.stopPropagation();

      this.close();
    },
    open: function() {
      this.$main.addClass('open');
      this.$subs.trigger('hide.bs.submenu');
    },
    toggle: function() {
      if (this.$main.hasClass('open')) {
        this.close();
      }
      else {
        this.open();
      }
    },
    keydown: function(event) {
      // 13: Return, 32: Spacebar

      if (event.keyCode == 32) {
        // Off vertical scrolling
        event.preventDefault();
      }

      if ($.inArray(event.keyCode, [13, 32]) != -1) {
        this.toggle();
      }
    }
  });

  function Submenupicker(element) {
    this.$element = $(element);
    this.$main = this.$element.parent();
    this.$menu = this.$main.children('.dropdown-menu');
    this.$items = this.$menu.children('.dropdown-submenu');

    this.init();
  }

  Submenupicker.prototype = {
    init: function() {
      this.$menu.off('keydown.bs.dropdown.data-api');
      this.$menu.on('keydown', $.proxy(this, 'itemKeydown'));

      this.$menu.find('li > a').each(function() {
        new Item(this);
      });

      this.$menu.find('.dropdown-submenu > a').each(function() {
        new SubmenuItem(this);
      });

      this.$main.on('hidden.bs.dropdown', $.proxy(this, 'hidden'));
    },
    hidden: function() {
      this.$items.trigger('hide.bs.submenu');
    },
    itemKeydown: function(event) {
      // 38: Arrow up, 40: Arrow down

      if ($.inArray(event.keyCode, [38, 40]) != -1) {
        // Off vertical scrolling
        event.preventDefault();

        event.stopPropagation();

        var $items = this.$menu.find('li:not(.disabled):visible > a');
        var index = $items.index(event.target);

        if (event.keyCode == 38 && index !== 0) {
          index--;
        }
        else if (event.keyCode == 40 && index !== $items.length - 1) {
          index++;
        }
        else {
          return;
        }

        $items.eq(index).trigger('focus');
      }
    }
  };

  // For AMD/Node/CommonJS used elements (optional)
  // http://learn.jquery.com/jquery-ui/environments/amd/
  return $.fn.submenupicker = function(elements) {
    var $elements = this instanceof $ ? this : $(elements);

    return $elements.each(function() {
      var data = $.data(this, 'bs.submenu');

      if (!data) {
        data = new Submenupicker(this);

        $.data(this, 'bs.submenu', data);
      }
    });
  };
});
