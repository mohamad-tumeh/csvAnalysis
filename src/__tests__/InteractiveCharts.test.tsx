import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InteractiveCharts from '../components/InteractiveCharts';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-chartjs-2', () => ({
  Bar: () => <div>Bar Chart</div>,
  Line: () => <div>Line Chart</div>,
  Pie: () => <div>Pie Chart</div>,
}));

describe('InteractiveCharts Component', () => {
  const mockData = [
    { label: 'Jan', value: 30 },
    { label: 'Feb', value: 20 },
    { label: 'Mar', value: 25 }
  ];

  it('renders chart selection dropdown and default chart', () => {
    render(<InteractiveCharts data={mockData} chartType="bar" />);

    expect(screen.getByLabelText(/Select Key/i)).toBeInTheDocument();
    expect(screen.getByText('Bar Chart')).toBeInTheDocument();
  });

  it('changes chart type based on prop', () => {
    render(<InteractiveCharts data={mockData} chartType="line" />);
    expect(screen.getByText('Line Chart')).toBeInTheDocument();

    render(<InteractiveCharts data={mockData} chartType="pie" />);
    expect(screen.getByText('Pie Chart')).toBeInTheDocument();
  });

  it('updates chart when dropdown selection changes', () => {
    render(<InteractiveCharts data={mockData} chartType="bar" />);

    expect(screen.getByText('Bar Chart')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Select Key/i), {
      target: { value: 'value' },
    });

    expect(screen.getByText('Bar Chart')).toBeInTheDocument(); 
  });
});
