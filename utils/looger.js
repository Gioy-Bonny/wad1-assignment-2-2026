/*
 * Logger utility for the Photo Gallery App.
 * Configures and exports a Winston logger instance with console transport.
 * Log level defaults to 'debug' but can be overridden via the LEVEL environment variable.
 */

import winston from 'winston';

/*
 * Creates a new Winston logger instance with console transport.
 * JSON formatting is disabled to keep logs human-readable in the console.
 */
const logger = new (winston.createLogger)({
    transports: [new (winston.transports.Console)({ json: false })], // Output logs to the console in plain text
});

logger.level = 'debug'; // Set the default log level to 'debug' to capture all log messages

/*
 * Overrides the default log level if the LEVEL environment variable is set.
 * Allows log verbosity to be controlled externally (e.g. 'info', 'warn', 'error').
 */
if (process.env.LEVEL) {
    logger.level = process.env.LEVEL; // Apply the log level from the environment variable
}

export default logger;