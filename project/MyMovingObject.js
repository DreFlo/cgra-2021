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
        this.x = x;
        this.y = y;
        this.z = z;
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
        this.scene.translate(this.x, this.y, this.z);
        super.display();
        this.scene.popMatrix();
    }

    update() {
        this.x += this.speed;
        this.y += this.speed;
        this.z += this.speed;
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
    }
}