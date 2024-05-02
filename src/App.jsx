import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import VehicleList from './components/VehicleList';
import RepairList from './components/RepairList';
import './App.css'
import AddEditVehicle from './components/AddEditVehicle';
import AddEditRepair from './components/AddEditRepair';
import AddOperation from './components/AddOperation';
import R1VehicleReport from './components/R1VehicleReport';
import R3BrandReport from './components/R3BrandReport';
import BonusList from './components/BonusList';
import AddEditBonus from './components/AddEditBonus';
import Home from './components/Home';

function App() {
  return (
    <Router>
    <div className="container">
      <Navbar></Navbar>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/vehicles/add" element={<AddEditVehicle/>}/>
        <Route path="/vehicles/edit/:id" element={<AddEditVehicle/>}/>
        <Route path="/vehicles" element={<VehicleList/>} />
        <Route path="/repairs" element={<RepairList/>} />
        <Route path="/repairs/add" element={<AddEditRepair/>}/>
        <Route path="/repairs/edit/:id" element={<AddEditRepair/>}/>
        <Route path="/operation/add/:id" element={<AddOperation/>} />
        <Route path="/bonus" element={<BonusList/>} />
        <Route path="/bonus/add" element={<AddEditBonus/>} />
        <Route path="/bonus/edit/:id" element={<AddEditBonus/>} />
        <Route path="/reports/r1" element={<R1VehicleReport/>} />
        <Route path="/reports/r3" element={<R3BrandReport/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App
