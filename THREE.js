
class Matrix{
    rows = 0;
    cols = 0;
    #data = [];
    constructor(row, col, fill){
        if(row < 1 || col < 1){return;}
        this.rows = row;
        this.cols = col;
        for (let i = 0; i < this.rows; ++i) {
            this.#data.push([]);
            for (let j = 0; j < this.cols; ++j) {
                this.#data[i].push( fill ? fill : 0);
            }
        }
    }

    at(i, j){
        if (this.rows != 0 && this.cols != 0 &&
            (  i < 0 || i > this.rows || j < 0 || j > this.cols ))
        {
            return undefined;
        }
        return this.#data[i][j];
    }

    setAt(i, j, val){
        if (this.rows != 0 && this.cols != 0 &&
            (  i < 0 || i > this.rows || j < 0 || j > this.cols ))
        {
            return undefined;
        }
        this.#data[i][j] = val;
    }

    mull(v){
        if(this.cols != v.rows){return undefined;}

        var retMatrix = new Matrix(this.rows, v.cols, 0);
        // let d = [];
        for (let i = 0; i < this.rows; ++i) {
            // d.push([]);
            for (let k = 0; k < v.cols; ++k) {
                let val = 0;
                for (let j = 0; j < this.cols; ++j) {
                    val += this.#data[i][j] * v.#data[j][k];
                }
                // d[i][k] = val;
                retMatrix.setAt(i, k, val);
            }
        }
        return retMatrix;

    }

}

// class Matrix4x1{
//     rows = 4;
//     cols = 4;
//     #data  = [
//         0,
//         0,
//         0,
//         0 ];

//     constructor(){
//     }

//     at(i){
//         if(i<0 || i > 4){return undefined;}
//         return this.#data[i];
//     }
// }

// class Matrix4x4{
//     rows = 4;
//     cols = 4;
//     #data  = [
//         [0,0,0,0],
//         [0,0,0,0],
//         [0,0,0,0],
//         [0,0,0,0]
//     ];
//     constructor(){
//     }
//     at(i, j){
//         if(i < 0 || i > 4 || j < 0 || j > 4 ){return undefined;}
//         return this.#data[i][j];
//     }
//     mull(v){
//         if(this.cols != v.rows){return undefined;}

//         for (let j = 0; j < this.rows; ++j) {
            
//             for (let i = 0; i < this.cols; ++i) {
//                 // const element = this.#[i];
                
//             }
//         }

//     }
// }

class Vector3{
    x = 0; y = 0; z = 0;
    constructor(x, y, z){
        this.x = x; 
        this.y = y;
        this.z = z;
    }

    add(v){
        return Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    sub(v){
        return Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    mull(a){
        this.x *= a; 
        this.y *= a;
        this.z *= a;
    }

    div(a){
        if(a == 0){return;}
        this.x /= a; 
        this.y /= a;
        this.z /= a;
    }

    length(){
        let mag = Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z);
        return mag;
    }

    norm(){
        let l = this.length();
        this.div(l);
        return l;
    }
}


class Material{
    color ='white';
    wireframe = true;
    constructor(color){
        this.color = color;
    }

}

class Geometry{
    vertices    = [];
    triangles   = [];
    uvs         = [];

    constructor(){

    }
}


class Object3D{

    #position = new Vector3(0,0,0);
    type = "Object3D";

    setPosition(position){this.#position = position;};
    getPosition(){return this.#position;}
}


class CubeGeoemetry extends Geometry{

    constructor(){
        super();        
        var s = .5;
        this.vertices = [
            new Vector3(-s, s,  s),
            new Vector3( s, s,  s),
            new Vector3( s, s, -s),
            new Vector3(-s, s, -s),
            new Vector3(-s, -s,  s),
            new Vector3( s, -s,  s),
            new Vector3( s, -s, -s),
            new Vector3(-s, -s, -s)
        ];

        this.triangles = [
            0,1,3,
            1,2,3,

            4,5,7,
            5,6,7,

            0,1,4,
            1,5,4,

            3,2,7,
            2,6,7,

            2,1,5,
            1,5,6,

            0,3,4,
            3,7,4
        ];

        this.uvs = [
            [0, 0],[1, 0],[0, 1],
            [1, 0],[1, 1],[0, 1],
            
            [0, 0],[1, 0],[0, 1],
            [1, 0],[1, 1],[0, 1],
            
            [0, 0],[1, 0],[0, 1],
            [1, 0],[1, 1],[0, 1],
            
            [0, 0],[1, 0],[0, 1],
            [1, 0],[1, 1],[0, 1],
            
            [0, 0],[1, 0],[0, 1],
            [1, 0],[1, 1],[0, 1],
            
            [0, 0],[1, 0],[0, 1],
            [1, 0],[1, 1],[0, 1]
        ]

    }

}


class Mesh extends Object3D{
    
    geometry = null;
    material = null;

    constructor(geometry, material){
        super();
        this.geometry = geometry;
        this.material = material;
        this.type ="Mesh";
    }
}


class Scene {

    #objects = [];
    constructor(){
        this.#objects = [];
    }

    add(object){
        this.#objects.push(object);
    }

    Meshes(){
        return this.#objects;
    }
}

class Renderer{
    #canvas = null;
    #ctx = null;
    #clearColor = "black";
    constructor(canvas){
        this.#canvas = canvas;
        this.#clearColor = "black";
    
        if(canvas != null){
            this.#ctx = this.#canvas.getContext('2d');
        }

    }

    render(camera, scene){
        if(this.#canvas == null){ return; }

        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        this.#ctx.fillStyle = (this.#clearColor);
        this.#ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);

        var meshes = scene.Meshes();

        meshes.forEach(m => {
            var g = m.geometry;
            var triangles = g.triangles;
            var verts = g.vertices;
            var uvs = g.uvs;

            // console.log(verts,"  triangles  " , triangles, " uvs:  " , uvs);
            var wireframe = m.material.wireframe;
            
            this.#ctx.fillStyle = "white";
            this.#ctx.strokeStyle = "white";
            this.#ctx.lineWidth = 1;
            this.#ctx.lineCap = 'square';
            for (let i = 0; i < triangles.length; i+=3) {
                var p1 = camera.project3DPoint(verts[triangles[i]])   ;
                var p2 = camera.project3DPoint(verts[triangles[i+1]]) ;
                var p3 = camera.project3DPoint(verts[triangles[i+2]]) ;
                p1.setAt(0,0, p1.at(0,0) * this.#canvas.width + this.#canvas.width / 2);
                p1.setAt(1,0, p1.at(1,0) * this.#canvas.height + this.#canvas.height / 2);

                p2.setAt(0,0, p2.at(0,0) * this.#canvas.width + this.#canvas.width / 2);
                p2.setAt(1,0, p2.at(1,0) * this.#canvas.height  + this.#canvas.height / 2);

                p3.setAt(0,0, p3.at(0,0) * this.#canvas.width + this.#canvas.width / 2);
                p3.setAt(1,0, p3.at(1,0) * this.#canvas.height + this.#canvas.height / 2);

                // uv1 = uvs[i];
                // uv2 = uvs[i + 1];
                // uv3 = uvs[i + 2];
                // console.log(p1, p2, p3);
                // var ci = Math.floor(Math.random() * colors.length);
                // ctx.fillStyle = colors[0];

                this.#ctx.beginPath();
                this.#ctx.moveTo(p1.at(0,0), p1.at(1,0));
                this.#ctx.lineTo(p2.at(0,0), p2.at(1,0));
                this.#ctx.lineTo(p3.at(0,0), p3.at(1,0));
                this.#ctx.closePath();
                // this.#ctx.fill();
                // console.log(p1, p2, p3);
                if(wireframe){
                    this.#ctx.stroke();
                }
            }
            if(false){
                this.#ctx.strokeStyle = "white";
                console.log(this.#canvas.width);
                this.#ctx.beginPath();
                for (let i = 0; i < triangles.length; i+=3) {
                    var p1 = camera.project3DPoint(verts[triangles[i]]);
                    var p2 = camera.project3DPoint(verts[triangles[i+1]]);
                    var p3 = camera.project3DPoint(verts[triangles[i+2]]);
                    p1.setAt(0, 0, p1.at(0,0) * this.#canvas.width );
                    p1.setAt(1, 0, p1.at(1,0) * this.#canvas.height );
                    p2.setAt(0, 0, p2.at(0,0) * this.#canvas.width );
                    p2.setAt(1, 0, p2.at(1,0) * this.#canvas.height );
                    
                    // console.log(p1, p2, p3);
                    this.#ctx.moveTo(p1[0] * this.#canvas.width, p1[1] * this.#canvas.height);
                    this.#ctx.lineTo(p2[0] * this.#canvas.width, p2[1] * this.#canvas.height);
                    this.#ctx.lineTo(p3[0] * this.#canvas.width, p3[1] * this.#canvas.height);
                    
                }
                this.#ctx.stroke();
            
            }

    // for (let i = 0; i < verts.length; i++) {
    //     var p = project(verts[i]);
    //     //console.log(p)
    //     ctx.beginPath();
    //     ctx.arc(p[0], p[1], 3,0, 2*Math.PI);
    //     ctx.fill();
    //     ctx.closePath();
        
    // }

        });

  
    }
}

class Camera extends Object3D{

    #projectionMatrix = null;

    #near = .1;
    #far = 1000;
    #fov = 60;
    #aspectRatio = 3 / 4;
    #f = 1;

    constructor(near, far, fov, aspectRatio = 3 / 4){
        super();
        this.#far = far;
        this.#fov = fov;
        this.#near = near;
        this.#aspectRatio = aspectRatio;

        this.#f = 1.0 / Math.tan(fov / 2 * Math.PI / 180.0);

        this.#updateProjectionMatrix();
    }

    setAspectRatio(aspectRatio){
        this.#aspectRatio = aspectRatio;
        this.#projectionMatrix.setAt(0, 0, this.#aspectRatio * this.#f);
    }

    setHorizontalFOV(fov){
        this.#fov = fov;
        this.#f = 1.0 / Math.tan(fov / 2 * Math.PI / 180.0);
        this.#projectionMatrix.setAt(0, 0, this.#aspectRatio * this.#f);
        this.#projectionMatrix.setAt(1, 1, this.#f);
    }

    getClippingRange(){
        return {near: near, far: far};
    }
    
    updateClippingRange(near, far){
        this.near   = near;
        this.far    = far;
        const frac = this.#far / (this.#far - this.#near);
        this.#projectionMatrix.setAt(2, 2, frac);
        this.#projectionMatrix.setAt(2, 3, - frac * this.#near);
    }

    #updateProjectionMatrix(){

        if(this.#projectionMatrix == null){
            this.#projectionMatrix = new Matrix(4, 4, 0);
        }
        this.#projectionMatrix.setAt(0, 0, this.#aspectRatio * this.#f);
        this.#projectionMatrix.setAt(1, 1, this.#f);
        const frac = this.#far / (this.#far - this.#near);
        this.#projectionMatrix.setAt(2, 2, frac);
        this.#projectionMatrix.setAt(2, 3, - frac * this.#near);
        this.#projectionMatrix.setAt(3, 2, 1);
        this.#projectionMatrix.setAt(0, 3, super.getPosition().x);
        this.#projectionMatrix.setAt(1, 3, super.getPosition().y);
        this.#projectionMatrix.setAt(2, 3, super.getPosition().z);
   
        
    }

    project3DPoint(v){

        let vt = new Matrix(4, 1);
        vt.setAt(0, 0, v.x);
        vt.setAt(1, 0, v.y);
        vt.setAt(2, 0, v.z);
        vt.setAt(3, 0,  1 );
        vt = this.#projectionMatrix.mull(vt);
        if(vt.at(3, 0) != 0){
            vt.setAt(0,0, vt.at(0,0) / vt.at(3, 0));
            vt.setAt(1,0, vt.at(1,0) / vt.at(3, 0));
            vt.setAt(2,0, vt.at(2,0) / vt.at(3, 0));
        }

        return vt;
    }

    setPosition(pos){
        super.setPosition(pos);
        this.#projectionMatrix.setAt(0, 3, pos.x);
        this.#projectionMatrix.setAt(1, 3, pos.y);
        this.#projectionMatrix.setAt(2, 3, pos.z);
   
    }
    getprojectionMatrix(){
        return this.#projectionMatrix;
    }
}







// initScene = function()

    let canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    document.body.appendChild(canvas);
    const cubeGeometry = new CubeGeoemetry();
    cubeGeometry.vertices.forEach(v =>{
        v.z += 10;
    });

    const mat = new Material();
    const mesh = new Mesh(cubeGeometry, mat);
    
    const scene = new Scene();
    scene.add(mesh);
    
    const camera = new Camera(0.1, 10000, 60);
    console.log(480 / 640)
    camera.setAspectRatio(480 / 640);
    camera.setPosition( new Vector3(0, 0, 0));
    console.log(camera.getprojectionMatrix());
    console.log('camera pos 0, 1, -5 ', camera.getPosition());
    
    const renderer = new Renderer(canvas);

    renderer.render(camera, scene);

    requestAnimationFrame(()=>{renderer.render(camera, scene)});


    var v = new Vector3(0, 0, 1);
    var v2 = new Vector3(-1, 0, 1);
    var v3 = new Vector3(1, 0, 1);
    
    console.log(camera.project3DPoint(v));
    console.log(camera.project3DPoint(v2));
    console.log(camera.project3DPoint(v3));


document.getElementById("cam_pos_x").onchange = (e)=>{
    let val = document.getElementById("cam_pos_x").value;
    camera.getPosition().x = +val;
    camera.setPosition(camera.getPosition())
    console.log(camera.getPosition());
    renderer.render(camera, scene);
}

document.getElementById("cam_pos_y").onchange = (e)=>{
    let val = document.getElementById("cam_pos_y").value;
    camera.getPosition().y = +val;
    camera.setPosition(camera.getPosition())
    console.log(camera.getPosition());
    renderer.render(camera, scene);
}

document.getElementById("cam_pos_z").onchange = (e)=>{
    let val = document.getElementById("cam_pos_z").value;
    camera.getPosition().z = +val;
    camera.setPosition(camera.getPosition())
    console.log(camera.getPosition());
    renderer.render(camera, scene);
}

// initScene();