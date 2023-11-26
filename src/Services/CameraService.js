import { store } from './Store'
import { ProcessIDandSelfie, EnrolDocument } from "./DocumentService"
// import {BASE_URL} from "./Config"

// eslint-disable-next-line no-unused-vars
const liveCaptureFailed = false
export var loadingDetector = ""
export var  initerrortext = ""



// eslint-disable-next-line no-unused-vars
const options = {
    text: {
        NONE: "ALIGN",
        SMALL_DOCUMENT: "MOVE CLOSER",
        GOOD_DOCUMENT: null,//null countdown
        CAPTURING: "CAPTURING",
        TAP_TO_CAPTURE: "TAP TO CAPTURE",
        BIG_DOCUMENT: "TOO CLOSE",
    }
}

// eslint-disable-next-line no-unused-vars
const cameraCallback = {
    onCaptured: onCaptured,
    onCropped: onCropped,
    // eslint-disable-next-line no-unused-vars
    onFrameAvailable: function (response) {
    },
    onError: (error, code) => {
        //error will be more specific, while the code broader. See current list of codes below.
        //Please handle different or null codes, though they are not expected to occur.
        console.log(error);
        console.log(code);

        // eslint-disable-next-line no-undef
        AcuantCamera.startManualCapture(cameraCallback);    
        }
}







export async function loadSdk(){
     // eslint-disable-next-line no-undef
    loadAcuantSdk();
}



export async function StartCamera() {

    // eslint-disable-next-line no-undef
    if (AcuantCamera.isCameraSupported && !liveCaptureFailed) {

        //TODO need to do some show/hide here as image ratios are different on IOS vs android
        if (isIOS()) {
                // update class to 
            updateElemenWithNewClassById('acuant-camera', 'acuant-camera', 'acuant-camera-ios');
            hideElementWithClass('progress-indicator');
        }
        else {
            updateElemenWithNewClassById('acuant-camera', 'acuant-camera', 'acuant-camera-android');
        }

        showElementWithClass('acuant-camera');
        hideElementWithClass('capture-front');
        hideElementWithClass('upload-front');
        hideElementWithClass('analyzing');
        hideElementWithClass('canvas'); 
        hideElementWithClass('selfie-capture');
        hideElementWithClass('capture-back');
        hideElementWithClass('unclassified');
        hideElementWithClass('start-button');
        hideElementWithClass('blurry-image');
        hideElementWithClass('glare-image');
       
    // eslint-disable-next-line no-undef
      AcuantCameraUI.start(cameraCallback, options);
    } else {
        // eslint-disable-next-line no-undef
        AcuantCamera.startManualCapture(cameraCallback);

    }


    
}

// eslint-disable-next-line no-undef

const faceDetectionState = {
    FACE_NOT_FOUND: "FACE NOT FOUND",
    TOO_MANY_FACES: "TOO MANY FACES",
    FACE_ANGLE_TOO_LARGE: "FACE ANGLE TOO LARGE",
    PROBABILITY_TOO_SMALL: "PROBABILITY TOO SMALL",
    FACE_TOO_SMALL: "FACE TOO SMALL",
    FACE_CLOSE_TO_BORDER: "TOO CLOSE TO THE FRAME"
  }

export async function OpenFrontCamera() {
    hideElementWithClass('progress-indicator-2');
   // eslint-disable-next-line no-undef

    // let faceCaptureContainer  = document.getElementById('acuant-face-capture-container');
    let faceDetectionTextDiv = document.getElementById('face-detection-text');

    loadingDetector = "LOADING DETECTOR";
    showElementWithClass("acuant-face-capture-container");
    // faceCaptureContainer.style.display = 'block';

    var handler = {
        onDetectorInitialized: () => {
            loadingDetector = "";
        },
        onDetection: (text) => {
            loadingDetector = text;
        },
        onOpened: () => {
          faceDetectionTextDiv.style.display = 'flex';
        },
        onClosed: () => {
            hideElementWithClass("acuant-face-capture-container");
            hideElementWithClass("face-detection-text");
        //   faceCaptureContainer.style.display = 'none';
        //   faceDetectionTextDiv.style.display = 'none';
        //   cameraBtn.style.display = 'block';
        },
        onError: (error) => {
          if (error.code == 1) { //camera permission not granted
            hideElementWithClass("face-detection-text");
            // faceDetectionTextDiv.style.display = 'none';
            // cameraBtn.style.display = 'block';
          }
          console.log(error.message)
        },
        onPhotoTaken: () => {
            hideElementWithClass("face-detection-text");
        //   faceDetectionTextDiv.style.display = 'none';
        },
        onPhotoRetake: () => {
          faceDetectionTextDiv.style.display = 'flex';
        },
        onCaptured: onSelfieCaptured
      }

    // eslint-disable-next-line no-undef
    AcuantPassiveLiveness.start(handler, faceDetectionState);

    // AcuantPassiveLiveness.startSelfieCapture((image) => {
    //     onSelfieCaptured(image);
    // });
}

function onSelfieCaptured(image) {
    showElementWithClass('progress-indicator-2');
    hideElementWithClass('selfie-image-start');
    showElementWithClass('selfie-analyzing');

    ProcessIDandSelfie(image);
}


// eslint-disable-next-line no-unused-vars
function onCaptured(response) {

    showElementWithClass('progress-indicator');
    showElementWithClass('id-capture');
    hideElementWithClass('acuant-camera');
    hideElementWithClass('capture-front');
    hideElementWithClass('capture-back');
    hideElementWithClass('manual-capture');
    hideElementWithClass('blurry-image');
    hideElementWithClass('glare-image');

    showElementWithClass("analyzing");
    showElementWithClass("basic-analyzing");
    hideElementWithClass("document-classification");
    
    hideElementWithClass("front-info-image");
    hideElementWithClass("back-info-image");
    hideElementWithClass('title-text');

    // drawImageOnCanvas(response);

}

function onCropped(response) {

    //TODO when response empty prompt to restart process.

    if (response && response.image) {

        if (response.sharpness < 51 ) {
            // image will be to blurry to process, ask for recapture.
            hideElementWithClass('acuant-camera');
            hideElementWithClass('capture-front')
            hideElementWithClass('capture-back')
            hideElementWithClass('analyzing');
            showElementWithClass('blurry-image');
            return;
        }

        if (response.glare < 70) {
            // image likely has to much glare to be precessed, ask for a recapture
            hideElementWithClass('acuant-camera');
            hideElementWithClass('capture-front')
            hideElementWithClass('capture-back')
            hideElementWithClass('analyzing');
            showElementWithClass('glare-image');
            return;
        }

        store.image = response.image;
        
        ProcessImage();

        // hideElementWithClass('acuant-camera');
        // hideElementWithClass('capture-front')
        // hideElementWithClass('capture-back')
        // hideElementWithClass('analyzing');
        // showElementWithClass('canvas');
        // showElementWithClass('id-capture');
        
    

        // drawImageOnResult(response.image);
    } 
    closeCamera();
}


async function ProcessImage() {
    hideElementWithClass('capture-front'); 
    hideElementWithClass('capture-back'); 
    hideElementWithClass('canvas');
    
    showElementWithClass('analyzing');
    hideElementWithClass('basic-analyzing');
    showElementWithClass('document-classification');

    let classification = await EnrolDocument();

    if (classification.IsTwoSideDocument) {
        // ask for back
        if (classification.PageSide == "FRONT") {
        
            hideElementWithClass('analyzing');
            hideElementWithClass('canvas');
            hideElementWithClass('capture-front'); 
            showElementWithClass('capture-back'); 
            return;
        }
        else if (classification.PageSide == "BACK") {
            hideElementWithClass('id-capture'); 
            showElementWithClass('selfie-capture'); 
            return;
        } 
            return;
    } else {
        // go straight to selfie
        hideElementWithClass('id-capture'); 
        showElementWithClass('selfie-capture'); 
        return;
    }

};  

function closeCamera() {
}


function drawImageOnResult(result) {
    let displayCanvas = document.getElementById('result-id-img');
    let displayContext = displayCanvas.getContext("2d");

    let cw = displayCanvas.width;
    let ch = displayCanvas.height;

    let resultImage = new Image();

    resultImage.onload = function () {
        let iw = resultImage.width;
        let ih = resultImage.height;
        let dw = iw;
        let dh = ih;
        if (dw > cw) {
            dw = cw;
            dh = Math.round(dw * ih / iw);
        }
        if (dh > ch) {
            dh = ch;
            dw = Math.round(dh * iw / ih);
        }
        let dx = Math.round((cw - dw) / 2);
        let dy = Math.round((ch - dh) / 2);
        displayContext.drawImage(resultImage, dx, dy, dw, dh);
    };

    resultImage.src = result.data;
}


function isIOS() {
    return ((/iPad|iPhone|iPod/.test(navigator.platform) && checkIOSVersion()) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));
  }



  function checkIOSVersion() {
    return iOSversion()[0] >= 13;
  }

  function iOSversion() {
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
      // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
      try {
        const v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
        return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
      } catch (_) {
        return -1;
      }
    }
    return -1;
  }
//this is an example of how to detect an older ios device.
//depending on your enviroment you might be able to get more specific.
// function isOldiOS() {
//     let ua = navigator.userAgent;
//     let keyPhrase = "iPhone OS";
//     const keyPhrase2 = "iPad; CPU OS";
//     let index = ua.indexOf(keyPhrase);
//     if (index < 0) {
//         keyPhrase = keyPhrase2;
//         index = ua.indexOf(keyPhrase);
//     }
//     if (index >= 0) {
//         let version = ua.substring(index + keyPhrase.length + 1, index + keyPhrase.length + 3);
//         try {
//             let versionNum = parseInt(version);
//             if (versionNum && versionNum < 13) {
//                 return true;
//             } else {
//                 return false;
//             }
//         } catch (_) {
//             return false;
//         }
//     } else {
//         return false;
//     }
// }


export async function showElementWithClass(id) {
    var elem = document.getElementById(id);
    if (elem != null) {
        elem.classList.remove('hide');
        elem.classList.add('show');
        elem.hidden = false;
    }
}


export async function hideElementWithClass(id) {
    var elem = document.getElementById(id);
    if (elem != null) {
        elem.classList.remove('show');
        elem.classList.add('hide');
        elem.hidden = true;
    }
}

export async function updateElemenWithNewClassById(id, classnameremove, classnameadd) {
    var elem = document.getElementById(id);
    if (elem != null) {
        elem.classList.remove(classnameremove);
        elem.classList.add(classnameadd);
        elem.hidden = true;
    }
}