import {CGFobject, CGFappearance} from '../lib/CGF.js';
import {MyQuad} from "./MyQuad.js";

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene, top = '', front = '', right = '', back = '', left = '', bottom = '') {
		super(scene);
		this.scene = scene;

		this.quad = new MyQuad(scene);

		this.top = top;
		this.front = front;
		this.right = right;
		this.back = back;
		this.left = left;
		this.bottom = bottom;

		this.initTextures();
	}

	initTextures(){
        if(this.top != ''){ 
            this.topMat = new CGFappearance(this.scene);
            this.topMat.setAmbient(0.1, 0.1, 0.1, 1);
            this.topMat.setDiffuse(0.9, 0.9, 0.9, 1);
            this.topMat.setSpecular(0.1, 0.1, 0.1, 1);
            this.topMat.setShininess(10.0);
            this.topMat.loadTexture(this.top);
            this.topMat.setTextureWrap('REPEAT', 'REPEAT');
        }

        if(this.front != ''){
            this.frontMat = new CGFappearance(this.scene);
            this.frontMat.setAmbient(0.1, 0.1, 0.1, 1);
            this.frontMat.setDiffuse(0.9, 0.9, 0.9, 1);
            this.frontMat.setSpecular(0.1, 0.1, 0.1, 1);
            this.frontMat.setShininess(10.0);
            this.frontMat.loadTexture(this.front);
            this.frontMat.setTextureWrap('REPEAT', 'REPEAT');
        }

        if(this.right != ''){
            this.rightMat = new CGFappearance(this.scene);
            this.rightMat.setAmbient(0.1, 0.1, 0.1, 1);
            this.rightMat.setDiffuse(0.9, 0.9, 0.9, 1);
            this.rightMat.setSpecular(0.1, 0.1, 0.1, 1);
            this.rightMat.setShininess(10.0);
            this.rightMat.loadTexture(this.right);
            this.rightMat.setTextureWrap('REPEAT', 'REPEAT');
        }

        if(this.back != ''){
            this.backMat = new CGFappearance(this.scene);
            this.backMat.setAmbient(0.1, 0.1, 0.1, 1);
            this.backMat.setDiffuse(0.9, 0.9, 0.9, 1);
            this.backMat.setSpecular(0.1, 0.1, 0.1, 1);
            this.backMat.setShininess(10.0);
            this.backMat.loadTexture(this.back);
            this.backMat.setTextureWrap('REPEAT', 'REPEAT');
        }

        if(this.left != ''){
            this.leftMat = new CGFappearance(this.scene);
            this.leftMat.setAmbient(0.1, 0.1, 0.1, 1);
            this.leftMat.setDiffuse(0.9, 0.9, 0.9, 1);
            this.leftMat.setSpecular(0.1, 0.1, 0.1, 1);
            this.leftMat.setShininess(10.0);
            this.leftMat.loadTexture(this.left);
            this.leftMat.setTextureWrap('REPEAT', 'REPEAT');
        }

        if(this.bottom != ''){
            this.bottomMat = new CGFappearance(this.scene);
            this.bottomMat.setAmbient(0.1, 0.1, 0.1, 1);
            this.bottomMat.setDiffuse(0.9, 0.9, 0.9, 1);
            this.bottomMat.setSpecular(0.1, 0.1, 0.1, 1);
            this.bottomMat.setShininess(10.0);
            this.bottomMat.loadTexture(this.bottom);
            this.bottomMat.setTextureWrap('REPEAT', 'REPEAT');
        }
    }
	
	display() {
		//Frente
		this.frontMat.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.pushMatrix();
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();
		

		//Trás
		this.backMat.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();
		
		//Direita
		this.rightMat.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();
		
		//Esquerda
		this.leftMat.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI / 2, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();
		
		//Baixo
		this.bottomMat.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		//Cima
		this.topMat.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI / 2, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();
	}
}