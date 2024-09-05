import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Navbar from './components/Navbar';
// import PrivateComponents from './components/PrivateComponents';
import CardDetails from './pages/CardDetails';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { Routes, Route, Navigate } from 'react-router-dom';
import SubProfile from './pages/SubProfile';

function App() {
  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <div className='container h-full px-4 md:px-0'>
        <Header />
        <main className='flex flex-col-reverse md:flex-row gap-5' style={{ minHeight: "calc(100% - 13.0625rem - 2.5rem)" }}>
          <aside className='sticky bottom-[10%] z-[1] left-[17%] md:relative md:z-0 md:left-0 md:bottom-0 w-fit md:w-[12.5rem]'>
            <Navbar />
          </aside>
          <section className='w-full mx-0 md:mx-5 mb-[6.25rem]'>
            <Routes>
              <Route path="/" element={<Navigate to='/home' />} />
              <Route path="/home" element={<Home />} />
              <Route path="/card/:id" element={<CardDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/user/profile/:id" element={<SubProfile />} />
            </Routes>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
