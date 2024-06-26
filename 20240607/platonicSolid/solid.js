/*
 * FILE NAME   : solid.js
 * PROGRAMMER  : DC6
 * LAST UPDATE : 14.06.2024
 * PURPOSE     : Platonic solid javascript library.
 */

import {vec3} from "./mathLib/vec3.js";
import {mat4} from "./mathLib/mat4.js";
import {vertex} from "./lib.js";
import {primitive} from "./resLib/primitives.js";

function D2R(L) {
  return L * (Math.PI / 180.0);
} // End of 'D2R' function

class solid {
  constructor(rnd) {
    this.rnd = rnd;
    this.vertexes = [];
    this.matrix = mat4();
  } // End of 'constructor' function

  makePrim(matrix) {
    let indicies = [];
    let vertexes = [];
    let j = 0;
    this.matrix = matrix;

    for (let edge of this.vertexes) {
      for (let v of edge) {
        vertexes.push(vertex(v, vec3(0)));
      }

      for (let i = 2; i < edge.length; i++) {
        indicies.push(j + 0);
        indicies.push(j + i - 1);
        indicies.push(j + i);
      }
      j += edge.length;
    }

    return primitive(this.rnd, this.rnd.gl.TRIANGLES, vertexes, indicies);
  } // End of 'makePrim' function
} // End of 'solid' class

export class tetrahedron extends solid {
  constructor(rnd) {
    super(rnd);
    const a = 1,
      r = Math.sqrt(a * a - (a * a) / 4) / 3,
      h = Math.sqrt(a * a - 4 * r * r),
      top = vec3(0, 0, (3 * h) / 4),
      left = vec3(-a / 2, -r, -h / 4),
      right = vec3(a / 2, -r, -h / 4),
      front = vec3(0, 2 * r, -h / 4);

    this.vertexes = [
      [left, front, top],
      [left, right, top],
      [right, front, top],
      [right, front, left],
    ];
  } // End of 'constructor' function
} // End of 'tetrahedron' class

export class cube extends solid {
  constructor(rnd) {
    super(rnd);
    this.vertexes = [
      [vec3(-0.5, -0.5, -0.5), vec3(-0.5, 0.5, -0.5), vec3(0.5, 0.5, -0.5), vec3(0.5, -0.5, -0.5)],
      [vec3(-0.5, -0.5, 0.5), vec3(-0.5, 0.5, 0.5), vec3(0.5, 0.5, 0.5), vec3(0.5, -0.5, 0.5)],
      [vec3(-0.5, -0.5, -0.5), vec3(-0.5, -0.5, 0.5), vec3(-0.5, 0.5, 0.5), vec3(-0.5, 0.5, -0.5)],
      [vec3(0.5, -0.5, -0.5), vec3(0.5, -0.5, 0.5), vec3(0.5, 0.5, 0.5), vec3(0.5, 0.5, -0.5)],
      [vec3(-0.5, -0.5, -0.5), vec3(-0.5, -0.5, 0.5), vec3(0.5, -0.5, 0.5), vec3(0.5, -0.5, -0.5)],
      [vec3(-0.5, 0.5, -0.5), vec3(-0.5, 0.5, 0.5), vec3(0.5, 0.5, 0.5), vec3(0.5, 0.5, -0.5)]
    ];
  } // End of 'constructor' function
} // End of 'cube' function

export class octahedron extends solid {
  constructor(rnd) {
    super(rnd);
    const pnt = 0.5;
    this.vertexes = [
      [vec3(0.0, 0.0, pnt), vec3(-pnt, pnt, 0.0), vec3(-pnt, -pnt, 0.0)],
      [vec3(0.0, 0.0, pnt), vec3(-pnt, -pnt, 0.0), vec3(pnt, -pnt, 0.0)],
      [vec3(0.0, 0.0, pnt), vec3(pnt, -pnt, 0.0), vec3(pnt, pnt, 0.0)],
      [vec3(0.0, 0.0, pnt), vec3(pnt, pnt, 0.0), vec3(-pnt, pnt, 0.0)],
      [vec3(0.0, 0.0, -pnt), vec3(-pnt, pnt, 0.0), vec3(-pnt, -pnt, 0.0)],
      [vec3(0.0, 0.0, -pnt), vec3(-pnt, -pnt, 0.0), vec3(pnt, -pnt, 0.0)],
      [vec3(0.0, 0.0, -pnt), vec3(pnt, -pnt, 0.0), vec3(pnt, pnt, 0.0)],
      [vec3(0.0, 0.0, -pnt), vec3(pnt, pnt, 0.0), vec3(-pnt, pnt, 0.0)]
    ];
  }
}

export class dodecahedron extends solid {
  constructor(rnd) {
    super(rnd);
    const cos36 = Math.cos(D2R(36)) / 2,
      sin36 = Math.sin(D2R(36)) / 2,
      cos72 = Math.cos(D2R(72)) / 2,
      sin72 = Math.sin(D2R(72)) / 2,
      d = Math.sqrt(2 * (cos36 - sin36)) / 2,
      r = Math.sqrt((d * d) / 4 + 1) / 2,
      down = vec3(0, 0, -r),
      up = vec3(0, 0, r),
      dr = vec3(1 / 2, 0, -d),
      dru = vec3(cos72, sin72, -d),
      dlu = vec3(-cos36, sin36, -d),
      dld = vec3(-cos36, -sin36, -d),
      drd = vec3(cos72, -sin72, -d),
      ul = vec3(-1 / 2, 0, d),
      ulu = vec3(-cos72, sin72, d),
      uru = vec3(cos36, sin36, d),
      urd = vec3(cos36, -sin36, d),
      uld = vec3(-cos72, -sin72, d);

    const v11 = up.add(ul.add(ulu)).divNum(3),
      v12 = up.add(ulu.add(uru)).divNum(3),
      v13 = up.add(uru.add(urd)).divNum(3),
      v14 = up.add(urd.add(uld)).divNum(3),
      v15 = up.add(uld.add(ul)).divNum(3),
      v21 = dr.add(uru.add(dru)).divNum(3),
      v31 = uru.add(dru.add(ulu)).divNum(3),
      v22 = dru.add(ulu.add(dlu)).divNum(3),
      v32 = ulu.add(dlu.add(ul)).divNum(3),
      v23 = dlu.add(ul.add(dld)).divNum(3),
      v33 = ul.add(dld.add(uld)).divNum(3),
      v24 = dld.add(uld.add(drd)).divNum(3),
      v34 = uld.add(drd.add(urd)).divNum(3),
      v25 = drd.add(urd.add(dr)).divNum(3),
      v35 = urd.add(dr.add(uru)).divNum(3),
      v41 = down.add(dr.add(dru)).divNum(3),
      v42 = down.add(dru.add(dlu)).divNum(3),
      v43 = down.add(dlu.add(dld)).divNum(3),
      v44 = down.add(dld.add(drd)).divNum(3),
      v45 = down.add(drd.add(dr)).divNum(3);

    this.vertexes = [
      [v11, v12, v13, v14, v15],
      [v11, v12, v31, v22, v32],
      [v12, v13, v35, v21, v31],
      [v13, v14, v34, v25, v35],
      [v14, v15, v33, v24, v34],
      [v15, v11, v32, v23, v33],
      [v41, v42, v22, v31, v21],
      [v42, v43, v23, v32, v22],
      [v43, v44, v24, v33, v23],
      [v44, v45, v25, v34, v24],
      [v45, v41, v21, v35, v25],
      [v41, v42, v43, v44, v45]
    ];
  }
}

export class icosahedron extends solid {
  constructor(rnd) {
    super(rnd);
    const cos36 = Math.cos(D2R(36)) / 2,
      sin36 = Math.sin(D2R(36)) / 2,
      cos72 = Math.cos(D2R(72)) / 2,
      sin72 = Math.sin(D2R(72)) / 2,
      d = Math.sqrt(2 * (cos36 - sin36)) / 2,
      r = Math.sqrt((d * d) / 4 + 1) / 2;

    this.vertexes = [
      [vec3(0, 0, -r), vec3(0.5, 0, -d), vec3(cos72, sin72, -d)],
      [vec3(0, 0, -r), vec3(cos72, sin72, -d), vec3(-cos36, sin36, -d)],
      [vec3(0, 0, -r), vec3(-cos36, sin36, -d), vec3(-cos36, -sin36, -d)],
      [vec3(0, 0, -r), vec3(-cos36, -sin36, -d), vec3(cos72, -sin72, -d)],
      [vec3(0, 0, -r), vec3(cos72, -sin72, -d), vec3(0.5, 0, -d)],
      [vec3(0.5, 0, -d), vec3(cos36, sin36, d), vec3(cos72, sin72, -d)],
      [vec3(cos36, sin36, d), vec3(cos72, sin72, -d), vec3(-cos72, sin72, d)],
      [vec3(cos72, sin72, -d), vec3(-cos72, sin72, d), vec3(-cos36, sin36, -d)],
      [vec3(-cos72, sin72, d), vec3(-cos36, sin36, -d), vec3(-0.5, 0, d)],
      [vec3(-cos36, sin36, -d), vec3(-0.5, 0, d), vec3(-cos36, -sin36, -d)],
      [vec3(-0.5, 0, d), vec3(-cos36, -sin36, -d), vec3(-cos72, -sin72, d)],
      [vec3(-cos36, -sin36, -d), vec3(-cos72, -sin72, d), vec3(cos72, -sin72, -d)],
      [vec3(-cos72, -sin72, d), vec3(cos72, -sin72, -d), vec3(cos36, -sin36, d)],
      [vec3(cos72, -sin72, -d), vec3(cos36, -sin36, d), vec3(0.5, 0, -d)],
      [vec3(cos36, -sin36, d), vec3(0.5, 0, -d), vec3(cos36, sin36, d)],
      [vec3(0, 0, r), vec3(-0.5, 0, d), vec3(-cos72, sin72, d)],
      [vec3(0, 0, r), vec3(-cos72, sin72, d), vec3(cos36, sin36, d)],
      [vec3(0, 0, r), vec3(cos36, sin36, d), vec3(cos36, -sin36, d)],
      [vec3(0, 0, r), vec3(cos36, -sin36, d), vec3(-cos72, -sin72, d)],
      [vec3(0, 0, r), vec3(-cos72, -sin72, d), vec3(-0.5, 0, d)]
    ];
  }
}

/* END OF 'solid.js' FILE */