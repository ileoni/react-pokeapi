function Pill({type}) {
    return <span className={`px-4 py-1 rounded-xl ${type}`}>{type}</span>;
}

export default Pill;