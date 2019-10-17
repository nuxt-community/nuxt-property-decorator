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

@Component
export default class EmitFixture extends Vue {
  count = 0

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
