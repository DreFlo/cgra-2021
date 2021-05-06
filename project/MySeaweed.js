import {CGFappearance, CGFobject} from "../lib/CGF.js";

export class MySeaweed extends CGFobject {
    /**
     * @param {CGFscene} scene
     * @param {number[]} pos
     * @param {number} scale
     */
    constructor(scene, pos, scale) {
        super(scene);
        this.pos = pos;
        this.scale = scale;
        this.initAppearance();
        this.initBuffers();
    }

    initAppearance() {
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setColor(0.05, 0.7, 0.2, 1.0);
    }

    initBuffers() {
        this.vertices = [
            -1,  0, 0,
            0, 1, 0,
            1, 0, 0,

            -1,  0, 0,
            0, 1, 0,
            1, 0, 0

        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 1, 2,
            5, 4, 3
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

    display() {
        this.scene.pushMatrix();
        this.appearance.apply();
        this.scene.translate(...this.pos);
        this.scene.scale(0.1 * this.scale, 0.7 * this.scale, this.scale);
        super.display();
        this.scene.popMatrix();
    }
}