import { mount, shallow } from '@vue/test-utils';
import { Component, Emit, Inject, Model, Prop, Provide, Watch } from '../src/nuxt-property-decorator';
import EmitFixture from '../fixtures/emit'
import { Parent, Child, GrandChild } from '../fixtures/inject';
import ModelFixture from '../fixtures/model';

describe('@Emit decorator tests', () => {
  const wrapper = shallow(new EmitFixture());
  test('emitted increment correctly', () => {
    wrapper.vm.$emit('increment', 123);
    expect(wrapper.emitted().increment).toBeTruthy();
    expect(wrapper.emitted().increment[0]).toEqual([123]);
  });

  test('emmited reset correctly', () => {
    wrapper.vm.$emit('reset');
    expect(wrapper.emitted().reset).toBeTruthy();
    expect(wrapper.emitted().reset[1]).toEqual(undefined);
  })

  test('emmited canceled correctly', () => {
    wrapper.vm.$emit('canceled');
    expect(wrapper.emitted().canceled).toBeTruthy();
  })
});

describe('@Inject decorator test', () => {
  const parent = new Parent();
  const child = new Child({ parent });
  const grandChild = new GrandChild({ parent: child });

  test('child injected', () => {
    expect(child.foo).toBe('one')
    expect(child.bar).toBe('two')
  });

  test('grand child injected', () => {
    expect(grandChild.foo).toBe('one')
    expect(grandChild.bar).toBe('two')
  })
});
