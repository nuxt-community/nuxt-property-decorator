import typescript from "rollup-plugin-typescript2"

const outDir = "lib";
const libName = "nuxt-property-decorator";
export default {
  input: "./src/nuxt-property-decorator.ts",
  plugins: [
    typescript(),
  ],
  output: [
    {
      format: "umd",
      name: "NuxtPropertyDecorator",
      file: `${outDir}/${libName}.umd.js`,
      globals: {
        vue: "Vue",
        "vuex-class": "VuexClass",
        "vue-class-component": "VueClassComponent",
        "vue-property-decorator": "VuePropertyDecorator",
      },
    },
    {
      file: `${outDir}/${libName}.common.js`,
      format: "cjs", // amd,cjs,es,iife,umd,system
      name: "quranMeta",
      sourcemap: true,
    },
    {
      file: `${outDir}/${libName}.esm.js`,
      format: "es",
      name: "quranMeta",
      sourcemap: true,
    },
  ],
  external: [
    "vue",
    "vuex-class",
    "vue-property-decorator",
    "vue-class-component",
    "reflect-metadata",
  ],
};
