import React from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import "../css/animation.css";

export const SlideUp = ({ children, ...props }) => (
	<CSSTransition
		{...props}
		timeout={300}
		classNames="slideup"
	>
		{children}
	</CSSTransition>
);