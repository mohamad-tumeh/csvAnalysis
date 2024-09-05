import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { useDataStore } from '../store/useCsvDataStore';
import UploadFile from '../components/FileUpload';
import ChatInterface from '../components/ChatInterface';
import DataTable from '../components/DataTable';
import DataSummary from '../components/DataSummary';
import InteractiveCharts from '../components/InteractiveCharts';

const Dashboard: React.FC = () => {
  const csvData = useDataStore((state) => state.csvData);
  const analysis = useDataStore((state) => state.analysis); // Not used in this example
  const chartType = 'bar'; // or 'line' or 'pie', depending on what you need

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={{ padding: 16 }}>
            <UploadFile />
          </Paper>
        </Grid>
        
        {/* Data Summary Section */}
        <Grid item xs={12}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6">Data Summary</Typography>
            <DataSummary analysis={analysis} />
          </Paper>
        </Grid>

        {/* Interactive Charts Section */}
        <Grid item xs={12}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6">Interactive Charts</Typography>
            <InteractiveCharts data={csvData} chartType={chartType} />
          </Paper>
        </Grid>

        {/* Data Table Section */}
        <Grid item xs={12}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6">Detailed Data Table</Typography>
            <DataTable data={csvData} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper style={{ padding: 16 }}>
            <ChatInterface />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
