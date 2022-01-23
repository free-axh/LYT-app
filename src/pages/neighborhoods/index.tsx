import { memo, useCallback, useEffect, useState } from 'react';
import { Button } from 'antd';
import { history } from 'umi';
import Tabs from '@/components/tabs';
import Thing from './thing';
import Apply from './apply';
import Management from './management';
import styles from './index.less';

const Neighborhoods = memo(() => {
  const [key, setKey] = useState('thing');

  const basicData = {
    title: '好物共享',
    tabs: [
      { title: '好物列表', code: 'thing' },
      { title: '申请列表', code: 'apply' },
      { title: '分类管理', code: 'management' },
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

    const pathName = window.location.pathname;
    changeKey(pathName);
  }, []);

  const onChange = useCallback((key) => {
    switch (key) {
      case 'thing':
        history.push('/neighborhoods/thing');
        break;
      case 'apply':
        history.push('/neighborhoods/apply');
        break;
      case 'management':
        history.push('/neighborhoods/management');
        break;
    }
    setKey(key);
  }, []);

  const renderDom = useCallback(
    (code) => {
      switch (code) {
        case 'thing':
          return <Thing />;
        case 'apply':
          return <Apply />;
        case 'management':
          return <Management />;
      }
    },
    [key],
  );

  return (
    <div className={styles.main}>
      <Tabs
        title={basicData.title}
        tabs={basicData.tabs}
        activeKey={key}
        onChange={onChange}
      >
        {renderDom(key)}
      </Tabs>
    </div>
  );
});

export default Neighborhoods;
