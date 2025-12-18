import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';

const Atom3D = ({ protons, neutrons, electrons }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null);

  // Memoize geometries and materials for performance
  const geometries = useMemo(() => ({
    sphere: new THREE.SphereGeometry(0.06, 16, 12),
    torus: new THREE.TorusGeometry(1, 0.012, 8, 100)
  }), []);

  const materials = useMemo(() => ({
    proton: new THREE.MeshBasicMaterial({ 
      color: 0xff4444, 
      transparent: true, 
      opacity: 0.95 
    }),
    neutron: new THREE.MeshBasicMaterial({ 
      color: 0x4444ff, 
      transparent: true, 
      opacity: 0.95 
    }),
    electron: new THREE.MeshBasicMaterial({ 
      color: 0xffff44, 
      transparent: true, 
      opacity: 1.0 
    }),
    orbit: new THREE.MeshBasicMaterial({ 
      color: 0x9f55ff, 
      transparent: true, 
      opacity: 0.3 
    })
  }), []);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.5, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Main group
    const atomGroup = new THREE.Group();
    scene.add(atomGroup);

    // Nucleus
    const nucleusGroup = new THREE.Group();
    const nucleusRadius = Math.max(0.25, Math.sqrt(protons + neutrons) * 0.06);
    
    for (let i = 0; i < protons; i++) {
      const proton = new THREE.Mesh(geometries.sphere, materials.proton);
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * nucleusRadius * 0.8;
      const height = (Math.random() - 0.5) * nucleusRadius * 0.5;
      
      proton.position.set(
        radius * Math.cos(angle),
        height,
        radius * Math.sin(angle)
      );
      nucleusGroup.add(proton);
    }

    for (let i = 0; i < neutrons; i++) {
      const neutron = new THREE.Mesh(geometries.sphere, materials.neutron);
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * nucleusRadius * 0.8;
      const height = (Math.random() - 0.5) * nucleusRadius * 0.5;
      
      neutron.position.set(
        radius * Math.cos(angle),
        height,
        radius * Math.sin(angle)
      );
      nucleusGroup.add(neutron);
    }

    atomGroup.add(nucleusGroup);

    // ELECTRONS AND ORBITS
    const electronsData = [];
    let remainingElectrons = electrons;
    let shellNumber = 1;

    while (remainingElectrons > 0) {
      const electronsInShell = Math.min(2 * shellNumber * shellNumber, remainingElectrons);
      const shellRadius = shellNumber * 1.0;
      const numOrbits = Math.min(4, Math.max(1, Math.ceil(electronsInShell / 2)));

      for (let orbitIndex = 0; orbitIndex < numOrbits; orbitIndex++) {
        const electronsOnThisOrbit = Math.ceil(electronsInShell / numOrbits);
        const electronsToAdd = Math.min(electronsOnThisOrbit, electrons - electronsData.length);

        if (electronsToAdd > 0) {
          const orbit = new THREE.Mesh(geometries.torus, materials.orbit);
          const orbitGroup = new THREE.Group();
          
          // Apply rotation to the GROUP, not the mesh
          if (orbitIndex === 0) { // Horizontal XZ plane
            orbitGroup.rotation.x = Math.PI / 2;
          } else if (orbitIndex === 1) { // Vertical YZ plane
            orbitGroup.rotation.y = Math.PI / 2;
          } else if (orbitIndex === 2) { // Diagonal
            orbitGroup.rotation.x = Math.PI / 2;
            orbitGroup.rotation.y = Math.PI / 4;
          } else { // Other Diagonal
            orbitGroup.rotation.x = Math.PI / 2;
            orbitGroup.rotation.y = -Math.PI / 4;
          }
          
          orbitGroup.add(orbit);

          const radius = shellRadius + (orbitIndex * 0.05);
          orbit.scale.setScalar(radius);
          atomGroup.add(orbitGroup);

          for (let i = 0; i < electronsToAdd; i++) {
            const electron = new THREE.Mesh(geometries.sphere, materials.electron);
            atomGroup.add(electron);

            electronsData.push({
              mesh: electron,
              radius: radius,
              angle: Math.random() * Math.PI * 2,
              speed: 0.005, // Slower and constant speed
              orbitGroup: orbitGroup,
            });
          }
        }
      }
      remainingElectrons -= electronsInShell;
      shellNumber++;
    }

    // Mouse controls
    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;
    let rotationX = 0;
    let rotationY = 0;

    const handleMouseDown = (event) => {
      isMouseDown = true;
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleMouseMove = (event) => {
      if (!isMouseDown) return;
      
      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;
      
      rotationY += deltaX * 0.01;
      rotationX += deltaY * 0.01;
      
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    const handleWheel = (event) => {
      const zoomSpeed = 0.1;
      const delta = event.deltaY > 0 ? 1 + zoomSpeed : 1 - zoomSpeed;
      camera.position.multiplyScalar(delta);
      camera.position.clampLength(3, 10);
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('wheel', handleWheel);

    // ANIMATION
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      // Apply mouse rotation to entire atom
      atomGroup.rotation.x = rotationX;
      atomGroup.rotation.y = rotationY;

      // Rotate nucleus
      nucleusGroup.rotation.y += 0.002;

      // Animate electrons along their orbital paths
      electronsData.forEach(data => {
        data.angle += data.speed;

        // Calculate position in XY plane first
        const position = new THREE.Vector3(
          data.radius * Math.cos(data.angle),
          data.radius * Math.sin(data.angle),
          0
        );

        // Then apply the orbit's rotation
        position.applyEuler(data.orbitGroup.rotation);
        data.mesh.position.copy(position);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !renderer) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (renderer && mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('mouseup', handleMouseUp);
      renderer.domElement.removeEventListener('wheel', handleWheel);
      
      Object.values(geometries).forEach(geometry => geometry.dispose());
      Object.values(materials).forEach(material => material.dispose());
      
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [protons, neutrons, electrons, geometries, materials]);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full cursor-grab active:cursor-grabbing"
      style={{ touchAction: 'none' }}
    />
  );
};

export default Atom3D;
