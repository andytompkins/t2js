APP.Gui = function() {

	this.background = function(callback) {
		var texture = THREE.ImageUtils.loadTexture("assets/textures/gui/loadingbackground.png");
		//texture.magFilter = new THREE.NearestFilter();
		//texture.minFilter = new THREE.NearestFilter();

		var mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2, 0), new THREE.MeshBasicMaterial({
			map: texture
		}));
		mesh.material.depthTest = false;
		mesh.material.depthWrite = false;

		var scene = new THREE.Scene();
		var camera = new THREE.Camera();
		scene.add(camera);
		scene.add(mesh);

		//background color?
		// animate texture into being?

		if (callback && typeof callback == 'function') {
			window.setTimeout(callback, 500);
		}

		return {
			'scene': scene,
			'camera': camera
		};
	};

	this.loginWindow = function() {
		//return APP.WindowNodeDrawer(112, 44, 'a', 'Login');
		return APP.WindowNodeDrawer(112, 44, 'dialog', 'Login');
		//return APP.WindowNodeDrawer(1000, 1000, 'a', 'Login');
	};

};