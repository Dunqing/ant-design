import path from 'path';
import { defineConfig } from 'vitest/config';

const resolve = (dir: string) => path.resolve(__dirname, dir);

const include = ['lib', 'es', 'dist'].includes(process.env.LIB_DIR || '')
  ? ['components/*/__tests__/demo.test.{ts,tsx}']
  : ['components/*/__tests__/*.test.{ts,tsx}'];

export const commonConfig = {
  resolve: {
    mainFields: ['module', 'main'],
    alias: [
      {
        find: 'antd',
        replacement: resolve('components/index'),
      },
      {
        find: 'antd/es',
        replacement: resolve('components'),
      },
      {
        find: /@ant-design\/icons\/lib\/(.*)/,
        replacement: '@ant-design/icons/es/$1',
      },
      {
        find: /^@ant-design\/icons\/(?!es$)([\w-]*)$/,
        replacement: '@ant-design/icons/es/icons/$1',
      },
      {
        find: /rc-([\w-]+)\/lib\/(.*)/,
        replacement: 'rc-$1/es/$2',
      },
    ],
  },
};

export default defineConfig({
  ...commonConfig,
  test: {
    include,
    exclude: ['**/{node,image}.test.*', 'components/dropdown/**', 'node_modules', 'dist'],
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    environment: 'jsdom',
    coverage: {
      exclude: [
        'components/*/style/index.tsx',
        'components/style/index.tsx',
        'components/*/locale/index.tsx',
        'components/*/__tests__/type.test.tsx',
        'components/**/*/interface.{ts,tsx}',
        'components/*/__tests__/image.test.{ts,tsx}',
        'components/__tests__/node.test.tsx',
        'components/*/demo/*.tsx',
        'components/*/design/**',
      ],
    },
  },
});
