import React from "react";

import style from "./Panel.module.scss";

interface PanelHeader {
	children?: React.ReactNode;
}

const PanelHeader: React.FC<PanelHeader> = ({ children }) => {
	return <div className={style["panel-header"]}>{children}</div>;
};

export default PanelHeader;
