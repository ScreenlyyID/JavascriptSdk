

// eslint-disable-next-line no-unused-vars
var onAcuantSdkLoaded = function(){
    //sdk has been loaded;
 InitCamera();
};


// eslint-disable-next-line no-unused-vars
const acuantConfig = {
   path: "/",
   jpegQuality: 1.0 //strongly advised not to modify (can be left out will default to 1.0)
};


// these are just arbitryry values. The SDK needs them to initialize but they
// are not used.
const Credential = {
   passive_username: "",
   passive_password: "",
   id_username: "test@test.com",
   id_password: "12345",
   passive_subscriptionId: "",
   acas_endpoint: "https://api.screenlyyid.com",
   liveness_endpoint: "https://api.screenlyyid.com",
}

function InitCamera() {
   console.log("Init called");

   const base64Token = btoa(Credential.id_username + ':' + Credential.id_password);

   
   // eslint-disable-next-line no-undef
   AcuantJavascriptWebSdk.initialize(base64Token, Credential.acas_endpoint, {
       onSuccess: function () {
           console.log("initialize success");
           if (!isOldiOS()) {
               // eslint-disable-next-line no-undef
               AcuantJavascriptWebSdk.start(initDone);
              
           } else {
               // eslint-disable-next-line no-undef
               AcuantJavascriptWebSdk.start(initDone, [AcuantJavascriptWebSdk.ACUANT_IMAGE_WORKER]); //old ios devices can struggle running metrics. See readme for more info.
           }
       },
       onFail: function (code, description) {
           console.log("initialize failed " + code + ": " + description);
       }
   });

   // store.side = 0;
}

function initDone() {
   console.log("initialize succeded");
   //TODO only allow the camera button to be clickable once this is done.
}


//this is an example of how to detect an older ios device.
//depending on your enviroment you might be able to get more specific.
function isOldiOS() {
   let ua = navigator.userAgent;
   let keyPhrase = "iPhone OS";
   const keyPhrase2 = "iPad; CPU OS";
   let index = ua.indexOf(keyPhrase);
   if (index < 0) {
       keyPhrase = keyPhrase2;
       index = ua.indexOf(keyPhrase);
   }
   if (index >= 0) {
       let version = ua.substring(index + keyPhrase.length + 1, index + keyPhrase.length + 3);
       try {
           let versionNum = parseInt(version);
           if (versionNum && versionNum < 13) {
               return true;
           } else {
               return false;
           }
       } catch (_) {
           return false;
       }
   } else {
       return false;
   }
}