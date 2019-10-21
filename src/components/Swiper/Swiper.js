import React from 'react';
import _Swiper from 'swiper';
import 'swiper/css/swiper.css';
import styles from './index.scss';

class Swiper extends React.PureComponent {
  componentDidMount() {
    console.log(styles);
    var swiper = new _Swiper('.swiper-container', {
      autoplay: true,
      autoHeight: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        bulletClass: 'custom-bullet-class'
      },
    });
  }

  render() {
    const { showPagination, children } = this.props;
    return (
      <div className={`${styles.container} swiper-container`}>
        <div className="swiper-wrapper">
          {children}
        </div>
        {
          showPagination ? <div className="swiper-pagination"/> : null
        }
      </div>
    );
  }
}

export default Swiper;
