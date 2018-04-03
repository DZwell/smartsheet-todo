import 'whatwg-fetch';

class TaskController {
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
        // TODO: Rerender or forceUpdate or something instead of this
        window.location.reload();
        return body;
    }

    /**
     * Change the status of a task
     * @param {Object} task
     */
    async changeStatus(task) {
        const taskObject = Object.assign({}, task, { completed: !task.completed });
        const response = await fetch(`/api/tasks/${task.id}`,
            {
                method: 'PUT',
                body: JSON.stringify(taskObject),
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
        // TODO: Rerender or forceUpdate or something instead of this
        window.location.reload();
        return body;
    }

    /**
     * Delete a task
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
        // TODO: Rerender or forceUpdate or something instead of this
        window.location.reload();
        return body;
    }
}

export default new TaskController();
