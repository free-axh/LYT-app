import { memo, useCallback } from 'react';
import { Tabs } from 'antd';
import styles from './index.less';

const { TabPane } = Tabs;

interface IProps {
  title: string;
  tabs: ITabs[];
  defaultActiveKey?: string;
  onChange?: Function;
  activeKey?: string;
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
    ...props
  }) => {
    const onChange = useCallback(
      (activeKey) => {
        if (typeof onTabsChage === 'function') onTabsChage(activeKey);
      },
      [tabs],
    );

    return (
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>{title}</h2>
        </div>
        <div className={styles.main}>
          <Tabs
            defaultActiveKey={defaultActiveKey}
            activeKey={activeKey}
            onChange={onChange}
          >
            {tabs.map((item) => (
              <TabPane tab={item.title} key={item.code} />
            ))}
          </Tabs>
          <div className={styles.table}>{props.children}</div>
        </div>
      </div>
    );
  },
);

export default NavTabs;
