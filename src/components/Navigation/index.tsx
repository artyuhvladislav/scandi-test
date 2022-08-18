import React from 'react';
import { Link } from 'react-router-dom';
import s from './navigation.module.scss';
import { NavigationPropsI, NavigationStateI } from './Navigation.type';

const items = ['women', 'men', 'kids'];

class Navigation extends React.Component<NavigationPropsI, NavigationStateI> {
  state = {
    items: items,
    activeLink: items[0],
  };

  setActiveLink = (value: HTMLElement) => {
    if (value.textContent) {
      this.setState({ activeLink: value.textContent });
    }
  };
  render() {
    return (
      <nav className={s.root}>
        <ul className={s.list} onClick={(e) => this.setActiveLink(e.target as HTMLElement)}>
          {this.state.items.map((item: string, idx: number) => (
            <li key={idx}>
              <Link
                className={this.state.activeLink === item ? s.linkActive : s.link}
                to={`/${item}`}>
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default Navigation;
