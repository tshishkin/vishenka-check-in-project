import { useState, useEffect } from 'react';
import { fetchTaskDetails } from '../../services/api';

export const TaskDetailsModal = ({ taskId, show, onClose }) => {
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (show && taskId) {
            setLoading(true);
            fetchTaskDetails(taskId)
                .then(data => {
                    setTask(data);
                    setError(null);
                })
                .catch(err => {
                    setError(err.message);
                    console.error('Fetch task error:', err);
                })
                .finally(() => setLoading(false));
        }
    }, [show, taskId]);

    const formatDateTime = (dateString) => {
        if (!dateString) return 'Не указано';
        return new Date(dateString).toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (!show) return null;

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Детали задачи</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>

                    <div className="modal-body">
                        {loading && <div className="text-center">Загрузка...</div>}
                        {error && <div className="alert alert-danger">{error}</div>}

                        {task && (
                            <>
                                <div className="row mb-3">
                                    <div className="col-md-8">
                                        <h4>{task.title}</h4>
                                        <div className="mt-3">
                                            <h6>Описание:</h6>
                                            <p className="text-muted">{task.description || 'Описание отсутствует'}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="d-flex align-items-center mb-3">
                                            <span className="me-2">Статус:</span>
                                            <span className={`badge bg-${getStatusClass(task.status)}`}>
                        {translateStatus(task.status)}
                      </span>
                                        </div>
                                        {task.employee && (
                                            <div className="d-flex align-items-center">
                                                <span className="me-2">Исполнитель:</span>
                                                <span
                                                    className="employee-name"
                                                    style={{ color: task.employee.colorCode, fontWeight: 500 }}
                                                >
                          <span
                              className="color-badge me-1"
                              style={{ backgroundColor: task.employee.colorCode }}
                          ></span>
                                                    {task.employee.employeeName}
                        </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="card mb-3">
                                            <div className="card-body">
                                                <h6 className="card-subtitle mb-2 text-muted">Создана</h6>
                                                <p className="card-text">{formatDateTime(task.createTs)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card">
                                            <div className="card-body">
                                                <h6 className="card-subtitle mb-2 text-muted">Срок выполнения</h6>
                                                <p className="card-text">{new Date(task.deadlineTs).toLocaleDateString('ru-RU')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Закрыть
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Вспомогательные функции
const translateStatus = (status) => {
    switch(status) {
        case 'NEW': return 'Новая';
        case 'IN_PROGRESS': return 'В работе';
        case 'COMPLETED': return 'Завершена';
        default: return status;
    }
};

const getStatusClass = (status) => {
    switch(status) {
        case 'COMPLETED': return 'success';
        case 'IN_PROGRESS': return 'warning';
        case 'NEW': return 'primary';
        default: return 'secondary';
    }
};