//форма параметры статьи
import { useState, useEffect, useRef } from 'react';
//компоненты формы
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import { Text } from '../text';

import styles from './ArticleParamsForm.module.scss'; // стили
import clsx from 'clsx'; //импорт библиотеки

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	date: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [formState, setFormState] = useState<boolean>(false); //изначально закрыта (состояние формы)
	const [formData, setFormData] = useState(defaultArticleState); //данные, изначально у нас по умолчанию

	const handleButtonArrowOpenForm = () => {
		//открытие и закрытие формы при нажатии на стрелку
		setFormState(!formState);
	};

	function closeModalEscape(event: KeyboardEvent) {
		//закрыть нажав на escape
		if (event.key === 'Escape') {
			setFormState(false);
		}
	}

	const ref = useRef<HTMLFormElement | null>(null);
	function useClickOutside(event: MouseEvent) {
		//закрытие вне окна
		if (ref.current && !ref.current.contains(event.target as Node)) {
			setFormState(false);
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', closeModalEscape);
		document.addEventListener('mousedown', useClickOutside);
		return () => {
			document.removeEventListener('keydown', closeModalEscape);
			document.removeEventListener('mousedown', useClickOutside);
		};
	}, [formState]);

	function submit(event: React.FormEvent<HTMLFormElement>) {
		//изменить
		event.preventDefault();
		props.date(formData);
		setFormState(false);
		//console.log(formData);
	}

	function reset() {
		//сбросить
		props.date(defaultArticleState);
		setFormData(defaultArticleState);
	}

	function handleOptionChange(option: OptionType, key: string) {
		//смена характеристик в форме
		setFormData({ ...formData, [key]: option });
		//console.log(formData);
		//console.log(key);
	}

	return (
		<>
			<ArrowButton
				state={formState}
				openParamsForm={handleButtonArrowOpenForm}
			/>
			<aside
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: formState,
				})}
				ref={ref}>
				<form
					className={styles.form}
					id='form'
					onSubmit={submit}
					onReset={reset}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formData.fontFamilyOption}
						onChange={(option) =>
							handleOptionChange(option, 'fontFamilyOption')
						}></Select>
					<RadioGroup
						name=''
						title='рАЗМЕР шрифта'
						options={fontSizeOptions}
						selected={formData.fontSizeOption}
						onChange={(option) =>
							handleOptionChange(option, 'fontSizeOption')
						}></RadioGroup>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formData.fontColor}
						onChange={(option) =>
							handleOptionChange(option, 'fontColor')
						}></Select>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formData.backgroundColor}
						onChange={(option) =>
							handleOptionChange(option, 'backgroundColor')
						}></Select>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formData.contentWidth}
						onChange={(option) =>
							handleOptionChange(option, 'contentWidth')
						}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
