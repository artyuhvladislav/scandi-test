import React from 'react';
import { Link } from 'react-router-dom';
import { CategoryItemT } from '../../redux/slices/headerSlice/headerSliceTypes';
import s from './navigation.module.scss';

interface NavigationPropsI {
  categories: CategoryItemT[];
  activeCategory: CategoryItemT;
  setActiveLink: (val: HTMLElement) => void;
}
class Navigation extends React.Component<NavigationPropsI> {
  renderCategories() {
    return this.props.categories?.map((item: CategoryItemT, idx: number) => (
      <li key={idx}>
        <Link
          className={this.props.activeCategory.name === item.name ? s.linkActive : s.link}
          to={item.name}>
          {item.name}
        </Link>
      </li>
    ));
  }
  render() {
    return (
      <nav className={s.root}>
        <ul className={s.list} onClick={(e) => this.props.setActiveLink(e.target as HTMLElement)}>
          {this.renderCategories()}
        </ul>
      </nav>
    );
  }
}

export default Navigation;
