<script setup>
</script>

<script>
</script>
<template>
      <div class="row" id="capture-id">
            <div class="col-12 col-xs-12 mx-auto">
                <div class="row">
                    <div class="col-12">
                       
                    </div>
                </div>
                <div class="">
                    <div class="row">
                        <div>
                            <h5>Let's get you verified!</h5>
                            <p>We will guide you through the digital identification process:</p>
                        </div>

                    </div>
                    <hr class="solid">
                        <div class="steps-container">

                            <div class="" >
                                <div class="d-flex align-items-center fade-in-text-step1">
                                    <div class="selected-step">
                                        <span>1</span>
                                        <i class="tick-icon" data-eva="checkmark-outline"></i>
                                    </div>
                                    <div class="d-flex flex-column">
                                        <div class="step">Step 1</div>
                                        <div class="step-name">Upload your ID</div>
                                    </div>
                                </div>
                                <div class="d-flex flex-column fade-in-text-step2">
                                    <div class="divider">
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <div class="selected-step">
                                            <span>2</span>
                                            <i class="tick-icon" data-eva="checkmark-outline"></i>
                                        </div>
                                        <div class="d-flex flex-column">
                                            <div class="step">Step 2</div>
                                            <div class="step-name">Take a selfie to verify its you</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex flex-column fade-in-text-step3">
                                    <div class="divider">
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <div class="selected-step">
                                            <span>3</span>
                                            <i class="tick-icon" data-eva="checkmark-outline"></i>
                                        </div>
                                        <div class="d-flex flex-column">
                                            <div class="step">Step 3</div>
                                            <div class="step-name">Confirm your details are correct</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex flex-column fade-in-text-step4">
                                    <div class="divider">
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <div class="selected-step">
                                            <span>4</span>
                                            <i class="tick-icon" data-eva="checkmark-outline"></i>
                                        </div>
                                        <div class="d-flex flex-column">
                                            <div class="step">Step 4</div>
                                            <div class="step-name">Process Complete!</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="row">
                            <div class="col-12 start-button-fade">
                                <button @click="onClickButton">Lets Get Started!</button>
                            </div>
                        </div> -->
                    </div>
            </div>
        </div>
 </template>


<style scoped>

.divider {
    height: 32px;
    width: 2px;
    background: #2A7F84;
    margin: 10px 23px;
    border-radius: 2px;
}

.selected-step {
    height: 48px;
    width: 48px;
    border-radius: 50%;
    background-color: #2A7F84;
    border: 2px solid #2A7F84;
    box-shadow: inset 0 0 0 4px white;
    margin-right: 20px;
    /*font-family: Inter;*/
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
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
.step-name {
    /*font-family: Inter;*/
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
    letter-spacing: -0.01em;
    text-align: left;
    color: #1E1E1E;
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

.steps-container {
    -webkit-font-smoothing: antialiased;
    /* font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji; */
}

.fade-in-text-step1 {
    /*font-family: Arial;*/
    /*font-size: 60px;*/
    animation: fadeIn 1s;
    -webkit-animation: fadeIn 1s;
    -moz-animation: fadeIn 1s;
    -o-animation: fadeIn 1s;
    -ms-animation: fadeIn 1s;
}

.fade-in-text-step2 {
    /*font-family: Arial;*/
    /*font-size: 60px;*/
    opacity: 0;
    animation: fadeIn 1s;
    animation-delay: 0.5s;
    
    -webkit-animation: fadeIn 1s;
    -moz-animation: fadeIn 1s;
    -o-animation: fadeIn 1s;
    -ms-animation: fadeIn 1s;
    -webkit-animation-delay: 0.5s;
    -moz-animation-delay: 0.5s;
    -o-animation-delay: 0.5s;
    -ms-animation-delay: 0.5s;
    -webkit-animation-fill-mode: forwards;
}

.fade-in-text-step3 {
    /*font-family: Arial;*/
    /*font-size: 60px;*/
    opacity: 0;
    animation:  fadeIn 1s;
    animation-delay: 1s;
    -webkit-animation: fadeIn 1s;
    -moz-animation: fadeIn 1s;
    -o-animation: fadeIn 1s;
    -ms-animation: fadeIn 1s;
    -webkit-animation-delay: 1s;
    -moz-animation-delay: 1s;
    -o-animation-delay: 1s;
    -ms-animation-delay: 1s;
    -webkit-animation-fill-mode: forwards;
}

.fade-in-text-step4 {
    /*font-family: Arial;*/
    /*font-size: 60px;*/
    opacity: 0;
    animation: fadeIn 1s;
    animation-delay: 1.5s;
    -webkit-animation: fadeIn 1s;
    -moz-animation: fadeIn 1s;
    -o-animation: fadeIn 1s;
    -ms-animation: fadeIn 1s;
    -webkit-animation-delay: 1.5s;
    -moz-animation-delay: 1.5s; 
    -o-animation-delay: 1.5s;
    -ms-animation-delay: 1.5ss;
    -webkit-animation-fill-mode: forwards;
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

/* hr.solid {
    border-top: 1px solid #bbb;
}

.mdc-button {
    height: 45px !important;
} */
</style>