import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/auth/register/RegisterPage.jsx";
import HomePage from "./pages/auth/home/HomePage.jsx";
import LoginPage from "./pages/auth/login/LoginPage.jsx";
import Sidebar from "./components/common/Sidebar.jsx";
import RightPanel from "./components/common/RightPanel.jsx";
import NotificationPage from "./pages/notification/NotificationPage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import ErrorPage from "./pages/error/ErrorPage.jsx";


function App() {

  return (
    <div className='flex max-w-7xl mx-auto ' id='parent'>
        {/* Common component, karena tidak berada di dalam Routes Tag */}
        <Sidebar />
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path='/notifications' element={<NotificationPage/> } />
            <Route path='/profile/:username' element={<ProfilePage />} />
        </Routes>
        <RightPanel />
    </div>
  )
}

export default App
