import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
            //Face frente
			-0.5,  0.5,  0.5,
            -0.5, -0.5,  0.5,
             0.5, -0.5,  0.5,
             0.5,  0.5,  0.5,

             //Face trás
             -0.5, -0.5, -0.5,
              0.5, -0.5, -0.5,
              0.5,  0.5, -0.5,
             -0.5,  0.5, -0.5,];

		//Counter-clockwise reference of vertices
		this.indices = [
			//Face Frente
            0, 1, 2,
            2, 3, 0,
            2, 1, 0,
            0, 3, 2,

            //Face trás
            7, 4, 5,
            5, 6, 7,
            5, 4, 7,
            7, 6, 5,

            //Face baixo
            4, 1, 2,
            2, 5, 4,
            2, 1, 4,
            4, 5, 2,

            //Face cima
            7, 0, 3,
            3, 6, 7,
            3, 0, 7,
            7, 6, 3,

            //Face esquerda
            7, 0, 1,
            1, 4, 7,
            1, 0, 7,
            7, 4, 1,

            //Face direita
            6, 3, 2,
            2, 5, 6,
            2, 3, 6,
            6, 5, 2
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

