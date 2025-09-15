import { ResponsiveContainer, RadarChart, PolarAngleAxis, PolarGrid, Radar } from "recharts";

function RechartsRadar({ data }) {

    const polarAngleAxis = {
        dataKey: "name",
        style: {
            fill: "white"
        },
        tick: {
            style: {
                fill: "#212529"
            }
        }
    }

    const polarGrid = {
        polarRadius: [0],
        stroke: "black",
    }

    const radar = {
        dataKey: "base",
        fill: "#5EB8E6",
        fillOpacity: 0.4,
        dot: {
            style: {
                fill: "#5EB8E6",
            },
            fillOpacity: 1,
        },
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={90} data={data}>
                <PolarAngleAxis {...polarAngleAxis}/>
                <PolarGrid {...polarGrid}/>
                <Radar {...radar}/>
            </RadarChart>
        </ResponsiveContainer>
    );
}

export default RechartsRadar;