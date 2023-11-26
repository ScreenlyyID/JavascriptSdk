<script setup>

import { showElementWithClass, hideElementWithClass, StartCamera, OpenFrontCamera, loadingDetector, initerrortext } from "../Services/CameraService"
import { InitVerificatoinProcess, EnrolDocument } from "../Services/DocumentService"
import { store } from '../Services/Store'
import { onMounted } from 'vue'
import M from 'materialize-css'


onMounted(() => {
    M.AutoInit();
});
  


 InitVerificatoinProcess();
showElementWithClass('upload-front');
hideElementWithClass('analyzing');
hideElementWithClass('canvas'); 
hideElementWithClass('selfie-capture');
hideElementWithClass('capture-back');
hideElementWithClass('unclassified');
hideElementWithClass('start-button');



async function ProcessImage() {
        hideElementWithClass('capture-front'); 
        hideElementWithClass('capture-back'); 
        hideElementWithClass('canvas');
        
        showElementWithClass('analyzing');
        hideElementWithClass('basic-analyzing');
        showElementWithClass('document-classification');

        let classification = await EnrolDocument();

        //TODO here we need to decide if we must also catpure the back of the doc.
       
        
        console.log("component processImange");
        console.log(classification);

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
   
function Reset() {
    window.location.reload();
}
</script>
<script>
  export default {

    methods : {
        displayAcuantCamera() {
            console.log("display: block");
            this.display = "display: block";
        }
    },
    created: function() { 
        window.addEventListener('acuant-camera-block', this.displayAcuantCamera);
    }
  }


//   function testCamera() {

//         showElementWithClass('acuant-camera');
//         showElementWithClass('android-background');
        
//         hideElementWithClass('capture-front');
//         hideElementWithClass('upload-front');
//         hideElementWithClass('analyzing');
//         hideElementWithClass('canvas'); 
//         hideElementWithClass('selfie-capture');
//         hideElementWithClass('capture-back');
//         hideElementWithClass('unclassified');
//         hideElementWithClass('start-button');
//   }

 
</script>

<template>

    <div id="acuant-face-capture-container" class="face-camera-container hide">
        <div id="face-detection-text" class="detection-state" v-html="{ loadingDetector }"></div>
    </div>
 

    <div id="id-capture" class="show">
       
        <div id="progress-indicator" class="d-flex flex-row fade-in-text-step1">
                <div class="p-2">
                    <div class="circle-wrap">
                        <div class="circle">
                            <div class="mask full">
                                <div class="fill"></div>
                            </div>
                            <div class="mask half">
                                <div class="fill"></div>
                            </div>
                            <div class="inside-circle"> 1 of 4 </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex p-2 align-items-center">
                    <div class="d-flex flex-column">
                        <div class="step">Step 1</div>
                        <div class="step-name-header">Upload your ID</div>
                        <div class="step-header">Next: Capture selfie</div>
                    </div>
                </div>
        </div>

            <hr class="solid">

            <div id="acuant-camera" class="acuant-camera hide">
            </div>

            <div id="capture-front" class="row">
                <div class="col-12 col-xs-12 mx-auto">
                    <div class="row">
                        <div class="col-12">
                           
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                        
                        </div>
                    </div>
                    <div class="vstack gap-3 mx-auto fade-in-text-step2">
                        <div class="upload-front">
                            <h6 class="text-center" id="title-text">Hold your phone horizontally when capturing your ID card.</h6>
                            <img class="img-fluid" alt="screenlyy" src="../assets/scan_process.gif" style="max-width: 100%" id="front-info-image"/>
                        </div>
                    </div>
                </div>
                <button class="btn waves-effect waves-light" @click=" StartCamera()">Capture Front of Document</button>
            </div>

            <div id="capture-back" class="row hide">
                <div class="col-12 col-xs-12 mx-auto">
                    <div class="row">
                        <div class="col-12">
                           
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                        
                        </div>
                    </div>
                    <div class="vstack gap-3 mx-auto fade-in-text-step2">
                        <div class="upload-front">
                            <h6 class="text-center" id="title-text">Capture the BACK of your ID. Remember to hold your phone horizontally when capturing your ID card.</h6>
                            <img class="img-fluid" alt="screenlyy" src="../assets/scan_process.gif" style="max-width: 100%" id="front-info-image"/>
                        </div>
                        
                    </div>
                </div>
                <button class="btn waves-effect waves-light" @click=" StartCamera()">Capture Back of Document</button>
            </div>

            <div id="canvas" class="show-cropped-image hide row">
                    <canvas id="result-id-img" ></canvas>                       
                    <button class="btn waves-effect waves-light" @click="ProcessImage()">USE THIS IMAGE</button>
                    <button  class="btn waves-effect waves-teal btn-flat custom-border" @click="StartCamera()">RETRY</button>
            </div>

            <div id="analyzing" class="analyzing hide col-12">
                <div class="row wrapper description_container">
                    <p  id="basic-analyzing" class="description">Analyzing...</p>
                    <div id="document-classification" class="document-classify-group">
                        <p class="nametag loading ">Optimizing Image</p>
                        <p class="nametag loading ">Checking for Tampering</p>
                        <p class="nametag loading ">Classifying Document</p>
                        <p class="nametag loading ">Extracting Datapoints</p>
                    </div>
                </div>

                <div class="analyzing_group">
                    <div id="animation-container" class="row wrapper analyzing_container">
                        <figure id="animation" class="analyzing_animation_zone">
                            <img id="search-image" alt="screenlyyID" class="id_background" src="../assets/id_front@2x.png"/>
                        </figure>
                    </div>
                </div>
            </div>

            <div id="blurry-image" class="hide">
                <div class="row">
                    <div class="col-12 center-align">
                        <h4 class="center-align">Blurry Image!</h4>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div>Oops.. It looks like there is some blur in the image taken.</div><br><br>
                        <div>In order to succesfully verify your identity, we need to ensure the image is sharp for processing.</div>
                        <br><br>
                        <div>Please use the button below to retake a photo of your ID.</div>
                    </div>
                </div>
                <div class="row">
                    <button class="btn waves-effect waves-light" @click=" StartCamera()">RETAKE</button>
                </div>
            </div>


            <div id="glare-image" class="hide">
                <div class="row">
                    <div class="col-12 center-align">
                        <h4 class="center-align">Glare on Image!</h4>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div>Oops.. It looks like there is to much glare on the image taken.</div><br><br>
                        <div>In order to succesfully verify your identity, we need to ensure the image is shar and glare/reflection free for processing.</div>
                        <br><br>
                        <div>Please use the button below to retake a photo of your ID.</div>
                    </div>
                </div>
                <div class="row">
                    <button class="btn waves-effect waves-light" @click=" StartCamera()">RETAKE</button>
                </div>
            </div>
    </div>

    <!-- <div id="acuant-camera" style="display: block;"></div> -->
  


    <div id="selfie-capture" class="hide">
        <div id="progress-indicator-2" class="d-flex flex-row fade-in-text-step1">
                <div class="p-2">
                    <div class="circle-wrap2">
                        <div class="circle2">
                            <div class="mask2 full2">
                                <div class="fill2"></div>
                            </div>
                            <div class="mask2 half">
                                <div class="fill2"></div>
                            </div>
                            <div class="inside-circle2"> 2 of 4 </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex p-2 align-items-center">
                    <div class="d-flex flex-column">
                        <div class="step">Step 2</div>
                        <div class="step-name-header">Capture selfie</div>
                        <div class="step-header">Next: Confirm details</div>
                    </div>
                </div>
            </div>

            <hr class="solid">

            <div id="selfie-image-start" class="row">
                <div class="col-12 mx-auto">
                   
                    <div class="vstack gap-3 mx-auto">
                        <div id="selfie-title-text">Take a selfie image using the front camera of your device.</div>
                        <img class="img-fluid" alt="ScreenlyyID Selfie" src="../assets/illustration2@3x.png" id="selfie-image"/>
                    </div>
                </div>
                <button class="btn waves-effect waves-light" @click=" OpenFrontCamera()">Capture Selfie</button>
            </div>

            <div id="selfie-analyzing" class="analyzing hide col-12">
                <div class="row wrapper description_container">
                    <div id="document-classification" class="document-classify-group">
                        <p class="nametag loading">Analzying Face Image</p>
                        <p class="nametag loading">Checking for liveness datapoints</p>
                        <p class="nametag loading">Performing Facematch with ID</p>
                        <p class="nametag loading">Retreiving final ID check</p>
  
                    </div>
                        
                </div>

                <div  class="analyzing_group">
                    <div id="animation-container" class="row wrapper analyzing_container">
                        <figure id="animation" class="analyzing_animation_zone">
                            <img id="search-image" alt="screenlyyID" class="id_background" src="../assets/id_front@2x.png"/>
                        </figure>
                    </div>
                </div>
            </div>

           
    </div>

    <div id="unclassified" class="hide">
        <div class="row">
                    <div class="col-12 center-align">
                        <h4 class="center-align">Unlcassified document</h4>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div>Oops.. It looks like we were unable to classify the type of document provided.</div><br><br>
                        <div>This is likely because the image contained some blur, glare or reflections.</div>
                        <br><br>
                        <div>Please use the button below to retake a photo of your ID.</div>
                    </div>
                </div>
        <div class="row">
            <button class="btn waves-effect waves-light" @click=" Reset()">RETAKE</button>
        </div>
    </div>


  
         
</template>

<style scoped>


.acuant-camera-ios {
    position: absolute;
    /* height: 100vh;  */
    bottom:0; 
    left:0;
    object-fit: cover;
}

.acuant-camera-android {
    position: fixed;
    vertical-align: top;
    height: 100vh; 
    /* bottom:0;  */
    left:0;
    object-fit: cover;
    margin-top: -15px;
    z-index: 1;
    /* height: 400px;
    /* width: 100%;
    background-color: blue; */  
}


.acuant-camera {
    position: fixed;
    vertical-align: top;
    height: 100vh; 
    /* bottom:0;  */
    left:0;
    object-fit: cover;
    margin-top: -15px;
    z-index: 1;
    /* height: 400px;
    width: 100%; */
    /* background-color: blue */

}

/* .background-blackout {
    position: absolute;
    bottom:0;  
    left:0;
    height: 79vh;
    width: 100%;
    background-color: #2A7F84;
    z-index: -1;
} */


.show {
    display: block;
}


.hide {
    display: none;
}

figure {
    margin: 0px !important;
}


.material-start {
  background-position: center;
  -webkit-transition: background 0.8s;
  transition: background 0.8s;
}
.material-start:hover {
  background: #6200ee radial-gradient(circle, transparent 1%, #6200ee 1%) center/15000%;
}
.material-start:active {
  background-color: #cfb2f9;
  background-size: 100%;
  -webkit-transition: background 0s;
  transition: background 0s;
}


button {
    margin-top: 20px;
    background-color: #2A7F84;
}

.custom-border {
    background-color: white;
    border: 1px solid #2A7F84;
}



@keyframes search {
    0% {
        top: 40px;
        left: 60px;
    }

    25% {
        top: 40px;
        left: calc(100% - 120px);
    }

    50% {
        top: calc(100% - 100px);
        left: calc(100% - 120px);
    }

    75% {
        top: calc(100% - 100px);
        left: 60px;
    }

    100% {
        top: 40px;
        left: 60px;
    }
}




@-webkit-keyframes search {
    0% {
        top: 40px;
        left: 60px;
    }

    25% {
        top: 40px;
        left: calc(100% - 120px);
    }

    50% {
        top: calc(100% - 100px);
        left: calc(100% - 120px);
    }

    75% {
        top: calc(100% - 100px);
        left: 60px;
    }

    100% {
        top: 40px;
        left: 60px;
    }
}

@-moz-keyframes search {
    0% {
        top: 40px;
        left: 60px;
    }

    25% {
        top: 40px;
        left: calc(100% - 120px);
    }

    50% {
        top: calc(100% - 100px);
        left: calc(100% - 120px);
    }

    75% {
        top: calc(100% - 100px);
        left: 60px;
    }

    100% {
        top: 40px;
        left: 60px;
    }
}

@-o-keyframes search {
    0% {
        top: 40px;
        left: 60px;
    }

    25% {
        top: 40px;
        left: calc(100% - 120px);
    }

    50% {
        top: calc(100% - 100px);
        left: calc(100% - 120px);
    }

    75% {
        top: calc(100% - 100px);
        left: 60px;
    }

    100% {
        top: 40px;
        left: 60px;
    }
}

@keyframes search {
    0% {
        top: 40px;
        left: 60px;
    }

    25% {
        top: 40px;
        left: calc(100% - 120px);
    }

    50% {
        top: calc(100% - 100px);
        left: calc(100% - 120px);
    }

    75% {
        top: calc(100% - 100px);
        left: 60px;
    }

    100% {
        top: 40px;
        left: 60px;
    }
}


@media screen and (orientation: landscape) and (max-width: 48em) {
    #animation-container {
        width: 60%;
        box-sizing: border-box;
    }
}

@media screen {
    #animation {
        position: relative;
    }
}

@media screen {
    #search-image {
        display: block;
        width: 100%;
        height: auto;
    }
}

@media screen and (orientation: landscape) and (max-width: 48em) {
    #animation {
        width: 60%;
        box-sizing: border-box;
    }
}

@media screen {
    #animation {
        position: relative;
    }
}

@media screen {
    #search-image {
        display: block;
        width: 100%;
        height: auto;
    }
}

@media screen {
    /* .analyzing .analyzing_group .analyzing_container .analyzing_animation_zone */
    #animation::before {
        content: '';
        display: block;
        width: 64px;
        height: 64px;
        background-image: url('../assets/finder@2x.png');
        background-repeat: no-repeat;
        background-attachment: scroll;
        background-position: center center;
        background-size: contain;
        /*background-color: red;*/
        position: absolute;
        /*animation-name: search ;*/
        -webkit-animation: search 4s ease-in-out infinite forwards 0s;
        -moz-animation: search 4s ease-in-out infinite forwards 0s;
        -o-animation: search 4s ease-in-out infinite forwards 0s;
        animation: search 4s ease-in-out infinite forwards 0s;
    }
}

.document-classify-group {
    margin-bottom: 30px;
}

.loading:after {
  overflow: hidden;
  display: inline-block;
  vertical-align: bottom;
  -webkit-animation: ellipsis steps(4, end) 1s infinite;
  animation: ellipsis steps(4, end) 1s infinite;
  content: "\2026";
  /* ascii code for the ellipsis character */
  width: 0px;
}

@keyframes ellipsis {
  to {
    width: 40px;
  }
}

@-webkit-keyframes ellipsis {
  to {
    width: 40px;
  }
}

.nametag{
  position: absolute;
}

.nametag:nth-of-type(1){
  animation-name: fade;
  animation-fill-mode: both;
  animation-iteration-count: 1;
  animation-duration: 4s;
  animation-direction: normal;
}

.nametag:nth-of-type(2){
  animation-name: fade;
  animation-fill-mode: both;
  animation-iteration-count: 1;
  animation-delay: 4s;
  animation-duration: 4s;
  animation-direction: normal;
}

.nametag:nth-of-type(3){
  animation-name: fade;
  animation-fill-mode: both;
  animation-iteration-count: 1;
  animation-delay: 8s;
  animation-duration: 4s;
  animation-direction: normal;
}

.nametag:nth-of-type(4){
  animation-name: fade;
  animation-fill-mode: both;
  animation-iteration-count: 1;
  animation-delay: 12s;
  animation-duration: 4s;
  animation-direction: normal;
}

@keyframes fade{
    0% {
      opacity: 0;
    }
    60% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .step {
    /*font-family: Inter, serif;*/
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: 12px;
    letter-spacing: 0.06em;
    text-align: left;
    color: #9497A9;
    text-transform: uppercase;
}
.step-name-header {
    /*font-family: Inter;*/
    font-size: 25px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: -0.01em;
    text-align: left;
    color: #1E1E1E;
    margin-top: 5px;
}
.step-header {
    /*font-family: Inter, serif;*/
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: 12px;
    letter-spacing: 0.06em;
    /*text-align: left;*/
    color: #9497A9;
    text-transform: uppercase;
    margin-top: 7px;
    text-align: end;
}
</style>