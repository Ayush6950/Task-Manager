// Logger Utility
const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
};

class Logger {
  constructor(name) {
    this.name = name;
  }

  format(level, message, data = null) {
    const timestamp = new Date().toISOString();
    let log = `[${timestamp}] [${level}] [${this.name}] ${message}`;
    if (data) {
      log += ` ${JSON.stringify(data)}`;
    }
    return log;
  }

  error(message, data) {
    const log = this.format(LOG_LEVELS.ERROR, message, data);
    console.error(log);
  }

  warn(message, data) {
    const log = this.format(LOG_LEVELS.WARN, message, data);
    console.warn(log);
  }

  info(message, data) {
    const log = this.format(LOG_LEVELS.INFO, message, data);
    console.log(log);
  }

  debug(message, data) {
    if (process.env.DEBUG === 'true') {
      const log = this.format(LOG_LEVELS.DEBUG, message, data);
      console.log(log);
    }
  }
}

export const createLogger = (name) => new Logger(name);