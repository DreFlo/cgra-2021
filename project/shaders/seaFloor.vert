attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform sampler2D uSampler2;
uniform float uMaxHeight;
uniform float shellX;
uniform float shellY;
uniform float shellRadius;

const float offset2 = (2./512.);  //probably pass this value as an argument:   Distance in pixels / length of pixels

varying vec3 afterVertexPosition;

void main() {
    vec3 offset=vec3(0.0,0.0,0.0);

    vTextureCoord = aTextureCoord;

    vec4 colors[9];

    vec4 color = texture2D(uSampler2, vTextureCoord);

    //should be an array but it is not supported vec4 [9]
    colors[0] = texture2D(uSampler2, vec2(vTextureCoord[0]- offset2, 	vTextureCoord[1]- offset2));
    colors[1] = texture2D(uSampler2, vec2(vTextureCoord[0], 			vTextureCoord[1]- offset2));
    colors[2] = texture2D(uSampler2, vec2(vTextureCoord[0]+ offset2, 	vTextureCoord[1]- offset2));
    colors[3] = texture2D(uSampler2, vec2(vTextureCoord[0]- offset2, 	vTextureCoord[1]));
    colors[4] = texture2D(uSampler2, vec2(vTextureCoord[0], 			vTextureCoord[1]));
    colors[5] = texture2D(uSampler2, vec2(vTextureCoord[0]+ offset2, 	vTextureCoord[1]));
    colors[6] = texture2D(uSampler2, vec2(vTextureCoord[0]- offset2, 	vTextureCoord[1]+ offset2));
    colors[7] = texture2D(uSampler2, vec2(vTextureCoord[0], 			vTextureCoord[1]+ offset2));
    colors[8] = texture2D(uSampler2, vec2(vTextureCoord[0]+ offset2, 	vTextureCoord[1]+ offset));

    vec4 mean = vec4(9.0,9.0,9.0,9.0);
    vec4 den = vec4(0.1,0.1,0.1,1);

    //Edge Detection
    vec4 v = vec4(-1./8.,-1./8.,-1./8.,1);
    color = (colors[0] +
    colors[1] +
    colors[2] +
    colors[3] +

    colors[5] +
    colors[6] +
    colors[7] +
    colors[8] +
    colors[4]) / 9.
    ;

    offset = mod(5.0 * aVertexNormal * color.b, uMaxHeight);

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);  

    afterVertexPosition = aVertexPosition+offset;
}