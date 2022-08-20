import React from 'react';
import s from './category.module.scss';
import CategoryItem from './CategoryItem';

class Category extends React.Component {
  state: any = {
    items: [],
  };

  componentDidMount() {
    const fetchData = async () => {};
    fetchData();
  }

  render() {
    return (
      <div className={s.root}>
        <h1 className={s.title}>Category name</h1>
        <div className={s.grid}>
          <CategoryItem />
        </div>
      </div>
    );
  }
}

export default Category;
