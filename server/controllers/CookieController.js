const CookieController = {};

// CookieController.setSSIDCookie = (req, res, next) => {
//   res.cookie('ssid', res.locals.id, { httpOnly: true })
//   console.log('cookie is set')
//   next();
// }

CookieController.setSSIDCookie = (req, res, next) => {
  const timeMS = 1 * 60 * 1000;
  res
    .cookie('ssid', res.locals.id, {maxAge: timeMS})
  next();
}

CookieController.clearCookie = (req, res, next) => {
  res.clearCookie('ssid');
  next();  
}

module.exports = CookieController;