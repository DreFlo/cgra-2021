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

        this.green = new CGFappearance(scene);
        this.red = new CGFappearance(scene);
        this.violet = new CGFappearance(scene);
        this.yellow = new CGFappearance(scene);
        this.pink = new CGFappearance(scene);
        this.orange = new CGFappearance(scene);
        this.blue = new CGFappearance(scene);

        this.initColours();

        this.Material = new CGFappearance(scene);
        this.Material.setAmbient(0.1, 0.1, 0.1, 1);
        this.Material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.Material.setSpecular(0.1, 0.1, 0.1, 1);
        this.Material.setShininess(10.0);
        this.Material.loadTexture('images/tangram.png');
        this.Material.setTextureWrap('REPEAT', 'REPEAT');

        this.initTextCoords();
    }

    initColours(){
        this.green.setDiffuse(...this.hexToRgbA('#00fd01'));
        this.green.setAmbient(...this.hexToRgbA('#00fd01'));
        this.green.setSpecular(0.9, 0.9, 0.9,1);
        this.green.setShininess(50);

        this.red.setDiffuse(...this.hexToRgbA('#fd1b1b'));
        this.red.setAmbient(...this.hexToRgbA('#fd1b1b'));
        this.red.setSpecular(0.9, 0.9, 0.9,1);
        this.red.setShininess(50);

        this.violet.setDiffuse(...this.hexToRgbA('#8b4cb1'));
        this.violet.setAmbient(...this.hexToRgbA('#9450bc'));
        this.violet.setSpecular(0.9, 0.9, 0.9,1);
        this.violet.setShininess(50);

        this.yellow.setDiffuse(...this.hexToRgbA('#f2e035'));
        this.yellow.setAmbient(...this.hexToRgbA('#f2e035'));
        this.yellow.setSpecular(0.9, 0.9, 0.9,1);
        this.yellow.setShininess(50);

        this.pink.setDiffuse(...this.hexToRgbA('#e998da'));
        this.pink.setAmbient(...this.hexToRgbA('#e696d7'));
        this.pink.setSpecular(0.9, 0.9, 0.9,1);
        this.pink.setShininess(50);

        this.blue.setDiffuse(...this.hexToRgbA('#1b82ca'));
        this.blue.setAmbient(...this.hexToRgbA('#1a7dc1'));
        this.blue.setSpecular(0.9, 0.9, 0.9,1);
        this.blue.setShininess(50);

        this.orange.setDiffuse(...this.hexToRgbA('#ba8333'));
        this.orange.setAmbient(...this.hexToRgbA('#ba8333'));
        this.orange.setSpecular(0.9, 0.9, 0.9,1);
        this.orange.setShininess(50);
    }

    initTextCoords(){
        this.diamond.texCoords = [
			0.00, 0.50,
			0.25, 0.75,
			0.25, 0.25,
			0.50, 0.50
		];
        this.diamond.initGLBuffers();

        this.trianglesmallLeft.texCoords = [
            0.25, 0.75,
            0.50, 0.50,
            0.75, 0.75
        ];
        this.trianglesmallLeft.initGLBuffers();

        this.trianglesmallRight.texCoords = [
            0.00, 0.00,
            0.25, 0.25,
            0.00, 0.50
        ];
        this.trianglesmallRight.initGLBuffers();

        this.parallelogram.texCoords = [
            1.00, 1.00,
            0.75, 0.75,
            0.50, 1.00,
            0.25, 0.75,

            1.00, 1.00,
            0.75, 0.75,
            0.50, 1.00,
            0.25, 0.75
        ];
        this.parallelogram.initGLBuffers();

        this.triangle.texCoords = [
            0.00, 0.50,
            0.00, 1.00,
            0.50, 1.00
        ];
        this.triangle.initGLBuffers();

        this.trianglebigTop.texCoords = [
            0.00, 0.00,
            0.50, 0.50,
            1.00, 0.00
        ];
        this.trianglebigTop.initGLBuffers();

        this.trianglebigBottom.texCoords = [
            1.00, 1.00,
            0.50, 0.50,
            1.00, 0.00
        ];
        this.trianglebigBottom.initGLBuffers();
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
    
    //this.green.apply();

    //this.customMaterial.apply();

    this.Material.apply();
    var translateDiamond = [ 1.0, 0.0, 0.0, 0.0,
                             0.0, 1.0, 0.0, 0.0,
                             0.0, 0.0, 1.0, 0.0,
                            -1.7, 0.7, 0.0, 1.0]; 
    this.scene.multMatrix(translateDiamond);
    this.diamond.display();


    this.scene.popMatrix();
    
    this.scene.pushMatrix();

    //TriangleSmall Left ear
    //this.red.apply();

    this.scene.translate(-2.7, 1.7, 0);
    this.scene.rotate(- Math.PI/2, 0, 0, 1);
    this.trianglesmallLeft.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();


    //TriangleSmall Right ear
    //this.violet.apply();

    this.scene.translate(-0.7, 1.7, 0);
    this.scene.rotate(Math.PI/2, 0, 0, 1);
    this.trianglesmallRight.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    //Parallelogram
    //this.yellow.apply();

    this.scene.translate(1.4, 1.4, 0);
    this.scene.scale(-1, 1, 1);
    this.scene.rotate(-Math.PI/4, 0, 0, 1);
    
    this.parallelogram.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    //Triangle
    //this.pink.apply();

    this.scene.translate(1.4, 0, 0);
    this.scene.rotate(-Math.PI/4, 0, 0, 1);

    this.triangle.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    //Triangle Big top
    //this.blue.apply();

    this.scene.translate(1.4, -0.6, 0);
    this.scene.rotate(-Math.PI/2, 0, 0, 1);

    this.trianglebigTop.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();
    
    //Triangle Big bottom
    //this.orange.apply();

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