(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('vue-property-decorator'), require('vue-class-component'), require('vuex-class')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue', 'vue-property-decorator', 'vue-class-component', 'vuex-class'], factory) :
  (global = global || self, factory(global.NuxtPropertyDecorator = {}, global.Vue, global.VuePropertyDecorator, global.VueClassComponent, global.VuexClass));
}(this, function (exports, vue, vuePropertyDecorator, Component, vuexClass) { 'use strict';

  vue = vue && vue.hasOwnProperty('default') ? vue['default'] : vue;
  var Component__default = 'default' in Component ? Component['default'] : Component;

  Component__default.registerHooks([
      'beforeRouteEnter',
      'beforeRouteUpdate',
      'beforeRouteLeave',
      'asyncData',
      'fetch',
      'head',
      'key',
      'layout',
      'loading',
      'middleware',
      'scrollToTop',
      'transition',
      'validate',
      'watchQuery'
  ]);
  // Code copied from Vue/src/shared/util.js
  var hyphenateRE = /\B([A-Z])/g;
  var hyphenate = function (str) { return str.replace(hyphenateRE, '-$1').toLowerCase(); };
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
                      if (typeof this[method] === 'function') {
                          this.$off(event || key, this[method]);
                      }
                      else {
                          throw new TypeError('must be a method name');
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
          if (typeof componentOptions.created !== 'function') {
              componentOptions.created = function () { };
          }
          var original = componentOptions.created;
          componentOptions.created = function () {
              original();
              if (typeof componentOptions.methods !== 'undefined') {
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
          if (typeof componentOptions.created !== 'function') {
              componentOptions.created = function () { };
          }
          var original = componentOptions.created;
          componentOptions.created = function () {
              original();
              if (typeof componentOptions.methods !== 'undefined') {
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
                  if (typeof this[method] === 'function') {
                      this.$nextTick(this[method]);
                  }
                  else {
                      throw new TypeError('must be a method name');
                  }
          };
      };
  }

  exports.Vue = vue;
  Object.defineProperty(exports, 'Emit', {
    enumerable: true,
    get: function () {
      return vuePropertyDecorator.Emit;
    }
  });
  Object.defineProperty(exports, 'Inject', {
    enumerable: true,
    get: function () {
      return vuePropertyDecorator.Inject;
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
  Object.defineProperty(exports, 'Provide', {
    enumerable: true,
    get: function () {
      return vuePropertyDecorator.Provide;
    }
  });
  Object.defineProperty(exports, 'Watch', {
    enumerable: true,
    get: function () {
      return vuePropertyDecorator.Watch;
    }
  });
  exports.Component = Component__default;
  Object.defineProperty(exports, 'mixins', {
    enumerable: true,
    get: function () {
      return Component.mixins;
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
  exports.NextTick = NextTick;
  exports.Off = Off;
  exports.On = On;
  exports.Once = Once;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
