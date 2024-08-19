import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Navbar from './components/Navbar';
import CardDetails from './pages/CardDetails';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <div className='container  h-full'>
          <Header/>
          <main className='flex gap-5' style={{minHeight:"calc(100% - 13.0625rem - 2.5rem)"}}>
            <aside className='w-[12.5rem]'><Navbar/></aside>
            <section className='w-full mx-5 mb-[6.25rem]'>
              {/* <Home/> */}
              <Routes>
                <Route path="/" element={<Navigate to='/home'/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/card/:id" element={<CardDetails/>}/>
                <Route path="/profile" element={<Profile/>}/>
              </Routes>
              {/* <CardDetails/> */}
              {/* <Profile/> */}
            </section>
          </main>
          <Footer/>
      </div>
    </div>
  );
}

export default App;
