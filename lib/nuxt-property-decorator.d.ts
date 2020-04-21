import Vue from "vue";
import { Emit, Inject, InjectReactive, Model, Prop, PropSync, Provide, ProvideReactive, Ref, Watch } from "vue-property-decorator";
import Component, { mixins } from "vue-class-component";
export declare type Constructor = {
    new (...args: any[]): any;
};
/**
 * decorator of $off
 * @param event The name of the event
 * @param method The name of the method
 */
export declare function Off(event?: string, method?: string): MethodDecorator;
/**
 * decorator of $on
 * @param event The name of the event
 */
export declare function On(event?: string): MethodDecorator;
/**
 * decorator of $once
 * @param event The name of the event
 */
export declare function Once(event?: string): MethodDecorator;
/**
 * decorator of $nextTick
 *
 * @export
 * @param {string} method
 * @returns {MethodDecorator}
 */
export declare function NextTick(method: string): MethodDecorator;
import { Module, getModule, VuexModule, Mutation as VuexMutation, MutationAction, Action as VuexAction } from "vuex-module-decorators";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
export { Vue, Component, Emit, Inject, InjectReactive, Model, Prop, PropSync, Provide, ProvideReactive, Ref, Watch, mixins, State, Getter, Action, Mutation, namespace, Module, getModule, VuexModule, VuexMutation, MutationAction, VuexAction, };
