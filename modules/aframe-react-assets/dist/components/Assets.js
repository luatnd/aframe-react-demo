'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class,
    _temp2,
    _jsxFileName = 'src/components/Assets.jsx'; /**
                                                 * Assets component for managing AFrame assets
                                                 * See more detail here:
                                                 * https://www.npmjs.com/package/aframe-react-assets
                                                 */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultTimeout = 30000;
var defaultInterval = 200;

var Assets = (_temp2 = _class = function (_React$PureComponent) {
  _inherits(Assets, _React$PureComponent);

  function Assets() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, Assets);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Assets.__proto__ || Object.getPrototypeOf(Assets)).call.apply(_ref, [this].concat(args))), _this), _this.iState = {
      assetsInstance: null,
      current: 0,
      total: 0,
      assetCurrentItem: null,
      idleTimestamp: 0
    }, _this.countLoadedAssetItem = function (e) {
      //console.log('countLoadedAssetItem this.iState.current: ', this.iState.current, e, e.target);

      _this.iState.current++;
      _this.iState.assetCurrentItem = e.target;

      if (_this.props.debug && e.target) {
        console.info('[Assets] loaded: ', e.target);
      }

      var currentUnix = Assets.getCurrUnixMili();
      var _this$props$interval = _this.props.interval,
          interval = _this$props$interval === undefined ? defaultInterval : _this$props$interval;

      if (currentUnix - interval > _this.iState.idleTimestamp) {
        _this.iState.idleTimestamp = currentUnix;

        if (_this.props.debug) {
          ConsoleLogger.log('Attempt to updateAssetsLoadingInfo', 'Assets');
        }

        _this.props.onLoadingByAmount({
          assetLoaded: _this.iState.current,
          assetTotal: _this.iState.total,
          assetCurrentItem: _this.iState.assetCurrentItem
        });
      }
    }, _this.updateProgress = function (e) {
      //console.log('xhr: ', e);

      var currentUnix = Assets.getCurrUnixMili();
      var _this$props$interval2 = _this.props.interval,
          interval = _this$props$interval2 === undefined ? defaultInterval : _this$props$interval2;

      if (currentUnix - interval > _this.iState.idleTimestamp) {
        _this.iState.idleTimestamp = currentUnix;
        _this.props.onLoadingBySize({
          assetCurrentLoadedBytes: e.detail.loadedBytes,
          assetCurrentTotalBytes: e.detail.totalBytes ? e.detail.totalBytes : e.detail.loadedBytes
        });
      }
    }, _this.getBindingProps = function (item) {

      var eventName = void 0;

      switch (item.type) {
        case 'a-asset-item':
          eventName = 'loaded'; // aframe / threejs event
          return {
            // NOTE: This case is an react component, not a pure HTML so that we need to pass eventListener to `ref`
            ref: function ref(ele) {
              ele.addEventListener(eventName, _this.countLoadedAssetItem);
              //ele.addEventListener('progress', this.updateProgress);
            }
          };

        case 'img':
          eventName = 'onLoad'; // js event
          return _defineProperty({}, eventName, _this.countLoadedAssetItem);

        case 'audio':
        case 'video':
          eventName = 'onLoadeddata'; // js event
          //eventName = 'loadeddata'; // aframe event
          return _defineProperty({}, eventName, _this.countLoadedAssetItem);

        default:
          console.warn('Un-recognize asset type: ', item.type);
          return {};
      }
    }, _this.getAssetsList = function () {
      var _this$props$assets = _this.props.assets,
          assets = _this$props$assets === undefined ? [] : _this$props$assets;


      var assetItemComponents = Object.keys(assets).map(function (key) {
        var componentAssets = _this.props.assets[key];
        _this.iState.total += componentAssets.length;

        return _react2.default.createElement(
          'a-entity',
          { key: key, __source: {
              fileName: _jsxFileName,
              lineNumber: 175
            },
            __self: _this2
          },
          componentAssets.map(function (item) {
            return item.hasOwnProperty('type') ? _react2.default.cloneElement(item, _extends({
              key: item.props.id ? item.props.id : ConsoleLogger.getUnix()
            }, _this.getBindingProps(item)) // Bind event listener for this elements
            ) : null;
          } // Some user mis-type comment: [ {/*Asset was commented*/} ] ==> [ {} ] , so this is not valid assets
          )
        );
      });

      if (_this.props.debug) {
        console.log('Component list to add assets: ', assetItemComponents);
      }

      return assetItemComponents;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // Internal state that does not cause re-render.


  _createClass(Assets, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      ConsoleLogger.log('Assets Component mounted', 'Assets');
      //console.log('iState.assetsInstance.fileLoader: ', this.iState.assetsInstance.fileLoader);
      //if (this.iState.assetsInstance.fileLoader) {
      //  const mng = this.iState.assetsInstance.fileLoader.manager;
      //
      //  mng.onError = function (a, b) {
      //    console.log("mng onError a, b: ", a, b);
      //  }
      //  mng.onLoad = function (a, b) {
      //    console.log("mng onLoad a, b: ", a, b);
      //  }
      //  mng.onProgress = function (a, b) {
      //    console.log("mng onProgress a, b: ", a, b);
      //  }
      //  mng.onStart = function (a, b) {
      //    console.log("mng onStart a, b: ", a, b);
      //  }
      //}

      this.iState.assetsInstance.addEventListener('loaded', function () {
        // Force too complete
        _this3.props.onLoadingByAmount({
          assetLoaded: _this3.iState.total,
          assetTotal: _this3.iState.total,
          assetCurrentItem: _this3.iState.assetCurrentItem
        });
        setTimeout(_this3.props.onLoad(false), 1000);

        ConsoleLogger.log('All assets were loaded', 'Assets');
        //console.info('And THREE.Cache', THREE.Cache);
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // Make sure to remove the DOM listener when the component is unmounted.
      this.iState.assetsInstance.removeEventListener('loaded');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props$timeout = this.props.timeout,
          timeout = _props$timeout === undefined ? defaultTimeout : _props$timeout;


      return _react2.default.createElement(
        'a-assets',
        Object.assign({ timeout: timeout }, { ref: function ref(ele) {
            return _this4.iState.assetsInstance = ele;
          }, __source: {
            fileName: _jsxFileName,
            lineNumber: 199
          },
          __self: this
        }),
        this.getAssetsList()
      );
    }
  }], [{
    key: 'getCurrUnixMili',
    value: function getCurrUnixMili() {
      return new Date().getTime();
    }

    /**
     * NOTE: TODO: This feature has not completed yet;
     */


    /**
     * Try to Attach "loaded" event listener foreach asset items.
     * "loaded" event name was different from each item
     *
     * @param item React element, eg: <img src=""/>
     * @returns {*}
     */


    // TODO: Support asset management with lazy load

  }]);

  return Assets;
}(_react2.default.PureComponent), _class.propTypes = {
  assets: _propTypes2.default.object,
  timeout: _propTypes2.default.number,
  interval: _propTypes2.default.number,
  debug: _propTypes2.default.bool,
  onLoad: _propTypes2.default.func,
  onLoadingBySize: _propTypes2.default.func,
  onLoadingByAmount: _propTypes2.default.func
}, _temp2);
exports.default = Assets;

var ConsoleLogger = function () {
  function ConsoleLogger() {
    _classCallCheck(this, ConsoleLogger);
  }

  _createClass(ConsoleLogger, null, [{
    key: 'getLocaleTimeStr',
    value: function getLocaleTimeStr() {
      var d = new Date();
      var h = d.getHours();
      var m = d.getMinutes();
      var s = d.getSeconds();
      var ms = d.getMilliseconds();

      return h + ':' + m + ':' + s + '-' + ms;
    }
  }, {
    key: 'getUnix',
    value: function getUnix() {
      return Math.floor(new Date().getTime() / 1e3);
    }
  }, {
    key: 'log',
    value: function log(msg) {
      var componentName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

      console.log('[' + componentName + '] ' + msg + ' at ' + this.getLocaleTimeStr());
    }
  }]);

  return ConsoleLogger;
}();