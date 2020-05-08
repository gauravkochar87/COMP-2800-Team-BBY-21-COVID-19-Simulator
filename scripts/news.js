// https://news.api.gov.bc.ca/api/Newsletters
$(document).ready(function()
{
    // Initialize firebase database
    // var db = firebase.firestore();

    // Current time in 24hr format
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" 
        + today.getSeconds();
    var date = today.getDate();
    var dateTime = date + "T" + time;

    // API info
    const api_url = "https://news.api.gov.bc.ca/api/Newsletters?api-version=1.0&timestamp=" + dateTime;
    const apiKey = "F0WKhsUdvFbAGtq1xT7oQlrAg5A99Csa"

    async function getData(url)
    {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    }

    getData(api_url);

    // /api/Newsletters:
    // get:
    //   tags:
    //     - Newsletters
    //   summary: Get all newsletters
    //   operationId: Newsletters_GetAll
    //   parameters:
    //     - name: api-version
    //       in: query
    //       description: The requested API version
    //       required: true
    //       schema:
    //         type: string
    //         default: '1.0'
    //   responses:
    //     '200':
    //       description: Success
    //       content:
    //         text/plain:
    //           schema:
    //             type: array
    //             items:
    //               $ref: '#/components/schemas/Newsletter'
    //         application/json:
    //           schema:
    //             type: array
    //             items:
    //               $ref: '#/components/schemas/Newsletter'
    //         text/json:
    //           schema:
    //             type: array
    //             items:
    //               $ref: '#/components/schemas/Newsletter'

    // [
    //     {
    //       "key": "string",
    //       "timestamp": "2020-05-07T23:12:51.217Z",
    //       "name": "string",
    //       "ministryName": "string",
    //       "description": "string",
    //       "editions": [
    //         {
    //           "key": "string",
    //           "value": "string"
    //         }
    //       ]
    //     }
    // ]
})