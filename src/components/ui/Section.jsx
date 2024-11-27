function Section(props) {
    return (
        <section {...props}>
            <div className={`my-8 px-8 lg:px-0 max-w-5xl w-full mx-auto`}>
                {props.children}
            </div>
        </section>
    );
}

export default Section;