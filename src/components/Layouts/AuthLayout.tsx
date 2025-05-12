import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";
import { hasPermission } from "../../utils/functions";
import { NoAccessView } from "../NoAccessView";
interface AuthLayoutProps {
    children: ReactNode,
    actions: Array<string>,
    showAccessView?: boolean,
    showDash?: boolean
}
const AuthLayout: React.FC<AuthLayoutProps> = ({ children, actions, showAccessView, showDash }) => {
    const { authUser } = useSelector((state: IRootState) => state.auth);

    if (hasPermission(authUser?.role?.permission, actions, authUser?.role?.name || "")) {
        return <>{children}</>;
    } else if (showAccessView) {
        return <NoAccessView />;
    } else if (showDash) {
        return <div className="text-center">-</div>;
    }
    return null;
};

export default AuthLayout;
