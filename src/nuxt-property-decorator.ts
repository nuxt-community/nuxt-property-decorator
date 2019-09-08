'use strict'

import Vue, { PropOptions, WatchOptions } from 'vue'
import { /*Component,*/ Emit, Inject, Model, Prop, PropSync, Provide, Watch /*, Vue, Mixins */  } from "vue-property-decorator"
import Component, { createDecorator, mixins } from 'vue-class-component'

Component.registerHooks([
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
])

// const Component = require('nuxt-class-component');
// const { createDecorator } = require('nuxt-class-component');

export type Constructor = {
  new (...args: any[]): any
}

// Code copied from Vue/src/shared/util.js
const hyphenateRE = /\B([A-Z])/g
const hyphenate = (str: string) => str.replace(hyphenateRE, '-$1').toLowerCase()


/**
 * decorator of $off
 * @param event The name of the event
 * @param method The name of the method
 */
export function Off(event?: string, method?: string): MethodDecorator {
  return function (target: Vue, key: string, descriptor: any) {
    key = hyphenate(key)
    const original = descriptor.value
    descriptor.value = function offer(...args: any[]) {
      if (original.apply(this, args) !== false) {
        if (method) {
          if (typeof this[method] === 'function') {
            this.$off(event || key, this[method])
          } else {
            throw new TypeError('must be a method name')
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
 * @param event The name of the event
 */
export function On(event?: string): MethodDecorator {
  return createDecorator((componentOptions, k) => {
    const key = hyphenate(k)
    if (typeof componentOptions.created !== 'function') {
      componentOptions.created = function () { }
    }
    const original = componentOptions.created
    componentOptions.created = function () {
      original()
      if (typeof componentOptions.methods !== 'undefined') {
        this.$on(event || key, componentOptions.methods[k])
      }

    }
  })
}

/**
 * decorator of $once
 * @param event The name of the event
 */
export function Once(event?: string): MethodDecorator {
  return createDecorator((componentOptions, k) => {
    const key = hyphenate(k)
    if (typeof componentOptions.created !== 'function') {
      componentOptions.created = function () { }
    }
    const original = componentOptions.created
    componentOptions.created = function () {
      original()
      if (typeof componentOptions.methods !== 'undefined') {
        this.$once(event || key, componentOptions.methods[k]);
      }
    }
  })
}

/**
 * decorator of $nextTick
 *
 * @export
 * @param {string} method
 * @returns {MethodDecorator}
 */
export function NextTick(method: string): MethodDecorator {
  return function (target: Vue, key: string, descriptor: any) {
    const original = descriptor.value
    descriptor.value = function emitter(...args: any[]) {
      if (original.apply(this, args) !== false)
        if (typeof this[method] === 'function') {
          this.$nextTick(this[method])
        } else {
          throw new TypeError('must be a method name')
        }
    }
  }
}

import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
export { Vue, Component, Emit, Inject, Model, Prop, PropSync, Provide, Watch, mixins, State, Getter, Action, Mutation, namespace }
