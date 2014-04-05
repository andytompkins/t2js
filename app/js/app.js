APP.main = function() {

	var scenes = [];


	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor( 0xffffff, 1 );
	document.body.appendChild(renderer.domElement);


//var sound = new Howl({
//	urls: ['assets/music/24.ogg']
//}).play();

	function loadMap(mapData) {
		var loader = new THREE.ColladaLoader();
		loader.options.convertUpAxis = true;
		loader.load('assets/models/' + mapData.model + '.dae', function(blenderObject) {
			//mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
			//mesh.position.set(0, 0, 0);
			//mesh.scale.set(20, 20, 20);
			//scene.add(mesh);
			console.log(blenderObject);
			var mesh = blenderObject.scene;
			mesh.scale.x = mesh.scale.y = mesh.scale.z = 1;
			mesh.updateMatrix();
			scene.add(mesh);
		});
	}

	function lightScene(mapData) {
		for (var i = 0; i < mapData.lights.length; i++) {
			var light = mapData.lights[i];
			var r = light.color[0],
				g = light.color[1],
				b = light.color[2];

			var lightColor = new THREE.Color();
			lightColor.setRGB(r, g, b);

			if (light.direction) {
				console.log("adding DirectionalLight");
				var lightIntensity = light.intensity;
				var x = light.direction[0],
					y = light.direction[1],
					z = light.direction[2];
				var directionalLight = new THREE.DirectionalLight(0xff0000, 1.0);
				directionalLight.position.set(x, y, z);
				scene.add(directionalLight);
			} else if (light.position) {
				console.log("found PointLight!");
				console.log("PointLight not implemented yet");
			} else {
				console.log("adding AmbientLight");

				//var ambientLight = new THREE.AmbientLight(lightColor);
				var ambientLight = new THREE.AmbientLight(0x787868);

				//scene.add(ambientLight);
			}
		}
	}

	camera.position.set(2, 2, 5);
	//camera.position.z = 5;
	var controls = new THREE.OrbitControls(camera);
	controls.addEventListener('change', render);

	//$.getJSON('assets/maps/map001.json', function(mapData) {
	//	loadMap(mapData);
	//	lightScene(mapData);
	//});

	scenes.push({
		'scene': scene,
		'camera': camera
	});

	var gui = new APP.Gui();
	scenes.unshift(gui.background(testIt));
	function testIt() {
		console.log("it tested");
		var lw = gui.loginWindow();
		lw.position.set(0, 0, 0);
		lw.scale.set(1, 1, 1);
		console.log(lw);
		//console.log(lw.scale);
		//lw.scale.set(1000, 1000, 1000);
		//= new THREE.Vector3(10, 10, 10);
		scene.add(lw);
		camera.lookAt(lw);

		var s = new THREE.Shape();
		s.moveTo(0,0);
		s.lineTo(0,2);
		s.lineTo(2,2);
		s.lineTo(2,0);
		s.lineTo(0,0);
		var rg = new THREE.ShapeGeometry(s);

		var g2 = new THREE.PlaneGeometry(2, 2);
		var t = new THREE.ImageUtils.loadTexture('assets/textures/gui/default/dialog/0.png');
		t.magFilter = THREE.NearestFilter;
		t.minFilter = THREE.NearestFilter;
		t.needsUpdate = true;
		var m = new THREE.MeshBasicMaterial({transparent: true, map: t});
		var m2 = new THREE.Mesh(rg, m);
		scene.add(m2);
	}

	function render() {
		requestAnimationFrame(render);

		//cube.rotation.x += 0.1;
		//cube.rotation.y += 0.1;

		renderer.autoClear = false;
		renderer.clear();
		for (var i = 1, upper = scenes.length; i < upper; i++) {
			renderer.render(scenes[i].scene, scenes[i].camera);
		}
		//renderer.render(scene, camera);
	}
	render();
};
APP.main();
