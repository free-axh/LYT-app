import { memo, useCallback, useEffect, useState } from 'react';
import Tabs from '@/components/tabs';
import Record from './record';
import styles from './index.less';

const GarbageSorting = memo(() => {
  const [key, setKey] = useState('record');
  const [height, setHeight] = useState<string | number>(0);

  const basicData = {
    title: '垃圾分类',
    tabs: [{ title: '分类记录', code: 'record' }],
  };

  useEffect(() => {
    const element = document.getElementById('tableContent') as HTMLElement;
    const resizeObserver = new ResizeObserver((entries) => {
      const height = element.getBoundingClientRect().top;
      setHeight(`calc(100vh - ${height}px)`);
    });

    resizeObserver.observe(element);
    return () => {
      resizeObserver.unobserve(element);
    };
  }, []);

  return (
    <div id="tableContent" style={{ height, background: '#f0f2f5' }}>
      <div style={{ height: '100%', padding: '33px 17px' }}>
        <Tabs
          title={basicData.title}
          tabs={basicData.tabs}
          activeKey={key}
          render={
            <div className={styles.render}>
              <div className={styles.number}>
                <span>累计分类次数</span>
                <span>98</span>
              </div>
              <div className={styles.integral}>
                <span>累计赠送积分</span>
                <span>2451</span>
              </div>
            </div>
          }
        >
          <Record />
        </Tabs>
      </div>
    </div>
  );
});

export default GarbageSorting;
