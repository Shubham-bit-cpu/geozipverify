
import './App.css';
import Header from './components/header';
import "bootstrap";
import Footer from './components/footer';
import Body from './components/Body';
import '../src/css/body.css'

function App() {
  return (
    <div className="App">
      <div className="container-fluid " >
        <Header />
        <Body />
        <Footer />


      </div>
    </div>
  );
}

export default App;
