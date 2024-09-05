import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface DataTableProps {
  data: any[]; 
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {

  const columns: GridColDef[] = data.length > 0 
    ? Object.keys(data[0]).map((key) => ({
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        width: 150,
        sortable: true,
        filterable: true,
      }))
    : [];

  const rows = data.map((item, index) => ({ id: index + 1, ...item }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default DataTable;
