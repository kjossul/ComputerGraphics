/* CAMERA */

let extView = 1;
let cx = 0.0;
let cy = 0.0;
let cz = 6.5;
let elevation = 0.01;
let angle = 0.01;
let roll = 0.01;
let modRot = 0.0;
let EVelevation = -15;
let EVangle = 30;

let lookRadius = 10.0;


let keys = [];
let rvx = 0.0;
let rvy = 0.0;
let rvz = 0.0;

let NvertexBuffer;
let NnormalBuffer;
let NtextureBuffer;
let NindexBuffer;


let keyFunctionDown = function (e) {
    if (!keys[e.keyCode]) {
        keys[e.keyCode] = true;
        switch (e.keyCode) {
            case 37:
//console.log("KeyUp   - Dir LEFT");
                rvy = rvy - 1.0;
                break;
            case 39:
//console.log("KeyUp   - Dir RIGHT");
                rvy = rvy + 1.0;
                break;
            case 38:
//console.log("KeyUp   - Dir UP");
                rvx = rvx + 1.0;
                break;
            case 40:
//console.log("KeyUp   - Dir DOWN");
                rvx = rvx - 1.0;
                break;
        }
    }
};

let keyFunctionUp = function (e) {
    if (keys[e.keyCode]) {
        keys[e.keyCode] = false;
        switch (e.keyCode) {
            case 37:
//console.log("KeyDown  - Dir LEFT");
                rvy = rvy + 1.0;
                break;
            case 39:
//console.log("KeyDown - Dir RIGHT");
                rvy = rvy - 1.0;
                break;
            case 38:
//console.log("KeyDown - Dir UP");
                rvx = rvx - 1.0;
                break;
            case 40:
//console.log("KeyDown - Dir DOWN");
                rvx = rvx + 1.0;
                break;
            case 81:
        }
    }
};

function doResize() {
    // set canvas dimensions
    let canvas = document.getElementById("c");
    if ((window.innerWidth > 40) && (window.innerHeight > 320)) {
        canvas.width = window.innerWidth - 16;
        canvas.height = window.innerHeight - 260;
        canw = canvas.clientWidth;
        canh = canvas.clientHeight;

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
//		gl.viewport(0.0, 0.0, w, h);
        gl.clear(gl.COLOR_BUFFER_BIT);

//		perspectiveMatrix = utils.MakePerspective(60, w/h, 0.1, 1000.0);

    }
}

// event handler

let mouseState = false;
let lastMouseX = -100, lastMouseY = -100;

function doMouseDown(event) {
    lastMouseX = event.pageX;
    lastMouseY = event.pageY;
    mouseState = true;
}

function doMouseUp(event) {
    lastMouseX = -100;
    lastMouseY = -100;
    mouseState = false;
}

function doMouseMove(event) {
    if (mouseState) {
        let dx = event.pageX - lastMouseX;
        let dy = lastMouseY - event.pageY;
        if ((event.pageX <= 0.66 * canw) || (extView === 0)) {
            if ((dx !== 0) || (dy !== 0)) {
                angle += 0.5 * dx;
                elevation += 0.5 * dy;
            }
        } else {
            if ((dx !== 0) || (dy !== 0)) {
                EVangle += 0.5 * dx;
                EVelevation += 0.5 * dy;
            }
//		modRot = modRot + 0.5 * dx;
        }
        lastMouseX = event.pageX;
        lastMouseY = event.pageY;
    }
}

function doMouseWheel(event) {
    let nLookRadius = lookRadius + event.wheelDelta / 1000.0;
    if ((nLookRadius > 2.0) && (nLookRadius < 20.0)) {
        lookRadius = nLookRadius;
    }
}

function toggleExtView() {
    extView = 1 - extView;
}

function updateCamera() {
    angle = angle + rvy;
    elevation = elevation + rvx;

    cz = lookRadius * Math.cos(utils.degToRad(-angle)) * Math.cos(utils.degToRad(-elevation));
    cx = lookRadius * Math.sin(utils.degToRad(-angle)) * Math.cos(utils.degToRad(-elevation));
    cy = lookRadius * Math.sin(utils.degToRad(-elevation));
}

/* UI */

UIonOff = {
    LAlightType: {
        none: {
            LA13: false, LA14: false,
            LA21: false, LA22: false, LA23: false, LA24: false,
            LA31: false, LA32: false, LA33: false, LA34: false,
            LA41: false, LA42: false, LA43: false, LA44: false,
            LA51: false, LA52: false, LA53: false, LA54: false,
            LA61: false, LA62: false
        },
        direct: {
            LA13: true, LA14: true,
            LA21: false, LA22: false, LA23: false, LA24: false,
            LA31: false, LA32: false, LA33: false, LA34: false,
            LA41: false, LA42: false, LA43: false, LA44: false,
            LA51: true, LA52: true, LA53: false, LA54: false,
            LA61: true, LA62: true
        },
        point: {
            LA13: true, LA14: true,
            LA21: true, LA22: true, LA23: true, LA24: true,
            LA31: true, LA32: true, LA33: true, LA34: true,
            LA41: true, LA42: true, LA43: false, LA44: false,
            LA51: false, LA52: false, LA53: false, LA54: false,
            LA61: false, LA62: false
        },
        spot: {
            LA13: true, LA14: true,
            LA21: true, LA22: true, LA23: true, LA24: true,
            LA31: true, LA32: true, LA33: true, LA34: true,
            LA41: true, LA42: true, LA43: true, LA44: true,
            LA51: true, LA52: true, LA53: true, LA54: true,
            LA61: true, LA62: true
        }
    },
    LBlightType: {
        none: {
            LB13: false, LB14: false,
            LB21: false, LB22: false, LB23: false, LB24: false,
            LB31: false, LB32: false, LB33: false, LB34: false,
            LB41: false, LB42: false, LB43: false, LB44: false,
            LB51: false, LB52: false, LB53: false, LB54: false,
            LB61: false, LB62: false
        },
        direct: {
            LB13: true, LB14: true,
            LB21: false, LB22: false, LB23: false, LB24: false,
            LB31: false, LB32: false, LB33: false, LB34: false,
            LB41: false, LB42: false, LB43: false, LB44: false,
            LB51: true, LB52: true, LB53: false, LB54: false,
            LB61: true, LB62: true
        },
        point: {
            LB13: true, LB14: true,
            LB21: true, LB22: true, LB23: true, LB24: true,
            LB31: true, LB32: true, LB33: true, LB34: true,
            LB41: true, LB42: true, LB43: false, LB44: false,
            LB51: false, LB52: false, LB53: false, LB54: false,
            LB61: false, LB62: false
        },
        spot: {
            LB13: true, LB14: true,
            LB21: true, LB22: true, LB23: true, LB24: true,
            LB31: true, LB32: true, LB33: true, LB34: true,
            LB41: true, LB42: true, LB43: true, LB44: true,
            LB51: true, LB52: true, LB53: true, LB54: true,
            LB61: true, LB62: true
        }
    },
    LClightType: {
        none: {
            LC13: false, LC14: false,
            LC21: false, LC22: false, LC23: false, LC24: false,
            LC31: false, LC32: false, LC33: false, LC34: false,
            LC41: false, LC42: false, LC43: false, LC44: false,
            LC51: false, LC52: false, LC53: false, LC54: false,
            LC61: false, LC62: false
        },
        direct: {
            LC13: true, LC14: true,
            LC21: false, LC22: false, LC23: false, LC24: false,
            LC31: false, LC32: false, LC33: false, LC34: false,
            LC41: false, LC42: false, LC43: false, LC44: false,
            LC51: true, LC52: true, LC53: false, LC54: false,
            LC61: true, LC62: true
        },
        point: {
            LC13: true, LC14: true,
            LC21: true, LC22: true, LC23: true, LC24: true,
            LC31: true, LC32: true, LC33: true, LC34: true,
            LC41: true, LC42: true, LC43: false, LC44: false,
            LC51: false, LC52: false, LC53: false, LC54: false,
            LC61: false, LC62: false
        },
        spot: {
            LC13: true, LC14: true,
            LC21: true, LC22: true, LC23: true, LC24: true,
            LC31: true, LC32: true, LC33: true, LC34: true,
            LC41: true, LC42: true, LC43: true, LC44: true,
            LC51: true, LC52: true, LC53: true, LC54: true,
            LC61: true, LC62: true
        }
    },
    ambientType: {
        none: {
            A20: false, A21: false, A22: false,
            A31: false, A32: false,
            A41: false, A42: false,
            A51: false, A52: false,
            MA0: false, MA1: false, MA2: false
        },
        ambient: {
            A20: false, A21: true, A22: true,
            A31: false, A32: false,
            A41: false, A42: false,
            A51: false, A52: false,
            MA0: true, MA1: true, MA2: true
        },
        hemispheric: {
            A20: true, A21: false, A22: true,
            A31: true, A32: true,
            A41: true, A42: true,
            A51: true, A52: true,
            MA0: true, MA1: true, MA2: true
        }
    },
    diffuseType: {
        none: {
            D21: false, D22: false,
            D41: false, D42: false, D41b: false
        },
        lambert: {
            D21: true, D22: true,
            D41: false, D42: false, D41b: false
        },
        toon: {
            D21: true, D22: true,
            D41: true, D42: true, D41b: false
        },
        orenNayar: {
            D21: true, D22: true,
            D41: false, D42: true, D41b: true
        }
    },
    specularType: {
        none: {
            S21: false, S22: false,
            S31: false, S32: false, S31b: false,
            S41: false, S42: false, S41b: false
        },
        phong: {
            S21: true, S22: true,
            S31: true, S32: true, S31b: false,
            S41: false, S42: false, S41b: false
        },
        blinn: {
            S21: true, S22: true,
            S31: true, S32: true, S31b: false,
            S41: false, S42: false, S41b: false
        },
        toonP: {
            S21: true, S22: true,
            S31: false, S32: false, S31b: false,
            S41: true, S42: true, S41b: false
        },
        toonB: {
            S21: true, S22: true,
            S31: false, S32: false, S31b: false,
            S41: true, S42: true, S41b: false
        },
        cookTorrance: {
            S21: true, S22: true,
            S31: false, S32: true, S31b: true,
            S41: false, S42: true, S41b: true
        }
    },
    emissionType: {
        Yes: {ME1: true, ME2: true},
        No: {ME1: false, ME2: false}
    }
};


function showHideUI(tag, sel) {
    for (let name in UIonOff[tag][sel]) {
        document.getElementById(name).style.display = UIonOff[tag][sel][name] ? "block" : "none";
    }
}

function showLight(sel) {
    document.getElementById("LA").style.display = (sel === "LA") ? "block" : "none";
    document.getElementById("LB").style.display = (sel === "LB") ? "block" : "none";
    document.getElementById("LC").style.display = (sel === "LC") ? "block" : "none";
}

defShaderParams = {
//	ambientType: "none",
//	diffuseType: "none",
//	specularType: "cookTorrance",
    ambientType: "ambient",
    diffuseType: "lambert",
    specularType: "phong",
    ambientLightColor: "#222222",
    diffuseColor: "#00ffff",
    specularColor: "#ffffff",
    ambientLightLowColor: "#002200",
    ambientMatColor: "#00ffff",
    emitColor: "#000000",

    LAlightType: "direct",
    LAlightColor: "#ffffff",
    LAPosX: 20,
    LAPosY: 30,
    LAPosZ: 50,
    LADirTheta: 60,
    LADirPhi: 45,
    LAConeOut: 30,
    LAConeIn: 80,
    LADecay: 0,
    LATarget: 61,

    LBlightType: "none",
    LBlightColor: "#ffffff",
    LBPosX: -40,
    LBPosY: 30,
    LBPosZ: 50,
    LBDirTheta: 60,
    LBDirPhi: 135,
    LBConeOut: 30,
    LBConeIn: 80,
    LBDecay: 0,
    LBTarget: 61,

    LClightType: "none",
    LClightColor: "#ffffff",
    LCPosX: 60,
    LCPosY: 30,
    LCPosZ: 50,
    LCDirTheta: 60,
    LCDirPhi: -45,
    LCConeOut: 30,
    LCConeIn: 80,
    LCDecay: 0,
    LCTarget: 61,

    ADirTheta: 0,
    ADirPhi: 0,
    DTexMix: 0,
//	DTexMix: 100,
    SpecShine: 100,
    DToonTh: 50,
    SToonTh: 90,

    emissionType: "No"
};

function resetShaderParams() {
    for (let name in defShaderParams) {
        let value = defShaderParams[name];
        document.getElementById(name).value = value;
        if (document.getElementById(name).type === "select-one") {
            showHideUI(name, value);
        }
    }

    cx = 0.0;
    cy = 0.0;
    cz = 6.5;
    elevation = 0.01;
    angle = 0.01;
    roll = 0.01;
    lookRadius = 10.0;
}


function unifPar(pHTML, pGLSL, type) {
    this.pHTML = pHTML;
    this.pGLSL = pGLSL;
    this.type = type;
}

function noAutoSet(gl) {
}

function val(gl) {
    gl.uniform1f(program[this.pGLSL + "Uniform"], document.getElementById(this.pHTML).value);
}

function valD10(gl) {
    gl.uniform1f(program[this.pGLSL + "Uniform"], document.getElementById(this.pHTML).value / 10);
}

function valD100(gl) {
    gl.uniform1f(program[this.pGLSL + "Uniform"], document.getElementById(this.pHTML).value / 100);
}

function valCol(gl) {
    col = document.getElementById(this.pHTML).value.substring(1, 7);
    R = parseInt(col.substring(0, 2), 16) / 255;
    G = parseInt(col.substring(2, 4), 16) / 255;
    B = parseInt(col.substring(4, 6), 16) / 255;
    gl.uniform4f(program[this.pGLSL + "Uniform"], R, G, B, 1);
}

function valVec3(gl) {
    gl.uniform3f(program[this.pGLSL + "Uniform"],
        document.getElementById(this.pHTML + "X").value / 10,
        document.getElementById(this.pHTML + "Y").value / 10,
        document.getElementById(this.pHTML + "Z").value / 10);
}

function valDir(gl) {
    let t = utils.degToRad(document.getElementById(this.pHTML + "Theta").value);
    let p = utils.degToRad(document.getElementById(this.pHTML + "Phi").value);
    gl.uniform3f(program[this.pGLSL + "Uniform"], Math.sin(t) * Math.sin(p), Math.cos(t), Math.sin(t) * Math.cos(p));
}

valTypeDecoder = {
    LAlightType: {
        none: [0, 0, 0, 0],
        direct: [1, 0, 0, 0],
        point: [0, 1, 0, 0],
        spot: [0, 0, 1, 0]
    },
    LBlightType: {
        none: [0, 0, 0, 0],
        direct: [1, 0, 0, 0],
        point: [0, 1, 0, 0],
        spot: [0, 0, 1, 0]
    },
    LClightType: {
        none: [0, 0, 0, 0],
        direct: [1, 0, 0, 0],
        point: [0, 1, 0, 0],
        spot: [0, 0, 1, 0]
    },
    ambientType: {
        none: [0, 0, 0, 0],
        ambient: [1, 0, 0, 0],
        hemispheric: [0, 1, 0, 0]
    },
    diffuseType: {
        none: [0, 0, 0, 0],
        lambert: [1, 0, 0, 0],
        toon: [0, 1, 0, 0],
        orenNayar: [0, 0, 1, 0]
    },
    specularType: {
        none: [0, 0, 0, 0],
        phong: [1, 0, 0, 0],
        blinn: [0, 1, 0, 0],
        toonP: [1, 0, 1, 0],
        toonB: [0, 1, 1, 0],
        cookTorrance: [0, 0, 0, 1]
    },
    emissionType: {
        No: [0, 0, 0, 0],
        Yes: [1, 0, 0, 0]
    }
};

function valType(gl) {
    let v = valTypeDecoder[this.pHTML][document.getElementById(this.pHTML).value];
    gl.uniform4f(program[this.pGLSL + "Uniform"], v[0], v[1], v[2], v[3]);
}


unifParArray = [
    new unifPar("ambientType", "ambientType", valType),
    new unifPar("diffuseType", "diffuseType", valType),
    new unifPar("specularType", "specularType", valType),
    new unifPar("emissionType", "emissionType", valType),

    new unifPar("LAlightType", "LAlightType", valType),
    new unifPar("LAPos", "LAPos", valVec3),
    new unifPar("LADir", "LADir", valDir),
    new unifPar("LAConeOut", "LAConeOut", val),
    new unifPar("LAConeIn", "LAConeIn", valD100),
    new unifPar("LADecay", "LADecay", val),
    new unifPar("LATarget", "LATarget", valD10),
    new unifPar("LAlightColor", "LAlightColor", valCol),

    new unifPar("LBlightType", "LBlightType", valType),
    new unifPar("LBPos", "LBPos", valVec3),
    new unifPar("LBDir", "LBDir", valDir),
    new unifPar("LBConeOut", "LBConeOut", val),
    new unifPar("LBConeIn", "LBConeIn", valD100),
    new unifPar("LBDecay", "LBDecay", val),
    new unifPar("LBTarget", "LBTarget", valD10),
    new unifPar("LBlightColor", "LBlightColor", valCol),

    new unifPar("LClightType", "LClightType", valType),
    new unifPar("LCPos", "LCPos", valVec3),
    new unifPar("LCDir", "LCDir", valDir),
    new unifPar("LCConeOut", "LCConeOut", val),
    new unifPar("LCConeIn", "LCConeIn", valD100),
    new unifPar("LCDecay", "LCDecay", val),
    new unifPar("LCTarget", "LCTarget", valD10),
    new unifPar("LClightColor", "LClightColor", valCol),

    new unifPar("ambientLightColor", "ambientLightColor", valCol),
    new unifPar("ambientLightLowColor", "ambientLightLowColor", valCol),
    new unifPar("ADir", "ADir", valDir),
    new unifPar("diffuseColor", "diffuseColor", valCol),
    new unifPar("DTexMix", "DTexMix", valD100),
    new unifPar("specularColor", "specularColor", valCol),
    new unifPar("SpecShine", "SpecShine", val),
    new unifPar("DToonTh", "DToonTh", valD100),
    new unifPar("SToonTh", "SToonTh", valD100),
    new unifPar("ambientMatColor", "ambientMatColor", valCol),
    new unifPar("emitColor", "emitColor", valCol),
    new unifPar("", "u_texture", noAutoSet),
    new unifPar("", "pMatrix", noAutoSet),
    new unifPar("", "wMatrix", noAutoSet),
    new unifPar("", "eyePos", noAutoSet)
];