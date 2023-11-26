import { reactive } from 'vue'

export const store = reactive({
    image: {},
    side: 0,
    // instanceId: "",
    correlationId: "",
    documentdata: {},
    documentresult: {},
    livenessscore: {},
    documentphoto: {},
    facematchscore: {},
    lookupId: "",
    scansAllowed: {},
    apiKey: "",
    additionaldata: {},
    ipaddress: "",
    useragent: "",
    host: "",
    sessionId: "",
    accessToken: ""
})