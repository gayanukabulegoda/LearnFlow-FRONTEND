import {PieChart, Pie, Cell, ResponsiveContainer} from 'recharts';
/**
 * @fileOverview This component is used to display a progress chart.
 * @param progress - The progress value to display.
 * @returns The {@link JSX.Element} for the progress chart component.
 */
interface ProgressChartProps {
    progress: number;
}

const ProgressChart = ({progress}: ProgressChartProps) => {
    const data = [
        {name: 'Progress', value: progress},
        {name: 'Remaining', value: 100 - progress},
    ];

    const COLORS = ['#3B82F6', '#E5E7EB'];

    return (
        <div className="relative h-16 w-16 mx-auto">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={30}
                        fill="#8884d8"
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                    >
                        {data.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-700">{progress}%</span>
            </div>
        </div>
    );
};

export default ProgressChart;