import type { FC } from 'react';
import { Redirect } from 'umi';
import NavTabs from './NavTabs';
import { PageLoading } from '@ant-design/pro-components';

const Layout: FC = ({ children }) => {
  console.log('Layout');

  // if (1) {
  //   // return <Redirect to="user" />;
  //   return <PageLoading />;
  // }
  return <NavTabs content={children} />;
  // return children;
};
export default Layout;
