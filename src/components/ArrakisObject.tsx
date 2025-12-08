import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ArrakisObjectProps {
  className?: string;
  lightColor1?: string;
  lightColor2?: string;
  darkColor1?: string;
  darkColor2?: string;
}

export function ArrakisObject({ 
  className = '', 
  lightColor1 = '#e8c8e8',
  lightColor2 = '#9d529d',
  darkColor1 = '#e8c8e8',
  darkColor2 = '#9d529d'
}: ArrakisObjectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const shaderMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const [isDark, setIsDark] = useState(false);

  // Detect theme changes
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  // Update colors when theme changes
  useEffect(() => {
    if (shaderMaterialRef.current) {
      const color1 = isDark ? darkColor1 : lightColor1;
      const color2 = isDark ? darkColor2 : lightColor2;
      shaderMaterialRef.current.uniforms.color1.value = new THREE.Color(color1);
      shaderMaterialRef.current.uniforms.color2.value = new THREE.Color(color2);
    }
  }, [isDark, lightColor1, lightColor2, darkColor1, darkColor2]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    
    // Initialize Three.js renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Settings for the shader
    const settings = {
      detail: 32,
      radius: 1.0,
      speed: 0.05,
      variation: 0.0,
      pulsate: true,
      multiAxisRotation: false,
      rimLight: 0.3,
      specularPower: 200,
      shadowIntensity: 0.8
    };

    // Use colors based on current theme
    const initialColor1 = isDark ? darkColor1 : lightColor1;
    const initialColor2 = isDark ? darkColor2 : lightColor2;
    const colorOne = new THREE.Color(initialColor1);
    const colorTwo = new THREE.Color(initialColor2);

    // Create custom shader material
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: {
          value: new THREE.Vector2(canvas.offsetWidth, canvas.offsetHeight)
        },
        mouse: { value: new THREE.Vector2(0.5, 0.5) },
        detail: { value: settings.detail },
        radius: { value: settings.radius },
        speed: { value: settings.speed },
        variation: { value: settings.variation },
        pulsate: { value: settings.pulsate },
        multiAxisRotation: { value: settings.multiAxisRotation },
        color1: { value: colorOne },
        color2: { value: colorTwo },
        rimLight: { value: settings.rimLight },
        specularPower: { value: settings.specularPower },
        shadowIntensity: { value: settings.shadowIntensity }
      },
      vertexShader: `
        varying vec2 vUv;
        
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        
        uniform float time;
        uniform vec2 resolution;
        uniform vec2 mouse;
        uniform float detail;
        uniform float radius;
        uniform float speed;
        uniform float variation;
        uniform bool pulsate;
        uniform bool multiAxisRotation;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float rimLight;
        uniform float specularPower;
        uniform float shadowIntensity;
        
        varying vec2 vUv;
        
        #define Shadow 1
        #define PI 3.14159265359
        #define rot(t) mat2(cos(t), sin(t), -sin(t), cos(t))
        
        int obj;
        float dist;
        
        float smin(float d1, float d2, float k) {
          float h = clamp(0.5 + 0.5 * (d2 - d1) / k, 0.0, 1.0);
          return mix(d2, d1, h) - k * h * (1.0 - h);
        }
        
        float smax(float d1, float d2, float k) {
          return smin(d1, d2, -k);
        }
        
        float gyr(vec3 p) {
          obj = 0;
          float r = radius;
          
          if (pulsate) {
            r *= (1.0 + 0.1 * sin(time * 0.3 * speed + length(p)));
          }
          
          float d1 = length(p) - r;
          
          vec3 q = p;
          
          float baseFreq = 4.0 * (1.0 + variation * sin(time * 0.2));
          float d2 = dot(cos(q.yzx * baseFreq), sin(q * baseFreq)) / baseFreq;
          
          float k = detail;
          
          float varK = k * (1.0 + 0.2 * variation * sin(time * 0.1));
          float d6 = dot(cos(p * varK), sin(p.yzx * varK)) / varK;
          
          float d5 = length(max(abs(vec2(d2, d1)), 0.0)) - 0.03;
          
          float displace = mix(0.01, 0.05, variation);
          
          dist = 0.5 * smin(
            d5, 
            length(
              smax(0.0, 
                smax(d1, 
                  smax(abs(d2), abs(d6) - displace, 0.03), 
                0.03), 
              0.01) - 0.001
            ), 
            0.01
          );
          
          return dist;
        }
        
        float map(vec3 p) {
          if (multiAxisRotation) {
            p.xz *= rot(time * speed);
            p.xy *= rot(time * speed * 0.3);
            p.yz *= rot(time * speed * 0.15);
          } else {
            p.xz *= rot(time * speed);
          }
          
          return gyr(p);
        }
        
        float calcSoftshadow(in vec3 ro, in vec3 rd) {
          float res = 1.0;
          float t = 0.001;
          float ph = 1e10;
          float tmax = 5.0;
          float w = 0.2;
          
          for (int i = 0; i < 32; i++) {
            float h = map(ro + rd * t);
            float dm = max(dist, 0.001);
            
            float y = dm * dm / (2.0 * ph);
            float d = sqrt(dm * dm - y * y);
            res = min(res, d / (w * max(0.0, t - y)));
            ph = dm;
            
            t += h;
            
            if (res < 0.0001 || t > tmax) break;
          }
          
          res = clamp(res, 0.0, 1.0);
          return res * res * (3.0 - 2.0 * res);
        }
        
        vec3 calcNormal(vec3 p) {
          const float h = 0.0001;
          const vec2 k = vec2(1, -1);
          return normalize(
            k.xyy * map(p + k.xyy * h) +
            k.yxy * map(p + k.yxy * h) +
            k.yyx * map(p + k.yyx * h) +
            k.xxx * map(p + k.xxx * h)
          );
        }
        
        vec4 raymarch(vec3 ro, vec3 rd) {
          vec4 color = vec4(0.0);
          vec3 p;
          float t = 0.0;
          
          for (int i = 0; i < 256 && t < 20.0; i++) {
            p = ro + rd * t;
            float d = map(p);
            
            if (d < 0.001) {
              vec3 n = calcNormal(p);
              vec3 s = normalize(vec3(-1.0, 2.0, -3.0));
              
              float f = 0.5 + 0.5 * dot(n, s);
              float g = max(dot(n, s), 0.0);
              
              float c = 1.0 + pow(f, specularPower) - f * 0.3;
              
              vec3 baseColor = mix(color1, color2, 0.5 + 0.5 * sin(length(p) * 3.0));
              
              color.rgb = baseColor * c * g;
              color.a = 1.0;
              
              #if Shadow == 1
              vec3 rf = normalize(s * 100.0 - p);
              float shd = calcSoftshadow(p - rd * 0.001, rf);
              color.rgb *= mix(1.0, shd + 0.2, shadowIntensity);
              #endif
              
              float depthFade = smoothstep(15.0, 0.0, length(p));
              color.rgb *= depthFade;
              
              if (rimLight > 0.0) {
                float rim = pow(1.0 - max(0.0, dot(n, -rd)), 4.0);
                color.rgb += rim * color1 * rimLight;
              }
              
              color.rgb = pow(color.rgb, vec3(0.8));
              
              return color;
            }
            
            t += d * 0.95;
          }
          
          return color;
        }
        
        void main() {
          vec2 screenSpace = (vUv * 2.0 - 1.0) * vec2(resolution.x / resolution.y, 1.0);
          
          vec3 ro = vec3(0.0, 0.0, -2.5);
          vec3 rd = normalize(vec3(screenSpace, 1.5));
          
          float angle = mouse.x * PI * 2.0;
          float height = (mouse.y - 0.5) * 1.0;
          ro.x = sin(angle) * 2.5;
          ro.z = cos(angle) * 2.5;
          ro.y = height;
          
          vec3 target = vec3(0.0, 0.0, 0.0);
          vec3 forward = normalize(target - ro);
          vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), forward));
          vec3 up = cross(forward, right);
          rd = normalize(screenSpace.x * right + screenSpace.y * up + 1.5 * forward);
          
          vec4 color = raymarch(ro, rd);
          
          if (color.a < 0.1) {
            color = vec4(0.0, 0.0, 0.0, 0.0);
          }
          
          gl_FragColor = color;
        }
      `,
      transparent: true
    });

    shaderMaterialRef.current = shaderMaterial;

    // Create full-screen quad
    const quadGeometry = new THREE.PlaneGeometry(2, 2);
    const quad = new THREE.Mesh(quadGeometry, shaderMaterial);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    scene.add(quad);

    // Mouse movement handler
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = (event.clientX - rect.left) / rect.width;
      const mouseY = (event.clientY - rect.top) / rect.height;
      shaderMaterial.uniforms.mouse.value.set(mouseX, mouseY);
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    function animate() {
      const time = performance.now() * 0.001;
      shaderMaterial.uniforms.time.value = time;

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    // Resize handler
    const handleResize = () => {
      if (!canvas) return;
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      
      renderer.setSize(width, height);
      shaderMaterial.uniforms.resolution.value.set(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      quadGeometry.dispose();
      shaderMaterial.dispose();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
}
