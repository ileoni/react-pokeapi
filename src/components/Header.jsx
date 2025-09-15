function Header({ children }) {
    return (
        <header className="shadow-lg bg-base-600">
            <div className="max-w-5xl h-20 m-auto grid grid-flow-col justify-center sm:justify-between items-center">
                {children}
            </div>
        </header>
    )
}

export default Header;