export const Pill = ({ className, type }) => {
    const props = {
        [`data-${type}`]: ""
    }

    return <span {...props} className={`py-1 px-5 bg-${type} uppercase font-bold text-xs text-center text-white rounded-lg ${className}`}>{ type }</span>
}