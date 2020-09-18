(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('vue-property-decorator'), require('vue-class-component'), require('vuex-module-decorators'), require('vuex-class')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue', 'vue-property-decorator', 'vue-class-component', 'vuex-module-decorators', 'vuex-class'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.NuxtPropertyDecorator = {}, global.Vue, global.VuePropertyDecorator, global.VueClassComponent, global.VuexModuleDecorators, global.VuexClass));
}(this, (function (exports, vue, vuePropertyDecorator, Component, vuexModuleDecorators, vuexClass) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var vue__default = /*#__PURE__*/_interopDefaultLegacy(vue);
  var Component__default = /*#__PURE__*/_interopDefaultLegacy(Component);

  var Emit = vuePropertyDecorator.Emit;
  Component__default['default'].registerHooks([
      "beforeRouteEnter",
      "beforeRouteUpdate",
      "beforeRouteLeave",
      "asyncData",
      "fetch",
      "fetchOnServer",
      "head",
      "key",
      "layout",
      "loading",
      "middleware",
      "scrollToTop",
      "transition",
      "validate",
      "watchQuery",
      "meta",
  ]);
  // Code copied from Vue/src/shared/util.js
  var hyphenateRE = /\B([A-Z])/g;
  var hyphenate = function (str) { return str.replace(hyphenateRE, "-$1").toLowerCase(); };
  /**
   * decorator of $off
   * @param event The name of the event
   * @param method The name of the method
   */
  function Off(event, method) {
      return function (target, key, descriptor) {
          key = hyphenate(key);
          var original = descriptor.value;
          descriptor.value = function offer() {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i];
              }
              if (original.apply(this, args) !== false) {
                  if (method) {
                      if (typeof this[method] === "function") {
                          this.$off(event || key, this[method]);
                      }
                      else {
                          throw new TypeError("must be a method name");
                      }
                  }
                  else if (event) {
                      this.$off(event || key);
                  }
                  else {
                      this.$off();
                  }
              }
          };
      };
  }
  /**
   * decorator of $on
   * @param event The name of the event
   */
  function On(event) {
      return Component.createDecorator(function (componentOptions, k) {
          var key = hyphenate(k);
          if (typeof componentOptions.created !== "function") {
              componentOptions.created = function () { };
          }
          var original = componentOptions.created;
          componentOptions.created = function () {
              original();
              if (typeof componentOptions.methods !== "undefined") {
                  this.$on(event || key, componentOptions.methods[k]);
              }
          };
      });
  }
  /**
   * decorator of $once
   * @param event The name of the event
   */
  function Once(event) {
      return Component.createDecorator(function (componentOptions, k) {
          var key = hyphenate(k);
          if (typeof componentOptions.created !== "function") {
              componentOptions.created = function () { };
          }
          var original = componentOptions.created;
          componentOptions.created = function () {
              original();
              if (typeof componentOptions.methods !== "undefined") {
                  this.$once(event || key, componentOptions.methods[k]);
              }
          };
      });
  }
  /**
   * decorator of $nextTick
   *
   * @export
   * @param {string} method
   * @returns {MethodDecorator}
   */
  function NextTick(method) {
      return function (target, key, descriptor) {
          var original = descriptor.value;
          descriptor.value = function emitter() {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i];
              }
              if (original.apply(this, args) !== false)
                  if (typeof this[method] === "function") {
                      this.$nextTick(this[method]);
                  }
                  else {
                      throw new TypeError("must be a method name");
                  }
          };
      };
  }

  Object.defineProperty(exports, 'Vue', {
    enumerable: true,
    get: function () {
      return vue__default['default'];
    }
  });
  Object.defineProperty(exports, 'Inject', {
    enumerable: true,
    get: function () {
      return vuePropertyDecorator.Inject;
    }
  });
  Object.defineProperty(exports, 'InjectReactive', {
    enumerable: true,
    get: function () {
      return vuePropertyDecorator.InjectReactive;
    }
  });
  Object.defineProperty(exports, 'Model', {
    enumerable: true,
    get: function () {
      return vuePropertyDecorator.Model;
    }
  });
  Object.defineProperty(exports, 'Prop', {
    enumerable: true,
    get: function () {
      return vuePropertyDecorator.Prop;
    }
  });
  Object.defineProperty(exports, 'PropSync', {
    enumerable: true,
    get: function () {
      return vuePropertyDecorator.PropSync;
    }
  });
  Object.defineProperty(exports, 'Provide', {
    enumerable: true,
    get: function () {
      return vuePropertyDecorator.Provide;
    }
  });
  Object.defineProperty(exports, 'ProvideReactive', {
    enumerable: true,
    get: function () {
      return vuePropertyDecorator.ProvideReactive;
    }
  });
  Object.defineProperty(exports, 'Ref', {
    enumerable: true,
    get: function () {
      return vuePropertyDecorator.Ref;
    }
  });
  Object.defineProperty(exports, 'Watch', {
    enumerable: true,
    get: function () {
      return vuePropertyDecorator.Watch;
    }
  });
  Object.defineProperty(exports, 'Component', {
    enumerable: true,
    get: function () {
      return Component__default['default'];
    }
  });
  Object.defineProperty(exports, 'mixins', {
    enumerable: true,
    get: function () {
      return Component.mixins;
    }
  });
  Object.defineProperty(exports, 'Module', {
    enumerable: true,
    get: function () {
      return vuexModuleDecorators.Module;
    }
  });
  Object.defineProperty(exports, 'MutationAction', {
    enumerable: true,
    get: function () {
      return vuexModuleDecorators.MutationAction;
    }
  });
  Object.defineProperty(exports, 'VuexAction', {
    enumerable: true,
    get: function () {
      return vuexModuleDecorators.Action;
    }
  });
  Object.defineProperty(exports, 'VuexModule', {
    enumerable: true,
    get: function () {
      return vuexModuleDecorators.VuexModule;
    }
  });
  Object.defineProperty(exports, 'VuexMutation', {
    enumerable: true,
    get: function () {
      return vuexModuleDecorators.Mutation;
    }
  });
  Object.defineProperty(exports, 'getModule', {
    enumerable: true,
    get: function () {
      return vuexModuleDecorators.getModule;
    }
  });
  Object.defineProperty(exports, 'Action', {
    enumerable: true,
    get: function () {
      return vuexClass.Action;
    }
  });
  Object.defineProperty(exports, 'Getter', {
    enumerable: true,
    get: function () {
      return vuexClass.Getter;
    }
  });
  Object.defineProperty(exports, 'Mutation', {
    enumerable: true,
    get: function () {
      return vuexClass.Mutation;
    }
  });
  Object.defineProperty(exports, 'State', {
    enumerable: true,
    get: function () {
      return vuexClass.State;
    }
  });
  Object.defineProperty(exports, 'namespace', {
    enumerable: true,
    get: function () {
      return vuexClass.namespace;
    }
  });
  exports.Emit = Emit;
  exports.NextTick = NextTick;
  exports.Off = Off;
  exports.On = On;
  exports.Once = Once;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
