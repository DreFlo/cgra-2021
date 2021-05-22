#ifdef GL_ES
precision highp float;
#endif

uniform vec3 color;

varying vec3 vVertexNormal;

void main() {
    gl_FragColor = vec4(color, 1.0);
}
