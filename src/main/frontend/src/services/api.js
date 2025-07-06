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
    return await response.json();
};

export const deleteCheckIn = async (id) => {
    await fetch(`${API_BASE}/check-in/${id}`, { method: 'DELETE' });
};