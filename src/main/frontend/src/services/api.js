const API_BASE = 'http://localhost:8989';

export const fetchEmployees = async () => {
    const response = await fetch(`${API_BASE}/employee`);
    return await response.json();
};

export const createEmployee = async (employee) => {
    const response = await fetch(`${API_BASE}/employee`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
    });
    return await response.json();
};

export const deleteEmployee = async (id) => {
    await fetch(`${API_BASE}/employee/${id}`, { method: 'DELETE' });
};

export const fetchCheckIns = async (span = 'CURRENT_WEEK') => {
    const response = await fetch(`${API_BASE}/check-in/${span}`);
    return await response.json();
};

export const createCheckIn = async (checkIn) => {
    const response = await fetch(`${API_BASE}/check-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checkIn)
    });

    if (response.status === 204 || response.headers.get('content-length') === '0') {
        return null;
    }

    return await response.json();
};

export const deleteCheckIn = async (id) => {
    await fetch(`${API_BASE}/check-in/${id}`, { method: 'DELETE' });
};

export const fetchTasks = async () => {
    const response = await fetch(`${API_BASE}/task`);
    return await response.json();
};

export const updateTaskStatus = async (taskId, status) => {
    const response = await fetch(`${API_BASE}/task/${taskId}/update-status?status=${status}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Ошибка при обновлении статуса задачи');
    }
};

export const deleteTask = async (taskId) => {
    const response = await fetch(`${API_BASE}/task/${taskId}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error('Ошибка при удалении задачи');
    }
};

export const createTask = async (taskData) => {
    const response = await fetch(`${API_BASE}/task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
    });
};

export const fetchTaskDetails = async (id) => {
    const response = await fetch(`${API_BASE}/task/${id}`);
    if (!response.ok) {
        throw new Error('Ошибка при получении данных задачи');
    }
    return await response.json();
};