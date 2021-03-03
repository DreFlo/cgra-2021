import { CGFobject} from "../lib/CGF.js";
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
    }
    display(){
    //Diamond Head
    this.scene.pushMatrix();
    var translateDiamond = [ 1.0, 0.0, 0.0, 0.0,
                             0.0, 1.0, 0.0, 0.0,
                             0.0, 0.0, 1.0, 0.0,
                            -1.7, 0.7, 0.0, 1.0]; 
    this.scene.multMatrix(translateDiamond);
    this.diamond.display();

    this.scene.popMatrix();
    
    this.scene.pushMatrix();

    //TriangleSmall Left ear
    this.scene.translate(-2.7, 1.7, 0);
    this.scene.rotate(- Math.PI/2, 0, 0, 1);

    this.trianglesmallLeft.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();
    
    //TriangleSmall Right ear
    this.scene.translate(-0.7, 1.7, 0);
    this.scene.rotate(Math.PI/2, 0, 0, 1);

    this.trianglesmallRight.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    //Parallelogram
    this.scene.translate(1.4, 1.4, 0);
    this.scene.scale(-1, 1, 1);
    this.scene.rotate(-Math.PI/4, 0, 0, 1);
    
    this.parallelogram.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    //Triangle
    this.scene.translate(1.4, 0, 0);
    this.scene.rotate(-Math.PI/4, 0, 0, 1);

    this.triangle.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    //Triangle Big top
    this.scene.translate(1.4, -0.6, 0);
    this.scene.rotate(-Math.PI/2, 0, 0, 1);

    this.trianglebigTop.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    //Triangle Big Bottom

    this.scene.translate(2, -2, 0);
    this.scene.rotate(- 3 * Math.PI/4, 0, 0, 1);

    this.trianglebigBottom.display();

    this.popMatrix();
    }
}