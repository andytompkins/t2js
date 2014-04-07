APP.main = function() {

	var scenes = [];


	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor( 0xffffff, 1 );
	document.body.appendChild(renderer.domElement);


	var cssScene = new THREE.Scene();
	var cssRenderer = new THREE.CSS3DRenderer();
	cssRenderer.setSize(window.innerWidth, window.innerHeight);
	cssRenderer.domElement.style.position = 'absolute';
	cssRenderer.domElement.style.top = 0;
	document.body.appendChild(cssRenderer.domElement);

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

	camera.position.set(0, 0, 40);
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
		lw.scale.set(0.001, 0.001, 1);
		console.log(lw);
		//scene.add(lw);
		//camera.lookAt(lw);
		var sx = { x: 0.001, y: 0.001 };
		var sxt = { x: 1, y: 1 };
		var tween = new TWEEN.Tween(sx).to(sxt, 200);
		tween.easing(TWEEN.Easing.Linear.None);
		tween.onUpdate(function() {
			lw.scale.x = sx.x;
			lw.scale.y = sx.y;
		});
		tween.start();


	}

	function render() {
		requestAnimationFrame(render);

		//cube.rotation.x += 0.1;
		//cube.rotation.y += 0.1;

		renderer.autoClear = false;
		renderer.clear();
		for (var i = 0, upper = scenes.length; i < upper; i++) {
			renderer.render(scenes[i].scene, scenes[i].camera);
		}
		//renderer.render(scene, camera);
		cssRenderer.render(cssScene, camera);

		TWEEN.update();
	}
	render();
};
APP.main();
