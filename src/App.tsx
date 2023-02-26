// Routes
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//CSS
import './scss/app.scss';

// Components
import Content from './components/layout/Content';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Tasks from './components/layout/Tasks';

// Contexts Providers
import { SelectedProjectContextProvider } from './contexts/SelectedProjectContext';
import { ProjectsContextProvider } from './contexts/ProjectsContext';

// Contexts Hooks

function App() {
  return (
    <div>
      <BrowserRouter>
        <SelectedProjectContextProvider>
          <ProjectsContextProvider>
            <Header />
            <div className="content">
              <Sidebar />
              <Routes>
                <Route path="/" element={<Content />}></Route>
                <Route path="/tasks" element={<Tasks />}></Route>
              </Routes>
            </div>
          </ProjectsContextProvider>
        </SelectedProjectContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
