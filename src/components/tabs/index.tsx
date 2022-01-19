import { memo, useCallback } from 'react';
import { Tabs } from 'antd';
import styles from './index.less';

const { TabPane } = Tabs;

interface IProps {
  title: String;
  tabs: ITabs[];
  defaultActiveKey?: string;
}

interface ITabs {
  title: string;
  code: string;
}

const NavTabs: React.FC<IProps> = memo(
  ({ title, tabs, defaultActiveKey, ...props }) => {
    const onChange = useCallback((e) => {}, [tabs]);

    return (
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>{title}</h2>
        </div>
        <div className={styles.main}>
          <div className={styles.tabs}>
            <Tabs defaultActiveKey={defaultActiveKey} onChange={onChange}>
              {tabs.map((item) => (
                <TabPane tab={item.title} key={item.code}>
                  {props.children}
                </TabPane>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    );
  },
);

export default NavTabs;
