import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import SalesOrderScreen from './pages/SalesOrderScreen';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/order" element={<SalesOrderScreen />} />
          <Route path="/order/:id" element={<SalesOrderScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;