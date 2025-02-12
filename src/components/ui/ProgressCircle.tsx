type ProgressCircleProps = {
    progress: number;
};

const ProgressCircle = ({progress}: ProgressCircleProps) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative w-24 h-24">
            <svg className="w-full h-full transform -rotate-90">
                <circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    className="text-gray-200"
                    strokeWidth="8"
                    fill="none"
                    stroke="currentColor"
                />
                <circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    className="text-blue-500"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={offset}
                    stroke="currentColor"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-lg font-medium">
                {progress}%
            </div>
        </div>
    );
};

export default ProgressCircle;