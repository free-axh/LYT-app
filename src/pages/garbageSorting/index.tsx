import { memo, useCallback, useEffect, useState } from 'react';
import Tabs from '@/components/tabs';
import Record from './record';
import styles from './index.less';

const GarbageSorting = memo(() => {
  const [key, setKey] = useState('record');

  const basicData = {
    title: '垃圾分类',
    tabs: [{ title: '分类记录', code: 'record' }],
  };

  return (
    <div className={styles.main}>
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
  );
});

export default GarbageSorting;
