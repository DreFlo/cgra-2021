attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform sampler2D uSampler2;

void main() {
    vec3 offset = vec3(0.0, 0.0, 0.0);

    vTextureCoord = aTextureCoord; // + timeFactor/100.0;

    /*//offset.x += texture2D(uSampler2, vec2(0.0, 0.1) + vTextureCoord).b;
    offset.r += texture2D(uSampler2, vec2(0.0, 0.1) + vTextureCoord).r - 0.5;
    offset.g += texture2D(uSampler2, vec2(0.0, 0.1) + vTextureCoord).g - 0.5;*/


    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0); 
}
