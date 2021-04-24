import {CGFobject} from '../lib/CGF.js';
import {MySphere} from "./MySphere.js";
import {MyFinTriangle, MyTailTriangle} from "./MyTriangle.js"

export class MyFish extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {number} ratio - sphere texture ratio
     * @param  {string} texture - texture path
     */
    constructor(scene, ratio, texture) {
        super(scene);
        this.ratio = ratio;
        this.texture = texture;
        this.initObjects();
    }

    initObjects() {
        this.bodySphere = new MySphere(this.scene, 16, 8);
        this.leftEye = new MySphere(this.scene, 16, 8);
        this.rightEye = new MySphere(this.scene, 16, 8);
        this.topFin = new MyTailTriangle(this.scene);
        this.tail = new MyTailTriangle(this.scene);
        this.rightFin = new MyFinTriangle(this.scene);
        this.leftFin = new MyFinTriangle(this.scene);
    }

    display() {
        // Body
        this.scene.pushMatrix();
        this.scene.scale(1.75, 1.25, 0.85);
        this.bodySphere.display();
        this.scene.popMatrix();

        //Right Eye
        this.scene.pushMatrix();
        this.scene.scale(0.25, 0.25, 0.25);
        this.scene.translate(-4, 1, 2);
        this.rightEye.display();
        this.scene.popMatrix();


        //Left Eye
        this.scene.pushMatrix();
        this.scene.scale(0.25, 0.25, 0.25);
        this.scene.translate(-4, 1, -2);
        this.rightEye.display();
        this.scene.popMatrix();


        //Top Fin
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 1.2, 0);
        this.topFin.display();
        this.scene.popMatrix();

        //Tail
        this.scene.pushMatrix();
        this.scene.translate(1.75, 0, 0);
        this.tail.display();
        this.scene.popMatrix();

        //Right Fin
        this.scene.pushMatrix();
        this.scene.translate(-0.5, -0.25, 0.75);
        this.scene.scale(0.75, 0.75, 0.75);
        this.scene.rotate(-Math.PI / 4, 1, 0, 0);
        this.rightFin.display();
        this.scene.popMatrix();

        //Left Fin
        this.scene.pushMatrix();
        this.scene.translate(-0.5, -0.25, -0.75);
        this.scene.scale(0.75, 0.75, 0.75);
        this.scene.rotate(Math.PI / 4, 1, 0, 0);
        this.leftFin.display();
        this.scene.popMatrix();
    }
}