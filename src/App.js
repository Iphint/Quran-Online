import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import History from './pages/History';
import Audio from './pages/Audio';
import NotFound from './pages/NotFound';
import ListSurah from './pages/ListSurah';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<Home/>}></Route>
        <Route path='/history' element={<History/>}></Route>
        <Route path='/audio' element={<Audio/>}></Route>
        <Route path='/listquran' element={<ListSurah/>}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </Router>
    
  );
}

export default App;
