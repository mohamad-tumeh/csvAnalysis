// src/__tests__/ChatInterface.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChatInterface from '../components/ChatInterface';
import axios from 'axios';

// Mock axios module
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ChatInterface Component', () => {
  it('renders input and button', () => {
    render(<ChatInterface />);

    expect(screen.getByLabelText(/Ask a question about your data/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Ask/i })).toBeInTheDocument();
  });

  it('handles chat request and displays responses', async () => {
    const response = { data: { answer: 'Sample response' } };
    mockedAxios.post.mockResolvedValue(response);

    render(<ChatInterface />);

    fireEvent.change(screen.getByLabelText(/Ask a question about your data/i), {
      target: { value: 'Sample question' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Ask/i }));

    await waitFor(() => {
      expect(screen.getByText('Sample response')).toBeInTheDocument();
    });
  });

  it('displays error message on failed request', async () => {
    mockedAxios.post.mockRejectedValue(new Error('Network error'));

    render(<ChatInterface />);

    fireEvent.change(screen.getByLabelText(/Ask a question about your data/i), {
      target: { value: 'Sample question' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Ask/i }));

    await waitFor(() => {
      expect(screen.getByText('Error getting response from server.')).toBeInTheDocument();
    });
  });
});
