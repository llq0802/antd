export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        name: '登录',
        path: '/user/login',
        component: './login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/',
    component: '../layouts/index',
    flatMenu: true,
    routes: [
      {
        path: '/dashboard',
        name: '首页',
        icon: 'smile',
        component: './dashboard',
      },
      {
        path: '/admin',
        name: '信息管理',
        icon: 'crown',
        // access: 'canAdmin',
        access: 'routerAccess',
        routes: [
          {
            path: '/admin/list',
            name: '人员信息1',
            icon: 'smile',
            component: './user',
            // access: 'routerAccess',
          },
          {
            component: './404',
          },
        ],
      },
      {
        name: '表格查询',
        icon: 'table',
        path: '/list',
        component: './table-list',
      },

      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
