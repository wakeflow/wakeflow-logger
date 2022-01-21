
import { Logger } from './index.js'


const logger = new Logger()
logger.error(new Error(`hello error`))