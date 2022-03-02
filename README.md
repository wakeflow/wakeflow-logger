## Intro

We use this repo to send logs to the Google Cloud Platform

## Installation
```
npm i wakeflow-logger
``` 
## Usage

```
import { Logger } from 'wakeflow-logger'

const logger = new Logger()

logger.info('this is info')
logger.warn('this is a warning')
logger.error('this is an error')
logger.error(new Error('hello error'))

try{
  something()
}catch(err){
  logger.error(err)
}

logger.info('you can also add a json payload',{payload:"this is a json payload"})
logger.info({payload:"or send only a json payload"})
```
## Development mode

If you are working on your local machine, logs are sent to console.log

Only if `NODE_ENV=production` do logs get sent to GCP

## Viewing logs

To view your logs go to: https://console.cloud.google.com/logs

and enter the query `labels.wakeflow="wakeflow"`

Make sure you're looking at the correct GCP project.


---
![Wakeflow Logo](https://wakeflow.io/wakeflowlogo-white.png)

👨‍💻 Visit us on [www.wakeflow.io](https://wakeflow.io) 

💬 Chat with us on [WhatsApp](https://wakeflow.io/logos/whatsapp.png) or our [live chat](https://wakeflow.io)

✉️ [Email us](mailto:contact@wakeflow.io)
