attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform sampler2D uSampler2;
uniform float uMaxHeight;

const float offset2 = (2./512.);  //probably pass this value as an argument:   Distance in pixels / length of pixels

void main() {
    vec3 offset=vec3(0.0,0.0,0.0);

    vTextureCoord = aTextureCoord;

    vec4 color = texture2D(uSampler2, vTextureCoord);

    offset = mod(5.0 * aVertexNormal * color.b, uMaxHeight);

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
}