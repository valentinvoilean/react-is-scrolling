/* eslint-disable no-undef */
import React from 'react';
import throttle from 'lodash/throttle';

function getBrowserScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

const IsScrollingHoC = TheComponent =>
  class IsScrollingComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isScrolling: false,
        lastScrollTop: null,
        scrollDirection: 'down'
      };
    }

    componentDidMount() {
      if (this.DOMElement) {
        this.DOMElement.addEventListener('scroll', this.setScrollOn, true);
      }
    }

    componentWillUnmount() {
      if (this.DOMElement) {
        this.DOMElement.removeEventListener('scroll', this.setScrollOn, true);
      }
    }

    detectDirection(lastScrollTop, nextScrollTop) {
      if (lastScrollTop < nextScrollTop) {
        this.setState({ scrollDirection: 'down', lastScrollTop: null });
      } else {
        this.setState({ scrollDirection: 'up', lastScrollTop: null });
      }
    }

    setScrollOn = () => {
      const { isScrolling, lastScrollTop } = this.state;

      if (!isScrolling) {
        this.setState({
          isScrolling: true,
          lastScrollTop: getBrowserScrollTop()
        });
      }

      if (lastScrollTop) {
        this.detectDirection(lastScrollTop, getBrowserScrollTop());
      }
      this.setScrollOff();
    };

    DOMElement = window;

    setScrollOff = throttle(() => {
      if (this.state.isScrolling) {
        this.setState({ isScrolling: false });
      }
    }, 100);

    render() {
      return (
        <TheComponent {...this.props} {...this.state} />
      );
    }
  };

export default IsScrollingHoC;

