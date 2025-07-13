import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { EmployeeList } from './components/Employee/EmployeeList';
import { EmployeeForm } from './components/Employee/EmployeeForm';
import { CheckInList } from './components/CheckIn/CheckInList';
import { TaskList } from './components/Task/TaskList';

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container mt-4">
                <Routes>
                    <Route path="/employees" element={
                        <>
                            <EmployeeList />
                            <EmployeeForm />
                        </>
                    } />
                    <Route path="/check-ins" element={
                        <>
                            <CheckInList />
                        </>
                    } />
                    <Route path="/tasks" element={<TaskList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;