import slash from 'slash2';


// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  devServer: {
    open: true
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context,
      _,
      localName
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.scss')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.scss', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a) => a.replace(/([A-Z])/g, '-$1'))
          .map((a) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  routes: [
    {
      path: '/',
      component: '../layouts',
      routes: [
        {
          path: '/',
          redirect: '/main'
        },
        {
          path: '/main',
          component: '../pages',
        },
        {
          path: '/goodslist',
          component: '../pages/GoodsList',
        }
      ]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'imooc-hybrid-web',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}
