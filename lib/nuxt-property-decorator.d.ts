import Vue from "vue";
import Component, { mixins } from "vue-class-component";
export { Vue, Component, mixins };
export { Module, getModule, VuexModule, Mutation as VuexMutation, MutationAction, Action as VuexAction, } from "vuex-module-decorators";
export { State, Getter, Action, Mutation, namespace } from "vuex-class";
export { Emit, Inject, InjectReactive, Model, ModelSync, Prop, PropSync, Provide, ProvideReactive, Ref, VModel, Watch, } from "vue-property-decorator";
/**
 * @public
 */
export declare type Constructor = {
    new (...args: any[]): any;
};
/**
 * decorator of $off
 * @public
 * @param event - The name of the event
 * @param method - The name of the method
 */
export declare function Off(event?: string, method?: string): MethodDecorator;
/**
 * decorator of $on
 * @public
 * @param event - The name of the event
 */
export declare function On(event?: string): MethodDecorator;
/**
 * decorator of $once
 * @public
 * @param event - The name of the event
 */
export declare function Once(event?: string): MethodDecorator;
/**
 * decorator of $nextTick
 *
 * @public
 * @param method - Method name
 * @returns Method Decorator
 */
export declare function NextTick(method: string): MethodDecorator;
