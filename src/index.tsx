import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [dateDefault, setDateDefault] = useState(defaultArticleState);
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': dateDefault.fontFamilyOption.value,
					'--font-size': dateDefault.fontSizeOption.value,
					'--font-color': dateDefault.fontColor.value,
					'--container-width': dateDefault.contentWidth.value,
					'--bg-color': dateDefault.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm date={setDateDefault} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
