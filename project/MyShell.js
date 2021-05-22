import {CGFobject} from '../lib/CGF.js';

export class MyShell extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {int} slices - number of slices around Y axis
   * @param  {int} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
   */
  constructor(scene, slices, stacks, pos) {
    super(scene);
    this.latDivs = stacks * 2;
    this.longDivs = slices;
    this.pos = pos;
    this.rocks = [];
    this.radius = 2;
    this.rockPos = [];

    this.initBuffers();

    for(var xOffset = -1; xOffset < 1; xOffset += 0.3){
      for(var zOffset = -1; zOffset < 1; zOffset += 0.3) {
        this.rockPos.push(this.sumArrays([xOffset, 0, zOffset], this.pos));
      }
    }

    this.rockPosInArray = 0;
  }

  /**
   * @method initBuffers
   * Initializes the sphere buffers
   */
  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var phi = 0;
    var theta = 0;
    var phiInc = Math.PI / this.latDivs;
    var thetaInc = Math.PI / this.longDivs;
    var latVertices = this.longDivs + 1;

    // build an all-around stack at a time, starting on "north pole" and proceeding "south"
    for (let latitude = 0; latitude <= this.latDivs; latitude++) {
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);

      // in each stack, build all the slices around, starting on longitude 0
      theta = 0;
      for (let longitude = 0; longitude <= this.longDivs; longitude++) {
        //--- Vertices coordinates
        var x = Math.cos(theta) * sinPhi;
        var y = cosPhi;
        var z = Math.sin(-theta) * sinPhi;
        this.vertices.push(x, y, z);

        //--- Indices
        if (latitude < this.latDivs && longitude < this.longDivs) {
          var current = latitude * latVertices + longitude;
          var next = current + latVertices;
          // pushing two triangles using indices from this round (current, current+1)
          // and the ones directly south (next, next+1)
          // (i.e. one full round of slices ahead)
          
          this.indices.push( current + 1, current, next);
          this.indices.push( current + 1, next, next +1);

          this.indices.push( next, current, current + 1);
          this.indices.push( next + 1, next, current + 1);
        }

        //--- Normals
        // at each vertex, the direction of the normal is equal to 
        // the vector from the center of the sphere to the vertex.
        // in a sphere of radius equal to one, the vector length is one.
        // therefore, the value of the normal is equal to the position vector
        this.normals.push(x, y, z);
        theta += thetaInc;

        //--- Texture Coordinates
        this.texCoords.push(theta / (Math.PI), phi / Math.PI);
      }
      phi += phiInc;
    }


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }

  display() {
    this.scene.pushMatrix();
    this.scene.translate(...this.pos);
    this.scene.rotate(- Math.PI / 2, 1, 0, 0);
    this.scene.scale(2, 2, 0.25);
    super.display();
    this.scene.popMatrix();
  }

  addRock(rock) {
    this.rocks.push(rock);
    rock.pos = this.rockPos[this.rockPosInArray];
    console.log(rock.pos);
    this.rockPosInArray = (this.rockPosInArray + 1) % 49;
    rock.inShell = true;
  }

  sumArrays(array1, array2){
    return [array1[0] + array2[0], array1[1] + array2[1], array1[2] + array2[2]];
  }
}
