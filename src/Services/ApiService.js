
import  axios from 'axios'
import { BASE_URL, API_KEY } from './Config'
import { store } from './Store'



// **** DOCUMENT API CALLS ******


export async function CreateSession() {
    let url = BASE_URL + '/api/v1/enrolment/initialize';
    let headers = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY,
                    'X-Correlation-Id': store.correlationId
                }
            };

    let response = await axios.post(url, null, headers);

   
    return response.data;
}

export async function EnrolDocument() {
    let url = BASE_URL + '/api/v1/enrolment/document';
    let headers = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY,
                    'X-Correlation-Id': store.correlationId,
                    'x-session-id' : store.accessToken
                }
            };

    let body = {
        "imageBase": store.image.data
    };

   
    let response = await axios.post(url, body, headers);

    return response.data;
}


// ********************************




export async function ProcessAdditionalInformation() {

    let body = {
        "FirstName":store.additionaldata.firstname,
        "MiddleName": store.additionaldata.middlename,
        "LastName": store.additionaldata.lastname,
        "DocumentNumber": store.additionaldata.documntnumber,
        "DateOfBirth": store.additionaldata.birthdatetime,
        "DocumentExpiryDateTime" : store.additionaldata.expirydatetime,
        "Gender": store.additionaldata.sex,
        "Email": store.additionaldata.email,
        "IdentityCardNumber": "",
        "AddressLine1": store.additionaldata.addressline1,
        "AddressLine2": store.additionaldata.addressline2,
        "City": store.additionaldata.city,
        "State": store.additionaldata.state,
        "ZipCode": store.additionaldata.zipcode,
        "CountryCodePhone": "", //todo what should go here
        "Country": store.additionaldata.country,
        "PhoneNumber": store.additionaldata.phone,
        "BinNumber": store.additionaldata.bin,
        "IntTelNumber": "", // todo what should go here
        "CompletedName": store.additionaldata.firstname + " " + store.additionaldata.middlename + " " + store.additionaldata.lastname
    };


    let url = BASE_URL + `/api/v1/additional-data`;
    let headers = {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'X-Correlation-Id': `${store.correlationId}`
            }
        };

    let result = await axios.post(url, body, headers);
    
    return result.data;
}

export async function ProcessAML() {

    let body = {
         "AccountName": "",
         "City": store.additionaldata.city,
         "CountryCode": "AU", // store.additionaldata.country,
          "DateOfBirth": store.additionaldata.birthdatetime,
          "FirstName": store.additionaldata.firstname,
          "LastName": store.additionaldata.lastname,
          "MiddleName": store.additionaldata.middlename,
          "State": store.additionaldata.state,
          "Street": store.additionaldata.addressline1,
          "Zip": store.additionaldata.zipcode
        };

    let url = BASE_URL + `/sanctions/match`
    let headers = {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'X-Correlation-Id': `${store.correlationId}`
            }
        };

    let result = await axios.post(url, body, headers);
    
    return result.data;
}

export async function ProcessADV() {
    let record = [{
        "RecordId": "1",
        "AddressLine1": store.additionaldata.addressline1,
        "AddressLine2": store.additionaldata.addressline2,
        "Locality": store.additionaldata.city,
        "PostalCode": store.additionaldata.zipcode,
        "Country": store.additionaldata.country,
        "AdministrativeArea": store.additionaldata.state
    }];


    let body = {
        Record: record
    };

    let url = BASE_URL + `/api/v1/global-address`
    let headers = {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'X-Correlation-Id': `${store.correlationId}`
            }
        };

    let result = await axios.post(url, body, headers);
    
    return result.data;
}

export async function ProcessHLRPHV() {
    let body = {
        "PhoneNumber": store.additionaldata.phone,
        "CountryCode": "" //store.additionaldata.country
    };

    let url = BASE_URL + `/api/v1/hlr-lookup`
    let headers = {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'X-Correlation-Id': `${store.correlationId}`
            }
        };

    let result = await axios.post(url, body, headers);
    
    return result.data;
}

export async function ProcessPHV() {
    let body = {
        "PhoneNumber": store.additionaldata.phone,
        "CountryCode": ""// store.additionaldata.country
    };

    let url = BASE_URL + `/api/v1/phone-validate`
    let headers = {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'X-Correlation-Id': `${store.correlationId}`
            }
        };

    let result = await axios.post(url, body, headers);
    
    return result.data;
}


export async function ProcessEMV() {
    let body = {
        "Email": store.additionaldata.email
    };

    let url = BASE_URL + `/api/v1/email-verify`
    let headers = {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'X-Correlation-Id': `${store.correlationId}`
            }
        };

    let result = await axios.post(url, body, headers);
    
    return result.data;
}

export async function ProcessBIN() {
    let body = {
        "BinNumber": store.additionaldata.bin,
        "CustomerIpAddress": store.ipaddress
    };

    let url = BASE_URL + `/api/v1/bin-lookup`
    let headers = {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'X-Correlation-Id': `${store.correlationId}`
            }
        };

    let result = await axios.post(url, body, headers);
    
    return result.data;
}

export async function ProcessIPVHostRep() {
    let body = {
        "host": store.ipaddress
    };

    let url = BASE_URL + `/api/v1/host-reputation-verify`
    let headers = {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'X-Correlation-Id': `${store.correlationId}`
            }
        };

    let result = await axios.post(url, body, headers);
    
    return result.data;
} 

export async function ProcessIPVIPBlocklist() {
    let body = {
        "IpAdress": store.ipaddress
    };

    let url = BASE_URL + `/api/v1/ip-blocklist-verify`
    let headers = {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'X-Correlation-Id': `${store.correlationId}`
            }
        };

    let result = await axios.post(url, body, headers);
    
    return result.data;
} 

export async function ProcessIPVIPProbe() {
    let body = {
        "IpAdress": store.ipaddress
    };

    let url = BASE_URL + `/api/v1/ip-probe-verify`
    let headers = {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'X-Correlation-Id': `${store.correlationId}`
            }
        };

    let result = await axios.post(url, body, headers);
    
    return result.data;
} 

export async function ProcessIPVUALookup() {
    let body = {
        "UserAgent": store.useragent
    };

    let url = BASE_URL + `/api/v1/ua-lookup-verify`
    let headers = {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'X-Correlation-Id': `${store.correlationId}`
            }
        };

    let result = await axios.post(url, body, headers);
    
    return result.data;
} 

export async function ProcessPHE() {
    let url = BASE_URL + `/api/v1/person/enrich/phone`
    let headers = {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'X-Correlation-Id': `${store.correlationId}`,
            'Phone': store.additionaldata.phone
            }
        };

    let result = await axios.get(url, headers);
    
    return result.data
}

export async function ProcessEME() {
    let url = BASE_URL + `/api/v1/person/enrich/email`
    let headers = {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'X-Correlation-Id': `${store.correlationId}`,
            'Email': store.additionaldata.email
            }
        };

    let result = await axios.get(url, headers);
    
    return result.data
}


