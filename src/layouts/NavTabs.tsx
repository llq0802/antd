import { useState, useRef, useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import { Tabs, Button } from 'antd';
import { history } from 'umi';

const { TabPane } = Tabs;

type TabsCompType = {
  content: ReactNode;
};
const TabsComp: FC<TabsCompType> = ({ content }) => {
  // console.log('Tabs', history.location.pathname);
  const curPathname = history.location.pathname;
  const [activeKey, setActiveKey] = useState(history.location.pathname);
  const [panes, setPanes] = useState([]);
  const onChange = (key: string) => {
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
  }, [curPathname]);

  const remove = (targetKey: string) => {
    const targetIndex = panes.findIndex((pane) => pane.pathname === targetKey);
    const newPanes = panes.filter((pane) => pane.pathname !== targetKey);

    console.log('remove', targetIndex);
    console.log('newPanes', newPanes);

    if (newPanes.length && targetKey === activeKey) {
      const { pathname } =
        newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
      history.replace(pathname);
    }
    if (!newPanes.length) {
      history.replace('/dashboard');
    }
    setPanes(newPanes);
  };

  const onEdit = (targetKey: string, action: 'add' | 'remove') => {
    if (action === 'remove') {
      remove(targetKey);
    }
  };

  return (
    <>
      <Tabs
        hideAdd
        onChange={onChange}
        activeKey={activeKey}
        type="editable-card"
        onEdit={onEdit}
        destroyInactiveTabPane={false}
        // renderTabBar={(props, DefaultTabBar) => {
        //   console.log(props);
        //   console.log(DefaultTabBar);
        //   return <span>789</span>;
        // }}
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
