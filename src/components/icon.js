import React from 'react';
import sprite from './../public/img/sprite.svg';

const Icon = (props) => (
  <svg className={`icon-svg ${props.style}`}>
    <use xlinkHref={`${sprite}#${props.name}`} />
  </svg>
)

export default Icon;