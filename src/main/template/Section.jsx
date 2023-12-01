import './Section.css';

function Section({ background, columns = true, children })
{
    return (
        <section className={`${background}`}>
            <div className={`wrapper__section ${columns ? "wrapper__section--columns": ""}  mx-[120px] py-16`}>
                {children}
            </div>
        </section>
    );
}

export default Section;