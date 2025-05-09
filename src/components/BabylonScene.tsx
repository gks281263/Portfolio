import React, { useEffect, useRef, useState } from 'react';
import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Color3,
  ActionManager,
  ExecuteCodeAction,
  Matrix,
  ParticleSystem,
  Texture,
  Color4,
  PointLight,
  DynamicTexture,
  Mesh,
  LinesMesh,
  CreateLines,
  Animation,
  SineEase,
  QuadraticEase,
  EasingFunction,
} from '@babylonjs/core';
import { useMediaQuery } from 'react-responsive';

interface BabylonSceneProps {
  type: 'globe' | 'skills' | 'project' | 'contact';
  className?: string;
  scrollProgress?: number;
}

const BabylonScene: React.FC<BabylonSceneProps> = ({ type, className, scrollProgress = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const isMobileQuery = useMediaQuery({ maxWidth: 768 });
  const sceneRef = useRef<Scene | null>(null);
  const cameraRef = useRef<ArcRotateCamera | null>(null);
  const isZoomedInRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const globeRef = useRef<Mesh | null>(null);
  const skillIconsRef = useRef<Mesh[]>([]);
  const orbitAngleRef = useRef(0);

  const createGlobe = (scene: Scene) => {
    // Create the main globe with grid texture
    const sphere = MeshBuilder.CreateSphere('globe', { diameter: 2 }, scene);
    globeRef.current = sphere;
    
    const material = new StandardMaterial('globeMaterial', scene);
    material.emissiveColor = new Color3(0, 0.5, 0.5);
    material.alpha = 0.8;
    
    // Create grid texture
    const gridTexture = new DynamicTexture('gridTexture', 512, scene);
    const ctx = gridTexture.getContext() as CanvasRenderingContext2D;
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    
    // Draw grid lines
    for (let i = 0; i < 512; i += 32) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 512);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(512, i);
      ctx.stroke();
    }
    
    gridTexture.update();
    material.emissiveTexture = gridTexture;
    sphere.material = material;

    // Create skill icons
    createSkillIcons(scene);
  };

  // Helper function to create fade animation
  const createFadeAnimation = (target: any, property: string, startValue: number, endValue: number, duration: number) => {
    const animation = new Animation(
      `${property}Fade`,
      property,
      30,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    const keyFrames = [
      { frame: 0, value: startValue },
      { frame: duration, value: endValue }
    ];

    animation.setKeys(keyFrames);
    const easingFunction = new QuadraticEase();
    easingFunction.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
    animation.setEasingFunction(easingFunction);

    return animation;
  };

  // Skill icons configuration
  const skills = [
    { 
      name: 'React', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      color: new Color3(0.2, 0.8, 0.2) 
    },
    { 
      name: 'TypeScript', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      color: new Color3(0.2, 0.2, 0.8) 
    },
    { 
      name: 'Node.js', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      color: new Color3(0.8, 0.2, 0.2) 
    },
    { 
      name: 'Python', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      color: new Color3(0.8, 0.8, 0.2) 
    },
    { 
      name: 'Docker', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      color: new Color3(0.2, 0.8, 0.8) 
    },
    { 
      name: 'AWS', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
      color: new Color3(0.8, 0.4, 0.2) 
    },
    { 
      name: 'Kubernetes', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
      color: new Color3(0.4, 0.2, 0.8) 
    },
    { 
      name: 'Security', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
      color: new Color3(0.8, 0.2, 0.8) 
    }
  ];

  // Enhanced skill icon creation with error handling
  const createSkillIcons = (scene: Scene) => {
    skillIconsRef.current = skills.map((skill, index) => {
      // Create icon plane
      const plane = MeshBuilder.CreatePlane(
        `skill-${index}`,
        { width: 0.8, height: 0.8 },
        scene
      );
      
      // Create material with icon texture
      const material = new StandardMaterial(`skillMaterial-${index}`, scene);
      material.emissiveColor = skill.color;
      material.alpha = 0;
      
      // Load logo texture with error handling
      const logoTexture = new Texture(skill.logo, scene, true, false, Texture.NEAREST_SAMPLINGMODE);
      material.diffuseTexture = logoTexture;
      material.emissiveTexture = logoTexture;

      // Set up error handling for texture loading
      scene.onReadyObservable.addOnce(() => {
        if (!logoTexture.isReady) {
          console.warn(`Failed to load texture for ${skill.name}`);
          material.emissiveColor = skill.color;
          material.alpha = 0.8;
        }
      });
      
      // Set initial position
      const angle = (index * Math.PI * 2) / skills.length;
      const radius = 3;
      plane.position = new Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle * 2) * 1.5,
        Math.sin(angle) * radius
      );
      
      plane.material = material;
      plane.isVisible = false;
      
      // Add hover effect with glow
      plane.actionManager = new ActionManager(scene);
      plane.actionManager.registerAction(
        new ExecuteCodeAction(
          ActionManager.OnPointerOverTrigger,
          () => {
            material.emissiveColor = skill.color.scale(1.5);
            plane.scaling = new Vector3(1.2, 1.2, 1.2);
          }
        )
      );
      plane.actionManager.registerAction(
        new ExecuteCodeAction(
          ActionManager.OnPointerOutTrigger,
          () => {
            material.emissiveColor = skill.color;
            plane.scaling = new Vector3(1, 1, 1);
          }
        )
      );

      // Make icon face camera with smooth rotation
      const targetRotation = Vector3.Zero().subtract(plane.position).normalize();
      const currentRotation = plane.forward.clone();
      const newRotation = Vector3.Lerp(currentRotation, targetRotation, 0.1);
      plane.setDirection(newRotation);

      return plane;
    });
  };

  useEffect(() => {
    setIsMobile(isMobileQuery);
  }, [isMobileQuery]);

  useEffect(() => {
    if (!canvasRef.current || isMobile) return;

    try {
      const engine = new Engine(canvasRef.current, true, {
        preserveDrawingBuffer: true,
        stencil: true,
        antialias: true,
      });
      const scene = new Scene(engine);
      sceneRef.current = scene;

      // Enable post-processing for better visuals
      scene.clearColor = new Color4(0, 0, 0, 0);
      scene.autoClear = false;

      // Camera setup with improved positioning
      const camera = new ArcRotateCamera(
        'camera',
        0,
        Math.PI / 3,
        10,
        Vector3.Zero(),
        scene
      );
      cameraRef.current = camera;
      camera.attachControl(canvasRef.current, true);
      
      // Lock camera zoom and disable default scroll behavior
      camera.lowerRadiusLimit = camera.upperRadiusLimit = 10;
      camera.inputs.removeByType("ArcRotateCameraMouseWheelInput");
      camera.inputs.removeByType("ArcRotateCameraKeyboardMoveInput");
      camera.inputs.removeByType("ArcRotateCameraPointersInput");

      // Enhanced lighting setup
      const ambientLight = new HemisphericLight(
        'ambientLight',
        new Vector3(0, 1, 0),
        scene
      );
      ambientLight.intensity = 0.5;
      ambientLight.diffuse = new Color3(0.2, 0.2, 0.3);
      ambientLight.specular = new Color3(0.1, 0.1, 0.2);

      const pointLight = new PointLight(
        'pointLight',
        new Vector3(0, 5, 0),
        scene
      );
      pointLight.intensity = 1;
      pointLight.diffuse = new Color3(0.4, 0.4, 0.6);
      pointLight.specular = new Color3(0.2, 0.2, 0.3);

      // Add cyberpunk grid background
      createCyberpunkGrid(scene);

      // Scene-specific setup
      switch (type) {
        case 'globe':
          createGlobe(scene);
          createDataParticles(scene);
          break;
        case 'skills':
          createSkillsCloud(scene);
          break;
        case 'project':
          createProjectPanel(scene);
          break;
        case 'contact':
          createContactConsole(scene);
          break;
      }

      // Handle resize with improved performance
      const handleResize = () => {
        engine.resize();
        if (cameraRef.current) {
          cameraRef.current.setTarget(Vector3.Zero());
        }
      };
      window.addEventListener('resize', handleResize);

      // Animation loop with improved performance
      let lastTime = 0;
      engine.runRenderLoop(() => {
        try {
          const currentTime = performance.now();
          const deltaTime = currentTime - lastTime;
          lastTime = currentTime;

          // Update scene
          scene.render();
        } catch (error) {
          console.error('Error in render loop:', error);
        }
      });

      return () => {
        try {
          engine.dispose();
          window.removeEventListener('resize', handleResize);
        } catch (error) {
          console.error('Error during cleanup:', error);
        }
      };
    } catch (error) {
      console.error('Error initializing Babylon scene:', error);
    }
  }, [type, isMobile]);

  // Update scene when scrollProgress changes with improved animation
  useEffect(() => {
    if (!sceneRef.current || !cameraRef.current) return;

    // Smooth camera zoom
    const startRadius = 10;
    const endRadius = 4;
    const targetRadius = startRadius + (endRadius - startRadius) * scrollProgress;
    
    // Use lerp for smoother transitions
    const currentRadius = cameraRef.current.radius;
    cameraRef.current.radius = currentRadius + (targetRadius - currentRadius) * 0.1;

    // Update skill icons with improved animation
    skillIconsRef.current.forEach((icon, index) => {
      if (!icon) return;

      // Calculate target position
      const baseAngle = (index * Math.PI * 2) / skillIconsRef.current.length;
      const angle = baseAngle + scrollProgress * Math.PI * 4;
      const radius = 3;
      const targetPosition = new Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle * 2) * 1.5,
        Math.sin(angle) * radius
      );

      // Smooth position transition
      icon.position = Vector3.Lerp(
        icon.position,
        targetPosition,
        0.1
      );

      // Update visibility and alpha
      icon.isVisible = scrollProgress > 0;
      const mat = icon.material as StandardMaterial;
      if (mat) {
        const targetAlpha = Math.max(0, Math.min(1, scrollProgress * 1.5));
        mat.alpha = mat.alpha + (targetAlpha - mat.alpha) * 0.1;
      }

      // Make icon face camera with smooth rotation
      const targetRotation = Vector3.Zero().subtract(icon.position).normalize();
      const currentRotation = icon.forward.clone();
      const newRotation = Vector3.Lerp(currentRotation, targetRotation, 0.1);
      icon.setDirection(newRotation);
    });
  }, [scrollProgress]);

  // Add the orbit update to the scene's beforeRender with improved performance
  useEffect(() => {
    let observer: any = null;
    if (sceneRef.current) {
      observer = sceneRef.current.registerBeforeRender(() => {
        if (type === 'globe' && globeRef.current) {
          // Update globe rotation with smooth easing
          const targetRotation = globeRef.current.rotation.y + 0.001;
          globeRef.current.rotation.y += (targetRotation - globeRef.current.rotation.y) * 0.1;
        }
      });
    }
    return () => {
      if (sceneRef.current && observer) {
        sceneRef.current.unregisterBeforeRender(observer);
      }
    };
  }, [type]);

  if (isMobile) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4">
            <svg
              className="w-full h-full text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-muted-foreground">
            Interactive 3D view available on desktop
          </p>
        </div>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ touchAction: 'none' }}
    />
  );
};

// Helper function to create cyberpunk grid
const createCyberpunkGrid = (scene: Scene) => {
  // Create main grid
  const grid = MeshBuilder.CreateGround(
    'grid',
    { width: 20, height: 20, subdivisions: 20 },
    scene
  );
  const gridMaterial = new StandardMaterial('gridMaterial', scene);
  gridMaterial.emissiveColor = new Color3(0.1, 0.1, 0.2);
  gridMaterial.alpha = 0.3;
  grid.material = gridMaterial;
  grid.position.y = -2;

  // Create grid lines with glow effect
  const gridLines = CreateLines(
    'gridLines',
    {
      points: [
        new Vector3(-10, -2, 0),
        new Vector3(10, -2, 0),
        new Vector3(0, -2, -10),
        new Vector3(0, -2, 10),
      ],
      updatable: true,
    },
    scene
  );
  gridLines.color = new Color3(0, 0.5, 0.5);
  gridLines.alpha = 0.8;

  // Add pulsing animation to grid
  scene.registerBeforeRender(() => {
    const time = scene.getEngine().getDeltaTime() / 1000;
    gridMaterial.alpha = 0.3 + Math.sin(time * 2) * 0.1;
    gridLines.alpha = 0.8 + Math.sin(time * 2) * 0.2;
  });

  // Create additional decorative elements
  const createDecorativeElement = (position: Vector3, size: number) => {
    const element = MeshBuilder.CreateBox(
      'decorative',
      { height: 0.1, width: size, depth: size },
      scene
    );
    const material = new StandardMaterial('decorativeMaterial', scene);
    material.emissiveColor = new Color3(0, 0.3, 0.3);
    material.alpha = 0.5;
    element.material = material;
    element.position = position;

    // Add rotation animation
    scene.registerBeforeRender(() => {
      element.rotation.y += 0.01;
    });

    return element;
  };

  // Add decorative elements around the grid
  createDecorativeElement(new Vector3(-8, -1.9, -8), 0.5);
  createDecorativeElement(new Vector3(8, -1.9, -8), 0.5);
  createDecorativeElement(new Vector3(-8, -1.9, 8), 0.5);
  createDecorativeElement(new Vector3(8, -1.9, 8), 0.5);
};

// Enhanced data particles
const createDataParticles = (scene: Scene) => {
  const particleSystem = new ParticleSystem('particles', 2000, scene);
  particleSystem.particleTexture = new Texture('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUM2OEZDQTQ4RTU0MTFFMTlBNkQ5OTNBN0FFQzM5QjQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUM2OEZDQTU4RTU0MTFFMTlBNkQ5OTNBN0FFQzM5QjQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQzY4RkNBMjhFNTQxMUUxOUE2RDk5M0E3QUVDMzlCNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQzY4RkNBMzhFNTQxMUUxOUE2RDk5M0E3QUVDMzlCNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvXJ8OMAAAAmSURBVHjaYvz//z8DJYAFxjh16hSDiYkJw7t37xgYGRkZGBgYGADhZwMDAJg6BQAAAABJRU5ErkJggg==', scene);
  
  particleSystem.emitter = new Vector3(0, 0, 0);
  particleSystem.minEmitBox = new Vector3(-10, -10, -10);
  particleSystem.maxEmitBox = new Vector3(10, 10, 10);
  
  particleSystem.color1 = new Color4(0, 0.5, 0.5, 1.0);
  particleSystem.color2 = new Color4(0, 0.5, 0.5, 1.0);
  particleSystem.colorDead = new Color4(0, 0, 0, 0.0);
  
  particleSystem.minSize = 0.1;
  particleSystem.maxSize = 0.5;
  
  particleSystem.minLifeTime = 0.3;
  particleSystem.maxLifeTime = 1.5;
  
  particleSystem.emitRate = 500;
  
  particleSystem.blendMode = ParticleSystem.BLENDMODE_ONEONE;
  
  particleSystem.gravity = new Vector3(0, -0.1, 0);
  
  particleSystem.direction1 = new Vector3(-1, -1, -1);
  particleSystem.direction2 = new Vector3(1, 1, 1);
  
  particleSystem.minAngularSpeed = 0;
  particleSystem.maxAngularSpeed = Math.PI;
  
  particleSystem.minEmitPower = 1;
  particleSystem.maxEmitPower = 3;
  particleSystem.updateSpeed = 0.01;

  // Add particle animation
  scene.registerBeforeRender(() => {
    const time = scene.getEngine().getDeltaTime() / 1000;
    particleSystem.emitRate = 500 + Math.sin(time * 2) * 100;
  });
  
  particleSystem.start();
};

// Scene-specific creation functions
const createSkillsCloud = (scene: Scene) => {
  const skills = [
    { name: 'React', color: new Color3(0.2, 0.8, 0.2), icon: '⚛️' },
    { name: 'TypeScript', color: new Color3(0.2, 0.2, 0.8), icon: '📘' },
    { name: 'Node.js', color: new Color3(0.8, 0.2, 0.2), icon: '🟢' },
    { name: 'Python', color: new Color3(0.8, 0.8, 0.2), icon: '🐍' },
    { name: 'Security', color: new Color3(0.8, 0.2, 0.8), icon: '🔒' },
  ];

  // Create central node with glow
  const centralNode = MeshBuilder.CreateSphere(
    'centralNode',
    { diameter: 0.5 },
    scene
  );
  const centralMaterial = new StandardMaterial('centralMaterial', scene);
  centralMaterial.emissiveColor = new Color3(0.5, 0.5, 0.5);
  centralMaterial.alpha = 0.8;
  centralNode.material = centralMaterial;

  // Create skill nodes with icons
  skills.forEach((skill, index) => {
    const sphere = MeshBuilder.CreateSphere(
      `skill-${index}`,
      { diameter: 0.3 },
      scene
    );
    const material = new StandardMaterial(`skillMaterial-${index}`, scene);
    material.emissiveColor = skill.color;
    material.alpha = 0.8;
    sphere.material = material;

    // Create icon texture
    const iconTexture = new DynamicTexture(`iconTexture-${index}`, 128, scene);
    const ctx = iconTexture.getContext() as CanvasRenderingContext2D;
    ctx.font = 'bold 64px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(skill.icon, 64, 64);
    iconTexture.update();
    material.emissiveTexture = iconTexture;

    // Position in orbit
    const angle = (index * Math.PI * 2) / skills.length;
    const radius = 2;
    sphere.position = new Vector3(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0
    );

    // Add hover effect with glow and tooltip
    sphere.actionManager = new ActionManager(scene);
    sphere.actionManager.registerAction(
      new ExecuteCodeAction(
        ActionManager.OnPointerOverTrigger,
        () => {
          material.emissiveColor = skill.color.scale(1.5);
          sphere.scaling = new Vector3(1.2, 1.2, 1.2);
          // TODO: Add tooltip
        }
      )
    );
    sphere.actionManager.registerAction(
      new ExecuteCodeAction(
        ActionManager.OnPointerOutTrigger,
        () => {
          material.emissiveColor = skill.color;
          sphere.scaling = new Vector3(1, 1, 1);
        }
      )
    );
  });

  // Add rotation animation
  scene.registerBeforeRender(() => {
    skills.forEach((_, index) => {
      const sphere = scene.getMeshByName(`skill-${index}`);
      if (sphere) {
        const angle = (index * Math.PI * 2) / skills.length + scene.getEngine().getDeltaTime() / 1000;
        const radius = 2;
        sphere.position = new Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0
        );
        sphere.rotation.y += 0.01;
      }
    });
  });
};

const createProjectPanel = (scene: Scene) => {
  const panel = MeshBuilder.CreateBox(
    'panel',
    { height: 2, width: 3, depth: 0.1 },
    scene
  );
  const material = new StandardMaterial('panelMaterial', scene);
  material.emissiveColor = new Color3(0.1, 0.1, 0.3);
  material.alpha = 0.9;
  panel.material = material;

  // Create glowing border
  const border = MeshBuilder.CreateBox(
    'border',
    { height: 2.1, width: 3.1, depth: 0.05 },
    scene
  );
  const borderMaterial = new StandardMaterial('borderMaterial', scene);
  borderMaterial.emissiveColor = new Color3(0, 0.5, 0.5);
  borderMaterial.alpha = 0.5;
  border.material = borderMaterial;
  border.position = panel.position;

  // Add hover effect with glow and rotation
  panel.actionManager = new ActionManager(scene);
  panel.actionManager.registerAction(
    new ExecuteCodeAction(
      ActionManager.OnPointerOverTrigger,
      () => {
        material.emissiveColor = new Color3(0.2, 0.2, 0.4);
        borderMaterial.emissiveColor = new Color3(0, 0.8, 0.8);
        panel.rotation.y = Math.PI / 12;
        border.rotation.y = Math.PI / 12;
      }
    )
  );
  panel.actionManager.registerAction(
    new ExecuteCodeAction(
      ActionManager.OnPointerOutTrigger,
      () => {
        material.emissiveColor = new Color3(0.1, 0.1, 0.3);
        borderMaterial.emissiveColor = new Color3(0, 0.5, 0.5);
        panel.rotation.y = 0;
        border.rotation.y = 0;
      }
    )
  );

  // Add floating animation
  scene.registerBeforeRender(() => {
    const time = scene.getEngine().getDeltaTime() / 1000;
    panel.position.y = Math.sin(time) * 0.1;
    border.position.y = Math.sin(time) * 0.1;
  });
};

const createContactConsole = (scene: Scene) => {
  // Create main console body
  const console = MeshBuilder.CreateBox(
    'console',
    { height: 1, width: 2, depth: 0.5 },
    scene
  );
  const material = new StandardMaterial('consoleMaterial', scene);
  material.emissiveColor = new Color3(0, 0.3, 0.3);
  material.alpha = 0.9;
  console.material = material;

  // Create glowing screen
  const screen = MeshBuilder.CreatePlane(
    'screen',
    { height: 0.8, width: 1.8 },
    scene
  );
  const screenMaterial = new StandardMaterial('screenMaterial', scene);
  screenMaterial.emissiveColor = new Color3(0, 0.2, 0.2);
  screen.material = screenMaterial;
  screen.position = new Vector3(0, 0, 0.26);

  // Create send button
  const button = MeshBuilder.CreateBox(
    'button',
    { height: 0.2, width: 0.4, depth: 0.1 },
    scene
  );
  const buttonMaterial = new StandardMaterial('buttonMaterial', scene);
  buttonMaterial.emissiveColor = new Color3(0, 0.5, 0.5);
  button.material = buttonMaterial;
  button.position = new Vector3(0.6, -0.3, 0.26);

  // Add pulsing animation
  scene.registerBeforeRender(() => {
    const time = scene.getEngine().getDeltaTime() / 1000;
    material.emissiveColor = new Color3(
      0,
      0.3 + Math.sin(time) * 0.1,
      0.3 + Math.sin(time) * 0.1
    );
    buttonMaterial.emissiveColor = new Color3(
      0,
      0.5 + Math.sin(time * 2) * 0.2,
      0.5 + Math.sin(time * 2) * 0.2
    );
  });

  // Add click effect
  button.actionManager = new ActionManager(scene);
  button.actionManager.registerAction(
    new ExecuteCodeAction(
      ActionManager.OnPickTrigger,
      () => {
        buttonMaterial.emissiveColor = new Color3(0, 0.8, 0.8);
        setTimeout(() => {
          buttonMaterial.emissiveColor = new Color3(0, 0.5, 0.5);
        }, 200);
      }
    )
  );
};

export default BabylonScene; 