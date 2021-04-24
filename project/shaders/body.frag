#ifdef GL_ES
precision highp float;
#endif

uniform float ratio;
uniform sampler2D uSampler;

varying vec3 vVertexPosition;
varying vec2 vTextureCoord;

void main() {
    vec3 color = texture2D(uSampler, vTextureCoord).rgb;

    if (vVertexPosition.x < ratio) color = vec3(1.0 , 1.0, 1.0);

    gl_FragColor = vec4(color, 1.0);
}
