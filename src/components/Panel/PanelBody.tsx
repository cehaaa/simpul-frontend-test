import React from "react";

import style from "./Panel.module.scss";

interface PanelBody {
	children?: React.ReactNode;
}

const PanelBody: React.FC<PanelBody> = ({ children }) => {
	return <div className={style["panel-body"]}>{children}</div>;
};

export default PanelBody;
