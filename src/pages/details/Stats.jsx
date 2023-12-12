import { Radar, PolarAngleAxis, PolarGrid, RadarChart, ResponsiveContainer } from "recharts";
import Section, { Spikes, Grid } from "../../main/template/Section";

function Stats({pokemon})
{
    const {stats} = pokemon;

    return (
        <Section>
            <Spikes className="bg-yellow-fourth spikes--bottom">
                <Grid cols={true}>
                    <div className="grid content-center">
                        <h4>
                            Estátisticas base
                        </h4>
                        <ul className='mt-5'>
                            {
                                stats.map(({name, value}, index) => (
                                    <li key={index} className='flex justify-between mb-2 border-b-[1px] border-[var(--red-third)]'>
                                        <span className='capitalize'>{name}</span>
                                        <span className='color-red'>{value}</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="grid place-items-center w-full h-[300px] md:h-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart outerRadius={90} data={stats}>
                                <PolarAngleAxis dataKey="name" style={{fill: 'white'}} tick={{style: {fill: "var(--red-third)"}}} />
                                <PolarGrid polarRadius={[0]} stroke="var(--bg-yellow-fourth)" strokeWidth={4}/>
                                <Radar dot dataKey="value" stroke="var(--red-third)" fill="var(--red-third)" fillOpacity={0.4} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </Grid>
            </Spikes>
        </Section>
    );
}

export default Stats;