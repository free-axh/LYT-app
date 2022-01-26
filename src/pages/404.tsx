import { Result } from 'antd';
import React from 'react';

const NoFoundPage: React.FC = () => {
  return <Result status="404" title="404" subTitle="抱歉，您的页面已丢失" />;
};

export default NoFoundPage;
