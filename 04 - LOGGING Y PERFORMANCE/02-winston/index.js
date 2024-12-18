import winston from 'winston';

const logConfig = {
    transports: [ 
        new winston.transports.Console( {level: 'verbose'} ),
        new winston.transports.File( {filename: './logs/error.log', level: 'warn'} ),
        new winston.transports.File( {filename: './logs/error-2.log', level: 'error'} )
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
logger.error('imprimimos error')

