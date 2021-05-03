#ifdef GL_ES
precision highp float;
#endif

uniform float ratio;
uniform sampler2D uSampler;
uniform vec3 bodyColour;

varying vec3 vVertexPosition;
varying vec2 vTextureCoord;

void main() {
    vec3 color = texture2D(uSampler, vTextureCoord).rgb;

    if (vVertexPosition.x < ratio) color = bodyColour;

    //color = vec3(0.76, 0.54, 0.89);

    gl_FragColor = vec4(color, 1.0);
}
