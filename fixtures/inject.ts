import Vue, { VNode } from "vue"
import {
  Component,
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Watch
} from "../src/nuxt-property-decorator"

const s = Symbol()
@Component({
  provide() {
    return {
      [s]: "one",
      bar: "two"
    }
  }
})
export class Parent extends Vue {
  render(createElement: any): VNode {
    return createElement("div")
  }
}

@Component
export class Child extends Vue {
  @Inject(s) foo: string
  @Inject() bar: string
  render(createElement: any): VNode {
    return createElement("div")
  }
}

@Component
export class GrandChild extends Vue {
  @Inject(s) foo: string
  @Inject() bar: string
  render(createElement: any): VNode {
    return createElement("div")
  }
}
