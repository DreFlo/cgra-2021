import {CGFappearance, CGFobject, CGFshader} from "../lib/CGF.js";
import {MyPyramid} from "./MyPyramid.js";

export class MySeaweed extends CGFobject {
    /**
     * @param {CGFscene} scene
     * @param {number[]} pos
     * @param {number} scale
     * @param colour
     */
    constructor(scene, pos, scale, colour) {
        super(scene);
        this.pos = pos;
        this.scale = scale;
        this.colour = colour;
        this.initAppearance();
        this.pyramind = new MyPyramid(scene);
    }

    initAppearance() {
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setColor(...this.colour);
    }

    display() {
        this.scene.activeShader.setUniformsValues({ color : this.colour });
        this.scene.pushMatrix();
        this.appearance.apply();
        this.scene.translate(...this.pos);
        this.scene.scale(this.scale * 0.3, this.scale, this.scale * 0.3);
        this.pyramind.display();
        this.scene.popMatrix();
    }
}