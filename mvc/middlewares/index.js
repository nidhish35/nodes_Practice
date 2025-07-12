const fs = require('fs');

function logRequest(filename) {
    return (req, res, next) => {
        fs.appendFile(filename, `${new Date().toISOString()} - ${req.method} ${req.url}\n`, (err, data) => {
            next();
        });
    };
}

module.exports = {
    logRequest  
};