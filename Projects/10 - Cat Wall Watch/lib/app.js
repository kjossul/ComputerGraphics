const BASE_DIR = window.location.href.substring(0, window.location.href.lastIndexOf("/") + 1);

let canw, canh;

let directionalLight = null,
    directionalLightColor = null;

let canvas = null,
    gl = null;

let objects = {};

let catBody = null,
    clockHand1 = null,
    clockHand2 = null,
    catEye = null,
    catTail = null;

let texture = null;

let viewMatrix = null;

//example taken from webGLTutorial2
var Node = function() {
    this.children = [];
    this.localMatrix = utils.identityMatrix();
    this.worldMatrix = utils.identityMatrix();
};

Node.prototype.setParent = function(parent) {
    // remove us from our parent
    if (this.parent) {
        var ndx = this.parent.children.indexOf(this);
        if (ndx >= 0) {
            this.parent.children.splice(ndx, 1);
        }
    }

    // Add us to our new parent
    if (parent) {
        parent.children.push(this);
    }
    this.parent = parent;
};

Node.prototype.updateWorldMatrix = function(matrix) {
    if (matrix) {
        // a matrix was passed in so do the math
        this.worldMatrix = utils.multiplyMatrices(matrix, this.localMatrix);
    } else {
        // no matrix was passed in so just copy.
        utils.copy(this.localMatrix, this.worldMatrix);
    }

    // now process all the children
    var worldMatrix = this.worldMatrix;
    this.children.forEach(function(child) {
        child.updateWorldMatrix(worldMatrix);
    });
};


function main() {
    //define directional light
    let dirLightAlpha = -utils.degToRad(60);
    let dirLightBeta = -utils.degToRad(120);

    directionalLight = [Math.cos(dirLightAlpha) * Math.cos(dirLightBeta),
        Math.sin(dirLightAlpha),
        Math.cos(dirLightAlpha) * Math.sin(dirLightBeta)
    ];
    directionalLightColor = [1.0, 1.0, 1.0];

    utils.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.85, 0.85, 0.85, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    viewMatrix = utils.MakeView(0.0, 0.0, 5.0, 0.0, 0.0);
    drawScene();
}

function makeSceneGraph(programs) {
    // SCENE GRAPH
    objects["body"] = new Node();
    objects["body"].localMatrix = utils.MakeWorld(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0);
    objects["body"].drawInfo = {
        program: programs["body"],
        mesh: catBody,
        vao: gl.createVertexArray(),
        color: [1.0, 1.0, 1.0],
    };
    objects["eye1"] = new Node();
    objects["eye1"].localMatrix = eye1LocalMatrix;
    objects["eye1"].drawInfo = {
        program: programs["eye"],
        mesh: catEye,
        vao: gl.createVertexArray(),
        color: [1.0, 1.0, 1.0],
    };
    objects["eye2"] = new Node();
    objects["eye2"].localMatrix = eye2LocalMatrix;
    objects["eye2"].drawInfo = {
        program: programs["eye"],
        mesh: catEye,
        vao: gl.createVertexArray(),
        color: [1.0, 1.0, 1.0],
    };
    objects["hand1"] = new Node();
    objects["hand1"].localMatrix = clockHand1LocalMatrix;
    objects["hand1"].drawInfo = {
        program: programs["clockHand1"],
        mesh: clockHand1,
        vao: gl.createVertexArray(),
        color: [1.0, 1.0, 1.0],
    };
    objects["hand2"] = new Node();
    objects["hand2"].localMatrix = clockHand2LocalMatrix;
    objects["hand2"].drawInfo = {
        program: programs["clockHand2"],
        mesh: clockHand2,
        vao: gl.createVertexArray(),
        color: [1.0, 1.0, 1.0],
    };
    objects["tail"] = new Node();
    objects["tail"].localMatrix = tailLocalMatrix;
    objects["tail"].drawInfo = {
        program: programs["tail"],
        mesh: catTail,
        vao: gl.createVertexArray(),
        color: [0.0, 0.0, 0.0],
    };
    objects["eye1"].setParent(objects["body"]);
    objects["eye2"].setParent(objects["body"]);
    objects["hand1"].setParent(objects["body"]);
    objects["hand2"].setParent(objects["body"]);
    objects["tail"].setParent(objects["body"]);
}

function animate() {
    // TODO
}


function drawScene() {
    // animate(); TODO
    gl.clearColor(0.85, 0.85, 0.85, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    console.log(objects);
    objects["body"].updateWorldMatrix();
    console.log(objects);
    // TODO DO THIS FOR EACH OBJECT
    for (let [k, v] of Object.entries(objects)) {
        let program = v.drawInfo.program;
        gl.useProgram(program);
        gl.bindVertexArray(v.vao);
        let positionAttributeLocation = gl.getAttribLocation(program, "inPosition");
        let normalAttributeLocation = gl.getAttribLocation(program, "inNormal");

        let positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(v.drawInfo.mesh.vertices), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

        let normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(v.drawInfo.mesh.vertexNormals), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(normalAttributeLocation);
        gl.vertexAttribPointer(normalAttributeLocation, 3, gl.FLOAT, false, 0, 0);

        let indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(v.drawInfo.mesh.indices), gl.STATIC_DRAW);

        if (k === "body" || k === "eye1") {
            let uvAttributeLocation = gl.getAttribLocation(program, "a_uv");
            let uvBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(v.drawInfo.mesh.textures), gl.STATIC_DRAW);
            gl.enableVertexAttribArray(uvAttributeLocation);
            gl.vertexAttribPointer(uvAttributeLocation, 2, gl.FLOAT, false, 0, 0);
        }
        let matrixLocation = gl.getUniformLocation(program, "matrix");
        let materialDiffColorHandle = gl.getUniformLocation(program, 'mDiffColor');
        let lightDirectionHandle = gl.getUniformLocation(program, 'lightDirection');
        let lightColorHandle = gl.getUniformLocation(program, 'lightColor');

        let perspectiveMatrix = utils.MakePerspective(90, gl.canvas.width / gl.canvas.height, 0.1, 100.0);

        let viewWorldMatrix = utils.multiplyMatrices(viewMatrix, v.worldMatrix);
        let projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, viewWorldMatrix);

        let lightDirMatrix = utils.sub3x3from4x4(utils.transposeMatrix(v.worldMatrix));
        let directionalLightTransformed =
            utils.normalizeVec3(utils.multiplyMatrix3Vector3(lightDirMatrix, directionalLight));

        gl.uniformMatrix4fv(matrixLocation, gl.FALSE, utils.transposeMatrix(projectionMatrix));

        gl.uniform3fv(materialDiffColorHandle, v.drawInfo.color);
        gl.uniform3fv(lightColorHandle, directionalLightColor);
        gl.uniform3fv(lightDirectionHandle, directionalLightTransformed);

        if (k === "body" || k === "eye1" || k === "eye2") {
            let textLocation = gl.getUniformLocation(program, "u_texture");
            gl.activeTexture(gl.TEXTURE0);
            gl.uniform1i(textLocation, texture);
        }
        gl.drawElements(gl.TRIANGLES, v.drawInfo.mesh.indices.length, gl.UNSIGNED_SHORT, 0);
        if (k === "eye2") {
            break;
        }
    }
   // END BLOCK
    window.requestAnimationFrame(drawScene);
}

async function init() {
    let shaderDir = BASE_DIR + "lib/Shaders/";
    let programs = {};
    canvas = document.getElementById("c");
    gl = canvas.getContext("webgl2");
    if (!gl) {
        document.write("GL context not opened");
        return;
    }
    ["body", "clockHand1", "clockHand2", "eye", "tail"].forEach(async function (k) {
        let t = (k === "body" || k === "eye") ? "texture" : "color";
        await utils.loadFiles([shaderDir + 'vs_' + t + '.glsl', shaderDir + 'fs_' + t + '.glsl'], function (shaderText) {
            let vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[0]);
            let fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[1]);
            programs[k] = utils.createProgram(gl, vertexShader, fragmentShader);
        });
    });
    /* LOAD OBJECTS */
    catBody = new OBJ.Mesh(await utils.get_objstr(BASE_DIR + "Assets/Body/Cat_body_norm.obj"));
    clockHand1 = new OBJ.Mesh(await utils.get_objstr(BASE_DIR + "Assets/Pieces/clockhand1.obj"));
    clockHand2 = new OBJ.Mesh(await utils.get_objstr(BASE_DIR + "Assets/Pieces/clockhand2.obj"));
    catEye = new OBJ.Mesh(await utils.get_objstr(BASE_DIR + "Assets/Pieces/eye_norm.obj"));
    catTail = new OBJ.Mesh(await utils.get_objstr(BASE_DIR + "Assets/Pieces/tail.obj"));
    /* LOAD TEXTURE */
    texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    let image = new Image();
    image.src = BASE_DIR + "Assets/KitCat_color.png";
    image.onload = function () {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.generateMipmap(gl.TEXTURE_2D);
    };
    makeSceneGraph(programs);
    main();
}

window.onload = init;