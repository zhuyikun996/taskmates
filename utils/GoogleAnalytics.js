import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('G-K71KPF6TTZ'); // 将 YOUR_TRACKING_ID 替换为你的 Google Analytics 跟踪 ID
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
