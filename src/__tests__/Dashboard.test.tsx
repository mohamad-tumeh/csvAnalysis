// src/__tests__/Dashboard.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../pages/Dashboard';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../components/FileUpload', () => () => <div>UploadFile Component</div>);
jest.mock('../components/ChatInterface', () => () => <div>ChatInterface Component</div>);
jest.mock('../components/DataTable', () => () => <div>DataTable Component</div>);
jest.mock('../components/DataSummary', () => () => <div>DataSummary Component</div>);
jest.mock('../components/InteractiveCharts', () => () => <div>InteractiveCharts Component</div>);

jest.mock('../store/useCsvDataStore', () => ({
  useDataStore: jest.fn(() => ({
    csvData: [{ label: 'Jan', value: 30 }, { label: 'Feb', value: 20 }],
    analysis: 'Mock Analysis',
  })),
}));

describe('Dashboard Component', () => {
  it('renders all sections correctly', () => {
    render(<Dashboard />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('UploadFile Component')).toBeInTheDocument();
    expect(screen.getByText('Data Summary')).toBeInTheDocument();
    expect(screen.getByText('DataSummary Component')).toBeInTheDocument();
    expect(screen.getByText('Interactive Charts')).toBeInTheDocument();
    expect(screen.getByText('InteractiveCharts Component')).toBeInTheDocument();
    expect(screen.getByText('Detailed Data Table')).toBeInTheDocument();
    expect(screen.getByText('DataTable Component')).toBeInTheDocument();
    expect(screen.getByText('ChatInterface Component')).toBeInTheDocument();
  });
});
