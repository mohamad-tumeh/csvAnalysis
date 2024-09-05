// src/__tests__/DataSummary.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import DataSummary from '../components/DataSummary';

describe('DataSummary Component', () => {
  it('renders total records and analysis', () => {
    const analysis = 'Sample analysis';
    render(<DataSummary analysis={analysis} />);

    expect(screen.getByText(/Total Records:/i)).toBeInTheDocument();
    expect(screen.getByText(analysis)).toBeInTheDocument();
  });

  it('handles empty analysis', () => {
    render(<DataSummary analysis="" />);

    expect(screen.getByText(/Total Records:/i)).toBeInTheDocument();
    expect(screen.queryByText('Sample analysis')).not.toBeInTheDocument();
  });
});
