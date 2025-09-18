import { PolarAngleAxis, PolarGrid, RadarChart, ResponsiveContainer, Radar as RechartsRadar } from "recharts";

function Radar({ data }) {
    const [ PolarAngleAxisKey, RadarKey ] = Object.keys(data.at(0));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
                <PolarAngleAxis
                    className="fill-secondary-200"
                    dataKey={PolarAngleAxisKey}
                    tick={{
                        className: "text-xs",
                        style: {
                            fill: "var(--color-secondary-100)"
                        }
                    }}
                    tickSize={20}
                />
                <PolarGrid
                    className="stroke-base-500"
                    polarRadius={[]}
                    strokeWidth={4}
                />
                <RechartsRadar
                    className="fill-primary-200/30"
                    dataKey={RadarKey}
                    dot={{
                        className: "fill-primary-200/60",
                        r: 6,
                    }}
                />
            </RadarChart>
        </ResponsiveContainer>
    )
}

export default Radar;