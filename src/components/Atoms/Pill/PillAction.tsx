import React from "react";

import style from "./Pill.module.scss";

interface PillActionProps {
	children: React.ReactNode;
	variant?: string;
	onClick?: () => void;
}

const PillAction: React.FC<PillActionProps> = ({
	children,
	variant = "secondary",
	onClick,
}) => {
	return (
		<div
			className={`${style["pill"]} ${style[variant]} ${style["action"]}`}
			onClick={onClick}>
			{children}
		</div>
	);
};

export default PillAction;
