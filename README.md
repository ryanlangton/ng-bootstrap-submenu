# ng-bootstrap-submenu

Demo: <a href="http://plnkr.co/edit/gHzV9d?p=info">plnkr</a>

To use, download the js and css from the dist folder.

* ng-bootstrap-submenu.min.css
* ng-bootstrap-submenu.min.js

Add the bootstrapSubmenu module dependency.

	angular.module('myApp', ['bootstrapSubmenu']);

Use the <bootstrapSubmenu> directive (with ng-repeat if you have multiple dropdowns).  You must supply a json object
	to the 'items' attribute.  The supplied object needs to have the following properties:
	
* href = the link for the item (only necessary for items with no children).
* display = the text displayed for the item.
* children = an array of sub-items (may be empty).

	<nav class="navbar navbar-default">
		<div class="navbar-header">
		  <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-collapse">
			<span class="sr-only">Toggle navigation</span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
		  </button>

		  <a class="navbar-brand">ng-bootstrap-submenu</a>
		</div>

		<div class="collapse navbar-collapse">
		  <ul class="nav navbar-nav">
			<bootstrap-submenu ng-repeat="item in menuItems" menu-item="item">
			</bootstrap-submenu>
		  </ul>
		</div>
	</nav>
	
	angular.module('myApp', ['bootstrapSubmenu']);

	angular
	.module('myApp')
	.controller('menuController', function($scope){
	 	$scope.menuItems = [
	   { display: 'Dropdown Item 1', href: '#', children: [
		 { display: 'Child 1', href: '#', children: [
		   { display: 'Sub 1', href: '#sub1', children: []},
		   { display: 'Sub 2', href: '#sub2', children: []}
		   ]},
		 { display: 'Child 2', href: '#child2', children: []}
		 ]},
	   { display: 'Dropdown Item 2', href: '#dropdown2', children: []},
	   { display: 'Dropdown Item 3', href: '#', children: [
		 { display: 'Child 3', href: '#child3', children: []}
		 ]}
	   ];
	});