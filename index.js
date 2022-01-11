import { Logging } from '@google-cloud/logging'

const logName = `wakeflow`
const metadata = { labels: { wakeflow: `wakeflow` } }

export class Logger {
  constructor({ projectId }){
    this.projectId = projectId
    this.logging = new Logging({ projectId })
    this.log = this.logging.log(logName)
  }

  async info(message,data){
    if(process.env.NODE_ENV !== `production`) return local(message,data)
    await this.log.write(
      this.log.entry({ ...metadata,severity: `INFO` },prepPayload(message,data)),
    )
  }
  async warn(message){
    if(process.env.NODE_ENV !== `production`) return local(message)
    await this.log.write(
      this.log.entry({ ...metadata,severity: `WARNING` },prepPayload(message,data)),
    )
  }
  async error(message){
    if(process.env.NODE_ENV !== `production`) return local(message)
    await this.log.write(
      this.log.entry({ ...metadata,severity: `ERROR` },prepPayload(message,data)),
    )
  }
}

const prepPayload = (message,data) => {
  let payload = {}
  if(typeof message === `string`) payload.message = message
  if(isObject(message)) payload = { ...payload,...message }
  if(isObject(data)) payload = { ...payload,...data }
  return payload
}

const local = (message,data) => {
  // if(typeof message === `object`) console.log(JSON.stringify(message,null,2))
  // else console.log(message)
  if(data) console.log(message,data)
  else console.log(message)
}

const isObject = thing => {
  return typeof thing === `object` &&
  !Array.isArray(thing) &&
  thing !== null
}