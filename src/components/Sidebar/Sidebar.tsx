import { FC } from "react";

import style from "./Sidebar.module.scss";

interface SidebarProps {
	children?: React.ReactNode;
}

const Sidebar: FC<SidebarProps> = ({ children }) => {
	return <div className={style["sidebar"]}>{children}</div>;
};

export default Sidebar;
