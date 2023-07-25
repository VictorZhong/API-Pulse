import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import SearchBar from './SearchBar';
import ResultDisplay from './ResultDisplay';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [selectedResult, setSelectedResult] = useState(null);

  return (
    <Router>
      <Box
        sx={{
          bgcolor: '#e0e0e0',
          minHeight: '100vh',
          py: 3,
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: '#ffffff',
              p: 2,
              borderRadius: 1,
              mb: 3,
            }}
          >
            <img src="logo.png" alt="API Pulse" style={{ marginRight: 'auto' }} />
            <SearchBar setSelectedResult={setSelectedResult} />
          </Box>
          <Routes>
            <Route path="/" element={selectedResult && <ResultDisplay result={selectedResult} />} />
            <Route path="/details/:id" element={<ResultDisplay />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;
