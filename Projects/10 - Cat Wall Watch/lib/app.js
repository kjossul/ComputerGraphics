const BASE_DIR = window.location.href.substring(0, window.location.href.lastIndexOf("/") + 1);

let canw, canh;

let canvas = null,
    gl = null,
    program = null;

let catBody = null,
    clockHand1 = null,
    clockHand2 = null,
    catEye = null,
    catTail = null;

let projectionMatrix,
    perspectiveMatrix,
    viewMatrix,
    worldMatrix;


function main() {
    utils.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.85, 0.85, 0.85, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    let positionAttributeLocation = gl.getAttribLocation(program, "inPosition");
    let normalAttributeLocation = gl.getAttribLocation(program, "inNormal");
    let uvAttributeLocation = gl.getAttribLocation(program, "a_uv");
    let textLocation = gl.getUniformLocation(program, "u_texture");

    let vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    let positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(catBody.vertices), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    var uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(catBody.textures), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(uvAttributeLocation);
    gl.vertexAttribPointer(uvAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    let normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(catBody.vertexNormals), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(normalAttributeLocation);
    gl.vertexAttribPointer(normalAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    let indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(catBody.indices), gl.STATIC_DRAW);

    var image = new Image();
    image.src = baseDir+modelTexture;
    image.onload= function() {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.generateMipmap(gl.TEXTURE_2D);
    };

    drawScene();
}

function animate() {
    // TODO
}


function drawScene() {
    // animate(); TODO

    //define directional light
    let dirLightAlpha = -utils.degToRad(60);
    let dirLightBeta = -utils.degToRad(120);

    let directionalLight = [Math.cos(dirLightAlpha) * Math.cos(dirLightBeta),
        Math.sin(dirLightAlpha),
        Math.cos(dirLightAlpha) * Math.sin(dirLightBeta)
    ];
    let directionalLightColor = [0.1, 1.0, 1.0];

    let matrixLocation = gl.getUniformLocation(program, "matrix");
    let materialDiffColorHandle = gl.getUniformLocation(program, 'mDiffColor');
    let lightDirectionHandle = gl.getUniformLocation(program, 'lightDirection');
    let lightColorHandle = gl.getUniformLocation(program, 'lightColor');

    let perspectiveMatrix = utils.MakePerspective(90, gl.canvas.width / gl.canvas.height, 0.1, 100.0);

    gl.clearColor(0.85, 0.85, 0.85, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    let worldMatrix = utils.MakeWorld( 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0);
    let viewMatrix = utils.MakeView(3.0, 3.0, 2.5, -45.0, -40.0);
    // TODO DO THIS FOR EACH OBJECT
    let worldViewMatrix = utils.multiplyMatrices(viewMatrix, worldMatrix);
    let projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, worldViewMatrix);

    let lightDirMatrix = utils.sub3x3from4x4(utils.transposeMatrix(worldMatrix));
    let directionalLightTransformed =
        utils.normalizeVec3(utils.multiplyMatrix3Vector3(lightDirMatrix, directionalLight));

    gl.uniformMatrix4fv(matrixLocation, gl.FALSE, utils.transposeMatrix(projectionMatrix));

    gl.uniform3fv(materialDiffColorHandle, cubeMaterialColor);
    gl.uniform3fv(lightColorHandle, directionalLightColor);
    gl.uniform3fv(lightDirectionHandle, directionalLightTransformed);

    gl.bindVertexArray(vao);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
    // END BLOCK
    window.requestAnimationFrame(drawScene);


}

async function init() {
    let shaderDir = BASE_DIR + "Shaders/";

    canvas = document.getElementById("c");
    gl = canvas.getContext("webgl2");
    if (!gl) {
        document.write("GL context not opened");
        return;
    }

    await utils.loadFiles([shaderDir + 'vs.glsl', shaderDir + 'fs.glsl'], function (shaderText) {
        let vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[0]);
        let fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[1]);
        program = utils.createProgram(gl, vertexShader, fragmentShader);

    });
    gl.useProgram(program);
    /* LOAD OBJECTS */
    catBody = new OBJ.Mesh(await utils.get_objstr(BASE_DIR + "lib/Assets/Body/Cat_body_norm.obj"));
    clockHand1 = new OBJ.Mesh(await utils.get_objstr(BASE_DIR + "lib/Assets/Pieces/clockhand1.obj"));
    clockHand2 = new OBJ.Mesh(await utils.get_objstr(BASE_DIR + "lib/Assets/Pieces/clockhand2.obj"));
    catEye = new OBJ.Mesh(await utils.get_objstr(BASE_DIR + "lib/Assets/Pieces/eye_norm.obj"));
    catTail = new OBJ.Mesh(await utils.get_objstr(BASE_DIR + "lib/Assets/Pieces/tail.obj"));
    main();
}

window.onload = init;