import { createRoot } from 'react-dom/client';
import { CSSProperties, StrictMode, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isPanelOpen, setIsPanelOpen] = useState(false);
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleTogglePanel = () => {
		setIsPanelOpen((prev) => !prev);
	};

	const handleClosePanel = () => {
		setIsPanelOpen(false);
	};

	const handleApplyParams = (values: ArticleStateType) => {
		setArticleState({ ...values });
		handleClosePanel();
	};

	const handleResetParams = (values: ArticleStateType) => {
		setArticleState({ ...values });
		handleClosePanel();
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isPanelOpen}
				onToggle={handleTogglePanel}
				initialState={defaultArticleState}
				currentState={articleState}
				onApply={handleApplyParams}
				onReset={handleResetParams}
				onClose={handleClosePanel}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
