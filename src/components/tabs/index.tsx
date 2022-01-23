import { memo, ReactNode, useCallback, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import styles from './index.less';

const { TabPane } = Tabs;

interface IProps {
  title: string;
  tabs: ITabs[];
  defaultActiveKey?: string;
  onChange?: Function;
  activeKey?: string;
  render?: ReactNode;
}

interface ITabs {
  title: string;
  code: string;
}

const NavTabs: React.FC<IProps> = memo(
  ({
    title,
    tabs,
    defaultActiveKey,
    activeKey,
    onChange: onTabsChage,
    render,
    ...props
  }) => {
    const [height, setHeight] = useState<number | string>(0);
    const onChange = useCallback(
      (activeKey) => {
        if (typeof onTabsChage === 'function') onTabsChage(activeKey);
      },
      [tabs],
    );

    useEffect(() => {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const value = 62 + entry.contentRect.height;
          setHeight(`calc(100% - ${value}px)`);
        }
      });
      const element = document.getElementById('render') as HTMLElement;
      resizeObserver.observe(element);
      return () => {
        resizeObserver.unobserve(element);
      };
    }, []);

    return (
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>{title}</h2>
        </div>
        <div className={styles.main}>
          <div id="render">{render}</div>
          <Tabs
            defaultActiveKey={defaultActiveKey}
            activeKey={activeKey}
            onChange={onChange}
          >
            {tabs.map((item) => (
              <TabPane tab={item.title} key={item.code} />
            ))}
          </Tabs>
          <div className={styles.table} style={{ height }}>
            {props.children}
          </div>
        </div>
      </div>
    );
  },
);

export default NavTabs;
