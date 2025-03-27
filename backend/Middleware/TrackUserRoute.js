import useragent from "express-useragent";
import geoip from "geoip-lite";

export const trackUserActivity = (req, res, next) => {
  // Get IP address
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  
  // Get device & browser details
  const userAgent = useragent.parse(req.headers["user-agent"]);

  // Get approximate location using IP
  const geo = geoip.lookup(ip);

  req.userActivity = {
    ip: ip,
    browser: userAgent.browser,
    os: userAgent.os,
    device: userAgent.isMobile ? "Mobile" : userAgent.isDesktop ? "Desktop" : "Other",
    location: geo ? `${geo.city}, ${geo.country}` : "Unknown",
  };

  next();
};
