'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _throttle = require('lodash/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable no-undef */


function getBrowserScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

var IsScrollingHoC = function IsScrollingHoC(TheComponent) {
  return function (_React$Component) {
    _inherits(IsScrollingComponent, _React$Component);

    function IsScrollingComponent(props) {
      _classCallCheck(this, IsScrollingComponent);

      var _this = _possibleConstructorReturn(this, (IsScrollingComponent.__proto__ || Object.getPrototypeOf(IsScrollingComponent)).call(this, props));

      _this.setScrollOn = function () {
        var _this$state = _this.state,
            isScrolling = _this$state.isScrolling,
            lastScrollTop = _this$state.lastScrollTop;


        if (!isScrolling) {
          _this.setState({
            isScrolling: true,
            lastScrollTop: getBrowserScrollTop()
          });
        }

        if (lastScrollTop) {
          _this.detectDirection(lastScrollTop, getBrowserScrollTop());
        }
        _this.setScrollOff();
      };

      _this.DOMElement = window;
      _this.setScrollOff = (0, _throttle2.default)(function () {
        if (_this.state.isScrolling) {
          _this.setState({ isScrolling: false });
        }
      }, 100);

      _this.state = {
        isScrolling: false,
        lastScrollTop: null,
        scrollDirection: 'down'
      };
      return _this;
    }

    _createClass(IsScrollingComponent, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (this.DOMElement) {
          this.DOMElement.addEventListener('scroll', this.setScrollOn, true);
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.DOMElement) {
          this.DOMElement.removeEventListener('scroll', this.setScrollOn, true);
        }
      }
    }, {
      key: 'detectDirection',
      value: function detectDirection(lastScrollTop, nextScrollTop) {
        if (lastScrollTop < nextScrollTop) {
          this.setState({ scrollDirection: 'down', lastScrollTop: null });
        } else {
          this.setState({ scrollDirection: 'up', lastScrollTop: null });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(TheComponent, _extends({}, this.props, this.state));
      }
    }]);

    return IsScrollingComponent;
  }(_react2.default.Component);
};

exports.default = IsScrollingHoC;