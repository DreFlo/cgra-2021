import {CGFobject, CGFappearance} from '../lib/CGF.js';
import {MyQuad} from "./MyQuad.js";

/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCubeMap extends CGFobject {
	constructor(scene, top, front, right, back, left, bottom) {
		super(scene);
		this.scene = scene;

		this.quad = new MyQuad(scene);

		this.topMat = new CGFappearance(this.scene);
		this.newTexture(this.topMat, top);

		this.frontMat = new CGFappearance(this.scene);
		this.newTexture(this.frontMat, front);

		this.rightMat = new CGFappearance(this.scene);
		this.newTexture(this.rightMat, right);

		this.backMat = new CGFappearance(this.scene);
		this.newTexture(this.backMat, back);

		this.leftMat = new CGFappearance(this.scene);
		this.newTexture(this.leftMat, left);

		this.bottomMat = new CGFappearance(this.scene);
		this.newTexture(this.bottomMat, bottom);
	}

	newTexture(mat, texture){
		mat.setAmbient(0.1, 0.1, 0.1, 1);
		mat.setDiffuse(0.9, 0.9, 0.9, 1);
		mat.setSpecular(0.1, 0.1, 0.1, 1);
		mat.setShininess(10.0);
		mat.loadTexture(texture);
		mat.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	}

	changeTextures(top, front, right, back, left, bottom){
		this.newTexture(this.topMat, top);
		this.newTexture(this.frontMat, front);
		this.newTexture(this.rightMat, right);
		this.newTexture(this.backMat, back);
		this.newTexture(this.leftMat, left);
		this.newTexture(this.bottomMat, bottom);
	}
	
	display() {
		//Frente
		this.frontMat.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.pushMatrix();
		this.scene.scale(50, 50, 50);
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.translate(0, 0, -0.5);
		this.quad.display();
		this.scene.popMatrix();
		
		//Trás
		this.backMat.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.pushMatrix();
		this.scene.scale(50, 50, 50);
		this.scene.translate(0, 0, -0.5);
		this.quad.display();
		this.scene.popMatrix();
		
		//Direita
		this.rightMat.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.pushMatrix();
		this.scene.scale(50, 50, 50);
		this.scene.translate(0.5, 0, 0);
		this.scene.rotate(- Math.PI / 2, 0, 1, 0);
		this.quad.display();
		this.scene.popMatrix();
		
		//Esquerda
		this.leftMat.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.pushMatrix();
		this.scene.scale(50, 50, 50);
		this.scene.translate(-0.5, 0, 0);
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.quad.display();
		this.scene.popMatrix();
		
		//Baixo
		this.bottomMat.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.pushMatrix();
		this.scene.scale(50, 50, 50);
		this.scene.translate(0, -0.5, 0);
		this.scene.rotate(-Math.PI / 2, 1, 0, 0);
		this.quad.display();
		this.scene.popMatrix();
		
		//Cima
		this.topMat.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.pushMatrix();
		this.scene.scale(50, 50, 50);
		this.scene.translate(0, 0.5, 0);
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.quad.display();
		this.scene.popMatrix();
	}
}