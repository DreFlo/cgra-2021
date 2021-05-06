import {MyTailTriangle} from "./MyTailTriangle.js";

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