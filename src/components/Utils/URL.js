/**
  * @function replaceURLState
  * @params params - Object
  * @description Helper function to push state to url
  */
export const replaceURLState = (params) => {
  params.toString();
  window.history.replaceState({}, '', decodeURIComponent(`${window.location.pathname}?${params}`));
};

