import React, { ReactElement, FunctionComponent } from 'react';
import { ResponsiveStream } from '@nivo/stream';
import { primary, green } from '@app/styles/variables';
import Color from 'color';

interface ChartProps {
  data: string;
}

export const Chart: FunctionComponent<ChartProps> = ({ data }): ReactElement => {
  if (!data) {
    return null;
  }
  console.log(data);
  return (
    <div style={{ height: 600 }}>
      <ResponsiveStream
        data={data}
        theme={{
          // background: 'white',
          // grid: {
          //   line: {
          //     display: 'none',
          //   },
          // },
          // markers: {
          //   lineColor: 'red',
          //   textColor: 'red',
          // },
          // dots: {
          //   text: {
          //     color: 'white',
          //   },
          // },
          tooltip: {
            container: { background: 'black' },
          },

          // axis: {
          //   // textColor: '#eee',
          //   // fontSize: '14px',
          //   // tickColor: '#eee',
          //   ticks: { text: { color: 'white' } },
          // },
        }}
        keys={['duration']}
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendOffset: 36,
        }}
        axisLeft={{ tickSize: 5, tickPadding: 5, tickRotation: 0, legend: 'Duration (ms)', legendOffset: -40 }}
        offsetType="none"
        colors={[green]}
        fillOpacity={0.85}
        defs={[
          {
            id: 'lines',
            type: 'patternDots',
            size: 1,
            padding: 4,
            stagger: false,
            background: green,
            color: Color(primary)
              .darken(0.3)
              .hsl()
              .string(),
          },
        ]}
        fill={[
          {
            match: {
              id: 'duration',
            },
            id: 'lines',
          },
        ]}
        animate={true}
        motionStiffness={100}
      />
    </div>
  );
};
