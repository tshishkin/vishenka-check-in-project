import { useState, useEffect } from 'react';
import { fetchTasks, updateTaskStatus, deleteTask } from '../../services/api';
import { TaskDetailsModal } from './TaskDetailsModal';
import { CreateTaskModal } from './CreateTaskModal';

export const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const data = await fetchTasks();
            const sortedTasks = [...data].sort((a, b) =>
                new Date(b.createTs) - new Date(a.createTs)
            );
            setTasks(sortedTasks);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await updateTaskStatus(taskId, newStatus);
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === taskId ? { ...task, status: newStatus } : task
                )
            );
        } catch (error) {
            console.error('Ошибка при обновлении статуса:', error);
            alert('Не удалось обновить статус задачи');
        }
    };

    const handleDelete = async (taskId) => {
            try {
                await deleteTask(taskId);
                setTasks(tasks.filter(task => task.id !== taskId));
            } catch (error) {
                console.error('Ошибка при удалении задачи:', error);
                alert('Не удалось удалить задачу');
            }

    };

    const handleTaskCreated = (newTask) => {
        setTasks(prev => [newTask, ...prev]);
    };

    const handleRowClick = (taskId) => {
        setSelectedTaskId(taskId);
        setShowDetailsModal(true);
    };

    if (loading) return <div className="text-center my-5">Загрузка...</div>;
    if (error) return <div className="alert alert-danger">Ошибка: {error}</div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Список задач</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowCreateModal(true)}
                >
                    Создать задачу
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="table-light">
                    <tr>
                        <th>Название</th>
                        <th>Срок</th>
                        <th>Статус</th>
                        <th>Сотрудник</th>
                        <th className="text-end"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.map(task => (
                        <tr key={task.id}>
                            <td
                                onClick={() => handleRowClick(task.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                {task.title}
                            </td>
                            <td>{new Date(task.deadlineTs).toLocaleDateString('ru-RU')}</td>
                            <td>
                                <select
                                    className={`form-select form-select-sm ${getStatusClass(task.status)}`}
                                    value={task.status}
                                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                >
                                    <option value="NEW">Новая</option>
                                    <option value="IN_PROGRESS">В работе</option>
                                    <option value="COMPLETED">Завершена</option>
                                </select>
                            </td>
                            <td>
                                {task.employee && (
                                    <span
                                        className="employee-name d-flex align-items-center"
                                        style={{ color: task.employee.colorCode, fontWeight: 500 }}
                                    >
                      <span
                          className="color-badge me-2"
                          style={{ backgroundColor: task.employee.colorCode }}
                      ></span>
                                        {task.employee.employeeName}
                    </span>
                                )}
                            </td>
                            <td className="text-end">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(task.id);
                                    }}
                                    className="btn btn-link text-danger p-0"
                                    title="Удалить задачу"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <TaskDetailsModal
                taskId={selectedTaskId}
                show={showDetailsModal}
                onClose={() => setShowDetailsModal(false)}
            />

            <CreateTaskModal
                show={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onTaskCreated={handleTaskCreated}
            />
        </div>
    );
};

// Вспомогательные функции
const getStatusClass = (status) => {
    switch(status) {
        case 'COMPLETED': return 'success';
        case 'IN_PROGRESS': return 'warning';
        case 'NEW': return 'primary';
        default: return 'secondary';
    }
};