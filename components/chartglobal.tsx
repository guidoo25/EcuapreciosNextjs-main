'use client'; // Asegúrate de que esto es correcto

import React from 'react';
import EChartsReact from 'echarts-for-react'; // Asegúrate de que esto es correcto

interface PriceHistoryData {
  fecha: string;
  precio: number;
}

interface PriceHistoryProps {
  data: Record<string, any>;
  selectedCategory: string;
}

const PriceHistoryChart: React.FC<PriceHistoryProps> = ({ data, selectedCategory }) => {
  if (!data || !data[selectedCategory] || !data[selectedCategory]["2024.0"]) {
    return <div>No Existe data para esta cateogria</div>;
  }

  const categoryData = data[selectedCategory]["2024.0"];
  const months = Object.keys(categoryData);
  const prices = months.map(m => categoryData[m].pct_change);
  const echoHistorico = months.map(m => categoryData[m].echo_historico || '');

  const options = {
    title: {
      text: `Cuanto vario el precio de ${selectedCategory} en 2024`,
    },
    tooltip: {
      trigger: 'item',
      formatter: function(params: any) {
        const month = params.name;
        const pctChange = categoryData[month]?.pct_change || 'N/A';
        const history = categoryData[month]?.echo_historico || 'N/A';
        return `
          <strong>${month}</strong><br/>
          Cambio en %: ${pctChange}<br/>
          Historia: ${history}
        `;
      }
    },
    xAxis: {
      data: months,
      type: 'category'
    },
    yAxis: {
      type: 'value',
      min: 0
    },
    series: [{
      data: prices,
      type: 'line',
      itemStyle: {
        color: 'rgba(53, 162, 235, 0.5)'
      }
    }],
    // Opcional: Agregar anotaciones para eventos específicos
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          fill: '#333',
          font: '14px Arial'
        }
      }
    ]
  };

  return (
    <div className="price-history-chart">
      <EChartsReact
        option={options}
        style={{ height: '490px', width: '100%' }}
      />
    </div>
  );
};

export default PriceHistoryChart;
