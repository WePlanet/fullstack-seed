# Fullstack-seed
It is a web framework based on [angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack) and supports express.js backend and angular.js frontend. 
You can use it for the service consist of mobile api and back office system.    

## Usage
Download:

`git clone https://github.com/WePlanet/fullstack-seed.git`

Install:

`npm install && bower install`

Add setting files:

`server/config/config.json` for mysql settings

```
{
  "development": {
    "username": "",
    "password": "",
    "database": "",
    "host": "",
    "dialect": "mysql"
  },
  "test": {},
  "production": {}
}
```

`server/config/awsConfig.json` for aws settings

```
{
  "development": {
    "accessKeyId": "",
    "secretAccessKey": "",
    "region": "",
    "s3Bucket": {
      "name": "",
      "url": ""
    }
  },
  "test": {},
  "production": {}
}
```

`server/config/emailConfig.json` for email(Gmail) settings

```
{
  "development": {
    "senderAddress": "",
    "password": ""
  },
  "test": {},
  "production": {}
}
```

Run `grunt` for building, `grunt serve` for preview, and `grunt build` for a deploy version of app.


## Supported functions
* OAuth 2.0 by passport and json web token
* Realtime web api by socket.io
* Upload profile image on to AWS S3
* Sending new password by email


Forked from: [fullstack-demo](https://github.com/DaftMonk/fullstack-demo)
