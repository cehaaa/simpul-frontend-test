import React, { useState } from "react";

import style from "./MultipleSelect.module.scss";

import TagsInterface from "../../../interfaces/TagsInterfaces";

import Option from "./Option";
import RenderIf from "../../RenderIf";
import SelectedOption from "./SelectedOption";

interface MultipleSelectProps {
	icon: string;
	placeholder: string;
	options: Array<string>;
	selectedOption: Array<TagsInterface>;
	setSelectedOption: React.Dispatch<React.SetStateAction<TagsInterface[]> | []>;
}

interface LocalSelectedOption {
	option: string;
	index: number;
}

const MultipleSelect: React.FC<MultipleSelectProps> = ({
	placeholder,
	options,
	selectedOption,
	setSelectedOption,
	icon,
}) => {
	const [showOption, setShowOption] = useState<boolean>(false);

	const handleSelect = (e: MouseEvent, option: string, index: number) => {
		e.stopPropagation();

		const noDuplicateOption = removeDuplicateOptionArray(e, option);

		if (selectedOption.length === 0) {
			setSelectedOption([{ option, index }]);
		} else {
			if (noDuplicateOption.length === selectedOption.length) {
				setSelectedOption([...selectedOption, { option, index }]);
			} else {
				setSelectedOption(noDuplicateOption);
			}
		}
	};

	const removeDuplicateOptionArray = (e: MouseEvent, option: string) => {
		e.stopPropagation();

		const newSelectedOption = selectedOption.filter(
			(item: LocalSelectedOption, index: number) => {
				return item.option !== option;
			}
		);

		return newSelectedOption;
	};

	const removeDuplicateOption = (e: MouseEvent, option: string) => {
		e.stopPropagation();

		setSelectedOption(removeDuplicateOptionArray(e, option));
	};

	const toogleOption = (e: MouseEvent) => {
		e.stopPropagation();
		setShowOption(!showOption);
	};

	return (
		<>
			<div
				className={style["multiple-select"]}
				onClick={e => toogleOption(e as unknown as MouseEvent)}>
				<div className={style["header"]}>
					<img src={icon} />
					<div>
						<RenderIf condition={selectedOption.length === 0}>
							<span className={style["placeholder"]}>{placeholder}</span>
						</RenderIf>

						<RenderIf condition={selectedOption.length !== 0}>
							{selectedOption.map((option, index) => {
								return (
									<SelectedOption
										key={index}
										index={option.index}
										option={option.option}
										onRemoveOption={(e: any) =>
											removeDuplicateOption(
												e as unknown as MouseEvent,
												option.option
											)
										}
									/>
								);
							})}
						</RenderIf>
					</div>
				</div>
				<RenderIf condition={showOption}>
					<div className={style["options"]}>
						{options.map((option, index) => {
							return (
								<Option
									key={index}
									index={index}
									option={option}
									onClick={(e: any) =>
										handleSelect(e as unknown as MouseEvent, option, index)
									}
								/>
							);
						})}
					</div>
				</RenderIf>
			</div>
		</>
	);
};

export default MultipleSelect;
