import { Outlet, useLocation } from "react-router-dom"

export const OnRoute = (props) => {
    const { children, paths } = props;
    const location = useLocation();
    return paths.every(path => location.pathname.includes(path)) ? children: null;
}