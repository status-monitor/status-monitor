import React, { ReactElement, FunctionComponent } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { green, appBarBackground, backgroundColor, primary } from '@app/styles/variables';
import { HealthCheckStatus } from '@common/models/healthcheck-status';
import moment from 'moment';

interface DurationsChartProps {
  data: HealthCheckStatus[];
}

export const DurationsChart: FunctionComponent<DurationsChartProps> = ({ data }): ReactElement => {
  if (!data) {
    return null;
  }

  const maxValue = data
    .map(d => d.duration)
    .sort()
    .reverse()[0];

  const chartData = [
    {
      id: 'App',
      color: 'blue',
      data: data.map(s => {
        return { x: s.time, y: s.duration, z: 'das' };
      }),
    },
  ];
  //   console.log(data);

  return (
    <div style={{ height: 650 }}>
      <ResponsiveLine
        data={chartData}
        theme={{
          tooltip: { container: { background: 'black' } },
          axis: {
            legend: {
              text: {
                fill: 'white',
                fontSize: 16,
              },
            },
            ticks: {
              text: {
                fill: 'white',
                fontSize: 16,
              },
            },
          },
          grid: {
            line: {
              stroke: backgroundColor,
              strokeWidth: 2,
              strokeDasharray: '4 4',
            },
          },
        }}
        margin={{ top: 40, right: 20, bottom: 70, left: 70 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', stacked: true, min: 0, max: maxValue + 100 }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          // tickRotation: 90,
          legend: 'Time',
          format: value => moment(value).format('HH:mm'),
          legendOffset: 50,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Duration (ms)',
          legendOffset: -60,
          legendPosition: 'middle',
        }}
        colors={[green]}
        pointSize={8}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="Duration (ms)"
        pointLabelYOffset={-12}
        useMesh={true}
      />
    </div>
  );
};
