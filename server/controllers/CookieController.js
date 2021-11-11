const CookieController = {};

CookieController.setSSIDCookie = (req, res, next) => {
  res.cookie('ssid', res.locals.id, { httpOnly: true })
  console.log('cookie is set')
  next();

}
CookieController.clearCookie = (req, res, next) => {

  res.clearCookie('ssid');
  next();  
}

module.exports = CookieController;