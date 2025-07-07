import { useState, useEffect } from 'react';
import { fetchCheckIns, deleteCheckIn, createCheckIn, fetchEmployees } from '../services/api';
import { Modal, Button, Form } from 'react-bootstrap';

export const CheckInList = () => {
    const [checkIns, setCheckIns] = useState([]);
    const [timeSpan, setTimeSpan] = useState('CURRENT_WEEK');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');

    // Загрузка сохраненного сотрудника при монтировании
    useEffect(() => {
        const savedEmployee = localStorage.getItem('lastSelectedEmployee');
        if (savedEmployee) {
            setSelectedEmployee(savedEmployee);
        }
    }, []);

    const getWeekDates = (span) => {
        const now = new Date();
        const currentDay = now.getDay();
        let startDate = new Date(now);
        startDate.setDate(now.getDate() - currentDay + (currentDay === 0 ? -6 : 1));

        if (span === 'NEXT_WEEK') {
            startDate.setDate(startDate.getDate() + 7);
        }

        return Array.from({ length: 7 }).map((_, i) => {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            return date;
        });
    };

    useEffect(() => {
        loadData();
    }, [timeSpan]);

    const loadData = async () => {
        try {
            setLoading(true);
            setError(null);

            const [checkInsData, employeesData] = await Promise.all([
                fetchCheckIns(timeSpan),
                fetchEmployees()
            ]);

            setCheckIns(Array.isArray(checkInsData) ? checkInsData : []);
            setEmployees(employeesData);

            // Устанавливаем сохраненного сотрудника, если он существует в списке
            if (employeesData.length > 0) {
                const savedEmployee = localStorage.getItem('lastSelectedEmployee');
                if (savedEmployee && employeesData.some(e => e.id.toString() === savedEmployee)) {
                    setSelectedEmployee(savedEmployee);
                } else {
                    setSelectedEmployee(employeesData[0].id.toString());
                }
            }
        } catch (err) {
            setError('Не удалось загрузить данные');
            console.error('Ошибка загрузки:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteCheckIn(id);
            loadData();
        } catch (err) {
            setError('Не удалось удалить чекин');
            console.error('Ошибка удаления:', err);
        }
    };

    const handleDayClick = (date) => {
        setSelectedDate(date.toISOString().split('T')[0]);
        setShowModal(true);
    };

    const handleCreateCheckIn = async () => {
        try {
            await createCheckIn({
                employeeId: selectedEmployee,
                checkInDate: selectedDate
            });

            // Сохраняем выбранного сотрудника
            localStorage.setItem('lastSelectedEmployee', selectedEmployee);

            setShowModal(false);
            loadData();
        } catch (err) {
            setError('Не удалось создать чекин');
            console.error('Ошибка создания:', err);
        }
    };

    const weekDays = getWeekDates(timeSpan);
    const checkInsByDay = weekDays.map(day => {
        const dayStr = day.toISOString().split('T')[0];
        return {
            date: day,
            dayName: day.toLocaleDateString('ru-RU', { weekday: 'long' }),
            dateFormatted: day.toLocaleDateString('ru-RU'),
            checkIns: checkIns.filter(checkIn =>
                checkIn.checkInDate.split('T')[0] === dayStr
            )
        };
    });

    if (loading) return <div className="text-center my-4">Загрузка...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h5">Список чекинов</h2>
                <select
                    className="form-select form-select-sm w-auto"
                    value={timeSpan}
                    onChange={(e) => setTimeSpan(e.target.value)}
                >
                    <option value="CURRENT_WEEK">Текущая неделя</option>
                    <option value="NEXT_WEEK">Следующая неделя</option>
                </select>
            </div>

            <div className="table-responsive">
                <table className="table table-sm table-bordered">
                    <tbody>
                    {checkInsByDay.map(({ dayName, dateFormatted, date, checkIns }) => (
                        <tr key={dateFormatted}>
                            <td className="bg-light" style={{ width: '150px' }}>
                                <div className="fw-bold">{dayName}</div>
                                <small className="text-muted">{dateFormatted}</small>
                            </td>
                            <td style={{ verticalAlign: 'middle', minHeight: '50px' }}>
                                <div className="d-flex flex-wrap gap-2 align-items-center">
                                    {checkIns.map(checkIn => (
                                        <div
                                            key={checkIn.id}
                                            className="badge d-flex align-items-center p-2"
                                            style={{
                                                backgroundColor: checkIn.employee?.colorCode || '#e9ecef',
                                                color: '#212529'
                                            }}
                                        >
                                                <span className="me-2">
                                                    {checkIn.employee?.employeeName || 'Неизвестный'}
                                                </span>
                                            <button
                                                className="btn btn-link p-0 text-danger"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(checkIn.id);
                                                }}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        className="btn btn-outline-success rounded-1 p-0 d-flex align-items-center justify-content-center"
                                        onClick={() => handleDayClick(date)}
                                        style={{
                                            width: '28px',
                                            height: '28px',
                                            flexShrink: 0
                                        }}
                                        title="Добавить чекин"
                                    >
                                            <span style={{
                                                lineHeight: 1,
                                                fontSize: '1.1rem',
                                                position: 'relative',
                                                top: '-1px'
                                            }}>
                                                +
                                            </span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить чекин</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Дата</Form.Label>
                        <Form.Control
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Сотрудник</Form.Label>
                        <Form.Select
                            value={selectedEmployee}
                            onChange={(e) => setSelectedEmployee(e.target.value)}
                        >
                            {employees.map(emp => (
                                <option key={emp.id} value={emp.id}>
                                    {emp.employeeName}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={handleCreateCheckIn}>
                        Добавить
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};