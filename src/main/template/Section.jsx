import './Section.css';

// function Section({ background, columns = true, children })
// {
//     return (
//         <section className={`${background}`}>
//             <div className={`wrapper__section ${columns ? "wrapper__section--columns": ""}  mx-[120px] py-8`}>
//                 {children}
//             </div>
//         </section>
//     );
// }

function Section({section, mask, cols = true, children})
{
    return (
        <section className={section}>
            <div className={mask}>
                <div className={`mx-[120px] py-8`}>
                    {
                        cols ? (
                            <div className="grid grid-cols-1 md:grid-cols-2">{children}</div>
                        ) : (   
                            <div className="grid grid-cols-1">{children}</div>
                        )
                    }
                </div>
            </div>
        </section>
    );
}

export default Section;