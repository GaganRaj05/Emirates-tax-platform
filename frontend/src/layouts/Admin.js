import React, { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

// components
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import { 
  fetchDocumentsforAdmin, 
  fetchDocumentsforConsultant, 
  fetchTaxReport,
} from "services/docs";

// views
import Dashboard from "views/admin/Dashboard.js";
import Tables from "views/admin/Tables.js";

export default function Admin() {
  const location = useLocation();
  const [userDocs, setUserDocs] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [userRole, setUserRole] = useState(localStorage.getItem('role') || null);
  const [consultantId, setConsultantId] = useState(localStorage.getItem('consultant_id')|| null);

  useEffect(() => {
    // Clear previous data when role changes
    setUserDocs([]);
    setConsultants([]);

    const role = location?.state?.role || localStorage.getItem('role');
    const consultant_id = location?.state?.consultant_id || localStorage.getItem('consultant_id');
    const user_id = location?.state?.user_id || localStorage.getItem('user_id');

    if (!role) {
      console.error('No role provided');
      return;
    }

    localStorage.setItem('role', role);
    setUserRole(role);
    localStorage.setItem('consultant_id', consultant_id);
    setConsultantId(consultant_id);
    localStorage.setItem('user_id', user_id);


    const fetchData = async () => {
      try {
        if (role === "admin") {
          const response = await fetchDocumentsforAdmin();
          if (response?.error) {
            toast.error('An unknown network error has occured please try again later');
            return;
          }
          setUserDocs(response.documents);
          setConsultants(response.consultants);
        } 
        else if (role === "consultant") {
          
          const response = await fetchDocumentsforConsultant(consultant_id);
          if (response?.error) {
            toast.error('An unknown network error has occured please try again later');
            return;
          }
          setUserDocs(response.documents.assigned_document);
        } 
        else {
          const response = await fetchTaxReport(user_id);
          if (response?.error) {
            toast.error('An unknown network error has occured please try again later');
            return;
          }
          setUserDocs(response.tax_docs);
        }
      } catch (error) {
        toast.error(error.message || "An unknown network error occurred");
      }
    };

    fetchData();
  }, [ userRole]); 

  if (!userRole) {
    return <div>Loading or redirect to login...</div>;
  }

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
<Route 
              path="/admin/dashboard" 
              exact 
              render={(props) => (
                <Dashboard 
                  {...props} 
                  initialDocs={userRole === "admin" || userRole === "consultant" || userRole==="user"? userDocs : []}
                  consultants={userRole === "admin" ? consultants : []}
                  userRole = {userRole}
                />
              )} 
            />            
            <Route path="/admin/tables" exact component={Tables} />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}