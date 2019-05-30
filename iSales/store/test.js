var getRouts = function() {
	var routs = [];
  var fn = function(menus) {
		menus.forEach((menu) => {
      debugger
			var rout = {
				path: menu.url, 
				name: menu.name,
				children: []
			};
			rout.children = fn(menu.subMenus)
			routs.push(rout)
      console.log(rout)
		});
    return routs;
	}
  return fn
};