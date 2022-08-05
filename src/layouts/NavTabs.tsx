import { useState, useEffect ,ReactNode} from 'react';
// import type { FC, ReactNode, MouseEvent, KeyboardEvent } from 'react';
import { Tabs, Dropdown, Space, Menu } from 'antd';
import { history } from 'umi';
import { DownOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;

type TabsCompType = {
  content: ReactNode;
};

type PanesType = {
  content: ReactNode;
  title: string;
  pathname: string;
};
const TabsComp: FC<TabsCompType> = ({ content }) => {
  const curPathname = history.location.pathname;
  const [activeKey, setActiveKey] = useState<string>(history.location.pathname);
  const [panes, setPanes] = useState<PanesType[]>([]);

  const onChange = (key: string): void => {
    history.push(key);
  };

  useEffect(() => {
    console.log('TabsCompuseEffect', curPathname);
    const curRouter = panes.find((item) => item.pathname === curPathname);
    if (!curRouter) {
      setPanes((prevPanes) => {
        return [
          ...prevPanes,
          {
            pathname: curPathname,
            content,
            title: '标签' + curPathname,
          },
        ];
      });
    }
    setActiveKey(curPathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curPathname]);

  const onEdit = (
    targetKey: string | MouseEvent<Element, MouseEvent> | KeyboardEvent<Element>,
    action: 'add' | 'remove',
  ): void => {
    if (action === 'remove') {
      const targetIndex = panes.findIndex((pane) => pane.pathname === targetKey);
      const newPanes = panes.filter((pane) => pane.pathname !== targetKey);
      if (newPanes.length && targetKey === activeKey) {
        const { pathname } =
          newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
        history.replace(pathname);
      }
      if (!newPanes.length) {
        history.replace('/dashboard');
      }
      setPanes(newPanes);
    }
  };
  const menu: JSX.Element = (
    <Menu
      items={[
        {
          key: '1',
          label: '关闭其他',
        },
        {
          key: '2',
          label: '关闭全部',
        },
      ]}
    />
  );
  const tabBarExtraContent: JSX.Element = (
    <Dropdown overlay={menu}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          更多
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );

  return (
    <>
      <Tabs
        hideAdd
        onChange={onChange}
        activeKey={activeKey}
        type="editable-card"
        // @ts-ignore
        onEdit={onEdit}
        destroyInactiveTabPane={false}
        tabBarExtraContent={tabBarExtraContent}
      >
        {panes?.map((item) => {
          return (
            <TabPane tab={item.title} key={item.pathname}>
              {item.content}
            </TabPane>
          );
        })}
      </Tabs>
    </>
  );
};
export default TabsComp;
