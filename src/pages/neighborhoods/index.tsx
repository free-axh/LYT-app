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
  const [height, setHeight] = useState<string | number>(0);

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

    const path = window.location.hash.replace('#', '');

    changeKey(path);
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
    <div id="tableContent" style={{ background: '#f0f2f5' }}>
      <div style={{ height: '100%', padding: '33px 17px' }}>
        <Tabs
          title={basicData.title}
          tabs={basicData.tabs}
          activeKey={key}
          onChange={onChange}
        >
          {renderDom(key)}
        </Tabs>
      </div>
    </div>
  );
});

export default Neighborhoods;
