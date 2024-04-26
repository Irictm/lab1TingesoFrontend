import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import VehicleList from './components/VehicleList';
import RepairList from './components/RepairList';
import './App.css'
import AddEditVehicle from './components/AddEditVehicle';

function App() {
  return (
    <Router>
    <div className="container">
      <Navbar></Navbar>
      <Routes>
        <Route path="/vehicles/add" element={<AddEditVehicle/>}/>
        <Route path="/vehicles/edit/:id" element={<AddEditVehicle/>}/>
        <Route path="/vehicles" element={<VehicleList/>} />
        <Route path="/repairs" element={<RepairList/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App
