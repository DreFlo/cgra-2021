import {MyMovingObject} from "./MyMovingObject.js";
import {MyFish} from "./MyFish.js";

export class MyMovingFish extends MyMovingObject {
    constructor(scene, angleYY, speed, pos, color, texturePath) {
        super(scene, angleYY, speed, pos[0], pos[1], pos[2]);
        this.fish = new MyFish(this.scene, 0.2, texturePath, color, [0, 0, 0]);
        this.rightTurn = false;
        this.leftTurn = false;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
        this.scene.translate(...this.pos);
        this.scene.rotate(this.angleYY, 0, 1, 0);

        this.fish.display();

        this.scene.popMatrix();
    }

    update(t) {
        super.update();
        this.fish.tailAngle = Math.sin(t * Math.max(Math.abs(this.speed), 0.1)) * ((20 * Math.PI) / 180);
        if (!this.leftTurn) this.fish.righFinAngle = Math.sin(t / 2) * ((10 * Math.PI) / 180);
        if (!this.rightTurn) this.fish.leftFinAngle = - Math.sin(t / 2) * ((10 * Math.PI) / 180);
    }

    elevate(val) {
        // idk about values
        if (this.pos[1] >= 3) return;
        else this.pos[1] += val;
    }

    lower(val) {
        // idk about values
        if (this.pos[1] <= 0.5) return;
        else this.pos[1] -= val;
    }


    turn(val) {
        super.turn(val);
        this.leftTurn = val > 0;
        this.rightTurn = val < 0
    }
}