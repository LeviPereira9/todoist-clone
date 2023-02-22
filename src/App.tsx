// Routes
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//CSS
import './scss/app.scss';

// Components
import Content from './components/layout/Content';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Tasks from './components/layout/Tasks';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className="container">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Content />}></Route>
            <Route path="/tasks" element={<Tasks/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
