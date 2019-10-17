import typescript from "rollup-plugin-typescript2"

export default {
  input: "./src/nuxt-property-decorator.ts",
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json"
    })
  ],
  output: {
    format: "umd",
    name: "NuxtPropertyDecorator",
    file: "lib/nuxt-property-decorator.umd.js",
    globals: {
      vue: "Vue",
      "vuex-class": "VuexClass",
      "vue-class-component": "VueClassComponent",
      "vue-property-decorator": "VuePropertyDecorator"
    }
  },
  external: [
    "vue",
    "vuex-class",
    "vue-property-decorator",
    "vue-class-component",
    "reflect-metadata"
  ]
}
