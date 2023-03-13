const log = (req, res, next) => {
    const toLocalDateString = new Date();
    console.log(toLocalDateString, '=', req.method, req.originalUrl);
    next();
}

module.exports = log;