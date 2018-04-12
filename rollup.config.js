import typescript from 'rollup-plugin-typescript2';

export default {
  entry: './src/nuxt-property-decorator.ts',
	plugins: [
		typescript({
      tsconfig: './tsconfig.json'
    })
	],
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
