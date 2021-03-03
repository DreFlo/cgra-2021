import {CGFobject} from '../lib/CGF.js';
import {MyUnitQuad} from "./MyUnitQuad.js";

/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyQuad extends CGFobject {
	constructor(scene) {
		super(scene);
        this.square = new MyUnitQuad(scene);
	}
	
	display(){
        this.scene.pushMatrix();

        this.square.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(0, 0, -1);
        this.square.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.square.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.square.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.square.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.square.display();

        this.scene.popMatrix();
        
    }
}