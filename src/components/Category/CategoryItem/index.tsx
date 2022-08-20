import React from 'react';
import s from './categoryItem.module.scss';

class CategoryItem extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <img src="" alt="productImg" />
        <h3 className={s.title}>Category name</h3>
        <span className={s.price}>$50.00</span>
      </div>
    );
  }
}

export default CategoryItem;
