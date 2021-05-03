import {CGFobject, CGFshader, CGFtexture, CGFappearance} from '../lib/CGF.js';
import {MyQuad} from "./MyQuad.js";

export class MyWaterSurface extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     */
    constructor(scene){
        super(scene);

        this.square = new MyQuad(this.scene);

        this.waterTexture = new CGFtexture(this.scene, "images/pier.jpg");
        this.distortionMap = new CGFtexture(this.scene, "images/distortionmap.png");

        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(this.waterTexture);
        this.appearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.shader = new CGFshader(this.scene.gl, 'shaders/surface.vert', 'shaders/surface.frag');

        this.waterTexture.bind(0);

        this.shader.setUniformsValues({ uSampler : 0 });
        this.shader.setUniformsValues({ uSampler2 : 1 });
    }
  
    display(){
        this.scene.setActiveShader(this.shader);
        this.appearance.apply();

        this.distortionMap.bind(1);

        this.scene.pushMatrix();
        this.scene.translate(0, 10, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(50, 50, 1);
        this.square.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }

    update(t){
        this.shader.setUniformsValues({timeFactor : t / 100 % 100});
    }
}