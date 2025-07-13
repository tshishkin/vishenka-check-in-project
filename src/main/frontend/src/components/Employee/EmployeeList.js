import { useState, useEffect } from 'react';
import { fetchEmployees, deleteEmployee } from '../../services/api';

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchEmployees();
            setEmployees(data);
        } catch (err) {
            setError('Не удалось загрузить сотрудников');
            console.error('Ошибка загрузки:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteEmployee(id);
            loadEmployees();
        } catch (err) {
            setError('Не удалось удалить сотрудника');
            console.error('Ошибка удаления:', err);
        }
    };

    if (loading) return <div className="text-center my-2">Загрузка...</div>;
    if (error) return <div className="alert alert-danger py-1">{error}</div>;

    return (
        <div className="container mt-2">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0">Список сотрудников</h5>
                <span className="badge bg-secondary">{employees.length}</span>
            </div>

            <ul className="list-group">
                {employees.map(emp => (
                    <li
                        key={emp.id}
                        className="list-group-item d-flex justify-content-between align-items-center py-1 px-2"
                    >
                        <div className="d-flex align-items-center">
                            <span
                                className="me-2 rounded-circle d-inline-block"
                                style={{
                                    width: '12px',
                                    height: '12px',
                                    backgroundColor: emp.colorCode || '#cccccc'
                                }}
                            ></span>
                            <span>{emp.employeeName}</span>
                        </div>
                        <button
                            className="btn btn-outline-danger btn-sm py-0 px-1"
                            onClick={() => handleDelete(emp.id)}
                            title="Удалить"
                        >
                            ×
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};