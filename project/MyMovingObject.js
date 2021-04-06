import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyMovingObject extends CGFobject {
    constructor(scene, angleYY, speed, x, y, z) {
        super(scene);
        this.angleYY = angleYY;
        this.speed = speed;
        this.pos = [x, y, z];

        this.startPos = [x, y, z];
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            0.5, 0, 1,   //0
            -0.5, 0, 0,  //1
            0.5, 0, -1    //2
        ];

        this.indices = [
            2, 1, 0,
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(this.angleYY, 0, 1, 0);
        this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);
        super.display();
        this.scene.popMatrix();
    }

    update() {
        this.pos[0] += this.speed;
    }

    turn(val) {
        this.angleYY += val;
    }

    accelerate(val) {
        this.speed += val;
    }

    reset() {
        this.angleYY = 0;
        this.speed = 0;
        this.pos = [this.startPos[0], this.startPos[1], this.startPos[2]];
    }
}