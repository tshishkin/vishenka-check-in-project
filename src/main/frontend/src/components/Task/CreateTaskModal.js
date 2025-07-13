import { useState , useEffect} from 'react';
import { fetchEmployees, createTask } from '../../services/api';

export const CreateTaskModal = ({ show, onClose, onTaskCreated }) => {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        deadlineTs: '', // Будет хранить только дату
        employeeId: ''
    });

    // Загрузка сотрудников при открытии модалки
    useEffect(() => {
        if (show) {
            fetchEmployees().then(data => setEmployees(data));
        }
    }, [show]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const taskData = {
                ...formData,
                // Добавляем время 23:59:59 к дате дедлайна
                deadlineTs: formData.deadlineTs ? `${formData.deadlineTs}T23:59:59` : null,
                createTs: new Date().toISOString(), // Текущая дата и время
                status: 'NEW'
            };

            const createdTask = await createTask(taskData);
            onTaskCreated(createdTask);
            onClose();
        } catch (error) {
            console.error('Ошибка создания задачи:', error);
            alert('Не удалось создать задачу');
        }
        window.location.reload();
    };

    return (
        <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Создать задачу</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Название*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Описание</label>
                                <textarea
                                    className="form-control"
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Срок выполнения*</label>
                                <input
                                    type="date" // Используем type="date" вместо datetime-local
                                    className="form-control"
                                    value={formData.deadlineTs}
                                    onChange={(e) => setFormData({...formData, deadlineTs: e.target.value})}
                                    required
                                    min={new Date().toISOString().split('T')[0]} // Минимум - сегодня
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Исполнитель*</label>
                                <select
                                    className="form-select"
                                    value={formData.employeeId}
                                    onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                                    required
                                >
                                    <option value="">Выберите исполнителя</option>
                                    {employees.map(emp => (
                                        <option key={emp.id} value={emp.id}>
                                            {emp.employeeName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Отмена
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Создать
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};