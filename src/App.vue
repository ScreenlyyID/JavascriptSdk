<script setup>
import GetStarted from './components/GetStarted.vue'
import UploadFront from './components/UploadFront.vue'
import FinalScreen from './components/FinalScreen.vue'
import AdditionalData from './components/AdditionalData.vue'
import { loadSdk } from "./Services/CameraService"
import { onMounted } from 'vue'
import M from 'materialize-css'
import { store } from './Services/Store'

onMounted(() => {
    M.AutoInit();
});

</script>

<script>

getIpAddress();
getUserAgent();
getHost();

function getIpAddress() {
  fetch('https://jsonip.com', { mode: 'cors' })
  .then((resp) => resp.json())
  .then((ip) => {
    store.ipaddress = ip.ip;
  });
}

function getUserAgent() {
    store.useragent = navigator.userAgent;
}

function getHost() {
    store.host = window.location.host;
}


export default {
  name: "app",
  components: {
    GetStarted,
    UploadFront,
    FinalScreen,
    AdditionalData
  },
  data() {
    return {
      comp: "GetStarted",
    };

  },
  methods :{
    changeComponent(){
      if (this.comp == "GetStarted") {
         this.comp = "UploadFront"
        return;
      }
    },
    loadCameraProcessor() {
      loadSdk();
     
    },
    frontImageCaptured() {
    },

    displayData() {
      if (this.comp == "UploadFront") {
        this.comp = "FinalScreen"
        return;
      }
    }
  },
  created: function() {
      this.loadCameraProcessor();
      window.addEventListener('updateDynamicComponent', this.displayData);
  }
};
</script>

<template>
  <Suspense>
    <component :is="comp" />
  </Suspense>
  
  <div class="row">
    <div id="start-button" class="col-12 start-button-fade">
      <button @click="changeComponent" class="btn waves-effect waves-light">LETS GET STARTED!</button>
    </div>
  </div>
</template>

<style scoped>
 header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} 


button {
    background-color: #2A7F84;
}

.start-button-fade {
    margin-top: 20px;
    text-align: center;
    opacity: 0;
    animation: fadeIn 1s;
    animation-delay: 2s;
    -webkit-animation: fadeIn 1s;
    -moz-animation: fadeIn 1s;
    -o-animation: fadeIn 1s;
    -ms-animation: fadeIn 1s;
    -webkit-animation-delay: 2s;
    -moz-animation-delay: 2s;
    -o-animation-delay: 2s;
    -ms-animation-delay: 2s;
    -webkit-animation-fill-mode: forwards;
}

.material-start {
  background-position: center;
  -webkit-transition: background 0.8s;
  transition: background 0.8s;
}
.material-start:hover {
  background: #2A7F84 radial-gradient(circle, transparent 1%, #2A7F84 1%) center/15000%;
}
.material-start:active {
  background-color: #12938C;
  background-size: 100%;
  -webkit-transition: background 0s;
  transition: background 0s;
}

@keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
}

@-moz-keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
}

@-webkit-keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
}

@-o-keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
}

@-ms-keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
}

</style>
