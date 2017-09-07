# Nuxt Property Decorator

[![npm](https://img.shields.io/npm/v/nuxt-property-decorator.svg)](https://www.npmjs.com/package/nuxt-property-decorator)

This library fully depends on [nuxt-class-component](https://github.com/johnlindquist/nuxt-class-component).

## License

MIT License

## Install

```bash
npm i -S nuxt-property-decorator
```

## Usage

There are 6 decorators:

* `@Inject`
* `@Model`
* `@Prop`
* `@Provide`
* `@Watch`
* `@Component` (**exported from** `nuxt-class-component`)

```typescript
import { Component, Inject, Model, Prop, Vue, Watch } from 'nuxt-property-decorator'

const s = Symbol('baz')

@Component
export class MyComponent extends Vue {

  @Inject() foo: string
  @Inject('bar') bar: string
  @Inject(s) baz: string

  @Model('change') checked: boolean

  @Prop()
  propA: number

  @Prop({ default: 'default value' })
  propB: string

  @Prop([String, Boolean])
  propC: string | boolean

  @Prop({ type: null })
  propD: any

  @Provide() foo = 'foo'
  @Provide('bar') baz = 'bar'

  @Watch('child')
  onChildChanged(val: string, oldVal: string) { }

  @Watch('person', { immediate: true, deep: true })
  onPersonChanged(val: Person, oldVal: Person) { }
}

```

is equivalent to

```js
const s = Symbol('baz')

export const MyComponent = Vue.extend({
  name: 'MyComponent',
  inject: {
    foo: 'foo',
    bar: 'bar',
    [s]: s
  },
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean,
    propA: Number,
    propB: {
      type: String,
      default: 'default value'
    },
    propC: [String, Boolean],
    propD: { type: null }
  },
  data () {
    return {
      foo: 'foo',
      baz: 'bar'
    }
  },
  provide () {
    return {
      foo: this.foo,
      bar: this.baz
    }
  }
  methods: {
    onChildChanged(val, oldVal) { },
    onPersonChanged(val, oldVal) { }
  },
  watch: {
    'child': {
      handler: 'onChildChanged',
      immediate: false,
      deep: false
    },
    'person': {
      handler: 'onPersonChanged',
      immediate: true,
      deep: true
    }
  }
})
```

As you can see at `propA` and `propB`, the type can be inferred automatically when it's a simple type. For more complex types like enums you do need to specify it specifically.
Also this library needs to have `emitDecoratorMetadata` set to `true` for this to work.

