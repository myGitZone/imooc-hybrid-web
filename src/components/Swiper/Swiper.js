import React from 'react';
import _Swiper from 'swiper';
import 'swiper/css/swiper.css';

class Swiper extends React.PureComponent {
  componentDidMount() {
    var swiper = new _Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
      },
    });
  }

  render() {
    return (
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">Slide 1</div>
          <div class="swiper-slide">Slide 2</div>
          <div class="swiper-slide">Slide 3</div>
          <div class="swiper-slide">Slide 4</div>
          <div class="swiper-slide">Slide 5</div>
          <div class="swiper-slide">Slide 6</div>
          <div class="swiper-slide">Slide 7</div>
          <div class="swiper-slide">Slide 8</div>
          <div class="swiper-slide">Slide 9</div>
          <div class="swiper-slide">Slide 10</div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    );
  }
}

export default Swiper;
