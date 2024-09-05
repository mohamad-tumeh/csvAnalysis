import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UploadFile from '../components/FileUpload';

describe('UploadFile Component', () => {
  it('renders file input and button', () => {
    render(<UploadFile />);

    expect(screen.getByLabelText(/Upload File/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Upload/i })).toBeInTheDocument();
  });

  it('handles file upload', () => {
    const mockFile = new File(['file content'], 'example.csv', { type: 'text/csv' });
    const handleChange = jest.fn();

    render(<UploadFile />);

    fireEvent.change(screen.getByLabelText(/Upload File/i), {
      target: { files: [mockFile] },
    });

    expect(handleChange).toHaveBeenCalledWith(mockFile);
  });
});
