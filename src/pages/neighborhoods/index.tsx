import { memo } from 'react';
import Tabs from '@/components/tabs';
import Thing from './thing';
import styles from './index.less';

const Neighborhoods = memo(() => {
  const basicData = {
    title: '好物共享',
    tabs: [
      { title: '好物列表', code: 'thing' },
      { title: '申请列表', code: 'apply' },
      { title: '分类管理', code: 'management' },
    ],
  };

  return (
    <div className={styles.main}>
      <Tabs title={basicData.title} tabs={basicData.tabs}>
        <Thing />
      </Tabs>
    </div>
  );
});

export default Neighborhoods;
