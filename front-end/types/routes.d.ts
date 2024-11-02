/* eslint-disable @typescript-eslint/no-empty-object-type */
declare type API_ROUTE_TYPE_DEFINITION = {
  "/api/user": {
    "from": {
      "AppController": "getUser"
    },
    "request": {
      "query": {
        "name": string,
        "age": number
      },
      "params"?: {},
      "body"?: {}
    },
    "response": {
      "200": {
        "200": string
      }
    }
  },
  "/api/user/{name}/{age}": {
    "from": {
      "AppController": "postUser"
    },
    "request": {
      "query"?: {},
      "params": {
        "name": string,
        "age": number
      },
      "body"?: {}
    },
    "response": {
      "201": {
        "name": string,
        "age": number
      }
    }
  }
};