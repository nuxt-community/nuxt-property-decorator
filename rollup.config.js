export default {
  entry: 'lib/nuxt-property-decorator.js',
  format: 'umd',
  moduleName: 'NuxtPropertyDecorator',
  dest: 'lib/nuxt-property-decorator.umd.js',
  external: [
    'vue', 'vue-class-component', 'reflect-metadata'
  ],
  globals: {
    'vue': 'Vue',
    'vue-class-component': 'VueClassComponent'
  }
}
