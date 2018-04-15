import 'whatwg-fetch';

class TaskClient {
  /**
   * Sends a request to server and returns response body
   * @param {String} method
   * @param {Object} requestBody
   * @param {String} param
   */
  async sendRequest(method, requestBody, param) {
    let url;
    let response;

    if (param) {
      url = `/api/tasks/${param}`;
    } else {
      url = '/api/tasks';
    }

    if (requestBody) {
      response = await fetch(
        url,
        {
          method,
          body: JSON.stringify(requestBody),
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
        },
      );
    } else {
      response = await fetch(url, { method });
    }

    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  }
}

export default new TaskClient();
