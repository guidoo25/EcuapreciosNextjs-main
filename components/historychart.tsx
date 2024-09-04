'use client';

import React from 'react';
import EChartsReact from 'echarts-for-react'; // Asegúrate de que esto es correcto

interface PriceHistoryData {
    fecha: string;
    precio: number;
}

interface PriceHistoryProps {
    historyData: PriceHistoryData[];
}

const PriceHistoryChart: React.FC<PriceHistoryProps> = ({ historyData }) => {
    const options = {
        title: {
            text: 'Historial de Precios'
        },
        tooltip: {},
        xAxis: {
            data: historyData.map(d => new Date(d.fecha).toLocaleDateString()),
            type: 'category'
        },
        yAxis: {
            type: 'value',
            min: 0
        },
        series: [{
            data: historyData.map(d => d.precio),
            type: 'line', // Cambia 'bar' a 'line'
            itemStyle: {
                color: 'rgba(53, 162, 235, 0.5)'
            }
        }]
    };

    return (
        <div className="price-history-chart">
            <EChartsReact
                option={options}
                style={{ height: '350px', width: '100%' }}
            />
        </div>
    );
};

export default PriceHistoryChart;
