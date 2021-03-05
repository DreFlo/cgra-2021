import {CGFappearance, CGFobject} from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";

export class MyTangram extends CGFobject{
    constructor(scene){
        super(scene);
        this.diamond = new MyDiamond(scene);
        this.trianglesmallLeft = new MyTriangleSmall(scene);
        this.trianglesmallRight = new MyTriangleSmall(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.triangle = new MyTriangle(scene);
        this.trianglebigTop = new MyTriangleBig(scene);
        this.trianglebigBottom = new MyTriangleBig(scene);
        this.material = new CGFappearance(scene);
        this.customMaterial = 0;
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

    display(){
    //Diamond Head
    this.scene.pushMatrix();
    /*
    this.material.setDiffuse(...this.hexToRgbA('#00fd01'));
    this.material.setAmbient(...this.hexToRgbA('#00fd01'));
    this.material.setSpecular(0.9, 0.9, 0.9,1);
    this.material.setShininess(50);
    this.material.apply();
*/

        this.customMaterial.apply();
    var translateDiamond = [ 1.0, 0.0, 0.0, 0.0,
                             0.0, 1.0, 0.0, 0.0,
                             0.0, 0.0, 1.0, 0.0,
                            -1.7, 0.7, 0.0, 1.0]; 
    this.scene.multMatrix(translateDiamond);
    this.diamond.display();

    this.material.setDiffuse(...this.hexToRgbA('#fd1b1b'));
    this.material.setAmbient(...this.hexToRgbA('#fd1b1b'));
    this.material.setSpecular(0.9, 0.9, 0.9,1);
    this.material.setShininess(50);
    this.material.apply();


    this.scene.popMatrix();
    
    this.scene.pushMatrix();

    //TriangleSmall Left ear
    this.scene.translate(-2.7, 1.7, 0);
    this.scene.rotate(- Math.PI/2, 0, 0, 1);
    this.trianglesmallLeft.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    this.material.setDiffuse(...this.hexToRgbA('#8b4cb1'));
    this.material.setAmbient(...this.hexToRgbA('#9450bc'));
    this.material.setSpecular(0.9, 0.9, 0.9,1);
    this.material.setShininess(50);
    this.material.apply();


        //TriangleSmall Right ear
    this.scene.translate(-0.7, 1.7, 0);
    this.scene.rotate(Math.PI/2, 0, 0, 1);
    this.trianglesmallRight.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    this.material.setDiffuse(...this.hexToRgbA('#f2e035'));
    this.material.setAmbient(...this.hexToRgbA('#f2e035'));
    this.material.setSpecular(0.9, 0.9, 0.9,1);
    this.material.setShininess(50);
    this.material.apply();

    //Parallelogram
    this.scene.translate(1.4, 1.4, 0);
    this.scene.scale(-1, 1, 1);
    this.scene.rotate(-Math.PI/4, 0, 0, 1);
    
    this.parallelogram.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    this.material.setDiffuse(...this.hexToRgbA('#e998da'));
    this.material.setAmbient(...this.hexToRgbA('#e696d7'));
    this.material.setSpecular(0.9, 0.9, 0.9,1);
    this.material.setShininess(50);
    this.material.apply();

    //Triangle
    this.scene.translate(1.4, 0, 0);
    this.scene.rotate(-Math.PI/4, 0, 0, 1);

    this.triangle.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    this.material.setDiffuse(...this.hexToRgbA('#1b82ca'));
    this.material.setAmbient(...this.hexToRgbA('#1a7dc1'));
    this.material.setSpecular(0.9, 0.9, 0.9,1);
    this.material.setShininess(50);
    this.material.apply();

    //Triangle Big top
    this.scene.translate(1.4, -0.6, 0);
    this.scene.rotate(-Math.PI/2, 0, 0, 1);

    this.trianglebigTop.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    this.material.setDiffuse(...this.hexToRgbA('#ba8333'));
    this.material.setAmbient(...this.hexToRgbA('#ba8333'));
    this.material.setSpecular(0.9, 0.9, 0.9,1);
    this.material.setShininess(50);
    this.material.apply();

    this.scene.translate(2, -2, 0);
    this.scene.rotate(- 3 * Math.PI/4, 0, 0, 1);

    this.trianglebigBottom.display();

    this.scene.popMatrix();
    }

    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.trianglesmallRight.enableNormalViz();
        this.trianglesmallLeft.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.triangle.enableNormalViz();
        this.trianglebigBottom.enableNormalViz();
        this.trianglebigTop.enableNormalViz();
    }

    disableNormalViz() {

        this.diamond.disableNormalViz();
        this.trianglesmallRight.disableNormalViz();
        this.trianglesmallLeft.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.triangle.disableNormalViz();
        this.trianglebigBottom.disableNormalViz();
        this.trianglebigTop.disableNormalViz();
    }
}