import {CGFobject, CGFshader, CGFtexture, CGFappearance} from '../lib/CGF.js';
import { MyPlane } from '../MyPlane.js';
import { MyShell } from './MyShell.js';

export class MySeaFloor extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param {int} nDivs - number of divisions in each side of the plane
   * @param {int} size - size of the side of the plane
   * @param {int} maxHeight - maximum height of the  sea floor surface
   */
  constructor(scene, nDivs, size, maxHeight) {
    super(scene);

    this.size = size;

    this.plane = new MyPlane(this.scene, nDivs, 0, 1, 0, 1);

    this.sandTexture = new CGFtexture(this.scene, "images/sand.png");
    this.sandMap = new CGFtexture(this.scene, "images/sandMap.png");

    this.sandAppearance = new CGFappearance(this.scene);
    this.sandAppearance.setTexture(this.sandTexture);
    this.sandAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.shellX = -5;
    this.shellZ = -10.5;

    this.shell = new MyShell(this.scene, 16, 16, [this.shellX, 0.8, this.shellZ]);

    //Imagem base: https://pxhere.com/en/photo/1452631
    this.shellTexture = new CGFtexture(this.scene, "images/shell3.png");

    this.shellAppearance = new CGFappearance(this.scene);
    this.shellAppearance.setColor(1.0, 1.0, 1.0, 1.0);
    this.shellAppearance.setEmission(1, 1, 1, 1);
    this.shellAppearance.setShininess(100);
    this.shellAppearance.setTexture(this.shellTexture);
    this.shellAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

    this.shader = new CGFshader(this.scene.gl, "shaders/seaFloor.vert", "shaders/seaFloor.frag");
    this.sandTexture.bind(0);

    this.shader.setUniformsValues({ uSampler : 0 });
    this.shader.setUniformsValues({ uSampler2 : 1 });
    this.shader.setUniformsValues({ uMaxHeight : maxHeight });
  }

  display(){
    this.scene.setActiveShader(this.shader);
    this.sandAppearance.apply();
    this.sandMap.bind(1);

    this.scene.pushMatrix();
    this.scene.rotate(- Math.PI / 2, 1, 0, 0);
    this.scene.scale(this.size, this.size, 1);
    this.plane.display();
    this.scene.popMatrix();

    this.scene.setActiveShader(this.scene.defaultShader);
    this.shellAppearance.apply();

    this.shell.display();
  }

  getShellX(){
    return this.shellX;
  }

  getShellZ(){
    return this.shellZ;
  }
}