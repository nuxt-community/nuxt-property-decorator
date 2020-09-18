import Vue, { VNode } from "vue"
import {
  Emit,
  Component,
  Inject,
  Model,
  Prop,
  Provide,
  Watch,
} from "../src/nuxt-property-decorator"
@Component
export default class EmitFixture extends Vue {
  count = 1

  @Emit("reset") resetCount() {
    this.count = 0
  }

  @Emit() increment(n: number) {
    this.count += n
  }

  @Emit() canceled() {
    return false
  }

  render(createElement: any): VNode {
    return createElement("div")
  }
}
