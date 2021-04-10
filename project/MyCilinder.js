import {CGFobject} from '../lib/CGF.js';

export class MyCilinder extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
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

        //--- Indices
        if (div < this.slices) {
          this.indices.push(vertex + 1, vertex, vertex + 2);
          this.indices.push(vertex + 1, vertex + 2, vertex + 3);

          vertex += 2;
        }

        //--- Normals
        this.normals.push(cosPhi, 0, sinPhi);
        this.normals.push(cosPhi, 0, sinPhi);

        //--- Texture Coordinates
        this.texCoords.push(sCoord, 1);
        this.texCoords.push(sCoord, 0);
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}