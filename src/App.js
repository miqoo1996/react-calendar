import './public/App.scss';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Agencies from './components/agency/Agencies';
import Booking from "./components/booking/Booking";
import PageNoMatch from "./PageNoMatch";

function App() {
  return (
      <Router>
          <div className="App">
              <div className="container-fluid">
                  <Routes>
                      <Route path="/" element={<Agencies />} />
                      <Route path="/book-call/:ids" element={<Booking />} />
                      <Route path="*" element={<PageNoMatch><h1 className="text-center page-title top-50">404 Page Not Found.</h1></PageNoMatch>} />
                  </Routes>
              </div>
          </div>
      </Router>
  );
}

export default App;