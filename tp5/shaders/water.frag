#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
	vec4 filter = texture2D(uSampler2, vec2(0.0,0.1) + vTextureCoord);

	/**if (filter.b > 0.5)
		color=vec4(0.4, 0.4, 0.2, 1.0);
        color=vec4(0.2, 0.2, 0.1, 1.0);*/
    
    //vec4(filter.b * 0.1, filter.b * 0.1, filter.b * 0.1, 1)
	
	gl_FragColor = color / vec4(filter.b * 0.3, filter.b * 0.3, filter.b * 0.3, 1);
}