import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';

function App() {
  return (
    <div className='flex items-center justify-center w-screen'>
      <div className='container'>
          <Header/>
          <main>
            <Home/>
          </main>
          <Footer/>
      </div>
    </div>
  );
}

export default App;
