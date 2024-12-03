export const setRouteSpecificParams = (route, params) => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
  
    // Remove all existing query params
    Array.from(searchParams.keys()).forEach(key => searchParams.delete(key));
  
    // Add new params specific to the route
    Object.entries(params).forEach(([key, value]) => {
      if (value && value !== '' && value !== 'any') {
        searchParams.set(key, value);
      }
    });
  
    // Update URL without page reload
    const newUrl = `${url.pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}${url.hash}`;
    window.history.replaceState({}, '', newUrl);
};
  
export const getRouteSpecificParams = (route) => {
    const searchParams = new URLSearchParams(window.location.search);
    const params = {};
  
    // Convert URLSearchParams to a plain object
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
  
    return params;
};
  
export const clearRouteParams = () => {
  const newUrl = `${window.location.origin}${window.location.pathname}#${hashRoute}`; navigate(newUrl, { replace: true });
};