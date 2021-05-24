import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture, CGFshader } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyMovingObject } from "./MyMovingObject.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyCilinder } from "./MyCilinder.js";
import { MyFish } from "./MyFish.js";
import { MySeaFloor } from "./MySeaFloor.js";
import { MyWaterSurface } from "./MyWaterSurface.js";
import { MyRock } from "./MyRock.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyPillar } from "./MyPillar.js";
import {MySeaweed} from "./MySeaweed.js";
import {MySeaweedSet} from "./MySeaweedSet.js";
import {MyMovingFish} from "./MyMovingFish.js";
import {CGFcamera2} from "./CGFcamera2.js";

/**
* MyScene
* @constructor
*/
export class MyScene extends CGFscene {
    constructor() {
        super();
        this.selectedCubeMap = 2;
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.movingObject = new MyMovingObject(this, Math.PI / 2, 0.0, 0, 0, 0);
        this.cilinder = new MyCilinder(this, 16);
        this.fish = new MyMovingFish(this, 0.2, 0.0, [0, 5, 0], [0.76, 0.54, 0.89], "images/scale.png");
        this.seaFloor = new MySeaFloor(this, 20, 50, 1);
        this.seaSurface = new MyWaterSurface(this);
        this.rocks = new MyRockSet(this);
        this.pillar1 = new MyPillar(this);
        this.pillar2 = new MyPillar(this);
        this.pillar3 = new MyPillar(this);
        this.pillar4 = new MyPillar(this);
        this.pillar5 = new MyPillar(this);
        this.pillar6 = new MyPillar(this);

        this.seaweeds = [];

        for (let i = 0; i < Math.floor(Math.random() * 10) + 10; i++) {
            var pos = [-24 + Math.random() * 49, 0.5, -24 + Math.random() * 49];
            if(Math.abs(pos[0] - this.seaFloor.shellX) < 3 || Math.abs(pos[2] - this.seaFloor.shellZ) < 3){
                i--;
                continue;
            }
            this.seaweeds.push(new MySeaweedSet(this, pos));
        }

        this.cubeMaps = [
            new MyCubeMap(this, 'images/demo_cubemap/top.png', 'images/demo_cubemap/front.png', 'images/demo_cubemap/right.png',
                                    'images/demo_cubemap/back.png', 'images/demo_cubemap/left.png', 'images/demo_cubemap/bottom.png'),
            new MyCubeMap(this, 'images/yokohama_cubemap/top.png', 'images/yokohama_cubemap/front.png', 'images/yokohama_cubemap/right.png',
                                    'images/yokohama_cubemap/back.png', 'images/yokohama_cubemap/left.png', 'images/yokohama_cubemap/bottom.png'),
            new MyCubeMap(this, 'images/underwater_cubemap/top.jpg', 'images/underwater_cubemap/front.jpg', 'images/underwater_cubemap/left.jpg',
                                    'images/underwater_cubemap/back.jpg', 'images/underwater_cubemap/right.jpg', 'images/underwater_cubemap/bottom.jpg')
        ];

        this.cubeMapList = {
            'Default' : 0,
            'Yokohama' : 1,
            'Underwater' : 2
        };

        this.defaultAppearance = new CGFappearance(this);
		this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0,0,0,1);
		this.defaultAppearance.setShininess(120);

		this.sphereAppearance = new CGFappearance(this);
		this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.sphereAppearance.setShininess(120);
		this.sphereAppearance.loadTexture("images/earth.jpg");

        this.seaweedShader = new CGFshader(this.gl, "shaders/seaweed.vert", "shaders/seaweed.frag");
        this.seaweedShader.setUniformsValues({ color : [0.2, Math.random() * 0.5 + 0.5, 0.3, 1.0] });
        this.seaweedShader.setUniformsValues({ timeFactor : 0});

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displaySphere = false;
        this.displayMovingObject = false;
        this.displayCilinder = true;
        this.displayFish = false;

        this.speedFactor = 1;
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera2(2, 0.1, 500, vec3.fromValues(2, 2, 2), vec3.fromValues(0, 2, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }
    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        this.movingObject.update();
        this.fish.update(t / 100);
        this.seaSurface.update(t );
        this.seaweedShader.setUniformsValues({ timeFactor : t / 200 % 200});
    }
    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        
        this.defaultAppearance.apply();
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        // ---- BEGIN Primitive drawing section

        if (this.displaySphere) {
            this.sphereAppearance.apply();

            //This sphere does not have defined texture coordinates
            this.incompleteSphere.display();
        }

        if (this.displayMovingObject) {
            this.defaultAppearance.apply();

            this.movingObject.display();
        }

        if(this.displayCilinder){
            this.sphereAppearance.apply();

            this.cilinder.display();
        }

        if(this.displayFish) {
            this.fish.display();
        }

        //Underwater Scene
        /*
        this.seaFloor.display();
        this.seaSurface.display();
        this.rocks.display();




        //Pillars
        this.pushMatrix();
        this.translate(24, 0, -0.5);
        this.pillar1.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(24, 0, -3.5);
        this.pillar2.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(3, 0, -0.5);
        this.pillar3.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(3, 0, -3.5);
        this.pillar4.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(13.5, 0, -0.5);
        this.pillar5.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(13.5, 0, -3.5);
        this.pillar6.display();
        this.popMatrix();



        this.setActiveShader(this.seaweedShader);
        for (let i = 0; i < this.seaweeds.length; i++) this.seaweeds[i].display();


         */
        this.setActiveShader(this.defaultShader);



        this.defaultAppearance.apply();

        this.pushMatrix();
        this.translate(this.camera.position[0], this.camera.position[1], this.camera.position[2]);
        this.cubeMaps[this.selectedCubeMap].display();
        this.popMatrix();

        // ---- END Primitive drawing section
    }
    checkKeys() {
        let text = "Keys pressed: ";
        let keysPressed = false;

        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            this.fish.accelerate(-0.1);
            text += " W ";
            keysPressed = true;
        }

        if (this.gui.isKeyPressed("KeyS")) {
            this.fish.accelerate(0.1);
            text += " S ";
            keysPressed = true;
        }

        if (this.gui.isKeyPressed("KeyA")) {
            this.fish.turn(0.1);
            text += " A ";
            keysPressed = true;
        } else if (this.gui.isKeyPressed("KeyD")) {
            this.fish.turn(-0.1);
            text += " D ";
            keysPressed = true;
        } else {
            this.fish.turn(0);
        }

        if (this.gui.isKeyPressed("KeyR")) {
            this.fish.reset();
            text += " R ";
            keysPressed = true;
        }

        if (this.gui.isKeyPressed("KeyP")) {
            this.fish.elevate();
            text += " P ";
            keysPressed = true;
        }

        if (this.gui.isKeyPressed("KeyL")) {
            this.fish.lower();
            text += " L ";
            keysPressed = true;
        }

        if (this.gui.isKeyPressed("KeyC")) {
            if (this.fish.rock === null) this.fish.capture();
            else this.fish.release();
            text += " C ";
            keysPressed = true;
        }

        if (keysPressed) {
            console.log(text);
        }
    }
}