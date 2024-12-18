import winston from 'winston';
import 'winston-mongodb'

const logConfig = {
    transports: [ 
        winston.add(new winston.transports.MongoDB({
            db: 'mongodb://localhost:27017/coderhouse',
            collection: 'logs',
            tryReconnect: true,
            leve: 'warn'
        }))
     ]
}

const logger = winston.createLogger(logConfig);

logger.level = 'silly';

logger.silly('imprimimos silly')
logger.debug('imprimimos debug')
logger.verbose('imprimimos verboose')
logger.info('imprimimos info')
logger.http('imprimimos http')
logger.warn('imprimimos warn')

try{
    throw new Error('estamos probando error log')
}catch(error){
    logger.error(error.message)
}
