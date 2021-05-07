import {CGFobject, CGFshader, CGFtexture, CGFappearance} from '../lib/CGF.js';
import { MyRock } from './MyRock.js';

export class MyRockSet extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   */
  constructor(scene) {
    super(scene);

    this.rockSet = [];

    this.nRocks = 30;

    //this.nRocks = 15; //For Picture

    this.appearance = new CGFappearance(this.scene);
    this.appearance.setAmbient(...this.hexToRgbA("#262626"));
    this.appearance.setDiffuse(...this.hexToRgbA("#262626"));
    this.appearance.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.appearance.setEmission(0, 0, 0, 1);
    this.appearance.setShininess(120);

    for(let i = 0; i < this.nRocks; i++){
        this.rockSet.push(new MyRock(this.scene, 16, 16, [Math.random() * 50 - 25, 0.5, Math.random() * 50 - 25], [0.1 + Math.random() * 0.1, 0.1 + Math.random() * 0.1, 0.1 + Math.random() * 0.1]));
    }

    /*
    //for picture
    for(var i = 0; i < this.rockSet.length; i++){
        this.translates[i] = [Math.random() * 2 - 1, 0.5, Math.random() * 2 - 1]
        this.scales[i] = [Math.random() * 2 / 10, Math.random() * 2 / 10, Math.random() * 2 / 10];
    }*/
  }

  display(){
    this.appearance.apply();
    for(let i = 0; i < this.rockSet.length; i++){
        this.rockSet[i].display();
    }
  }

  hexToRgbA(hex)
    {
        var ret;
        //either we receive a html/css color or a RGB vector
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            ret=[
                parseInt(hex.substring(1,3),16).toPrecision()/255.0,
                parseInt(hex.substring(3,5),16).toPrecision()/255.0,
                parseInt(hex.substring(5,7),16).toPrecision()/255.0,
                1.0
            ];
        }
        else
            ret=[
                hex[0].toPrecision()/255.0,
                hex[1].toPrecision()/255.0,
                hex[2].toPrecision()/255.0,
                1.0
            ];
        return ret;
    }
}