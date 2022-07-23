/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser, hasRouters = [] } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
    // 权限路由控制相关的函数，接收"当前处理的路由"作为第一个参数
    routerAccess: (currentRoute: Record<string, any>) => {
      // console.log(' 权限路由控制相关的函数', currentRoute);
      // hasRouters.includes(currentRoute.path)
      return false;
    },
  };
}
