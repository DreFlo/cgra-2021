import {CGFappearance, CGFobject, CGFshader, CGFtexture} from '../lib/CGF.js';
import {MySphere} from "./MySphere.js";
import {MyFinTriangle, MyTailTriangle} from "./MyTriangle.js"
import {MyMovingObject} from "./MyMovingObject.js";

export class MyFish extends MyMovingObject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {number} ratio - sphere texture ratio
     * @param  {string} texture - texture path
     * @param  {Array} colour - colour for fish body
     */
    constructor(scene, ratio, texture, colour) {
        super(scene, 0, 0, 0, 3, 0);
        this.ratio = ratio;
        this.texture = texture;
        this.colour = colour;
        this.timeFactor = 1;
        this.initObjects();
        this.initAppearances(texture);
        this.initShaders();
    }

    initObjects() {
        this.bodySphere = new MySphere(this.scene, 16, 8);
        this.eye = new MySphere(this.scene, 16, 8);
        this.topFin = new MyTailTriangle(this.scene);
        this.tail = new MyTailTriangle(this.scene);
        this.rightFin = new MyFinTriangle(this.scene);
        this.leftFin = new MyFinTriangle(this.scene);
    }

    initAppearances(texture) {
        this.eyeAppearance = new CGFappearance(this.scene);
        this.eyeAppearance.setDiffuse(1, 1, 1, 1);
        this.eyeAppearance.loadTexture("images/eye.jpg");
        this.eyeAppearance.setAmbient(1, 1, 1, 1);
        this.eyeAppearance.setShininess(1000);
        this.eyeAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.appearance = new CGFappearance(this.scene);
        this.appearance.setDiffuse(this.colour[0], this.colour[1], this.colour[2], 1);
        this.appearance.setAmbient(this.colour[0], this.colour[1], this.colour[2], 1);
        this.appearance.loadTexture(texture);
        this.appearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }

    initShaders() {
        this.eyeShader = new CGFshader(this.scene.gl, "shaders/eye.vert", "shaders/eye.frag");

        this.bodyShader = new CGFshader(this.scene.gl, "shaders/body.vert", "shaders/body.frag");
        this.bodyShader.setUniformsValues({ ratio: this.ratio});
        this.bodyShader.setUniformsValues({ bodyColour : this.colour})
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);
        this.scene.rotate(this.angleYY, 0, 1, 0);

        this.scene.scale(0.285/2, 0.285/2, 0.285/2);

        this.appearance.apply();

        //Top Fin
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 1.2, 0);
        this.topFin.display();
        this.scene.popMatrix();

        //Tail
        this.scene.pushMatrix();
        this.scene.translate(1.75, 0, 0);
        this.scene.rotate(this.tailAngle, 0, 1, 0);
        this.tail.display();
        this.scene.popMatrix();

        //Right Fin
        this.scene.pushMatrix();
        this.scene.translate(-0.5, -0.25, 0.75);
        this.scene.scale(0.75, 0.75, 0.75);
        this.scene.rotate(-Math.PI / 4, 1, 0, 0);
        this.scene.rotate(this.sideFinAngle, 1, 0, 0);
        this.rightFin.display();
        this.scene.popMatrix();

        //Left Fin
        this.scene.pushMatrix();
        this.scene.translate(-0.5, -0.25, -0.75);
        this.scene.scale(0.75, 0.75, 0.75);
        this.scene.rotate(Math.PI / 4, 1, 0, 0);
        this.scene.rotate(-this.sideFinAngle, 1, 0, 0);
        this.leftFin.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.bodyShader);

        // Body
        this.scene.pushMatrix();
        this.scene.scale(1.75, 1.25, 0.85);
        this.bodySphere.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);

        

        this.eyeAppearance.apply();
        this.scene.setActiveShader(this.eyeShader);

        //Right Eye
        this.scene.pushMatrix();
        this.scene.scale(0.25, 0.25, 0.25);
        this.scene.translate(-4, 1, 2);
        this.scene.rotate(-Math.PI / 6, 0, 1, 0);
        this.eye.display();
        this.scene.popMatrix();


        //Left Eye
        this.scene.pushMatrix();
        this.scene.scale(0.25, 0.25, 0.25);
        this.scene.translate(-4, 1, -2);
        this.scene.rotate(Math.PI / 6, 0, 1, 0);
        this.eye.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

        this.scene.defaultAppearance.apply();
    }

    update(t){
        super.update();
        this.tailAngle = Math.sin(t) * ((20 * Math.PI) / 180);
        this.sideFinAngle = Math.sin(t / 2) * ((10 * Math.PI) / 180)
    }
}