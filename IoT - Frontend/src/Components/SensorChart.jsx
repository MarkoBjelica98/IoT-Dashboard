import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

export default function SensorChart({ title, dataKey, data }) {
  return (
    <div className='bg-gray-800 border border-gray-700 p-6 rounded-xl'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-lg font-semibold text-white'>{title}</h3>
        <span className='text-xs text-gray-400'>Last 50 points</span>
      </div>

      <div className='w-full h-65'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={data}>
            <CartesianGrid stroke='#444' />
            <XAxis dataKey='time' stroke='#9ca3af' minTickGap={30} />
            <YAxis stroke='#9ca3af' />
            <Tooltip />
            <Line
              type='monotone'
              dataKey={dataKey}
              stroke='#3b82f6'
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
