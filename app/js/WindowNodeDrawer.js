APP.WindowNodeDrawer = function(width, height, style, title) {
	var v = 1.0/120.0;
	//var v = 1;
	var scale = 2*12.0/240.0;

	// font!?

	var w = parseFloat(width);
	var h = parseFloat(height);

	var obj = new THREE.Mesh();

	var frames = [
		new THREE.Vector4( -v*(w/2   ), -v*(w/2-16),  v*(h/2-16),  v*(h/2   )), // 0
		new THREE.Vector4( -v*(w/2-16),  v*(w/2-16),  v*(h/2-16),  v*(h/2   )), // 1
		new THREE.Vector4(  v*(w/2-16),  v*(w/2   ),  v*(h/2-16),  v*(h/2   )), // 2
		new THREE.Vector4( -v*(w/2   ), -v*(w/2-16), -v*(h/2-16),  v*(h/2-16)), // 3
		new THREE.Vector4( -v*(w/2- 2),  v*(w/2- 2), -v*(h/2- 2),  v*(h/2- 2)), // 4
		new THREE.Vector4(  v*(w/2-16),  v*(w/2   ), -v*(h/2-16),  v*(h/2-16)), // 5
		new THREE.Vector4( -v*(w/2   ), -v*(w/2-16), -v*(h/2   ), -v*(h/2-16)), // 6
		new THREE.Vector4( -v*(w/2-16),  v*(w/2-16), -v*(h/2   ), -v*(h/2-16)), // 7
		new THREE.Vector4(  v*(w/2-16),  v*(w/2   ), -v*(h/2   ), -v*(h/2-16))  // 8
	];

	var order = [ 4, 0, 1, 2, 3, 5, 6, 7, 8 ];

	for (var i = 0, upper = order.length; i < upper; i++) {
		if (i==0) continue;
		var index = order[i];

		var cm = new THREE.CardMaker('card' + index);
		cm.setFrameByVector4(frames[index]);

		var geom = cm.gen2();
		console.log(geom);

		var texture = new THREE.ImageUtils.loadTexture('assets/textures/gui/default/' + style + '/' + index + '.png');
		texture.premultiplyAlpha = true;
		texture.magFilter = THREE.NearestFilter;
		texture.minFilter = THREE.NearestFilter;
		//if (index == 4) {
		//	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		//}

		texture.needsUpdate = true;

		var material = null;
		var mesh = null;

		if (index == 4) {
			texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
			texture.needsUpdate = true;

			material = new THREE.MeshBasicMaterial({
				map: texture
				//depthWrite: false
			});
			material.needsUpdate = true;

			mesh = new THREE.Mesh(geom, material);

		} else {

			material = new THREE.MeshBasicMaterial({
				//color: 0x0000ff,

				//alphaTest: 1.0,
				//opacity: 0.8,
				//depthWrite: false,
				map: texture
			});
			material.transparent = true;
			material.blending = THREE.CustomBlending;
			material.blendSrc = THREE.SrcAlphaFactor;
			material.blendDst = THREE.SrcColorFactor;
			material.blendEquation = THREE.AddEquation;
			material.needsUpdate = true;
			//material.depthWrite = false;
			//material.alpha = true;

			var materials = [];
			materials.push(material);

			materials.push(new THREE.MeshBasicMaterial({
				color: 0xff0000,
				//depthWrite: false,
				wireframe: true,
				transparent: true
			}));

			console.log(material);
			console.log("making mesh");
			//var geo1 = new THREE.PlaneGeometry( 100, 100 );
			//mesh = THREE.SceneUtils.createMultiMaterialObject(geom, materials);
			//var g2 = new THREE.CubeGeometry(2, 2, 0);
			mesh = new THREE.Mesh(geom, material);
		}

		console.log("setting mesh pos");
		mesh.position.set(0, 10, 0);
		//mesh.position.x = 0;
		//mesh.position.y = 10;
		//mesh.position.z = 0;
		mesh.matrixAutoUpdate = false;
		mesh.updateMatrix();

		console.log(mesh);
		//return mesh;
		obj.add(mesh);

	}

	if (title) {

	}

	return obj;
};

/*

 if (index == 4) {
 // need orig img size from texture
 //console.log("tex img: " + material.map.image);
 //console.log("w=" + material.map.image.width + " and h=" + material.map.image.height);
 //cm.setUvRange(new THREE.Vector2(0, 0), new THREE.Vector2(w/material.map.image.width, h/material.map.image.height) );
 }
 //var geom = cm.generate();


 //var g2 = new THREE.CubeGeometry(2, 2, 2);
 //console.log(g2);
 //var mesh = new THREE.Mesh(geom, material);





 //var mesh = new THREE.Mesh(new THREE.CubeGeometry(80, 80, 80), material);

 //if (w % 2) {
 //	mesh.position.x = -v * 0.5;
 //}
 //if (h % 2) {
 //	mesh.position.z = v * 0.5;
 //}

*/


// load texture into a material
/*
 var uniforms = {
 color: { type: 'c', value: new THREE.Color(0xffffff) },
 texture: { type: 't', value: texture }
 };
 var attributes = {};
 var material = new THREE.ShaderMaterial({
 attributes: attributes,
 uniforms: uniforms,
 vertexShader: document.getElementById('vertex_shader').textContent,
 fragmentShader: document.getElementById('fragment_shader').textContent
 });
 */
//var texture = THREE.ImageUtils.loadTexture('assets/textures/gui/default/' + style + '/' + order[i] + '.png', {}, (function(index) {
//
//	// material?
//	var material = new THREE.MeshBasicMaterial();
//	material.map = texture;
//	// mesh?
//
//}(order[i])));