import * as THREE from 'three';

/**
 * Creates the 3D product (chair and books) using basic geometries
 * @param {THREE.Scene} scene - The Three.js scene to add the product to
 * @returns {THREE.Group} The product group containing all meshes
 */
export function createProduct(scene) {
  const group = new THREE.Group();

  // === Toy House Components ===
  const houseMaterial = new THREE.MeshStandardMaterial({ color: '#D2B48C', roughness: 0.7, metalness: 0.1 }); // Tan/Brown for house walls
  const roofMaterial = new THREE.MeshStandardMaterial({ color: '#A52A2A', roughness: 0.5, metalness: 0.1 }); // Brown for roof
  const windowMaterial = new THREE.MeshStandardMaterial({ color: '#87CEEB', roughness: 0.1, metalness: 0.1 }); // Sky Blue for windows
  const doorMaterial = new THREE.MeshStandardMaterial({ color: '#5C4033', roughness: 0.6, metalness: 0.1 }); // Dark Brown for door

  // House Body (main structure)
  const houseBody = new THREE.Mesh(new THREE.BoxGeometry(4, 3, 4), houseMaterial);
  houseBody.position.y = 1.5; // Half of height to sit on ground
  houseBody.userData.name = 'Toy House Body';
  group.add(houseBody);

  // Roof (pyramid/cone shape for a simple toy house)
  const roof = new THREE.Mesh(new THREE.ConeGeometry(3, 1.5, 4), roofMaterial); // Cone with 4 sides for a pyramid look
  roof.position.set(0, 3 + 0.75, 0); // Above the house body
  roof.rotation.y = Math.PI / 4; // Align sides with house body
  roof.userData.name = 'Toy House Roof';
  group.add(roof);

  // Chimney
  const chimney = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1, 0.5), roofMaterial);
  chimney.position.set(1.5, 3 + 0.5, -1.5); // On the roof
  chimney.userData.name = 'Toy House Chimney';
  group.add(chimney);

  // Door
  const door = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.5, 0.1), doorMaterial);
  door.position.set(0, 0.75, 2.05); // Centered on front, slightly in front of wall
  door.userData.name = 'Toy House Door';
  group.add(door);

  // Windows
  const windowWidth = 0.8;
  const windowHeight = 0.8;
  const windowThickness = 0.1;

  const frontWindow = new THREE.Mesh(new THREE.BoxGeometry(windowWidth, windowHeight, windowThickness), windowMaterial);
  frontWindow.position.set(1.2, 1.8, 2.05);
  frontWindow.userData.name = 'Toy House Front Window';
  group.add(frontWindow);

  const sideWindowLeft = new THREE.Mesh(new THREE.BoxGeometry(windowThickness, windowHeight, windowWidth), windowMaterial);
  sideWindowLeft.position.set(-2.05, 1.8, 0.5);
  sideWindowLeft.userData.name = 'Toy House Left Window';
  group.add(sideWindowLeft);

  const sideWindowRight = new THREE.Mesh(new THREE.BoxGeometry(windowThickness, windowHeight, windowWidth), windowMaterial);
  sideWindowRight.position.set(2.05, 1.8, 0.5);
  sideWindowRight.userData.name = 'Toy House Right Window';
  group.add(sideWindowRight);

  // === Doll on Roof ===
  const dollGroup = new THREE.Group();
  const dollSkinMaterial = new THREE.MeshStandardMaterial({ color: '#FFDBB0', roughness: 0.6, metalness: 0.1 }); // Peach skin tone
  const dollHairMaterial = new THREE.MeshStandardMaterial({ color: '#A0522D', roughness: 0.4, metalness: 0.1 }); // Sienna hair
  const dollDressMaterial = new THREE.MeshStandardMaterial({ color: '#FF69B4', roughness: 0.5, metalness: 0.1 }); // Hot Pink dress

  // Doll Body
  const dollBody = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 0.6, 32), dollDressMaterial); // Tapered body
  dollBody.position.y = 0.3; // Relative to dollGroup origin
  dollBody.userData.name = 'Doll Body';
  dollGroup.add(dollBody);

  // Doll Head
  const dollHead = new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 32), dollSkinMaterial);
  dollHead.position.y = 0.8; // Above the body
  dollHead.userData.name = 'Doll Head';
  dollGroup.add(dollHead);

  // Doll Hair (simple sphere on top)
  const dollHair = new THREE.Mesh(new THREE.SphereGeometry(0.22, 32, 32), dollHairMaterial);
  dollHair.position.set(0, 0.95, 0); // Slightly above and covering part of the head
  dollHair.userData.name = 'Doll Hair';
  dollGroup.add(dollHair);

  // Doll Arms
  const dollArmGeometry = new THREE.CapsuleGeometry(0.08, 0.4, 4, 8);
  const leftDollArm = new THREE.Mesh(dollArmGeometry, dollDressMaterial);
  leftDollArm.position.set(-0.3, 0.4, 0); // Position relative to body
  leftDollArm.rotation.z = Math.PI / 6; // Angle arms slightly
  leftDollArm.userData.name = 'Doll Left Arm';
  dollGroup.add(leftDollArm);

  const rightDollArm = new THREE.Mesh(dollArmGeometry, dollDressMaterial);
  rightDollArm.position.set(0.3, 0.4, 0);
  rightDollArm.rotation.z = -Math.PI / 6;
  rightDollArm.userData.name = 'Doll Right Arm';
  dollGroup.add(rightDollArm);

  // Doll Legs
  const dollLegGeometry = new THREE.CapsuleGeometry(0.1, 0.5, 4, 8);
  const leftDollLeg = new THREE.Mesh(dollLegGeometry, dollDressMaterial);
  leftDollLeg.position.set(-0.15, -0.05, 0); // Below body
  leftDollLeg.userData.name = 'Doll Left Leg';
  dollGroup.add(leftDollLeg);

  const rightDollLeg = new THREE.Mesh(dollLegGeometry, dollDressMaterial);
  rightDollLeg.position.set(0.15, -0.05, 0);
  rightDollLeg.userData.name = 'Doll Right Leg';
  dollGroup.add(rightDollLeg);

  // Position the doll on the ground
  dollGroup.position.set(0, 0.3, 2.5); // X, Y (half doll height to sit on ground), Z (in front of the door)
  dollGroup.userData.name = 'Doll';
  group.add(dollGroup);

  // === Teddy Bear Placeholder ===
  const teddyBearGroup = new THREE.Group();
  const teddyBearMaterial = new THREE.MeshStandardMaterial({ color: '#FFC0CB', roughness: 0.7, metalness: 0.1 }); // Pink color

  // Body
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), teddyBearMaterial);
  body.position.y = 0.5; // Relative to teddyBearGroup origin
  body.userData.name = 'Teddy Bear Body';
  teddyBearGroup.add(body);

  // Head
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.35, 32, 32), teddyBearMaterial);
  head.position.y = 1.1; // Above the body
  head.userData.name = 'Teddy Bear Head';
  teddyBearGroup.add(head);

  // Eyes
  const eyeMaterial = new THREE.MeshStandardMaterial({ color: '#333333', roughness: 0.1, metalness: 0.1 }); // Softer black/dark grey
  const eyeGeometry = new THREE.SphereGeometry(0.05, 16, 16);

  const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  leftEye.position.set(-0.12, 1.25, 0.3); // Relative to head position
  leftEye.userData.name = 'Teddy Bear Left Eye';
  teddyBearGroup.add(leftEye);

  const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  rightEye.position.set(0.12, 1.25, 0.3); // Relative to head position
  rightEye.userData.name = 'Teddy Bear Right Eye';
  teddyBearGroup.add(rightEye);

  // Pupils
  const pupilMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 }); // Black pupils
  const pupilGeometry = new THREE.SphereGeometry(0.02, 16, 16);

  const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
  leftPupil.position.set(-0.12, 1.25, 0.35); // Slightly in front of the left eye
  leftPupil.userData.name = 'Teddy Bear Left Pupil';
  teddyBearGroup.add(leftPupil);

  const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
  rightPupil.position.set(0.12, 1.25, 0.35); // Slightly in front of the right eye
  rightPupil.userData.name = 'Teddy Bear Right Pupil';
  teddyBearGroup.add(rightPupil);

  // Nose
  const noseMaterial = new THREE.MeshStandardMaterial({ color: '#6B4423', roughness: 0.4, metalness: 0.1 }); // Darker brown, less shiny
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.07, 32, 32), noseMaterial); // Use a sphere for a softer nose
  nose.position.set(0, 1.05, 0.37); // Adjusted position for spherical nose
  nose.userData.name = 'Teddy Bear Nose';
  teddyBearGroup.add(nose);

  // Mouth (simple line)
  const mouthMaterial = new THREE.MeshStandardMaterial({ color: '#FF69B4' }); // Hot Pink
  const mouth = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.15, 32), mouthMaterial);
  mouth.position.set(0, 0.95, 0.35); // Below the nose, shorter mouth
  mouth.rotation.x = Math.PI / 2;
  mouth.userData.name = 'Teddy Bear Mouth';
  teddyBearGroup.add(mouth);

  // Ears
  const earGeometry = new THREE.SphereGeometry(0.1, 32, 32);
  const leftEar = new THREE.Mesh(earGeometry, teddyBearMaterial);
  leftEar.position.set(-0.25, 1.35, 0); // Relative to head
  leftEar.userData.name = 'Teddy Bear Left Ear';
  teddyBearGroup.add(leftEar);
  const rightEar = new THREE.Mesh(earGeometry, teddyBearMaterial);
  rightEar.position.set(0.25, 1.35, 0); // Relative to head
  rightEar.userData.name = 'Teddy Bear Right Ear';
  teddyBearGroup.add(rightEar);

  // Inner Ears
  const innerEarMaterial = new THREE.MeshStandardMaterial({ color: '#F5B7C7', roughness: 0.7, metalness: 0.1 }); // Lighter pink for inner ear
  const innerEarGeometry = new THREE.SphereGeometry(0.05, 16, 16);
  const leftInnerEar = new THREE.Mesh(innerEarGeometry, innerEarMaterial);
  leftInnerEar.position.set(-0.25, 1.35, 0.05); // Slightly inside the left ear
  leftInnerEar.userData.name = 'Teddy Bear Left Inner Ear';
  teddyBearGroup.add(leftInnerEar);
  const rightInnerEar = new THREE.Mesh(innerEarGeometry, innerEarMaterial);
  rightInnerEar.position.set(0.25, 1.35, 0.05); // Slightly inside the right ear
  rightInnerEar.userData.name = 'Teddy Bear Right Inner Ear';
  teddyBearGroup.add(rightInnerEar);

  // Arms
  const armGeometry = new THREE.CapsuleGeometry(0.15, 0.5, 4, 8);
  const leftArm = new THREE.Mesh(armGeometry, teddyBearMaterial);
  leftArm.position.set(-0.6, 0.7, 0);
  leftArm.rotation.z = Math.PI / 4; // Rotate slightly
  leftArm.userData.name = 'Teddy Bear Left Arm';
  teddyBearGroup.add(leftArm);
  const rightArm = new THREE.Mesh(armGeometry, teddyBearMaterial);
  rightArm.position.set(0.6, 0.7, 0);
  rightArm.rotation.z = -Math.PI / 4; // Rotate slightly
  rightArm.userData.name = 'Teddy Bear Right Arm';
  teddyBearGroup.add(rightArm);

  // Legs
  const teddyBearLegGeometry = new THREE.CapsuleGeometry(0.18, 0.6, 4, 8);
  const leftLeg = new THREE.Mesh(teddyBearLegGeometry, teddyBearMaterial);
  leftLeg.position.set(-0.3, 0.1, 0.1); // Position relative to body base
  leftLeg.userData.name = 'Teddy Bear Left Leg';
  teddyBearGroup.add(leftLeg);
  const rightLeg = new THREE.Mesh(teddyBearLegGeometry, teddyBearMaterial);
  rightLeg.position.set(0.3, 0.1, 0.1); // Position relative to body base
  rightLeg.userData.name = 'Teddy Bear Right Leg';
  teddyBearGroup.add(rightLeg);

  // Position the entire teddy bear group inside the toy house
  teddyBearGroup.position.set(0, 0.5, 0); // Position relative to the house floor
  teddyBearGroup.userData.name = 'Teddy Bear';
  group.add(teddyBearGroup);

  // Enable shadows for all meshes
  group.traverse(obj => {
    if (obj.isMesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });

  // Add animation properties
  group.userData.animation = {
    time: 0,
    speed: 1.0,
    amplitude: 0.05
  };

  scene.add(group);
  return group;
}


