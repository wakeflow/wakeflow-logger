import { Logging } from '@google-cloud/logging'

const logName = `wakeflow`
const metadata = { labels: { wakeflow: `wakeflow` } }

export class Logger {
  constructor(){
    this.logging = new Logging()
    this.log = this.logging.log(logName)
  }

  async log(message,data){
    if(process.env.NODE_ENV !== `production`) return local(message,data)
    await this.log.write(
      this.log.entry({ ...metadata,severity: `INFO` },prepPayload(message,data)),
    )
  }
  async info(message,data){
    if(process.env.NODE_ENV !== `production`) return local(message,data)
    await this.log.write(
      this.log.entry({ ...metadata,severity: `INFO` },prepPayload(message,data)),
    )
  }
  async warn(message,data){
    if(process.env.NODE_ENV !== `production`) return local(message,data)
    await this.log.write(
      this.log.entry({ ...metadata,severity: `WARNING` },prepPayload(message,data)),
    )
  }
  async error(message,data){
    if(process.env.NODE_ENV !== `production`) return local(message,data)
    await this.log.write(
      this.log.entry({ ...metadata,severity: `ERROR` },prepPayload(message,data)),
    )
  }
}

const prepPayload = (message,data) => {
  let payload = {}
  if(data instanceof Error){
    payload.message = message || data.message;
    `status,code,statusCode,stack,response`.split(`,`).forEach(key => {
      if(data[key]) payload[key] = data[key]
    })
    return payload
  } 
  if(message instanceof Error){
    payload.message = message.message;
    `status,code,statusCode,stack,response`.split(`,`).forEach(key => {
      if(message[key]) payload[key] = message[key]
    })
    return payload
  } 
  if(typeof message === `string`) payload.message = message
  if(isObject(data)) payload = { ...payload,...data }
  if(isObject(message)) payload = { ...payload,...message }
  return payload
}

const local = (message,data) => {
  // if(typeof message === `object`) console.log(JSON.stringify(message,null,2))
  // else console.log(message)
  if(data) console.log(message,data)
  console.log(message)
}

const isObject = thing => {
  return typeof thing === `object` &&
  !Array.isArray(thing) &&
  thing !== null
}