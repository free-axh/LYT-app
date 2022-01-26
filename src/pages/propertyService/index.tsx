import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { history } from 'umi';
import Tabs from '@/components/tabs';
import Receive from './receive';
import styles from './index.less';

const Neighborhoods = memo(() => {
  const [key, setKey] = useState('order');
  const tabsRef = useRef();
  const [height, setHeight] = useState<string | number>(0);

  const basicData = {
    title: '物品领用',
    tabs: [{ title: '领用工单', code: 'order' }],
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
        <Tabs title={basicData.title} tabs={basicData.tabs} activeKey={key}>
          <Receive />
        </Tabs>
      </div>
    </div>
  );
});

export default Neighborhoods;
