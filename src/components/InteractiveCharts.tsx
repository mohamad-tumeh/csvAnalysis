import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface InteractiveChartsProps {
    data: any[]; // Raw CSV data
    chartType: 'bar' | 'line' | 'pie';
}

const InteractiveCharts: React.FC<InteractiveChartsProps> = ({ data, chartType }) => {
    const [selectedKey, setSelectedKey] = useState<string>(Object.keys(data[0] || {})[1] || '');

    const handleKeyChange = (event: SelectChangeEvent<string>) => {
        setSelectedKey(event.target.value as string);
    };

    const prepareChartData = (data: any[], key: string) => {
        const labels = data.map((item: any) => item[Object.keys(item)[0]]); // Assume first key is used for labels
        const values = data.map((item: any) => item[key]);

        return {
            labels,
            datasets: [
                {
                    label: key,
                    data: values,
                    backgroundColor: 'rgba(75,192,192,0.6)',
                },
            ],
        };
    };

    const chartData = prepareChartData(data, selectedKey);

    const commonOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' as const },
            tooltip: {
                callbacks: {
                    label: (tooltipItem: any) => tooltipItem.raw,
                },
            },
        },
    };

    const chartOptions = {
        bar: commonOptions,
        line: commonOptions,
        pie: {
            ...commonOptions,
            plugins: {
                ...commonOptions.plugins,
                legend: { position: 'top' as const },
            },
        },
    };

    return (
        <div>
            <FormControl fullWidth margin="normal">
                <InputLabel id="select-key-label">Select Key</InputLabel>
                <Select
                    labelId="select-key-label"
                    value={selectedKey}
                    onChange={handleKeyChange}
                >
                    {Object.keys(data[0] || {}).map((key) => (
                        <MenuItem key={key} value={key}>
                            {key}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {chartType === 'bar' && <Bar data={chartData} options={chartOptions.bar} />}
            {chartType === 'line' && <Line data={chartData} options={chartOptions.line} />}
            {chartType === 'pie' && <Pie data={chartData} options={chartOptions.pie} />}
        </div>
    );
};

export default InteractiveCharts;
