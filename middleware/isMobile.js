export default function ({ isServer, req, redirect, route }) {
  let isMobile = (ua) => {
    return !!ua.match(/AppleWebKit.*Mobile.*/)
  }
  let userAgent = req ? req.headers['user-agent'] : navigator.userAgent || ''
  return isMobile(userAgent)
}
