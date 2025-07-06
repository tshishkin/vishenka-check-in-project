import { useState, useEffect } from 'react';
import { fetchCheckIns, deleteCheckIn } from '../services/api';

export const CheckInList = () => {
    const [checkIns, setCheckIns] = useState([]);
    const [timeSpan, setTimeSpan] = useState('CURRENT_WEEK');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const timeSpanOptions = [
        { value: 'CURRENT_WEEK', label: 'Текущая неделя' },
        { value: 'NEXT_WEEK', label: 'Следующая неделя' }
    ];

    // Функция для получения дней недели (текущей или следующей)
    const getWeekDates = (span) => {
        const now = new Date();
        const currentDay = now.getDay();
        let startDate = new Date(now);

        // Находим понедельник текущей недели
        startDate.setDate(now.getDate() - currentDay + (currentDay === 0 ? -6 : 1));

        // Если выбрана следующая неделя, добавляем 7 дней
        if (span === 'NEXT_WEEK') {
            startDate.setDate(startDate.getDate() + 7);
        }

        // Создаем массив из 7 дней недели
        return Array.from({ length: 7 }).map((_, i) => {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            return date;
        });
    };

    // Форматируем дату для сравнения (YYYY-MM-DD)
    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };

    useEffect(() => {
        loadCheckIns();
    }, [timeSpan]);

    const loadCheckIns = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchCheckIns(timeSpan);
            setCheckIns(Array.isArray(data) ? data : []);
        } catch (err) {
            setError('Не удалось загрузить чекины');
            console.error('Ошибка загрузки:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteCheckIn(id);
            loadCheckIns();
        } catch (err) {
            setError('Не удалось удалить чекин');
            console.error('Ошибка удаления:', err);
        }
    };

    // Получаем дни недели в зависимости от выбранного периода
    const weekDays = getWeekDates(timeSpan);

    // Группируем чекины по дням
    const checkInsByDay = weekDays.map(day => {
        const dayStr = formatDate(day);
        return {
            date: day,
            dayName: day.toLocaleDateString('ru-RU', { weekday: 'long' }),
            dateFormatted: day.toLocaleDateString('ru-RU'),
            checkIns: checkIns.filter(checkIn =>
                formatDate(new Date(checkIn.checkInDate)) === dayStr
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
                    {timeSpanOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="table-responsive">
                        <table className="table table-sm table-bordered">
                            <tbody>
                            {checkInsByDay.map(({ dayName, dateFormatted, checkIns }) => (
                                <tr key={`${dayName}-${dateFormatted}`}>
                                    <td className="bg-light" style={{ width: '150px' }}>
                                        <div className="fw-bold">{dayName}</div>
                                        <small className="text-muted">{dateFormatted}</small>
                                    </td>
                                    <td>
                                        {checkIns.length > 0 ? (
                                            <div className="d-flex flex-wrap gap-2">
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
                                            </div>
                                        ) : (
                                            <small className="text-muted">Нет чекинов</small>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};