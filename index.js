import { Logging } from '@google-cloud/logging'

const logName = `wakeflow`
const logging = new Logging({ projectId })
const log = logging.log(logName)
const metadata = { labels: { wakeflow: `wakeflow` } }

export class Logger {
  constructor({ projectId }){
    this.projectId = projectId
    this.logging = new Logging({ projectId })
    this.log = this.logging.log(logName)
  }

  async info(message){
    if(process.env.NODE_ENV !== `production`) return local(message)
    await log.write(log.entry({ ...metadata,severity: `INFO` },message))
  }
  async warn(message){
    if(process.env.NODE_ENV !== `production`) return local(message)
    await log.write(log.entry({ ...metadata,severity: `WARNING` },message))
  }
  async error(message){
    if(process.env.NODE_ENV !== `production`) return local(message)
    await log.write(log.entry({ ...metadata,severity: `ERROR` },message))
  }
}

const local = message => {
  // if(typeof message === `object`) console.log(JSON.stringify(message,null,2))
  // else console.log(message)
  console.log(message)
}
