import { FC } from "react";

import style from "./index.module.scss";

interface FAButtonProps {
	children?: React.ReactNode;
}

const FAButton: FC<FAButtonProps> = ({ children = "primary" }) => {
	return <div className={style["floating"]}>{children}</div>;
};

export default FAButton;
