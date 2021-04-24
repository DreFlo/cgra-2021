import {CGFobject} from '../lib/CGF.js';
/**
 * MyTailTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTailTriangle extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,
			1, 1, 0,
			1, -1, 0,

			0, 0, 0,
			1, 1, 0,
			1, -1, 0

		];

		//Counter-clockwise reference of vertices
		this.indices = [
			2, 1, 0,
			3, 4, 5
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,

			0, 0, -1,
			0, 0, -1,
			0, 0, -1
		]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

export class MyFinTriangle extends MyTailTriangle {
	constructor(scene) {
		super(scene);
	}

	display() {
		this.scene.pushMatrix();
		this.scene.translate(0, -Math.sqrt(2), 0);
		this.scene.rotate(Math.PI / 4, 0, 0, 1);
		super.display();
		this.scene.popMatrix();
	}
}