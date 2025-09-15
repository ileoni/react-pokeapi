function Card({ children }) {
    return (
        <div className="py-5 px-6 bg-gradient-to-t from-base-100 shadow-xl rounded-2xl">
            { children }
        </div>
    )
}

export default Card;