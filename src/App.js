import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import History from './pages/History';
import Audio from './pages/Audio';
import NotFound from './pages/NotFound';
import ListSurah from './pages/ListSurah';
import { ApolloProvider } from '@apollo/client';
import { Api } from './api/Graph';
import Murrotal from './pages/Murrotal';

function App() {
  return (
    <ApolloProvider client={Api}>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/history" element={<History />}></Route>
          <Route path="/audio" element={<Audio />}></Route>
          <Route path="/listquran" element={<ListSurah />}></Route>
          <Route path="/murrotal" element={<Murrotal />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
