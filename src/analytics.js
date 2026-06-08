import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-Q3Q6MSR40C");
};

export const pageView = () => {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
  });
};

// generic event tracker
export const trackEvent = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};