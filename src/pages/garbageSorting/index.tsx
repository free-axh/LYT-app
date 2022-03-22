import { memo, useCallback, useEffect, useState } from 'react';
import { history } from 'umi';
import { getCount, getTotalScore } from '@/util/servers';
import Tabs from '@/components/tabs';
import Record from './record';
import EquipmentList from './equipmentList';
import EquipmentWarning from './equipmentWarning';
import styles from './index.less';

const GarbageSorting = memo(() => {
  const [key, setKey] = useState('equipmentWarning');
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);

  const basicData = {
    title: '垃圾分类',
    tabs: [
      { title: '设备告警', code: 'equipmentWarning' },
      { title: '设备列表', code: 'equipmentList' },
      { title: '投放记录', code: 'record' },
    ],
  };

  useEffect(() => {
    function changeKey(path: string) {
      const pathName = path;
      const code = pathName.split('/').pop() as string;
      setKey(code);
    }

    history.listen((route) => {
      changeKey(route.pathname);
    });

    const path = window.location.hash.replace('#', '');

    changeKey(path);
  }, []);

  useEffect(() => {
    getCount({ code: 1 }).then((res) => {
      if (res.status === 200 && res.data?.code === 0) {
        setCount(res.data.data);
      }
    });
    getTotalScore({ code: 1 }).then((res) => {
      if (res.status === 200 && res.data?.code === 0) {
        setScore(res.data.data.score);
      }
    });
  }, []);

  const onChange = useCallback((key) => {
    switch (key) {
      case 'equipmentWarning':
        history.push('/garbageSorting/equipmentWarning');
        break;
      case 'equipmentList':
        history.push('/garbageSorting/equipmentList');
        break;
      case 'record':
        history.push('/garbageSorting/record');
        break;
    }
    setKey(key);
  }, []);

  const renderDom = useCallback(
    (code) => {
      switch (code) {
        case 'equipmentWarning':
          return <EquipmentWarning />;
        case 'equipmentList':
          return <EquipmentList />;
        case 'record':
          return <Record />;
      }
    },
    [key],
  );

  return (
    <div id="tableContent" style={{ background: '#f0f2f5' }}>
      <div style={{ height: '100%', padding: '33px 17px' }}>
        <Tabs
          title={basicData.title}
          tabs={basicData.tabs}
          activeKey={key}
          render={
            <div className={styles.render}>
              <div className={styles.number}>
                <span>累计分类次数</span>
                <span>{count}</span>
              </div>
              <div className={styles.integral}>
                <span>累计赠送积分</span>
                <span>{score}</span>
              </div>
            </div>
          }
          onChange={onChange}
        >
          {renderDom(key)}
        </Tabs>
      </div>
    </div>
  );
});

export default GarbageSorting;
