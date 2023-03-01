//React
import { useState } from 'react';

// Routes
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//CSS
import './scss/app.scss';

// Components
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Tasks from './components/layout/Tasks';

// Contexts Providers
import { SelectedProjectContextProvider } from './contexts/SelectedProjectContext';
import { ProjectsContextProvider } from './contexts/ProjectsContext';

// Contexts Hooks

function App({ darkModeDefault = false }) {
  const [darkMode, setDarkMode] = useState(darkModeDefault);
  return (
    <div>
      <BrowserRouter>
        <SelectedProjectContextProvider>
          <ProjectsContextProvider>
            <div
              className={darkMode ? 'darkmode' : undefined}
              data-testid="application"
            >
              <Header darkMode={darkMode} setDarkMode={setDarkMode} />
              <div className="content">
                <Sidebar />
                <Routes>
                  <Route path="/" element={<Tasks />}></Route>
                </Routes>
              </div>
            </div>
          </ProjectsContextProvider>
        </SelectedProjectContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
