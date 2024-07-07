import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Error404 from './pages/NoPage';
import MathManuscript from './pages/Math';
import LifeSci from './pages/Lifesci';
import SocSci from './pages/Socsci';
import Robotics from './pages/Robotics';
import Admin from './pages/Admin';
import StudLogin from './pages/StudLogin';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/studMonitor';
import PDFManagement from './pages/pdfManagement';
import PDFMonitor from './pages/pdfMonitor';
import PhysSci from './pages/Physci';
import AccountManagement from './pages/accountManagement';
// import ManageCategory from './pages/ManageCategory';
import PDFViewer from './pages/pdfViewer';
import { AuthorizeAdmin, AuthorizeUser } from "./hooks/authorize";

function App() {
 
  return (
    <div className='App'>
        
        <Routes>
          <Route index element={AuthorizeUser() ?<Home/> : <StudLogin/>} /> 
          <Route path="login" element={AuthorizeUser()? <Home/>: <StudLogin/>} />
          <Route path="register" element={AuthorizeUser()? <Home/> : <Register/>} />
          <Route path="category/all" element={AuthorizeUser() ?<Home/> : <StudLogin/>}/>
          <Route path="category/mathematics" element={AuthorizeUser() ? <MathManuscript/> : <StudLogin/>} />
          <Route path="category/robotics" element={AuthorizeUser() ? <Robotics/> : <StudLogin/>} />
          <Route path="category/lifescience" element={AuthorizeUser() ? <LifeSci/> : <StudLogin/>} />
          <Route path="category/socialscience" element={AuthorizeUser() ? <SocSci/> : <StudLogin/>} />
          <Route path="category/physicalscience" element={AuthorizeUser() ? <PhysSci/> : <StudLogin/>} />
          <Route path="pdfview/:dest" element={AuthorizeUser() ? <PDFViewer/> : <StudLogin/>} />
          <Route path="admin-login" element={<AdminLogin/>} />
          <Route path="admin-monitor" element={AuthorizeAdmin() ? <Dashboard/> : <AdminLogin/>} />
          <Route path="admin-access" element={AuthorizeAdmin() ? <Admin/> : <AdminLogin/>} />
          <Route path="admin-pdf-management" element={AuthorizeAdmin() ? <PDFManagement/> : <AdminLogin/>} />
          {/* <Route path="admin-manage-categ" element={AuthorizeAdmin() ? <ManageCategory/> : <AdminLogin/>} /> */}
          <Route path="admin-dashboard" element={AuthorizeAdmin() ? <PDFMonitor/> : <AdminLogin/>} />
          <Route path="admin-student-management" element={AuthorizeAdmin() ? <AccountManagement/> : <AdminLogin/>} />
          <Route path="*" element={<Error404/>} />
          
        </Routes>
      
      
    </div>
  );
}

export default App;
