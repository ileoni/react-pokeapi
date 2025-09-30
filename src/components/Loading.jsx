import Pokeball from "./Pokeball"

export const Loading = ({ children, loading }) => {
    return (
        <>
            {loading ? (
                <div className="min-h-96 grid place-items-center">
                    <Pokeball className="size-16 fill-secondary-100 animate-spin"/>
                </div>
            ) : (
                <>
                { children }
                </>
            )}
        </>
    )
}