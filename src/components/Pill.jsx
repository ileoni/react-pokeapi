import { useConfigs } from "../hooks/useConfigs"

export const Pill = ({ className, type }) => {
    return (
        <span
            {...{
                [`data-${type}`]: "",
                style: {
                    background: `var(--color-${type})`
                }
            }}
            className={`py-1 px-5 uppercase font-bold text-xs text-center text-white rounded-lg ${className}`}
        >
            { useConfigs(`types.${type}.value`) }
        </span>
    )
}