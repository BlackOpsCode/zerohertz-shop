import { BrowserRouter as Router , Routes, Route } from "react-router-dom";
import HomeComponent from "./pages/HomeComponent";

// importing styles
import './styles/HomeComponent.css'
import './styles/TopBar.css'
import './styles/Contact.css'
import './styles/Footer.css'
import './styles/Drums.css'
import Drums from "./pages/Drums";
import Guitars from "./pages/Guitars";
import Basses from "./pages/Basses";
import Keyboards from "./pages/Keyboards";
import Synths from "./pages/Synths";
import Microphones from "./pages/Microphones";
import AudioInterfaces from "./pages/AudioInterfaces";
import StudioMonitors from "./pages/StudioMonitors";
import Cables from "./pages/Cables";
import Accessories from "./pages/Accessories";
import Software from "./pages/Software";
import RecordingGear from "./pages/RecordingGear";

export default function App(){
  return(
    <Router>
      <Routes>
        <Route path='/' element={<HomeComponent/>}/>

        <Route path="/drums/:category?" element={<Drums />} />
        
        <Route path="/guitars/:category?" element={<Guitars />} />

        <Route path='/bass/:category?' element={<Basses/>}/>
    
        <Route path='/keyboards/:category?' element={<Keyboards/>}/>
        
        <Route path='/synths/:category?' element={<Synths/>}/>
        {/*<Route path='/microphones' element={<Microphones/>}/>*/}
        
        <Route path="/audio-interfaces/:category?" element={<AudioInterfaces/>}/>
        
        <Route path="/studio-monitors/:category?" element={<StudioMonitors/>}/>
        
        {/*<Route path="/cables" element={<Cables/>}/>*/}
        {/*<Route path="/accessories" element={<Accessories/>}/>*/}
        <Route path="/software/:category?" element={<Software/>}/>
        <Route path="/recording-gear/:category?" element={<RecordingGear/>}/>
        </Routes>
    </Router>
  )
}