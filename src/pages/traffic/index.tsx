import { memo, useCallback, useEffect, useState } from 'react';
import { history } from 'umi';
import Tabs from '@/components/tabs';
import Register from './register';
import Information from './information';
import styles from './index.less';

const Traffic = memo(() => {
  const [key, setKey] = useState('information');
  const [height, setHeight] = useState<string | number>(0);

  const basicData = {
    title: '违停管理',
    tabs: [
      { title: '违停信息', code: 'information' },
      { title: '违停登记', code: 'register' },
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
      case 'information':
        history.push('/traffic/information');
        break;
      case 'register':
        history.push('/traffic/register');
        break;
    }
    setKey(key);
  }, []);

  const renderDom = useCallback(
    (code) => {
      switch (code) {
        case 'information':
          return <Information />;
        case 'register':
          return <Register />;
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
    <div id="tableContent" style={{ height, background: '#f0f2f5' }}>
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

export default Traffic;
