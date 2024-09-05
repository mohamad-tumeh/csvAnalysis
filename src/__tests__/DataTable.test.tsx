// src/__tests__/DataTable.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import DataTable from '../components/DataTable';

describe('DataTable Component', () => {
  const data = [
    { name: 'John Doe', age: 30 },
    { name: 'Jane Doe', age: 25 }
  ];

  it('renders table with data', () => {
    render(<DataTable data={data} />);

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/30/i)).toBeInTheDocument();
    expect(screen.getByText(/25/i)).toBeInTheDocument();
  });
});
