import { useState } from 'react';
import { createCheckIn } from '../services/api';
import { fetchEmployees } from '../services/api';

export const CheckInForm = () => {
    const getCurrentDate = () => {
        const now = new Date();
        return now.toISOString().split('T')[0];
    };

    const [formData, setFormData] = useState({
        employeeId: '',
        checkInDate: getCurrentDate()
    });
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useState(() => {
        const loadEmployees = async () => {
            try {
                const data = await fetchEmployees();
                setEmployees(data);
                if (data.length > 0) {
                    setFormData(prev => ({
                        ...prev,
                        employeeId: data[0].id
                    }));
                }
            } catch (err) {
                console.error('Ошибка загрузки сотрудников:', err);
            }
        };
        loadEmployees();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.employeeId) {
            setError('Выберите сотрудника');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            await createCheckIn(formData);

            window.location.reload();

        } catch (err) {
            setError('Не удалось создать чекин');
            console.error('Ошибка:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-3">
            <h5 className="mb-3">Создать чекин</h5>
            {error && <div className="alert alert-danger py-2">{error}</div>}

            <form onSubmit={handleSubmit} className="border p-3 rounded">
                <div className="mb-2">
                    <label className="form-label small">Сотрудник</label>
                    <select
                        className="form-control form-control-sm"
                        value={formData.employeeId}
                        onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                        disabled={loading || employees.length === 0}
                    >
                        {employees.map(emp => (
                            <option key={emp.id} value={emp.id}>
                                {emp.employeeName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label small">Дата</label>
                    <input
                        type="date"
                        className="form-control form-control-sm"
                        value={formData.checkInDate}
                        onChange={(e) => setFormData({...formData, checkInDate: e.target.value})}
                        disabled={loading}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    disabled={loading || employees.length === 0}
                >
                    {loading ? 'Создание...' : 'Создать'}
                </button>
            </form>
        </div>
    );
};