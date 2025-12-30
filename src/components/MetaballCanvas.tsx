import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function MetaballCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const shaderMaterialRef = useRef<THREE.ShaderMaterial | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Get viewport dimensions for fixed positioning
    const getViewportSize = () => ({
      width: window.innerWidth,
      height: window.innerHeight
    });

    // Initialize renderer
    const { width, height } = getViewportSize();
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true,
      alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Shader material
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new THREE.Vector3(width, height, 1)
        },
        iScrollProgress: { value: 0 },
        iMergeAmount: { value: 0 },
        iColorShift: { value: 0 },
        iBallPositions: {
          value: [
            new THREE.Vector3(-3, 2, 0),
            new THREE.Vector3(3, -2, 1),
            new THREE.Vector3(-2, -3, 2),
            new THREE.Vector3(2, 3, -1),
            new THREE.Vector3(0, 0, 3),
            new THREE.Vector3(-1, 1, -2),
            new THREE.Vector3(1, -1, -3),
            new THREE.Vector3(0, 0, 0)
          ]
        }
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec3 iResolution;
        uniform float iScrollProgress;
        uniform float iMergeAmount;
        uniform float iColorShift;
        uniform vec3 iBallPositions[8];
        
        vec3 hash(vec3 p) {
          p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
                   dot(p, vec3(269.5, 183.3, 246.1)),
                   dot(p, vec3(113.5, 271.9, 124.6)));
          return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
        }
        
        float noise(in vec3 p) {
          vec3 i = floor(p);
          vec3 f = fract(p);
          vec3 u = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(
              mix(dot(hash(i + vec3(0.0, 0.0, 0.0)), f - vec3(0.0, 0.0, 0.0)),
                  dot(hash(i + vec3(1.0, 0.0, 0.0)), f - vec3(1.0, 0.0, 0.0)), u.x),
              mix(dot(hash(i + vec3(0.0, 1.0, 0.0)), f - vec3(0.0, 1.0, 0.0)),
                  dot(hash(i + vec3(1.0, 1.0, 0.0)), f - vec3(1.0, 1.0, 0.0)), u.x), u.y),
            mix(
              mix(dot(hash(i + vec3(0.0, 0.0, 1.0)), f - vec3(0.0, 0.0, 1.0)),
                  dot(hash(i + vec3(1.0, 0.0, 1.0)), f - vec3(1.0, 0.0, 1.0)), u.x),
              mix(dot(hash(i + vec3(0.0, 1.0, 1.0)), f - vec3(0.0, 1.0, 1.0)),
                  dot(hash(i + vec3(1.0, 1.0, 1.0)), f - vec3(1.0, 1.0, 1.0)), u.x), u.y), u.z);
        }
        
        void main() {
          vec2 fragCoord = gl_FragCoord.xy;
          vec3 dir = normalize(vec3((2.0 * fragCoord.xy - iResolution.xy) / min(iResolution.x, iResolution.y), 1.7));
          vec3 p = vec3(0, 0, -7);
          vec3 gradient, q, a;
          float dist, b;
          
          for(int i = 0; i < 100; i++) {
            q = p;
            p += dir * dist;
            gradient = vec3(0);
            dist = 0.0;
            
            for(int j = 0; j < 8; j++) {
              vec3 ballp = iBallPositions[j];
              ballp.x += sin(iTime * 0.3 + float(j) * 0.5 + iScrollProgress * 3.0) * (3.0 - iMergeAmount * 2.5);
              ballp.y += cos(iTime * 0.2 + float(j) * 0.7 + iScrollProgress * 2.0) * (3.0 - iMergeAmount * 2.5);
              ballp.z += sin(iTime * 0.4 + float(j) * 0.3 + iScrollProgress * 4.0) * (3.0 - iMergeAmount * 2.5);
              ballp = mix(ballp, vec3(0.0), iMergeAmount);
              b = dot(a = p - ballp, a);
              float strength = 1.0 + iMergeAmount * 2.0;
              gradient += a / (b * b) * strength;
              dist += strength / b;
            }
            
            dist = 1.0 - dist;
            
            if(dist < 0.001) {
              dir = reflect(dir, normalize(gradient));
              p = q;
              dist = 0.0;
            }
          }
          
          vec3 col = dir * 0.5 + 0.5;
          float noiseVal = noise(col * 2.0 + iTime * 0.3 + iScrollProgress);
          vec3 finalColor = col * 2.0 * noiseVal;
          finalColor = mix(finalColor, vec3(finalColor.g, finalColor.b, finalColor.r), iColorShift);
          finalColor = clamp(finalColor, 0.0, 1.0);
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `
    });
    shaderMaterialRef.current = shaderMaterial;

    // Full screen quad
    const geometry = new THREE.PlaneGeometry(2, 2);
    const quad = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(quad);

    // Handle resize
    const handleResize = () => {
      const { width, height } = getViewportSize();
      renderer.setSize(width, height);
      shaderMaterial.uniforms.iResolution.value.set(width, height, 1);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    let animationId: number;
    const animate = (time: number) => {
      time *= 0.001;
      shaderMaterial.uniforms.iTime.value = time;
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);

    // ScrollTrigger animations
    const initScrollAnimations = () => {
      gsap.to(shaderMaterial.uniforms.iScrollProgress, {
        value: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '#ai-content',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true
        }
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: '#ai-content',
          start: '33% top',
          end: '66% bottom',
          scrub: true
        }
      })
      .to(shaderMaterial.uniforms.iMergeAmount, {
        value: 1,
        duration: 1,
        ease: 'power2.inOut'
      })
      .to(shaderMaterial.uniforms.iMergeAmount, {
        value: 0,
        duration: 1,
        ease: 'power2.inOut'
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: '#ai-content',
          start: '50% top',
          end: 'bottom bottom',
          scrub: true
        }
      })
      .to(shaderMaterial.uniforms.iColorShift, {
        value: 1,
        duration: 1,
        ease: 'sine.inOut'
      })
      .to(shaderMaterial.uniforms.iColorShift, {
        value: 0,
        duration: 1,
        ease: 'sine.inOut'
      });
    };

    initScrollAnimations();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      renderer.dispose();
      geometry.dispose();
      shaderMaterial.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
