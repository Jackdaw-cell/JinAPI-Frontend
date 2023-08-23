import {PageContainer} from '@ant-design/pro-components';
import React, {useEffect} from 'react';
import { message} from 'antd';
import StepperContent from '@/components/StepperContent';
import {
  getInterfaceInfoByIdUsingGET,
} from '@/services/yuapi-backend/interfaceInfoController';
import {useParams} from '@@/exports';
//要自行引入
// @ts-ignore
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import {getLoginUserUsingGET} from "@/services/yuapi-backend/userController";


/**
 * 主页
 * @constructor
 */

const Index: React.FC = () => {
  const params = useParams();
  getLoginUserUsingGET().then(res => {
  })

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const loadData = async () => {
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    try {
      await getInterfaceInfoByIdUsingGET({
        id: Number(params.id),
      });
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
    // setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

// @ts-ignore
  return (
    <PageContainer title="查看接口文档">
      <StepperContent />
    </PageContainer>
  );
};

export default Index;
