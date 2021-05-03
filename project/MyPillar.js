import {CGFobject, CGFshader, CGFtexture, CGFappearance} from '../lib/CGF.js';
import { MyCilinder } from './MyCilinder.js';

export class MyPillar extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   */
  constructor(scene) {
    super(scene);

    this.pillar = new MyCilinder(this.scene, 16);

    //Image: https://pxhere.com/en/photo/110263
    this.pillarTexture = new CGFtexture(this.scene, "images/bark.jpg");

    this.appearance = new CGFappearance(this.scene);
    this.appearance.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.appearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.appearance.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.appearance.setEmission(0, 0, 0, 1);
    this.appearance.setShininess(120);
    this.appearance.setTexture(this.pillarTexture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
  }

  display(){
    this.appearance.apply();

    this.scene.pushMatrix();
    this.scene.scale(0.5, 11, 0.5);
    this.pillar.display();
    this.scene.popMatrix();
  }
        
}