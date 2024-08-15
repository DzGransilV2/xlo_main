import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Navbar from './components/Navbar';
import CardDetails from './pages/CardDetails';
import Home from './pages/Home';

function App() {
  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <div className='container  h-full'>
          <Header/>
          <main className='flex gap-5' style={{minHeight:"calc(100% - 13.0625rem - 2.5rem)"}}>
            <aside className='w-[12.5rem]'><Navbar/></aside>
            <section className='w-full mx-5 mb-[6.25rem]'>
              {/* <Home/> */}
              <CardDetails/>
            </section>
          </main>
          <Footer/>
      </div>
    </div>
  );
}

export default App;
