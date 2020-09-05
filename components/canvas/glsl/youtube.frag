varying vec2 vUv;

uniform float uPercent;
varying float vWave;
uniform sampler2D uTexture;

void main() {
  float shift = uPercent * .01;
  float wave = vWave * .03;

  gl_FragColor = texture2D( uTexture, vUv );
  if (gl_FragColor.a < 0.5 ){ discard; }

  float r = texture2D( uTexture, vUv + vec2( shift, 0.0 )).r;
  float g = texture2D( uTexture, vUv ).g;
  float b = texture2D( uTexture, vUv - vec2( shift, 0.0 )).b;

  vec3 color = vec3( r, g, b );

  gl_FragColor = vec4( color, 1.0 );

  // gl_FragColor = texture2D( map, vUv );
}
