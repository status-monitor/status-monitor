import React, { ReactElement, FunctionComponent } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { primary, green, appBarBackground } from '@app/styles/variables';
import Color from 'color';

interface ChartProps {
  data: string;
}

export const Chart2: FunctionComponent<ChartProps> = ({ data }): ReactElement => {
  console.log(data && data[0].data);
  return null;
  if (!data || data[0].data.every(d => !d)) {
    return null;
  }
  //   console.log(data);

  return (
    <div style={{ height: 550 }}>
      <ResponsiveLine
        data={data}
        theme={{
          //   grid: {
          //     line: {
          //       display: 'none',
          //       stroke: '#888',
          //       strokeWidth: 1,
          //     },
          //   },
          tooltip: { container: { background: 'black' } },
          axis: {
            ticks: {
              //   line: {
              //     stroke: 'green',
              //   },
              text: {
                fill: 'white',
              },
            },
            // legend: {
            //   text: {
            //     color: 'white',
            //   },
            // },
          },
          grid: {
            line: {
              stroke: appBarBackground,
              strokeWidth: 2,
              strokeDasharray: '4 4',
            },
          },
          //   axis: {
          //     textColor: '#eee',
          //     domain: {
          //       line: {
          //         backgroundColor: 'wtehi',
          //       },
          //     },
          //     fontSize: '14px',
          //     tickColor: '#eee',
          //   },
        }}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto' }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 90,
          legend: 'Time',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Duration (ms)',
          legendOffset: -40,
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
        // legends={[
        //   {
        //     anchor: 'bottom-right',
        //     direction: 'column',
        //     justify: false,
        //     translateX: 100,
        //     translateY: 0,
        //     itemsSpacing: 0,
        //     itemDirection: 'left-to-right',
        //     itemWidth: 80,
        //     itemHeight: 20,
        //     itemOpacity: 0.75,
        //     symbolSize: 12,
        //     symbolShape: 'circle',
        //     symbolBorderColor: 'rgba(0, 0, 0, .5)',
        //     effects: [
        //       {
        //         on: 'hover',
        //         style: {
        //           itemBackground: 'rgba(0, 0, 0, .03)',
        //           itemOpacity: 1,
        //         },
        //       },
        //     ],
        //   },
        // ]}
      />
    </div>
  );
};
