import React from 'react';
import s from './productItemGallery.module.scss';

interface ProductItemGalleryPropsI {
  items: string[];
}

interface ProductItemGalleryStateI extends ProductItemGalleryPropsI {
  idx: number;
}

class ProductItemGallery extends React.Component<
  ProductItemGalleryPropsI,
  ProductItemGalleryStateI
> {
  ulRef = React.createRef<HTMLUListElement>();
  state = {
    items: this.props.items,
    idx: 0,
  };
  createItemsList() {
    return this.props.items?.map((item, idx) => (
      <li className={idx === this.state.idx ? `${s.active} ${s.item}` : s.item} key={idx}>
        <img src={item} alt="img gallery" />
      </li>
    ));
  }
  setCurrentItem = (target: HTMLElement) => {
    const parentElement = target.parentElement;
    const idx = Array.prototype.indexOf.call(this.ulRef.current?.children, parentElement);
    if (idx !== -1) {
      this.setState({ idx });
    }
  };
  render() {
    return (
      <div className={s.root}>
        <ul
          className={s.list}
          ref={this.ulRef}
          onClick={(e) => this.setCurrentItem(e.target as HTMLElement)}>
          {this.createItemsList()}
        </ul>
        <div className={s.current}>
          <img src={this.props.items?.at(this.state.idx)} alt="img gallery" />
        </div>
      </div>
    );
  }
}

export default ProductItemGallery;
