/*
 * FILE NAME   : lib.js
 * PROGRAMMER  : DC6
 * LAST UPDATE : 11.06.2024
 * PURPOSE     : Java script library for all modules file.
 */

export {mat4} from "./mathLib/mat4.js";
export {vec3, getN} from "./mathLib/vec3.js";
export {primitive, vertex} from "./resLib/primitives.js";
export {camera} from "./mathLib/camera.js";
export {anim} from "./render.js";
export {timer} from "./timer/timer.js";
export {shader} from "./resLib/shaders.js";
export {cube, dodecahedron, icosahedron, octahedron, tetrahedron} from "./solid.js";

/* END OF 'lib.js' FILE */