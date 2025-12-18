import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';

const Molecule3D = ({ moleculeData }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null);

  // Memoize geometries and materials for performance
  const geometries = useMemo(() => ({
    sphere: new THREE.SphereGeometry(0.3, 32, 32),
    cylinder: new THREE.CylinderGeometry(0.1, 1, 32, 32, 1, true), // Adjust length segments
  }), []);

  const materials = useMemo(() => ({
    O: new THREE.MeshPhongMaterial({ color: 0xff0000, specular: 0x333333, shininess: 25 }), // Red for Oxygen
    H: new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0x333333, shininess: 25 }), // White for Hydrogen
    bond: new THREE.MeshPhongMaterial({ color: 0xcccccc, specular: 0x333333, shininess: 25 }), // Gray for bonds
  }), []);

  useEffect(() => {
    if (!mountRef.current || !moleculeData) return;

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
      antialias: true,
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight2.position.set(-1, -1, -1).normalize();
    scene.add(directionalLight2);

    // Main group
    const moleculeGroup = new THREE.Group();
    scene.add(moleculeGroup);

    // Create atom positions - Force-directed layout
    const atomPositions = {};
    moleculeData.atoms.forEach(atom => {
      atomPositions[atom.id] = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize().multiplyScalar(2); // Initial random positions
    });

    // Force-directed layout simulation (very basic)
    for (let i = 0; i < 100; i++) { // Iterate for a number of steps
      moleculeData.bonds.forEach(bond => {
        const fromAtom = moleculeData.atoms.find(atom => atom.id === bond.from);
        const toAtom = moleculeData.atoms.find(atom => atom.id === bond.to);

        if (fromAtom && toAtom) {
          const fromPosition = atomPositions[fromAtom.id];
          const toPosition = atomPositions[toAtom.id];

          const force = new THREE.Vector3().subVectors(toPosition, fromPosition).normalize().multiplyScalar(0.01); // Attraction force
          fromPosition.add(force);
          toPosition.sub(force);
        }
      });
    }

    // Add atoms
    moleculeData.atoms.forEach(atom => {
      const geometry = geometries.sphere;
      const material = materials[atom.element] || new THREE.MeshPhongMaterial({ color: 0x808080 }); // Default gray
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(atomPositions[atom.id]);
      moleculeGroup.add(mesh);
    });

    // Add bonds
    moleculeData.bonds.forEach(bond => {
      const fromAtom = moleculeData.atoms.find(atom => atom.id === bond.from);
      const toAtom = moleculeData.atoms.find(atom => atom.id === bond.to);

      if (fromAtom && toAtom) {
        const fromPosition = atomPositions[fromAtom.id];
        const toPosition = atomPositions[toAtom.id];

        const bondGeometry = geometries.cylinder;
        const bondMaterial = materials.bond;
        const bond = new THREE.Mesh(bondGeometry, bondMaterial);

        // Calculate bond length and midpoint
        const bondLength = fromPosition.distanceTo(toPosition);
        const bondMidpoint = new THREE.Vector3().copy(fromPosition).lerp(toPosition, 0.5);

        // Position the bond
        bond.position.copy(bondMidpoint);

        // Orient the bond
        const direction = new THREE.Vector3().subVectors(toPosition, fromPosition).normalize();
        const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
        bond.setRotationFromQuaternion(quaternion);

        // Scale the bond (subtracting the radius of the atoms)
        bond.scale.y = bondLength - 0.6; // Assuming atom radius of 0.3

        moleculeGroup.add(bond);
      }
    });

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

      // Apply mouse rotation to entire molecule
      moleculeGroup.rotation.x = rotationX;
      moleculeGroup.rotation.y = rotationY;

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
  }, [moleculeData, geometries, materials]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full cursor-grab active:cursor-grabbing"
      style={{ touchAction: 'none' }}
    />
  );
};

export default Molecule3D;

