attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float timeFactor;

varying vec3 vVertexNormal;

void main() {
    vec3 offset = vec3(0.0, 0.0, 0.0);
    if (aVertexPosition.y == 1.0) {
        offset.x = sin(timeFactor) * 0.3;
    } else if (aVertexPosition.y == 0.6) {
        offset.x = - sin(timeFactor) * 0.2;
    } else if (aVertexPosition.y == 0.3) {
        offset.x = sin(timeFactor) * 0.1;
    }

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);

    vVertexNormal = aVertexNormal;
}