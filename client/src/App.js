import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';

function App() {
  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <div className='container relative h-full'>
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
