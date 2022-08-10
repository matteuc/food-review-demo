import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './app.module.css';
import SummaryScreen from './routes/SummaryScreen';
import SurveyScreen from './routes/SurveyScreen';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SurveyScreen />} />
        <Route path="summary" element={<SummaryScreen />} />
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
