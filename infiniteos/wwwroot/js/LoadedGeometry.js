function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import * as THREE from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler";
import { GLTFLoader, GLTLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

var EventEmitter = require('events');

var LoadedGeometry = /*#__PURE__*/function (_EventEmitter) {
  _inherits(LoadedGeometry, _EventEmitter);

  var _super = _createSuper(LoadedGeometry);

  function LoadedGeometry(obj, settings) {
    var _this;

    _classCallCheck(this, LoadedGeometry);

    //console.log("(LoadedGeometry.CONSTRUCTORA)!")
    _this = _super.call(this); //--

    _this.file = obj.file;
    _this.id = obj.id;
    _this.isDraco = obj.isDraco || false;
    _this.scale = obj.scale;
    _this.rotationY = obj.rotationY || 0; //--

    _this.numDots = settings.numDots; //--

    _this.mesh = null;
    _this.sampler = null;
    _this.attributes = {
      a_posiciones: new Float32Array(_this.numDots * 3),
      a_randomness: new Float32Array(_this.numDots * 3)
    };
    _this.loader = new GLTFLoader();

    if (_this.isDraco) {
      _this.dracoLoader = new DRACOLoader();

      _this.dracoLoader.setDecoderPath("./draco/");

      _this.loader.setDRACOLoader(_this.dracoLoader);
    }

    _this.loaded = false; //--
    //this.init()

    return _this;
  }

  _createClass(LoadedGeometry, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      //console.log("(LoadedGeometry.init)!")
      this.loader.load(this.file, function (response) {
        //console.log("   mesh "+this.id+" loaded!")
        //console.log("response: ", response)
        _this2.mesh = response.scene.children[0];

        _this2.mesh.geometry.rotateY(_this2.rotationY);

        _this2.sampler = new MeshSurfaceSampler(_this2.mesh).build(); //--

        for (var i = 0; i < _this2.numDots; i++) {
          var newPostion = new THREE.Vector3();

          _this2.sampler.sample(newPostion);

          _this2.attributes.a_posiciones.set([newPostion.x * _this2.scale, newPostion.y * _this2.scale, newPostion.z * _this2.scale], i * 3);

          _this2.attributes.a_randomness.set([Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1], i * 3);
        } //--


        _this2.loaded = true;

        _this2.emit("onMeshLoaded", {
          ref: _this2
        });
      });
    }
  }]);

  return LoadedGeometry;
}(EventEmitter);

export default LoadedGeometry;