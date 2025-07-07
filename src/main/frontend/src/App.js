import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { EmployeeList } from './components/EmployeeList';
import { EmployeeForm } from './components/EmployeeForm';
import { CheckInList } from './components/CheckInList';
import { CheckInForm } from './components/CheckInForm';

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
                </Routes>
            </div>
        </Router>
    );
}

export default App;