/*
 * FILE NAME   : main.js
 * PROGRAMMER  : DC6
 * LAST UPDATE : 13.06.2024
 * PURPOSE     : Main java script file.
 */

import * as dc from "./lib.js";
let areas = [document.getElementById("myCan"), 
             document.getElementById("myCan2")];

function main() {
  // 'myCan'
  window.addEventListener("load", () => {
    let canvas = areas[0];
    let rnd = dc.anim(canvas);
    rnd.shader = rnd.shaderCreate("default");

    const tetrahedron = new dc.tetrahedron(rnd);
    const tetraprim = tetrahedron.makePrim(rnd, dc.mat4());

    const draw = () => {
      // count rotation matrices
      let matx = dc.mat4().rotateX(30 * rnd.timer.globalTime);
      let maty = dc.mat4().rotateY(30 * rnd.timer.globalTime);
      let matz = dc.mat4().rotateZ(30 * rnd.timer.globalTime);

      // drawing
      rnd.render();

      // timer response
      rnd.timer.response();
  
      // draw tetrahedron
      tetraprim.render(rnd, matx.mul(maty.mul(matz)));

      // animation register
      window.requestAnimationFrame(draw);
    };
    draw();
  });  
  // 'myCan2'
  window.addEventListener("load", () => {
    let canvas = areas[1];
    let rnd = dc.anim(canvas);
    rnd.shader = rnd.shaderCreate("default");

    const cube = new dc.cube(rnd);
    const cubeprim = cube.makePrim(rnd, dc.mat4());

    const draw = () => {
      // count rotation matrices
      let matx = dc.mat4().rotateX(30 * rnd.timer.globalTime);
      let maty = dc.mat4().rotateY(30 * rnd.timer.globalTime);
      let matz = dc.mat4().rotateZ(30 * rnd.timer.globalTime);

      // drawing
      rnd.render();

      // timer response
      rnd.timer.response();

      // draw cube
      cubeprim.render(rnd, matx.mul(maty.mul(matz)));

      // animation register
      window.requestAnimationFrame(draw);
    };
    draw();
  });  
/*
  // 'myCan3'
  window.addEventListener("load", () => {
    let canvas = areas[2];
    let rnd = dc.anim(canvas);
    rnd.shader = rnd.shaderCreate("default");

    const draw = () => {
      // drawing
      rnd.render();
    
      // timer response
      rnd.timer.response();
  
      // animation register
      window.requestAnimationFrame(draw);
    };
    draw();
  });  
  // 'myCan4'
  window.addEventListener("load", () => {
    let canvas = areas[3];
    let rnd = dc.anim(canvas);
    rnd.shader = rnd.shaderCreate("default");

    const draw = () => {
      // drawing
      rnd.render();
    
      // timer response
      rnd.timer.response();
  
      // animation register
      window.requestAnimationFrame(draw);
    };
    draw();
  });  
  // 'myCan5'
  window.addEventListener("load", () => {
    let canvas = areas[4];
    let rnd = dc.anim(canvas);
    rnd.shader = rnd.shaderCreate("default");

    const draw = () => {
      // drawing
      rnd.render();

      // timer response
      rnd.timer.response();
  
      // animation register
      window.requestAnimationFrame(draw);
    };
    draw();
  });
*/
} // End of 'main' function

main();

/* END OF 'main.js' FILE */