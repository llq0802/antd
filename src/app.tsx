import RightContent from '@/components/RightContent';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading, SettingDrawer } from '@ant-design/pro-components';
import type { ReactNode } from 'react';
import type { RunTimeLayoutConfig } from 'umi';
import { useModel } from 'umi';
import { history } from 'umi';
import defaultSettings from '../config/defaultSettings';
import NavTabs from './layouts/NavTabs';
import { currentUser as queryCurrentUser } from './services/public/api';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // const { initialState } = useModel('@@initialState');
  console.log('初次加载时的路由 ', history.location.pathname);

  // 如果不是登录页面，执行获取当前登录人信息
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    // menu: {
    //   // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
    //   params: initialState,
    //   request: async (params, defaultMenuData) => {
    //     // return initialState.menuData;
    //     console.log('params ', params);
    //     console.log('defaultMenuData ', defaultMenuData);
    //     return defaultMenuData;
    //   },
    // },
    links: [],
    // pageTitleRender: (props) => {
    //   return props.location.pathname;
    // },
    footerRender: false,
    menuHeaderRender: false,
    disableContentMargin: true,
    rightContentRender: () => <RightContent />,
    waterMarkProps: {
      content: 'llq',
    },
    onPageChange: (e) => {
      const { location } = history;
      console.log('onPageChange', e?.pathname);
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },

    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 自定义 404页面
    // noFound:<div>unAccessible</div>,
    childrenRender: (children: ReactNode, props: Record<string, any>) => {
      // 增加一个 loading 的状态
      if (initialState?.loading) return <PageLoading />;

      return (
        <>
          {children}
          {/* <NavTabs content={children} /> */}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * 切换路由时触发
 * @param param0
 */
// export function onRouteChange({ matchedRoutes }) {
//   console.log(' onRouteChange', matchedRoutes);
//   if (matchedRoutes.length) {
//     document.title = matchedRoutes[matchedRoutes.length - 1].route.title || '';
//   }
// }

/**
 * 修改路由。
 * 比如在最前面添加一个 /foo 路由，
 * @param param0
 */
// export function patchRoutes({ routes }) {
//   // routes.unshift({
//   //   path: '/foo',
//   //   exact: true,
//   //   component: require('@/extraRoutes/foo').default,
//   // });
// }

/**
 * 比如用于渲染之前做权限校验，
 * @param oldRender
 */
// export function render(oldRender) {
//   console.log('比如用于渲染之前做权限校验，');
//   oldRender();

//   //   if (auth.isLogin) { oldRender() }
//   //   else {
//   //     history.push('/login');
//   //     oldRender()
//   //   }
//   // });
// }
