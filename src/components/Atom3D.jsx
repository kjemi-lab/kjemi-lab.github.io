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

    // Camera setup with better positioning
    const camera = new THREE.PerspectiveCamera(
      60, // Reduced FOV for better perspective
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    // Renderer setup with better quality
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Better quality on high-DPI displays
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.5, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Add subtle blue light for depth
    const blueLight = new THREE.PointLight(0x4444ff, 0.3, 50);
    blueLight.position.set(-5, -5, -5);
    scene.add(blueLight);

    // Main group for the entire atom (nucleus + electron shells)
    const atomGroup = new THREE.Group();
    scene.add(atomGroup);

    // Nucleus (protons and neutrons) with better distribution
    const nucleusGroup = new THREE.Group();
    const nucleusRadius = Math.max(0.25, Math.sqrt(protons + neutrons) * 0.06);
    
    // Add protons with better spacing
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

    // Add neutrons with better spacing
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

    // Electron shells with improved 3D distribution
    const electronShells = [];
    let remainingElectrons = electrons;
    let shellNumber = 1;
    
    while (remainingElectrons > 0) {
      const electronsInShell = Math.min(2 * shellNumber * shellNumber, remainingElectrons);
      const shellRadius = shellNumber * 1.0;
      
      // Create orbit rings based on actual electron count
      const numOrbits = Math.min(4, Math.max(1, Math.ceil(electronsInShell / 2))); // Only create orbits that will be used
      
      for (let orbitIndex = 0; orbitIndex < numOrbits; orbitIndex++) {
        const orbit = new THREE.Mesh(geometries.torus, materials.orbit);
        
        // Different orientations for each orbit to create 3D effect
        let orbitRotationX, orbitRotationY, orbitRotationZ;
        
        switch (orbitIndex) {
          case 0: // North-South (standard horizontal ring)
            orbitRotationX = Math.PI / 2;
            orbitRotationY = 0;
            orbitRotationZ = 0;
            break;
          case 1: // East-West (vertical ring)
            orbitRotationX = 0;
            orbitRotationY = 0;
            orbitRotationZ = Math.PI / 2;
            break;
          case 2: // Diagonal 1 (tilted ring)
            orbitRotationX = Math.PI / 2;
            orbitRotationY = Math.PI / 4;
            orbitRotationZ = 0;
            break;
          case 3: // Diagonal 2 (opposite tilted ring)
            orbitRotationX = Math.PI / 2;
            orbitRotationY = -Math.PI / 4;
            orbitRotationZ = Math.PI / 6;
            break;
        }
        
        orbit.rotation.set(orbitRotationX, orbitRotationY, orbitRotationZ);
        
        // Slightly different sizes and positions for each orbit
        const orbitScale = shellRadius + (orbitIndex * 0.05);
        orbit.scale.setScalar(orbitScale);
        
        // Adjust opacity based on orbit type
        orbit.material.opacity = 0.4 - (orbitIndex * 0.05);
        
        atomGroup.add(orbit);
      }
      
      // Add electrons to this shell with enhanced 3D distribution
      for (let i = 0; i < electronsInShell; i++) {
        const electron = new THREE.Mesh(geometries.sphere, materials.electron);
        
        // Distribute electrons evenly across available orbits
        const orbitIndex = i % numOrbits;
        
        // Create circular distribution around the orbit
        const angle = (i / electronsInShell) * Math.PI * 2;
        const radiusVariation = shellRadius + (orbitIndex * 0.05);
        
        // Position electrons on their respective orbital paths
        let electronX, electronY, electronZ;
        
        switch (orbitIndex) {
          case 0: // North-South orbit (horizontal)
            electronX = radiusVariation * Math.cos(angle);
            electronY = 0; // Stay on the horizontal plane
            electronZ = radiusVariation * Math.sin(angle);
            break;
          case 1: // East-West orbit (vertical)
            electronX = radiusVariation * Math.cos(angle);
            electronY = radiusVariation * Math.sin(angle);
            electronZ = 0; // Stay on the vertical plane
            break;
          case 2: // Diagonal 1 orbit
            electronX = radiusVariation * Math.cos(angle) * 0.7;
            electronY = radiusVariation * Math.sin(angle) * 0.7;
            electronZ = radiusVariation * Math.sin(angle) * 0.7;
            break;
          case 3: // Diagonal 2 orbit
            electronX = radiusVariation * Math.cos(angle) * 0.7;
            electronY = radiusVariation * Math.sin(angle) * 0.7;
            electronZ = radiusVariation * Math.cos(angle) * 0.7;
            break;
          default:
            // Fallback to North-South orbit
            electronX = radiusVariation * Math.cos(angle);
            electronY = 0;
            electronZ = radiusVariation * Math.sin(angle);
        }
        
        electron.position.set(electronX, electronY, electronZ);
        
        // Enhanced animation data
        electron.userData = { 
          orbitIndex: orbitIndex,
          shellRadius: radiusVariation, 
          angle: angle, 
          speed: 0.015 / shellNumber, // Slower for outer shells
          // Add individual timing offsets for varied movement
          timeOffset: Math.random() * Math.PI * 2
        };
        
        atomGroup.add(electron);
        electronShells.push(electron);
      }
      
      remainingElectrons -= electronsInShell;
      shellNumber++;
    }

    // Mouse controls with improved responsiveness
    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;
    let rotationX = 0;
    let rotationY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseDown = (event) => {
      isMouseDown = true;
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleMouseMove = (event) => {
      if (!isMouseDown) return;
      
      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;
      
      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;
      
      // Limit vertical rotation
      targetRotationX = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, targetRotationX));
      
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

    // Add event listeners
    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('wheel', handleWheel);

    // Smooth rotation interpolation
    const lerpFactor = 0.05;

    // Animation loop with improved performance
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      // Smooth rotation interpolation
      rotationX += (targetRotationX - rotationX) * lerpFactor;
      rotationY += (targetRotationY - rotationY) * lerpFactor;
      
      // Apply smooth rotation to the entire atom
      atomGroup.rotation.x = rotationX;
      atomGroup.rotation.y = rotationY;
      
      // Rotate nucleus slowly
      nucleusGroup.rotation.y += 0.002;
      
      // Enhanced electron animations - electrons follow their orbital paths
      electronShells.forEach((electron, index) => {
        const { orbitIndex, shellRadius, speed, timeOffset } = electron.userData;
        electron.userData.angle += speed;
        
        // Simple circular movement around the orbit
        const time = electron.userData.angle + timeOffset;
        const radiusVariation = shellRadius;
        
        let newX, newY, newZ;
        
        // Ensure orbitIndex is valid and electrons stay on their paths
        const validOrbitIndex = orbitIndex % 4;
        
        switch (validOrbitIndex) {
          case 0: // North-South orbit (horizontal)
            newX = radiusVariation * Math.cos(time);
            newY = 0; // Stay on horizontal plane
            newZ = radiusVariation * Math.sin(time);
            break;
          case 1: // East-West orbit (vertical)
            newX = radiusVariation * Math.cos(time);
            newY = radiusVariation * Math.sin(time);
            newZ = 0; // Stay on vertical plane
            break;
          case 2: // Diagonal 1 orbit
            newX = radiusVariation * Math.cos(time) * 0.7;
            newY = radiusVariation * Math.sin(time) * 0.7;
            newZ = radiusVariation * Math.sin(time) * 0.7;
            break;
          case 3: // Diagonal 2 orbit
            newX = radiusVariation * Math.cos(time) * 0.7;
            newY = radiusVariation * Math.sin(time) * 0.7;
            newZ = radiusVariation * Math.cos(time) * 0.7;
            break;
          default:
            // Fallback to North-South orbit
            newX = radiusVariation * Math.cos(time);
            newY = 0;
            newZ = radiusVariation * Math.sin(time);
        }
        
        // Update electron position with smooth interpolation
        electron.position.lerp(new THREE.Vector3(newX, newY, newZ), 0.1);
      });
      
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize with better performance
    const handleResize = () => {
      if (!mountRef.current || !renderer) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
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
      
      // Dispose of geometries and materials
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
