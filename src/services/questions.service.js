const API_URL = process.env.REACT_APP_API_URL;
const QUESTIONS_ROUTE = process.env.REACT_APP_QUESTIONS_ROUTE;

const URL = API_URL + QUESTIONS_ROUTE;

class QuestionService {
  responseHandler(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(response.message);
    }
  }

  get() {
    return fetch(URL).then(this.responseHandler);
  }

  post(question) {
    return fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    }).then(this.responseHandler);
  }

  put(question) {
    return fetch(URL + question.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    }).then(this.responseHandler);
  }

  delete(id) {
    return fetch(URL + id, { method: "DELETE" }).then(this.responseHandler);
  }
}

export default QuestionService;
