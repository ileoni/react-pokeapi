function Pill({type}) {
    return <span className={`px-2 py-0 md:px-4 md:py-1 rounded-xl ${type}`}>{type}</span>;
}

export default Pill;