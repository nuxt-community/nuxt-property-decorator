import Vue, { VNode } from "vue"
import { Component, Model } from "../src/nuxt-property-decorator"

@Component({
  name: "test",
})
export default class ModelFixture extends Vue {
  @Model("change", Boolean)
  checked!: boolean

  render(createElement: any): VNode {
    return createElement("div")
  }
}
