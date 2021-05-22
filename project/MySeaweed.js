import {CGFappearance, CGFobject, CGFshader} from "../lib/CGF.js";
import {MyPyramid} from "./MyPyramid.js";

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
        this.initShader();
        this.pyramind = new MyPyramid(scene);
    }

    initShader() {
        this.shader = new CGFshader(this.scene.gl, "shaders/seaweed.vert", "shaders/seaweed.frag");
        this.shader.setUniformsValues({ color : this.colour });
        this.shader.setUniformsValues({ timeFactor : 0});
        this.shader.setUniformsValues({ scale : this.scale });
    }

    initAppearance() {
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setColor(...this.colour);
    }

    display() {
        //this.scene.setActiveShader(this.shader);
        this.scene.pushMatrix();
        this.appearance.apply();
        this.scene.translate(...this.pos);
        this.scene.scale(this.scale * 0.3, this.scale, this.scale * 0.3);
        this.pyramind.display();
        this.scene.popMatrix();
        //this.scene.setActiveShader(this.scene.defaultShader);
    }

    update(t) {
        this.shader.setUniformsValues({ timeFactor : t });
    }
}