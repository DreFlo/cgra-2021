import {CGFobject} from '../lib/CGF.js';

export class MyCilinder extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {int} slices - number of slices around Y axis
   */
  constructor(scene, slices) {
    super(scene);
    this.slices = slices;

    this.initBuffers();
  }

  /**
   * @method initBuffers
   * Initializes the cilinder buffers
   */
  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var phi = 0;
    var phiInc = (2 * Math.PI) / this.slices;
    var vertex = 0;
    var sCoord = 0.0;

    for (let div = 0; div <= this.slices; div++, phi += phiInc, sCoord += (1/this.slices)) {
        var sinPhi = Math.sin(phi);
        var cosPhi = Math.cos(phi);

        //--- Vertices
        this.vertices.push(cosPhi, -0.5, sinPhi);
        this.vertices.push(cosPhi, 0.5, sinPhi);
        this.vertices.push(Math.cos(phi + phiInc), 0.5, Math.sin(phi + phiInc));
        this.vertices.push(Math.cos(phi + phiInc), -0.5, Math.sin(phi + phiInc));

        //--- Indices
        if (div < this.slices) {
            this.indices.push(vertex + 1, vertex + 2, vertex);
            this.indices.push(vertex + 2, vertex + 3, vertex);

          vertex += 4;
        }

        //--- Normals
        this.normals.push(cosPhi, 0, sinPhi);
        this.normals.push(cosPhi, 0, sinPhi);
        this.normals.push(Math.cos(phi + phiInc), 0, Math.sin(phi + phiInc));
        this.normals.push(Math.cos(phi + phiInc), 0, Math.sin(phi + phiInc));

        //--- Texture Coordinates
        this.texCoords.push(sCoord, 0);
        this.texCoords.push(sCoord, 1);
        this.updateTexCoordsGLBuffers();
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}