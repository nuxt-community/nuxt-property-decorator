"use strict"

import Vue, { PropOptions, WatchOptions } from "vue"

import Component, { createDecorator, mixins } from "vue-class-component"

Component.registerHooks([
  "beforeRouteEnter",
  "beforeRouteUpdate",
  "beforeRouteLeave",
  "asyncData",
  "fetch",
  "fetchOnServer",
  "fetchDelay",
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
])

export { Vue, Component, mixins }

export {
  Module,
  getModule,
  VuexModule,
  Mutation as VuexMutation,
  MutationAction,
  Action as VuexAction, // config,
} from "vuex-module-decorators"
export { State, Getter, Action, Mutation, namespace } from "vuex-class"
export {
  /*Component,*/ Emit,
  Inject,
  InjectReactive,
  Model,
  ModelSync,
  Prop,
  PropSync,
  Provide,
  ProvideReactive,
  Ref,
  VModel,
  Watch /*, Vue, Mixins */,
} from "vue-property-decorator"

// const Component = require('nuxt-class-component');
// const { createDecorator } = require('nuxt-class-component');

/**
 * @public
 */
export type Constructor = {
  new (...args: any[]): any
}

// Code copied from Vue/src/shared/util.js
const hyphenateRE = /\B([A-Z])/g
const hyphenate = (str: string) => str.replace(hyphenateRE, "-$1").toLowerCase()

/**
 * decorator of $off
 * @public
 * @param event - The name of the event
 * @param method - The name of the method
 */
export function Off(event?: string, method?: string): MethodDecorator {
  return function (target: Vue, key: string, descriptor: any) {
    key = hyphenate(key)
    const original = descriptor.value
    descriptor.value = function offer(...args: any[]) {
      if (original.apply(this, args) !== false) {
        if (method) {
          if (typeof this[method] === "function") {
            this.$off(event || key, this[method])
          } else {
            throw new TypeError("must be a method name")
          }
        } else if (event) {
          this.$off(event || key)
        } else {
          this.$off()
        }
      }
    }
  }
}

/**
 * decorator of $on
 * @public
 * @param event - The name of the event
 */
export function On(event?: string): MethodDecorator {
  return createDecorator((componentOptions, k) => {
    const key = hyphenate(k)
    if (typeof componentOptions.created !== "function") {
      componentOptions.created = function () {}
    }
    const original = componentOptions.created
    componentOptions.created = function () {
      original()
      if (typeof componentOptions.methods !== "undefined") {
        this.$on(event || key, componentOptions.methods[k])
      }
    }
  })
}

/**
 * decorator of $once
 * @public
 * @param event - The name of the event
 */
export function Once(event?: string): MethodDecorator {
  return createDecorator((componentOptions, k) => {
    const key = hyphenate(k)
    if (typeof componentOptions.created !== "function") {
      componentOptions.created = function () {}
    }
    const original = componentOptions.created
    componentOptions.created = function () {
      original()
      if (typeof componentOptions.methods !== "undefined") {
        this.$once(event || key, componentOptions.methods[k])
      }
    }
  })
}

/**
 * decorator of $nextTick
 *
 * @public
 * @param method - Method name
 * @returns Method Decorator
 */
export function NextTick(method: string): MethodDecorator {
  return function (target: Vue, key: string, descriptor: any) {
    const original = descriptor.value
    descriptor.value = function emitter(...args: any[]) {
      if (original.apply(this, args) !== false)
        if (typeof this[method] === "function") {
          this.$nextTick(this[method])
        } else {
          throw new TypeError("must be a method name")
        }
    }
  }
}
