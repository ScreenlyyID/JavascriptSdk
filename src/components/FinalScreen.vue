<script setup>
import { store } from '../Services/Store'
// import { datadogRum } from '@datadog/browser-rum'


//get decision results
let expirydateScore =  store.documentresult.Verifications.DateOfExpiration.Score;
let expirydateLevel = store.documentresult.Verifications.DateOfExpiration.Level;
let livenessScore = store.documentresult.Verifications.DocumentLiveness.Score;
let livenessLevel = store.documentresult.Verifications.DocumentLiveness.Level;
let faceverificationScore = store.documentresult.Verifications.FaceVerification.Score;
let facialverificationLevel = store.documentresult.Verifications.FaceVerification.Level;
let passivelivenessScore = store.documentresult.Verifications.PassiveLiveness.Score;
let passivelivenessLevel = store.documentresult.Verifications.PassiveLiveness.Level;
let overallocrconfidenceScore = store.documentresult.Verifications.OverallOcrFieldsConfidence.Score;
let overallocrconfidenceLevel = store.documentresult.Verifications.OverallOcrFieldsConfidence.Level;

let overalldecisionScore = store.documentresult.Decision.Score;
let overalldecisionLevel = store.documentresult.Decision.Level;

let mrzcrosscheckScoreModel = "";
let mrzcrosscheckLevelModel = "";
if (store.documentresult.Verifications.MrzOcrCrossCheck) {
    mrzcrosscheckScoreModel = store.documentresult.Verifications.MrzOcrCrossCheck.Score;
    mrzcrosscheckLevelModel = store.documentresult.Verifications.MrzOcrCrossCheck.Level;
} 








</script>

<script>


</script>

<template>
       <div class="d-flex flex-row fade-in-text-step1">
                <div class="p-2">
                    <div class="circle-wrap4">
                        <div class="circle4">
                            <div class="mask4 full4">
                                <div class="fill4"></div>
                            </div>
                            <div class="mask4 half4">
                                <div class="fill4"></div>
                            </div>
                            <div class="inside-circle4"> 4 of 4 </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex p-2 align-items-center">
                    <div class="d-flex flex-column">
                        <div class="step">Step 4</div>
                        <div class="step-name-header">Process complete!</div>
                        <div class="step-header"></div>
                    </div>
                </div>
            </div>

            <hr class="solid">

            <div class="row">
                <div class="col-12 mx-auto">
                    <div class="vstack gap-2 mx-auto">
                      
                        <p><strong>Results</strong></p>
                        <table class="table">
                            <tbody>
                                 <tr>
                                     <td>Overall Confidence</td>
                                      <td> {{ overalldecisionScore }} </td>
                                      <td> {{ overalldecisionLevel }} </td>
                                </tr>                  
                                 <tr>
                                     <td>Date of Expiry</td>
                                      <td> {{ expirydateScore }} </td>
                                      <td> {{ expirydateLevel }} </td>
                                </tr>

                                <tr>
                                     <td>Document Liveness</td>
                                      <td> {{ livenessScore }} </td>
                                      <td> {{ livenessLevel }} </td>
                                </tr>

                                <tr>
                                     <td>Facematch</td>
                                      <td> {{ faceverificationScore }} </td>
                                      <td> {{ facialverificationLevel }} </td>
                                </tr>

                                <tr>
                                     <td>Passive Liveness</td>
                                      <td> {{ passivelivenessScore }} </td>
                                      <td> {{ passivelivenessLevel }} </td>
                                </tr>

                                <tr>
                                     <td>Overall OCR Field Confidence</td>
                                      <td> {{ overallocrconfidenceScore }} </td>
                                      <td> {{ overallocrconfidenceLevel }} </td>
                                </tr>

                                <tr v-if="mrzcrosscheckScoreModel != ''">
                                     <td>MRZ Cross Check Score</td>
                                      <td> {{ mrzcrosscheckScoreModel }} </td>
                                      <td> {{ mrzcrosscheckLevelModel }} </td>
                                </tr>
                                                       
                            </tbody>
                        
                        </table>
                    
                    </div>
               
                </div>
            </div>





            <div class="row">
                <div class="col-12 mx-auto">
                    <div class="vstack gap-2 mx-auto">
                      
                        <p><strong>Visual Data</strong></p>
                        <table class="table">
                            <tbody>   
                                
                                <tr v-for="item in store.documentdata.DocumentVisualResults" :key="item.name">
                                    <td>{{ item.Name }}</td>
                                    <td>{{ item.Value }}</td>
                                </tr>
                                            
                            </tbody>
                        
                        </table>
                    
                    </div>
               
                </div>
            </div>

            <div class="row"  v-if="mrzcrosscheckScoreModel != ''">
                <div class="col-12 mx-auto">
                    <div class="vstack gap-2 mx-auto">
                      
                        <p><strong>MRZ Data</strong></p>
                        <table class="table">
                            <tbody>                           
                                <tr v-for="item in store.documentdata.DocumentMrzResults" :key="item.name">
                                    <td>{{ item.Name }}</td>
                                    <td>{{ item.Value }}</td>
                                </tr>
                            </tbody>
                        
                        </table>
                    
                    </div>
               
                </div>
            </div>
        
</template>

<style scoped>
button {
    background-color: #2A7F84;
    width: 100%;
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