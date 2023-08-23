import { PageContainer } from '@ant-design/pro-components';
import React, { useEffect } from 'react';


/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {

  const loadData = async (current = 1, pageSize = 5) => {

  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageContainer title="在线接口开放平台">

    </PageContainer>
  );
};

export default Index;
