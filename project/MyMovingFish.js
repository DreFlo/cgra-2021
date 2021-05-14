import {MyMovingObject} from "./MyMovingObject.js";
import {MyFish} from "./MyFish.js";

export class MyMovingFish extends MyMovingObject {
    constructor(scene, angleYY, speed, pos, color, texturePath) {
        super(scene, angleYY, speed, pos[0], pos[1], pos[2]);
        this.fish = new MyFish(this.scene, 0.2, texturePath, color, [0, 0, 0]);
        this.rightTurn = false;
        this.leftTurn = false;
        this.atBottom = false;
        this.rock = null;
        this.goingUp = false;
        this.goingDown = false;
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
        if (this.goingUp){
            if (this.pos[1] < 5) this.pos[1] += 0.1;
            else this.goingUp = false;
        }
        else if(this.goingDown){
            if (this.pos[1] > 1) this.pos[1] -= 0.1;
            else this.goingDown = false;
        }
        if (this.rock !== null) {
            this.rockPositionUpdate();
        }
    }

    elevate() {
        if(!this.goingDown) this.goingUp = true;
    }

    lower() {
        if(!this.goingUp) this.goingDown = true;
    }


    turn(val) {
        super.turn(val);
        this.leftTurn = val > 0;
        this.rightTurn = val < 0
    }

    capture() {
        if (this.rock !== null) return;
        for (let i = 0; i < this.scene.rocks.nRocks; i++) {
            if (this.distance(this.pos, this.scene.rocks.rockSet[i].pos) < 1.5 && !this.scene.rocks.rockSet[i].inShell && this.pos[1] <= 1) {
                this.rock = this.scene.rocks.rockSet[i];
                this.rockPositionUpdate();
                return;
            }
        }
    }

    release() {
        if (this.rock !== null) {
            if ((this.distance(this.pos, this.scene.seaFloor.shell.pos) < this.scene.seaFloor.shell.radius) && (this.pos[1] <= 1))
                 this.scene.seaFloor.shell.addRock(this.rock);
            else this.rock.resetPos();
            this.rock = null;
        }
    }

    distance(pos1, pos2) {
        return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2) + Math.pow(pos1[2] - pos2[2], 2));
    }

    rockPositionUpdate() {
        this.rock.pos =  [this.pos[0] - 0.4 * Math.cos(this.angleYY), this.pos[1], this.pos[2] + 0.4 * Math.sin(this.angleYY)];
    }

    reset() {
        super.reset();
        this.rock.resetPos();
        this.rock = null;
    }
}