import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const DonutChart = () => {
  const data = {
    labels: [],
    datasets: [
      {
        label: '# of Votes',
        data: [25, 25, 25, 25],
        backgroundColor: [
          'rgba(255, 3, 49, 0.85)',
          'rgba(250, 159, 1, 0.85)',
          'rgba(10, 195, 16, 0.74)',
          'rgba(48, 231, 228, 0.73)',
        ],
      },
    ],
  };

  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};

export default DonutChart;






