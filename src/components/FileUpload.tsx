// src/components/UploadFile.tsx
import React, { useState } from 'react';
import { Button, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import { useDataStore } from '../store/useCsvDataStore';

const UploadFile: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const setCsvData = useDataStore((state) => state.setCsvData);
  const setAnalysis = useDataStore((state) => state.setAnalysis);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      setLoading(true);

      try {
        const response = await axios.post('http://localhost:3000/csv/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setCsvData(response.data.data);
        setAnalysis(response.data.analysis);
        setLoading(false);
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <input
        accept=".csv"
        style={{ display: 'none' }}
        id="file-upload"
        type="file"
        onChange={handleFileUpload}
      />
      <label htmlFor="file-upload">
        <Button variant="contained" component="span" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Upload CSV'}
        </Button>
      </label>
      <Typography variant="caption" display="block" gutterBottom>
        Upload your CSV file to start the analysis.
      </Typography>
    </div>
  );
};

export default UploadFile;
