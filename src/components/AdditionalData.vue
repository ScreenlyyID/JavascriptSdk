<script setup>
import { onMounted } from 'vue'
import M from 'materialize-css'
import { store } from '../Services/Store'
import { showElementWithClass, hideElementWithClass } from "../Services/CameraService"
import { emitCompletedEvent, ProcessAllOtherChecks, countryData } from "../Services/DocumentService"
import { ref } from 'vue';


import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';

const phone = ref(null);

onMounted(() => {
    M.AutoInit();
    hideElementWithClass('address-data');
});

let firstname = store.documentdata.DocumentVisualResults.find(o => o.Name === "given_name").Value;
let lastname = store.documentdata.DocumentVisualResults.find(o => o.Name === "surname").Value;
let birthdatetime = new Date(store.documentdata.DocumentVisualResults.find(o => o.Name === "date_of_birth").Value);
let birthdate = birthdatetime.toDateString();// store.documentdata.Biographic.BirthDate;

let expirydatetime = new Date(store.documentdata.DocumentVisualResults.find(o => o.Name === "date_of_expiry").Value);
let expirationdate = expirydatetime.toDateString();
let documntnumber = store.documentdata.DocumentVisualResults.find(o => o.Name === "document_number").Value;

if (store.documentdata.DocumentVisualResults.find(o => o.Name === "Address Line 1")) {
    var addressline1 =  store.documentdata.DocumentVisualResults.find(o => o.Name === "Address Line 1").Value;
} 

if (store.documentdata.DocumentVisualResults.find(o => o.Name === "Address Line 2")) {
    var addressline2 = store.documentdata.DocumentVisualResults.find(o => o.Name === "Address Line 2").Value
}

if (store.documentdata.DocumentVisualResults.find(o => o.Name === "Address City")) {
    var city = store.documentdata.DocumentVisualResults.find(o => o.Name === "Address City").Value + " ";
}
if (store.documentdata.DocumentVisualResults.find(o => o.Name === "Address State")) {
    var state = store.documentdata.DocumentVisualResults.find(o => o.Name === "Address State").Value + " ";
}
if (store.documentdata.DocumentVisualResults.find(o => o.Name === "Address Postal Code")) {
    var zipcode = store.documentdata.DocumentVisualResults.find(o => o.Name === "Address Postal Code").Value
}

 let addressLine1Model = addressline1;
 let addressLine2Model = addressline2;
 let cityModel = city;
 let stateModel = state;
 let zipcodeModel = zipcode;
 let sex = "";
 let emailModel = "";
//  let phone = "";
 let country = "";
 let bin = "";






function ShowAdditionalDataTwo() {
      ValidateFormOne();
      hideElementWithClass('id-data');
      showElementWithClass('address-data');
}

async function CompleteAdditionalData() {

      let required = [];

      if (!emailModel)
      {
            required.push("email-validation");
      };

      if (!phone.value) {
            required.push('phone-validation'); 
      };

      if (!addressLine1Model) {
            required.push('address1-validation'); 
      };

      if (!cityModel) {
            required.push('city-validation'); 
      };

      if (!stateModel) {
            required.push('state-validation'); 
      };

      if (!zipcodeModel) {
            required.push('zip-validation'); 
      };

      if (required.length > 0) {
            required.forEach(item => {
                  showElementWithClass(item);

            });
      
            return;
      };

      console.log("country: ");
      console.log(country);

      console.log("phone: ");
      console.log(phone);
      console.log(phone.value);
      console.log(phone.value.country);

      const addressdata = {
            firstname: firstname,
            middlename: "",
            lastname:lastname,
            birthdatetime: birthdatetime,
            expirydatetime: expirydatetime,
            documntnumber: documntnumber,
            addressline1: addressLine1Model,
            addressline2: addressLine2Model,
            city: cityModel,
            state: stateModel,
            zipcode: zipcodeModel,
            sex: sex,
            email: emailModel,
            phone: phone.value,
            country: country,
            bin: bin
      };

      store.additionaldata = addressdata;

      ProcessAllOtherChecks();
      emitCompletedEvent();
}

function ValidateFormOne() {

}

// async function ValidateFormTwo() {

//       if (!emailModel)
//       {
//             showElementWithClass('email-validation'); 
//             return;
//       }
// }

</script>


<template>
     <div class="d-flex flex-row fade-in-text-step1">
                <div class="p-2">
                    <div class="circle-wrap3">
                        <div class="circle3">
                            <div class="mask3 full3">
                                <div class="fill3"></div>
                            </div>
                            <div class="mask3 half3">
                                <div class="fill3"></div>
                            </div>
                            <div class="inside-circle3"> 3 of 4 </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex p-2 align-items-center">
                    <div class="d-flex flex-column">
                        <div class="step">Step 3</div>
                        <div class="step-name-header">Confirm details</div>
                        <div class="step-header">Next: done!</div>
                    </div>
                </div>
            </div>

            <hr class="solid">
            <div class="row" id="id-data">
                <div class="col-12">
                    <div class="">
                        <p style="padding-top: 15px">Please make sure the information extracted is correct as shown on your ID Card.</p>
                              <div class="input-field ">
                                    <input v-model="firstname" id="first_name" type="text" class="validate">
                                    <label for="first_name" class="active">First Name</label>
                                    <span class="hide" id="firstname-validation" style="color: red;">First Name is required!</span>
                              </div>
                            
                              <div class="input-field ">
                                    <input placeholder="" id="middle_name" type="text" class="validate">
                                    <label for="middle_name">Middle Name</label>
                              </div>
                          
                              <div class="input-field ">
                                    <input v-model="lastname" id="last_name" type="text" class="validate">
                                    <label for="last_name" class="active">Last Name</label>
                                    <span class="hide" id="lastname-validation" style="color: red;">Last Name is required!</span>
                              </div>
                           
                              <div class="input-field ">
                                    <input v-model="documntnumber" id="document-number" type="text" class="validate">
                                    <label class="active" for="document-number">Document Number</label>
                                    <span class="hide" id="document-validation" style="color: red;">Document Number is required!</span>
                              </div>
                        
                              <div class="input-field">
                                    <input v-model="birthdate" type="text" class="datepicker" id="dob">
                                    <label class="active" for="dob">Date of Birth</label>
                                    <span class="hide" id="dob-validation" style="color: red;">DOB is required!</span>
                              </div>

                              <div class="input-field ">
                                    <input v-model="expirationdate" type="text" class="datepicker" id="document-expiry">
                                    <label class="active" for="document-expiry">Document Expiry Date</label>
                                    <span class="hide" id="expiry-validation" style="color: red;">Exprity Date is required!</span>
                              </div>
                          
                              <div class="input-field">
                                    <select v-model="sex">
                                          <option value="" disabled selected>
                                          </option>
                                          <option value="1">Male</option>
                                          <option value="2">Female</option>
                                          <option value="3">Other</option>
                                    </select>
                                    <label>Gender</label>
                               </div>
                           
                              <div class="input-field">
                                     <div>
                                          <label>
                                                <input type="checkbox" class="filled-in" checked="checked" />
                                                <span>I consent that the above information is correct.</span>
                                          </label>
                                    </div>   
                              </div> 

                              <button @click="ShowAdditionalDataTwo" class="btn waves-effect waves-light">CONFIRM</button> 
      
                    </div>
                </div>
            </div>



            <div class="row" id="address-data">
                <div class="col-12">
                    <div class="">
                        <p style="padding-top: 15px">Please make sure the information extracted is correct as shown on your ID Card.</p>

                              <div class="input-field">
                                    <input v-model="emailModel" id="email" type="text" class="validate" required>
                                    <label for="email">Email</label>
                                    <span class="hide" id="email-validation" style="color: red;">Email is required!</span>
                              </div>

                              <div class="input-field">
                                    <vue-tel-input v-model="phone" mode="international" class="tel-override" :inputOptions="{placeholder: 'Phone'}"></vue-tel-input>
                                    <span class="hide" id="phone-validation" style="color: red;">Phone is required!</span>
                              </div>
                          
                              <div class="input-field">
                                    <input v-model="addressLine1Model" id="addressline1" type="text" class="validate">
                                    <label for="addressline1" class="active" >Address Line 1</label>
                                    <span class="hide" id="address1-validation" style="color: red;">Address Line 1 is required!</span>
                              </div>
                           
                              <div class="input-field">
                                    <input v-model="addressLine2Model" id="addressline2" type="text" class="validate">
                                    <label  for="addressline2" class="active">Address Line 2</label>
                              </div>
                        
                              <div class="input-field">
                                    <input v-model="cityModel" id="city" type="text" class="validate">
                                    <label  for="city" class="active">City</label>
                                    <span class="hide" id="city-validation" style="color: red;">City is required!</span>
                              </div>
                              
                              <div class="input-field">
                                    <input v-model="stateModel" id="state" type="text" class="validate">
                                    <label  for="state" class="active">State</label>
                                    <span class="hide" id="state-validation" style="color: red;">State is required!</span>
                              </div>

                              <div class="input-field">
                                    <input v-model="zipcodeModel" type="text" class="validate" id="zipcode">
                                    <label for="zipcode" class="active">Zip Code</label>
                                    <span class="hide" id="zip-validation" style="color: red;">Zip Code is required!</span>
                              </div>

                              <div class="input-field">
                                    <select v-model="country">
                                          <option v-for="item in countryData"
                                          :value="item.name"
                                          :key="item.id">{{ item.name }}</option>
                                    </select>
                                    <label>Country</label>
                               </div>

                              <!-- <div class="input-field">
                                    <input v-model="country" type="text" class="validate" id="country">
                                    <label for="country">Country</label>
                                    <span class="hide" id="countr-validation" style="color: red;">Country is required!</span>
                              </div> -->
                          
                              <div class="input-field">
                                    <div>
                                          <label>
                                                <input type="checkbox" class="filled-in" checked="checked" />
                                                <span>I consent that the above information is correct.</span>
                                          </label>
                                    </div>
                              </div>      
                              
                              <div class="input-field button">
                                    <button @click="CompleteAdditionalData" class="btn waves-effect waves-light" >CONFIRM</button>   
                                    <!-- <button class="btn waves-effect waves-light" @click=" StartCamera()">Capture Front of Document</button> -->
                              </div>
                              
                    </div>
                </div>
            </div>

</template>

<style scoped>
button {
    background-color: #2A7F84;
    width: 100%;
}

.tel-override {
      border: 0px !important;
      margin-left: -10px;
      font-size: 1rem !important;
}

.tel-override input {
      font-size: 1rem !important;
}


</style>