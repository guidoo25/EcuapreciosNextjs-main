'use client'; // Asegúrate de que esto es correcto

import React from 'react';
import EChartsReact from 'echarts-for-react'; // Asegúrate de que esto es correcto

interface PriceHistoryProps {
  data: Record<string, any>;
  selectedCategory: string;
}

const PriceHistoryChart: React.FC<PriceHistoryProps> = ({ data, selectedCategory }) => {
  // Verificar que los datos existan para la categoría seleccionada y año
  if (!data || !data[selectedCategory] || !data[selectedCategory]["2024"]) {
    return <div>No existe data para esta categoría</div>;
  }

  // Obtener los datos para la categoría y año especificado
  const categoryData = data[selectedCategory]["2024"];
  const months = Object.keys(categoryData).filter(month => categoryData[month].pct_change !== undefined);
  const prices = months.map(m => categoryData[m].pct_change);
  const historyDescriptions = months.map(m => categoryData[m].fecha_historico || '');

  // Configuración del gráfico
  const options = {
    title: {
      text: `Cuánto varió el precio de ${selectedCategory} en 2024`,
    },
    tooltip: {
      trigger: 'item',
      formatter: function(params: any) {
        const month = params.name;
        const pctChange = categoryData[month]?.pct_change || 'N/A';
        const history = categoryData[month]?.fecha_historico || 'N/A';
        return `
          <strong>${month}</strong><br/>
          Cambio en %: ${pctChange}<br/>
          Historia: ${history}
        `;
      }
    },
    xAxis: {
      data: months,
      type: 'category',
      axisLabel: {
        rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      axisLabel: {
        formatter: '{value}%'
      }
    },
    series: [{
      data: prices,
      type: 'line',
      itemStyle: {
        color: 'rgba(53, 162, 235, 0.5)'
      },
      lineStyle: {
        width: 2
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
