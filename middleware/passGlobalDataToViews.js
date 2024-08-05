const passGlobalDataToViews = (req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.title = 'Summoner DB'
    next();
};

module.exports = passGlobalDataToViews;