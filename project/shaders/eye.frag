#ifdef GL_ES
precision highp float;
#endif

varying vec3 vVertexNormal;

uniform sampler2D uSampler;

void main() {
    vec2 uv = normalize(vVertexNormal).xy * 0.5 + 0.5;

    vec3 color = texture2D(uSampler, uv).rgb;

    gl_FragColor = vec4(color, 1.0);
}
