'use strict';

APP.CardMaker = function(options) {
	if (!options) { return new THREE.Geometry(); }

	var left = options.frame.x,
		  right = options.frame.y,
		  bottom = options.frame.z,
		  top = options.frame.w;
	var llPos = new THREE.Vector3(left, 0.0, bottom);
	var lrPos = new THREE.Vector3(right, 0.0, bottom);
	var urPos = new THREE.Vector3(right, 0.0, top);
	var ulPos = new THREE.Vector3(left, 0.0, top);

	var r = new THREE.Shape();
	//console.log(this.llPos);
	//console.log(this.lrPos);
	//console.log(this.urPos);
	//console.log(this.ulPos);
	r.moveTo(llPos.x, llPos.z);
	r.lineTo(ulPos.x, ulPos.z);
	r.lineTo(urPos.x, urPos.z);
	r.lineTo(lrPos.x, lrPos.z);
	r.lineTo(llPos.x, llPos.z);

	var params = {
		UVGenerator: APP.BoundingUVGenerator
	};
	var geom = new THREE.ShapeGeometry(r, params);
/*
	for (var i = 0; i < geom.faceVertexUvs[0].length; i++ ) {

		var uvs = geom.faceVertexUvs[0][i];

		for (var j = 0; j < uvs.length; j++) {

			//uvs[j].x *= -1;
			uvs[j].y *= -1;

		}
	}
	*/
	//geom.doubleSided = true;
	//geom.scale.y = -1;
	//for (var i = 0; i < geom.faces.length; i++) {
	//	var a = geom.faces[i][2], b = geom.faces[i][1], c = geom.faces[i][0];
	//	var v1 =
	//}
	return geom;

};



/*
 this.name = name;

 this.hasUvs = true;
 this.has3dUvs = false;
 this.ulTex = new THREE.Vector3(0.0, 0.0, 0.0);
 this.llTex = new THREE.Vector3(0.0, 0.0, 0.0);
 this.lrTex = new THREE.Vector3(0.0, 0.0, 0.0);
 this.urTex = new THREE.Vector3(0.0, 0.0, 0.0);
 this.ulPos = new THREE.Vector3(0.0, 0.0, 0.0);
 this.llPos = new THREE.Vector3(0.0, 0.0, 0.0);
 this.lrPos = new THREE.Vector3(0.0, 0.0, 0.0);
 this.urPos = new THREE.Vector3(0.0, 0.0, 0.0);
 this.hasColor = false;
 this.color = new THREE.Vector4(0.0, 0.0, 0.0, 0.0);
 this.hasNormals = true;
 this.sourceGeometry = null;
 this.sourceFrame = new THREE.Vector4(0.0, 0.0, 0.0, 0.0);

 function init() {
 that.reset();
 }

 this.reset = function() {
 this.setFrameByFloat(0.0, 1.0, 0.0, 1.0);
 this.setUvRange(new THREE.Vector2(0.0, 0.0), new THREE.Vector2(1.0, 1.0));

 this.hasColor = false;
 this.color = new THREE.Vector4(0.0, 0.0, 0.0, 0.0);

 this.hasNormals = true;
 this.sourceGeometry = null;
 this.sourceFrame.set(0.0, 0.0, 0.0, 0.0);
 };

 this.setUvRangeByVector3 = function(ll, lr, ur, ul) {
 this.llTex = ll;
 this.lrTex = lr;
 this.urTex = ur;
 this.ulTex = ul;
 this.hasUvs = true;
 this.has3dUvs = true;
 };

 this.setUvRangeByVector2 = function(ll, lr, ur, ul) {
 this.llTex.set(ll.x, ll.y, 0.0);
 this.lrTex.set(lr.x, lr.y, 0.0);
 this.urTex.set(ur.x, ur.y, 0.0);
 this.ulTex.set(ul.x, ul.y, 0.0);
 this.hasUvs = true;
 this.has3dUvs = false;
 };

 this.setUvRange = function(ll, ur) {
 this.llTex.set(ll.x, ll.y, 0.0);
 this.lrTex.set(ur.x, ll.y, 0.0);
 this.urTex.set(ur.x, ur.y, 0.0);
 this.ulTex.set(ll.x, ur.y, 0.0);
 this.hasUvs = true;
 this.has3dUvs = false;
 };

 this.setUvRangeByVector4 = function(x, y, z) {
 this.llTex.set(x.x, y.x, z.x);
 this.lrTex.set(x.y, y.y, z.y);
 this.urTex.set(x.z, y.z, z.z);
 this.ulTex.set(x.w, y.w, z.w);
 this.hasUvs = true;
 this.has3dUvs = true;
 };

 //this.setUvRangeByTexture = function() {
 //
 //};

 this.setUvRangeCube = function(face) {
 var varya = new THREE.Vector4(-1, 1, 1, -1);
 var varyb = new THREE.Vector4(-1, -1, 1, 1);
 var fixed = new THREE.Vector4(1, 1, 1, 1);
 switch (face) {
 case 0: this.setUvRangeByVector4(fixed,             varyb.negate(),     varya.negate()  ); break;
 case 1: this.setUvRangeByVector4(fixed.negate(),    varyb.negate(),     varya           ); break;
 case 2: this.setUvRangeByVector4(varya,             fixed,              varyb           ); break;
 case 3: this.setUvRangeByVector4(varya,             fixed.negate(),     varyb.negate()  ); break;
 case 4: this.setUvRangeByVector4(varya,             varyb.negate(),     fixed           ); break;
 case 5: this.setUvRangeByVector4(varya.negate(),    varyb.negate(),     fixed.negate()  ); break;
 }
 };

 this.setHasUvs = function(hasUvs) {
 this.hasUvs = hasUvs;
 };

 this.setHas3dUvs = function(has3dUvs) {
 this.has3dUvs = has3dUvs;
 };

 this.setFrameByFloat = function(left, right, bottom, top) {
 this.llPos = new THREE.Vector3(left, 0.0, bottom);
 this.lrPos = new THREE.Vector3(right, 0.0, bottom);
 this.urPos = new THREE.Vector3(right, 0.0, top);
 this.ulPos = new THREE.Vector3(left, 0.0, top);
 };

 this.setFrameByVector4 = function(frame) {
 //console.log("setFrameByVector4");
 this.setFrameByFloat(frame.x, frame.y, frame.z, frame.w);
 };

 this.setFrame = function(ll, lr, ur, ul) {
 //console.log("setFrame");
 //console.log(ll);
 this.llPos = ll;
 this.lrPos = lr;
 this.urPos = ur;
 this.ulPos = ul;
 };

 this.setFrameFullScreenQuad = function() {

 };

 this.setColorRGB = function(r, g, b, a) {
 this.setColor(new THREE.Vector4(r, g, b, a));
 };

 this.setColor = function(color) {
 this.color = color;
 this.hasColor = true;
 };

 this.setHasNormals = function(hasNormals) {
 this.hasNormals = hasNormals;
 };

 this.setSourceGeometry = function(node, frame) {
 this.sourceGeometry = node;
 this.sourceFrame = frame;
 };

 this.clearSourceGeometry = function() {
 this.sourceGeometry = null;
 };

 this.gen2 = function() {
 var r = new THREE.Shape();
 //console.log(this.llPos);
 //console.log(this.lrPos);
 //console.log(this.urPos);
 //console.log(this.ulPos);
 r.moveTo(this.llPos.x, this.llPos.z);
 r.lineTo(this.ulPos.x, this.ulPos.z);
 r.lineTo(this.urPos.x, this.urPos.z);
 r.lineTo(this.lrPos.x, this.lrPos.z);
 r.lineTo(this.llPos.x, this.llPos.z);

 var geom = new THREE.ShapeGeometry(r);
 //for (var i = 0; i < geom.faces.length; i++) {
 //	var a = geom.faces[i][2], b = geom.faces[i][1], c = geom.faces[i][0];
 //	var v1 =
 //}
 var g2 = new THREE.CubeGeometry(2, 2, 2);
 return geom;
 };
 // generate
 this.generate = function() {
 if (this.sourceGeometry) {
 return this.rescaleSourceGeometry();
 }

 var geom = new THREE.Geometry();
 geom.name = this.name;

 console.log(this.ulPos);
 geom.vertices.push(this.ulPos);
 geom.vertices.push(this.llPos);
 geom.vertices.push(this.urPos);
 geom.vertices.push(this.lrPos);

 if (this.hasUvs) {
 geom.faceVertexUvs.push(this.ulTex);
 geom.faceVertexUvs.push(this.llTex);
 geom.faceVertexUvs.push(this.urTex);
 geom.faceVertexUvs.push(this.lrTex);
 }

 if (this.hasNormals) {
 geom.computeFaceNormals();
 geom.computeVertexNormals();
 }

 return geom;


 };

 // rescale_source_geometry
 this.rescaleSourceGeometry = function() {

 };


 init();
 */