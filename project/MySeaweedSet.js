import {CGFobject} from "../lib/CGF.js";
import {MySeaweed} from "./MySeaweed.js";

export class MySeaweedSet extends CGFobject {
    constructor(scene, pos) {
        super(scene);
        this.seaweed = new MySeaweed(this.scene, pos, 1);
    }

    display() {
        this.displayAt([0.1, 0, 0.3]);
        this.displayAt([0.2, 0, -0.1]);
        this.displayAt([0, 0, 0.3]);
        this.displayAt([0.15, 0, 0]);

    }

    displayAt(pos) {
        this.scene.pushMatrix();
        this.scene.translate(...pos);
        this.seaweed.display();
        this.scene.pushMatrix();
    }

}