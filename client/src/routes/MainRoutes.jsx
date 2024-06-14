import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../modules/Header/Header";
import Error from "../modules/ErrorBoundry/Error";
import OrderTable from "../components/OrderTable";
import EditForm from "../modules/EditForm/EditForm";
import CreateForm from "../modules/CreateForm/CreateForm";
import Profile from "../modules/Profile/Profile";

const MainRoutes = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<OrderTable />} />
        <Route path="/createrecord" element={<CreateForm />} />
        <Route path="/updateform/:id" element={<EditForm />} />
        <Route path="/userdata/:id" element={<Profile />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default MainRoutes;
