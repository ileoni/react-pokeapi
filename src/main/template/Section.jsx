import './Section.css';

export function Grid({cols = false, children})
{
    return (
        <div className={`mx-[32px] md:mx-[120px] pt-8 pb-16`}>
            {
                cols ? (
                    <div className="grid grid-cols-1 md:grid-cols-2">{children}</div>
                ) : (   
                    <div className="grid grid-cols-1">{children}</div>
                )
            }
        </div>
    );
}

export function Spikes({className, children})
{
    return (
        <div className={`spikes ${className}`}>
            {children}
        </div>
    );
}

export function Background({className, children})
{
    return (
        <div className={`background__layer ${className}`}>
            {children}
        </div>
    );
}

function Section({children})
{
    return (
        <section>
            {children}
        </section>
    );
}

export default Section;