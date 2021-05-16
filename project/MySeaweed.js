import {CGFappearance, CGFobject} from "../lib/CGF.js";

export class MySeaweed extends CGFobject {
    /**
     * @param {CGFscene} scene
     * @param {number[]} pos
     * @param {number} scale
     */
    constructor(scene, pos, scale, colour) {
        super(scene);
        this.pos = pos;
        this.scale = scale;
        this.colour = colour;
        this.initAppearance();
        this.initBuffers();
    }

    initAppearance() {
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setColor(...this.colour);
    }

    initBuffers() {
        this.vertices = [
             0.0, 1.0,  0.0,
             0.3, 0.0,  0.0,
            -0.3, 0.0,  0.0,
             0.0, 0.0,  0.3,
             0.0, 0.0, -0.3
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 3, 1,
            0, 1, 4,
            0, 4, 2,
            0, 2, 3
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

    display() {
        this.scene.pushMatrix();
        this.appearance.apply();
        this.scene.translate(...this.pos);
        this.scene.scale(this.scale * 0.3, this.scale, this.scale * 0.3);
        super.display();
        this.scene.popMatrix();
    }
}