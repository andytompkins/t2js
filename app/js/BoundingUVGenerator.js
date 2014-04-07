APP.BoundingUVGenerator = {
	generateTopUV: function( geometry, extrudedShape, extrudeOptions, indexA, indexB, indexC) {
		var ax = geometry.vertices[ indexA ].x,
			ay = geometry.vertices[ indexA ].y,

			bx = geometry.vertices[ indexB ].x,
			by = geometry.vertices[ indexB ].y,

			cx = geometry.vertices[ indexC ].x,
			cy = geometry.vertices[ indexC ].y,

			bb = extrudedShape.getBoundingBox(),
			bbx = bb.maxX - bb.minX,
			bby = bb.maxY - bb.minY;

		return [
			new THREE.Vector2( ( ax - bb.minX ) / bbx, 1 - ( ay - bb.minY ) / bby ),
			new THREE.Vector2( ( bx - bb.minX ) / bbx, 1 - ( by - bb.minY ) / bby ),
			new THREE.Vector2( ( cx - bb.minX ) / bbx, 1 - ( cy - bb.minY ) / bby )
		];
	},

	generateBottomUV: function( geometry, extrudedShape, extrudeOptions, indexA, indexB, indexC) {
		return this.generateTopUV( geometry, extrudedShape, extrudeOptions, indexA, indexB, indexC );
	},

	generateSideWallUV: function( geometry, extrudedShape, wallContour, extrudeOptions,
	                              indexA, indexB, indexC, indexD, stepIndex, stepsLength,
	                              contourIndex1, contourIndex2 ) {
		var ax = geometry.vertices[ indexA ].x,
			ay = geometry.vertices[ indexA ].y,
			az = geometry.vertices[ indexA ].z,

			bx = geometry.vertices[ indexB ].x,
			by = geometry.vertices[ indexB ].y,
			bz = geometry.vertices[ indexB ].z,

			cx = geometry.vertices[ indexC ].x,
			cy = geometry.vertices[ indexC ].y,
			cz = geometry.vertices[ indexC ].z,

			dx = geometry.vertices[ indexD ].x,
			dy = geometry.vertices[ indexD ].y,
			dz = geometry.vertices[ indexD ].z;

		var amt = extrudeOptions.amount,
			bb = extrudedShape.getBoundingBox(),
			bbx = bb.maxX - bb.minX,
			bby = bb.maxY - bb.minY;

		if ( Math.abs( ay - by ) < 0.01 ) {
			return [
				new THREE.Vector2( ax / bbx, az / amt),
				new THREE.Vector2( bx / bbx, bz / amt),
				new THREE.Vector2( cx / bbx, cz / amt),
				new THREE.Vector2( dx / bbx, dz / amt)
			];
		} else {
			return [
				new THREE.Vector2( ay / bby, az / amt ),
				new THREE.Vector2( by / bby, bz / amt ),
				new THREE.Vector2( cy / bby, cz / amt ),
				new THREE.Vector2( dy / bby, dz / amt )
			];
		}
	}
};