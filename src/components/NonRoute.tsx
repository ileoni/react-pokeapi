import { useLocation } from "react-router-dom"

export const NonRoute = (props) => {
    const { children, paths } = props;
    const location = useLocation();
    return !paths.every(path => location.pathname.includes(path)) ? children: null;
}