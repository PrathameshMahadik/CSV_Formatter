import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../modules/Header/Header";
import Error from "../modules/ErrorBoundry/Error";
import OrderTable from "../components/OrderTable";
import EditForm from "../modules/EditForm/EditForm";
import CreateForm from "../modules/CreateForm/CreateForm";
import Profile from "../modules/Profile/Profile";
import CsvHandler from "../modules/CsvHandler/CsvHandler";
import CsvDetails from "../modules/CSVDetailed table/CsvDetais";
import CsvErrors from "../modules/CsvErrors/CsvErrors";

const MainRoutes = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<OrderTable />} />
        <Route path="/createrecord" element={<CreateForm />} />
        <Route path="/updateform/:id" element={<EditForm />} />
        <Route path="/userdata/:id" element={<Profile />} />
        <Route path="/addcsv" element={<CsvHandler />} />
        <Route path="/csvdetails" element={<CsvDetails />} />
        <Route path="/csvdetails/:uploadId" element={<CsvErrors />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default MainRoutes;
