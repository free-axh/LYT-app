import { memo, useCallback, useEffect, useState } from 'react';
import { history } from 'umi';
import Tabs from '@/components/tabs';
import DailyDiet from './dailyDiet';
import GoodsList from './goodsList';
import SortManagement from './sortManagement';
import OrderManagement from './orderManagement';

const Health = memo(() => {
  const [key, setKey] = useState('dailyDiet');

  const basicData = {
    title: '养老食堂',
    tabs: [
      { title: '每日食谱', code: 'dailyDiet' },
      { title: '商品列表', code: 'goodsList' },
      { title: '分类管理', code: 'sortManagement' },
      { title: '订单管理', code: 'orderManagement' },
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
      case 'dailyDiet':
        history.push('/health/dailyDiet');
        break;
      case 'goodsList':
        history.push('/health/goodsList');
        break;
      case 'sortManagement':
        history.push('/health/sortManagement');
        break;
      case 'orderManagement':
        history.push('/health/orderManagement');
        break;
    }
    setKey(key);
  }, []);

  const renderDom = useCallback(
    (code) => {
      switch (code) {
        case 'dailyDiet':
          return <DailyDiet />;
        case 'goodsList':
          return <GoodsList />;
        case 'sortManagement':
          return <SortManagement />;
        case 'orderManagement':
          return <OrderManagement />;
      }
    },
    [key],
  );

  return (
    <div style={{ background: '#f0f2f5' }}>
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

export default Health;
