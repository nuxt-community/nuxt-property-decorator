export { default as Vue } from 'vue';
export { Emit, Inject, InjectReactive, Model, Prop, PropSync, Provide, ProvideReactive, Ref, Watch } from 'vue-property-decorator';
import Component, { createDecorator } from 'vue-class-component';
export { default as Component, mixins } from 'vue-class-component';
export { Module, MutationAction, Action as VuexAction, VuexModule, Mutation as VuexMutation, getModule } from 'vuex-module-decorators';
export { Action, Getter, Mutation, State, namespace } from 'vuex-class';

Component.registerHooks([
    "beforeRouteEnter",
    "beforeRouteUpdate",
    "beforeRouteLeave",
    "asyncData",
    "fetch",
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
    return createDecorator(function (componentOptions, k) {
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
    return createDecorator(function (componentOptions, k) {
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

export { NextTick, Off, On, Once };
//# sourceMappingURL=nuxt-property-decorator.esm.js.map
