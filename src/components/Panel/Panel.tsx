import React, { FC } from "react";

import style from "./Panel.module.scss";

interface PanelProps {
	children?: React.ReactNode;
}

const Panel: FC<PanelProps> = ({ children }) => {
	return <div className={style["panel-wrapper"]}>{children}</div>;
};

export default Panel;
