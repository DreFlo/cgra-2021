#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {
	vec4 distortion = texture2D(uSampler2, vTextureCoord + (timeFactor / 500.0));
	
	vec2 textCoord = vTextureCoord;
	textCoord.s += (distortion.r - 0.5) * 0.4;
	textCoord.t += (distortion.g - 0.5) * 0.4;
	normalize(textCoord);

	vec4 color = texture2D(uSampler, textCoord);

	gl_FragColor = color;
}