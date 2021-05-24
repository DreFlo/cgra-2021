#ifdef GL_ES
precision highp float;
#endif

uniform float ratio;
uniform sampler2D uSampler;
uniform vec3 bodyColour;

varying vec3 vVertexPosition;
varying vec2 vTextureCoord;
varying vec4 vFinalColor;

void main() {
    vec3 color = texture2D(uSampler, vTextureCoord).rgb;

    if (vVertexPosition.x < ratio) color = bodyColour;

    gl_FragColor = vec4(color, 1.0);
}
