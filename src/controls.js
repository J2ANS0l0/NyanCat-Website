function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}

export let controls = {};

window.addEventListener("keydown", (e) => {
  controls[e.key.toLowerCase()] = true;
});
window.addEventListener("keyup", (e) => {
  controls[e.key.toLowerCase()] = false;
});

let maxVelocity = 0.04;
let jawVelocity = 0;
let pitchVelocity = 0;
let planeSpeed = 0.006;
export let turbo = 0;
export let cameraView = 0; // 0 = vista actual (seguimiento), 1 = vista lateral
let vKeyPressed = false;

export function updatePlaneAxis(x, y, z, planePosition, camera) {
  jawVelocity *= 0.95;
  pitchVelocity *= 0.95;

  if (Math.abs(jawVelocity) > maxVelocity) 
    jawVelocity = Math.sign(jawVelocity) * maxVelocity;

  if (Math.abs(pitchVelocity) > maxVelocity) 
    pitchVelocity = Math.sign(pitchVelocity) * maxVelocity;

  // Mapear controles dependiendo de la vista
  let inputA = controls["a"];
  let inputD = controls["d"];
  let inputW = controls["w"];
  let inputS = controls["s"];

  // En vista 2: W es D, D es W, A es S, S es A
  if (cameraView === 1) {
    inputW = controls["d"];
    inputD = controls["w"];
    inputA = controls["s"];
    inputS = controls["a"];
  }

  if (inputA) {
    jawVelocity += 0.0025;
  }

  if (inputD) {
    jawVelocity -= 0.0025;
  }

  if (inputW) {
    pitchVelocity -= 0.0025;
  }

  if (inputS) {
    pitchVelocity += 0.0025;
  }

  if (controls["r"]) {
    jawVelocity = 0;
    pitchVelocity = 0;
    turbo = 0;
    x.set(1, 0, 0);
    y.set(0, 1, 0);
    z.set(0, 0, 1);
    planePosition.set(0, 3, 7);
  }

  // Alternar vista de cámara con la tecla "v"
  if (controls["v"] && !vKeyPressed) {
    cameraView = cameraView === 0 ? 1 : 0;
    vKeyPressed = true;
  } else if (!controls["v"]) {
    vKeyPressed = false;
  }

  x.applyAxisAngle(z, jawVelocity);
  y.applyAxisAngle(z, jawVelocity);

  y.applyAxisAngle(x, pitchVelocity);
  z.applyAxisAngle(x, pitchVelocity);

  x.normalize();
  y.normalize();
  z.normalize();


  // plane position & velocity
  if (controls.shift) {
    turbo += 0.025;
  } else {
    turbo *= 0.95;
  }
  turbo = Math.min(Math.max(turbo, 0), 1);

  let turboSpeed = easeOutQuad(turbo) * 0.02;

  camera.fov = 45 + turboSpeed * 900;
  camera.updateProjectionMatrix();

  planePosition.add(z.clone().multiplyScalar(-planeSpeed -turboSpeed));
}