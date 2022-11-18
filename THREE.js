// var Vertex = function(x, y, z){
//     this.x = parseFloat(x);
//     this.y = parseFloat(y);
//     this.z = parseFloat(z);
// }
// var Vertex2D = function(x, y) {
//     this.x = parseFloat(x);
//     this.y = parseFloat(y);
// };

// var Cube = function(center, size) {
//     // Generate the vertices
//     var d = size / 2;

//     this.vertices = [
//         new Vertex(center.x - d, center.y - d, center.z + d),
//         new Vertex(center.x - d, center.y - d, center.z - d),
//         new Vertex(center.x + d, center.y - d, center.z - d),
//         new Vertex(center.x + d, center.y - d, center.z + d),
//         new Vertex(center.x + d, center.y + d, center.z + d),
//         new Vertex(center.x + d, center.y + d, center.z - d),
//         new Vertex(center.x - d, center.y + d, center.z - d),
//         new Vertex(center.x - d, center.y + d, center.z + d)
//     ];

//     // Generate the faces
//     this.faces = [
//         [this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]],
//         [this.vertices[3], this.vertices[2], this.vertices[5], this.vertices[4]],
//         [this.vertices[4], this.vertices[5], this.vertices[6], this.vertices[7]],
//         [this.vertices[7], this.vertices[6], this.vertices[1], this.vertices[0]],
//         [this.vertices[7], this.vertices[0], this.vertices[3], this.vertices[4]],
//         [this.vertices[1], this.vertices[6], this.vertices[5], this.vertices[2]]
//     ];
// };

// function render(objects, ctx, dx, dy) {
//     // For each object
//     for (var i = 0, n_obj = objects.length; i < n_obj; ++i) {
//         // For each face
//         for (var j = 0, n_faces = objects[i].faces.length; j < n_faces; ++j) {
//             // Current face
//             var face = objects[i].faces[j];

//             // Draw the first vertex
//             var P = project(face[0]);
//             ctx.beginPath();
//             ctx.moveTo(P.x + dx, -P.y + dy);

//             // Draw the other vertices
//             for (var k = 1, n_vertices = face.length; k < n_vertices; ++k) {
//                 P = project(face[k]);
//                 ctx.lineTo(P.x + dx, -P.y + dy);
//             }

//             // Close the path and draw the face
//             ctx.closePath();
//             ctx.stroke();
//             ctx.fill();
//         }
//     }
// }