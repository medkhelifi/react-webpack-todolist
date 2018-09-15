// helper.js
/**
 * This helper will be used later to connect to https://restdb.io/ database
 * medKhelifi
 */
import axios from 'axios';

// CORS enabled apikey
const apikey = '5b9d02986e310a4351fdc0a9';

// Autotrade delay
const trade_delay = 10000; // millis

// REST endpoint
let restdb = axios.create({
    baseURL: 'https://reactrealtime-6683.restdb.io',
    timeout: 1000,
    headers: { 'x-apikey': apikey }
});
// Eventsource endpoint
const realtimeURL = `https://todolist-7394.restdb.io/rest/todo?apikey=${apikey}`

export { apikey, restdb, realtimeURL, trade_delay };
