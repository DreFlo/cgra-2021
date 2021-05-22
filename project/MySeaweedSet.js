import {CGFobject} from "../lib/CGF.js";
import {MySeaweed} from "./MySeaweed.js";

export class MySeaweedSet extends CGFobject {
    constructor(scene, pos) {
        super(scene);
        this.numberSeaweeds = Math.floor(Math.random() * (10 - 5)) + 5;
        console.log(this.numberSeaweeds);
        this.seaweeds = [];
        for(var i = 0; i < this.numberSeaweeds; i++){
            console.log("CREATED");
            this.seaweeds.push(new MySeaweed(this.scene, this.sumArrays(pos, [Math.random() - 0.5, 0, Math.random() - 0.5]),
                                 Math.random() + 1, [0.2, Math.random() * 0.5 + 0.5, 0.3, 1.0]));
        }
    }

    update(t) {
        this.seaweeds.forEach(element => { element.update(t); });
    }

    display() {
        this.seaweeds.forEach(element => {
            element.display();
        });
    }

    sumArrays(array1, array2){
        return [array1[0] + array2[0], array1[1] + array2[1], array1[2] + array2[2]];
    }

}