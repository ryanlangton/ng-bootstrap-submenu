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
})();