import { useState } from 'react';
import { createEmployee } from '../services/api';

export const EmployeeForm = () => {
    const [formData, setFormData] = useState({
        employeeName: '',
        colorCode: '#3aa8c1'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.employeeName.trim()) {
            setError('Введите имя сотрудника');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            await createEmployee(formData);

            window.location.reload();

        } catch (err) {
            setError('Не удалось добавить сотрудника');
            console.error('Ошибка:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-3">
            <h5 className="mb-3">Добавить сотрудника</h5>
            {error && <div className="alert alert-danger py-2">{error}</div>}

            <form onSubmit={handleSubmit} className="border p-3 rounded">
                <div className="mb-2">
                    <label className="form-label small">Имя сотрудника</label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        value={formData.employeeName}
                        onChange={(e) => setFormData({...formData, employeeName: e.target.value})}
                        disabled={loading}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label small">Цвет</label>
                    <div className="d-flex align-items-center">
                        <input
                            type="color"
                            className="form-control form-control-color"
                            value={formData.colorCode}
                            onChange={(e) => setFormData({...formData, colorCode: e.target.value})}
                            disabled={loading}
                            style={{ width: '50px', height: '30px' }}
                        />
                        <span className="ms-2 small text-muted">{formData.colorCode}</span>
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    disabled={loading}
                >
                    {loading ? 'Добавление...' : 'Добавить'}
                </button>
            </form>
        </div>
    );
};