import React, { useState } from 'react';
import { Typography, Button, Collapse, Paper } from '@mui/material';

const DataSummary: React.FC<{ analysis: any }> = ({ analysis }) => {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
    };

    const totalRecords = analysis && Array.isArray(analysis) ? analysis.length : 0;

    return (
        <div>
            <Typography variant="body1">Total Records: {totalRecords}</Typography>
            <Button onClick={handleToggle} variant="contained" color="primary">
                {open ? 'Hide' : 'Show'} Content
            </Button>
            <Collapse in={open}>
                <Paper style={{ padding: 16, marginTop: 16 }}>
                    <Typography variant="body1">
                        {typeof analysis === 'string' ? analysis : JSON.stringify(analysis, null, 2)}
                    </Typography>
                </Paper>
            </Collapse>
        </div>
    );
};

export default DataSummary;
