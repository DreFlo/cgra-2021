attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float scale;
uniform float timeFactor;

varying vec3 vVertexNormal;

void main() {
    vec3 pos = aVertexPosition;
    if (pos.y / scale == 1.0) {
        pos.x += sin(timeFactor) * 0.4;
    } else if (pos.y / scale == 0.6) {
        pos.x -= sin(timeFactor) * 0.2;
    } else if (pos.y / scale == 0.3) {
        pos.x += sin(timeFactor) * 0.1;
    }

    gl_Position = uPMatrix * uMVMatrix * vec4(pos, 1.0);

    vVertexNormal = aVertexNormal;
}