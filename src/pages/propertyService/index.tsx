import { memo, useCallback, useEffect, useState } from 'react';
import { history } from 'umi';
import Tabs from '@/components/tabs';
import Receive from './receive';
import styles from './index.less';

const Neighborhoods = memo(() => {
  const [key, setKey] = useState('order');

  const basicData = {
    title: '物品领用',
    tabs: [{ title: '领用工单', code: 'order' }],
  };

  return (
    <div className={styles.main}>
      <Tabs title={basicData.title} tabs={basicData.tabs} activeKey={key}>
        <Receive />
      </Tabs>
    </div>
  );
});

export default Neighborhoods;
