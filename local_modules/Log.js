const log = {
    info: (message) => {
        console.log(message);
    },
    error: (message) => {
        console.error('Error: ' + message);
    },
    warning: (message) => {
        console.warn('Warning: ' + message);
    }
};

module.exports = log;