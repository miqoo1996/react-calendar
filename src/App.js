import './public/App.scss';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Agencies from './components/agency/Agencies';
import Booking from "./components/booking/Booking";
import PageNoMatch from "./PageNoMatch";
import {AppContext, AppContextDefaultValue} from "./AppContext";
import {ToastContainer} from "react-toastify";
import Questionnaire from "./components/Questionnaire/components/Questionnaire";

function App() {
    return (
      <Router>
          <AppContext.Provider value={AppContextDefaultValue}>
              <div className="App">
                  <div className="container-fluid">
                      <Routes>
                          {/*<Route exact path="/" element={<Agencies />} />*/}
                          <Route exact path="/" element={<Questionnaire />} />
                          <Route exact path="/:teamId" element={<Questionnaire />} />
                          <Route exact path="/book-call/:eventId/:ids" element={<Booking />} />
                          <Route path="*" element={<PageNoMatch><h1 className="text-center page-title top-50">404 Page Not Found.</h1></PageNoMatch>} />
                      </Routes>
                  </div>

                  <ToastContainer />
              </div>
          </AppContext.Provider>
      </Router>
  );
}

export default App;