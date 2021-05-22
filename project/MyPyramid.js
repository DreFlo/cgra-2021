import {CGFobject} from "../lib/CGF.js";

export class MyPyramid extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            //TOP
            0.0, 1.0,  0.0, // 0

            //SECOND LEVEL
            0.12, 0.6, 0.0, // 1
            -0.12, 0.6, 0.0,
            0.0, 0.6, 0.12,
            0.0, 0.6, -0.12,

            //FIRST LEVEL
            0.21, 0.3, 0.0, // 5
            -0.21, 0.3, 0.0,
            0.0, 0.3, 0.21,
            0.0, 0.3, -0.21,

            //BOTTOM
            0.3, 0.0,  0.0, // 9
            -0.3, 0.0,  0.0,
            0.0, 0.0,  0.3,
            0.0, 0.0, -0.3
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 3, 1,
            0, 1, 4,
            0, 4, 2,
            0, 2, 3,

            1, 5, 8,
            1, 8, 4,
            4, 8, 6,
            4, 6, 2,
            2, 6, 7,
            2, 7, 3,
            3, 7, 5,
            3, 5, 1,

            5,  9, 12,
            5 ,12,  8,
            8, 12, 10,
            8, 10,  6,
            6, 10, 11,
            6, 11,  7,
            7, 11,  9,
            7,  9,  5
        ];

        this.normals = [
            /*0, 0, 1,
            0, 0, 1,
            0, 0, 1,

            0, 0, -1,
            0, 0, -1,
            0, 0, -1*/
        ]

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}