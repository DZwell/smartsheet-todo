import 'whatwg-fetch';

class TaskClient {
  /**
   * Get all tasks
   */
  async getTasks() {
    const response = await fetch('/api/tasks');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  }

  /**
   * Delete a task
   * @param {Number} id
   */
  async deleteTask(id) {
    const response = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  }

  /**
   * Change the status of a task
   * @param {Object} task
   */
  async changeStatus(task) {
    const response = await fetch(`/api/tasks/${task.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(task),
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      },
    );

    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  }

  /**
   * Add a task
   * @param {Number} id
   */
  async addTask(task) {
    const response = await fetch('/api/tasks',
      {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      },
    );

    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  }

  /**
   * Edit a task
   * @param {Number} id
   */
  async editTask(task) {
    const response = await fetch(`/api/tasks/${task.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(task),
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      },
    );

    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  }

  /**
   * Get tasks by category
   * @param {String} category
   */
  async getTasksByCategory(category) {
    const response = await fetch(`/api/tasks/${category}`);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  }
}

export default new TaskClient();
