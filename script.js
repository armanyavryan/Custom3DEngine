
// // function persp(x,z){
// //     return fov*x/z;
// // }

// function add(v0, v1){
//     return [
//         v0[0] + v1[0],
//         v0[1] + v1[1],
//         v0[2] + v1[2]
//         ] 
// }

// function sub(v0, v1){
//     return [
//         v0[0] - v1[0],
//         v0[1] - v1[1],
//         v0[2] - v1[2]
//         ] 
// }
// function mag(v){
//     var mag = Math.sqrt(
//         v[0]*v[0] +
//         v[1]*v[1] +
//         v[2]*v[2]);
//     return mag;
// }
// function norm(v){
//     var mag = Math.sqrt(
//         v[0]*v[0] +
//         v[1]*v[1] +
//         v[2]*v[2]);
//     v[0] /= mag;
//     v[1] /= mag;
//     v[2] /= mag;
//     return v;
// }

// function mull(v, val){
//     return[
//         v[0] * val,
//         v[1] * val,
//         v[2] * val
//     ]
// }

// function cross(a, b){
//     return [
//         a[1] *b[2] - a[2]*b[1],
//         a[2] *b[0] - a[0]*b[2],
//         a[0] *b[1] - a[1]*b[0]
//     ];
// }

// function dot(a, b){
//     return a[0] *b[0] + a[1]*b[1] + a[2]*b[2];
// }

// // function project(v) {
// //     return [window.innerWidth / 2 + persp(v[0], v[2]),
// //         window.innerHeight / 2 + persp(v[1], v[2])];
// // }

// // function facingSide(x0, y0, x1, y1, x2, y2){
// //     return (x1 - x0)* (y2 - y0)
// //             -(x2 - x0)*(y1 - y0);
// // }

// var v = [10, 5, 3];
// // console.log(v)
// // norm(v)
// // console.log(v)


// function calculateplaneCorners(){

//     var planeCenter =add(camP,  mull(camF, camNear));

//     var camR = cross(camF, camU);
//     norm(camR);
//     var magR = camNear * Math.tan(fov / 2);

//     var aspect = window.innerWidth / window.innerHeight;
//     var magU = magR / aspect;
    
//     var topcenter = add(planeCenter, mull(camU, magU));
//     var bottomcenter = add(planeCenter, mull(camU, -magU));

//     var tl = sub( topcenter, mull(camR, magR));
//     var tr = add( topcenter, mull(camR, magR));
//     var bl = sub( bottomcenter, mull(camR, magR));
//     var br = add( bottomcenter, mull(camR, magR));
//     corners.tl = tl;
//     corners.tr = tr;
//     corners.bl = bl;
//     corners.br = br;
// }

// function project(vert){

//     var v = sub(vert, camP);

//     nv = [v[0], v[1], v[2]];
//     norm(nv);

//     var dist = mag(v);
//     // console.log(v, dist)
//     // debugger;
//     // if(dist < camNear){return false;}
//     var projOnDir = mull(camF, dist);
//     deltaPlaneParallel = sub(v, projOnDir);
//     var frac = camNear / dist;

//     var ray = sub(v, camP);
//     norm(ray);
//     var projectedPointOnPlane = mull(ray, frac);
//     var p_to_tl = sub(projectedPointOnPlane, corners.tl); 
//     var hor_norm  = norm(sub(corners.tr, corners.tl));
//     var vert_norm = norm(sub(corners.bl, corners.tl));
//     var alpha = dot(p_to_tl, hor_norm); 
//     var betta = dot(p_to_tl, vert_norm);
    
//     return [alpha * c.width, betta * c.width];

//     // var ray = sub(v, camP);
//     // var distU = (
//     //     ray[0] * camU[0] +
//     //     ray[1] * camU[1] +
//     //     ray[2] * camU[2]);
//     // var projU = sub( v, mull(camU, distU))
//     // //
//     // var camR = cross(camF, camU);
//     // norm(camR);
//     // var distR = (
//     //     ray[0] * camR[0] +
//     //     ray[1] * camR[1] +
//     //     ray[2] * camR[2]);
//     // var projR = sub( v, mull(camR, distR))
    

// }

// ///
// wireframe = true;

// var s = .5;
// var verts = [
//     [-s, s,  s],
//     [ s, s,  s],
//     [ s, s, -s],
//     [-s, s, -s],

//     [-s, -s,  s],
//     [ s, -s,  s],
//     [ s, -s, -s],
//     [-s, -s, -s],
//   ]



// var triangles = [
//     0,1,3,
//     1,2,3,

//     4,5,7,
//     5,6,7,

//     0,1,4,
//     1,5,4,

//     3,2,7,
//     2,6,7,

//     2,1,5,
//     1,5,6,

//     0,3,4,
//     3,7,4
// ];

// var uvs = [
//     [0, 0],[1, 0],[0, 1],
//     [1, 0],[1, 1],[0, 1],
    
//     [0, 0],[1, 0],[0, 1],
//     [1, 0],[1, 1],[0, 1],
    
//     [0, 0],[1, 0],[0, 1],
//     [1, 0],[1, 1],[0, 1],
    
//     [0, 0],[1, 0],[0, 1],
//     [1, 0],[1, 1],[0, 1],
    
//     [0, 0],[1, 0],[0, 1],
//     [1, 0],[1, 1],[0, 1],
    
//     [0, 0],[1, 0],[0, 1],
//     [1, 0],[1, 1],[0, 1]
// ]

// var corners = {
//     tl: [-1, +0.75, 0],
//     tr: [+1, +0.75, 0],
//     bl: [-1, -0.75, 0],
//     br: [+1, -0.75, 0],
// }
// var edges = [0, 1];
// var camP = [0, 0, 2];
// var camF = [0, 0, 1];
// var camU = [0, 1, 0];
// var fov = 60 * Math.PI / 180;
// var camNear = 1;

// var texture = new Image();
// texture.src = "./texture.jpg"
// texture.onload = function(){

// };
// c = document.querySelector("canvas");
// ctx = c.getContext("2d");

// colors = [
//     "red",
//     "green",
//     "purple",
//     "yellow",
//     "blue"
// ];



// function frame(){
//     c.width = window.innerWidth;
//     c.height = window.innerHeight;
//     // console.log("asd");
//     // camP[0] = 2* Math.sin(Date.now() / 3000);
//     camP[1] = .4 *Math.cos(Date.now() / 3000);
//     camP[2] = -2 - .1* Math.sin(Date.now() / 3000);

//     calculateplaneCorners();

//     ctx.fillStyle = "white";    
//     ctx.strokeStyle = "green";    

//     for (let i = 0; i < triangles.length; i+=3) {
//         var p1 = project(verts[triangles[i]]);
//         var p2 = project(verts[triangles[i+1]]);
//         var p3 = project(verts[triangles[i+2]]);
//         uv1 = uvs[i];
//         uv2 = uvs[i + 1];
//         uv3 = uvs[i + 2];
//         // console.log(p1, p2, p3);
//         var ci = Math.floor(Math.random() * colors.length);
//         // ctx.fillStyle = colors[0];
//         ctx.beginPath();
//         ctx.moveTo(p1[0], p1[1]);
//         ctx.lineTo(p2[0], p2[1]);
//         ctx.lineTo(p3[0], p3[1]);
//         ctx.closePath();
//         ctx.fill();
//         if(wireframe){
//             ctx.stroke();
//         }
//     }
//     if(wireframe){
//         ctx.beginPath();
//         for (let i = 0; i < triangles.length; i+=3) {
//             var p1 = project(verts[triangles[i]]);
//             var p2 = project(verts[triangles[i+1]]);
//             var p3 = project(verts[triangles[i+2]]);
//             ctx.moveTo(p1[0], p1[1]);
//             ctx.lineTo(p2[0], p2[1]);
//             ctx.lineTo(p3[0], p3[1]);
            
//         }
//         ctx.stroke();
    
//     }

//     // for (let i = 0; i < verts.length; i++) {
//     //     var p = project(verts[i]);
//     //     //console.log(p)
//     //     ctx.beginPath();
//     //     ctx.arc(p[0], p[1], 3,0, 2*Math.PI);
//     //     ctx.fill();
//     //     ctx.closePath();
        
//     // }

// }

// (()=>setInterval(frame))();
