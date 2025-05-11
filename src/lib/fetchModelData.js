/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 * @returns {Promise}      A Promise that resolves with the response data when the request is complete.
 */
function fetchModel(url) {
  return fetch(`http://localhost:8081${url}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("fetchModel error:", error);
      throw error;
    });
}

export default fetchModel;
