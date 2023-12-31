import { PageContainer } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import {Button, Card, Descriptions, Form, message, Input, Divider} from 'antd';
import { Col, Row } from 'antd';
import {
  getInterfaceInfoByIdUsingGET,
  invokeInterfaceInfoByPOST,
  invokeInterfaceInfoByGET,
} from '@/services/yuapi-backend/interfaceInfoController';
import { useParams } from '@@/exports';

/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {
  const [data, setData] = useState<API.InterfaceInfo>();
  const [invokeRes, setInvokeRes] = useState<any>();
  const [invokeLoading, setInvokeLoading] = useState(false);

  const params = useParams();

  const loadData = async () => {
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    try {
      const res = await getInterfaceInfoByIdUsingGET({
        id: Number(params.id),
      });
      setData(res.data);
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onFinish = async (values: any) => {
    if (!params.id) {
      message.error('接口不存在');
      return;
    }
    setInvokeLoading(true);
    try {
      let res;
      if (data?.method=="POST"){
        res= await invokeInterfaceInfoByPOST({
          id: params.id,
          ...values,
        });
      }else {
        res= await invokeInterfaceInfoByGET({
          id: params.id,
          ...values,
        });
      }
      setInvokeRes(JSON.stringify(res));
      message.success('请求成功');
    } catch (error: any) {
      message.error('操作失败，' + error.message);
    }
    setInvokeLoading(false);
  };

  return (
    <PageContainer title="查看接口文档">
      <Row>
        <Col span={12}>
          <Card>
            {data ? (
              <Descriptions title={data.name} column={1}>
                <Descriptions.Item label="接口状态">{data.status ? '开启' : '关闭'}</Descriptions.Item>
                <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
                <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
                <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
                <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
                <Descriptions.Item label="请求参数">{data.requestParams}</Descriptions.Item>
                <Descriptions.Item label="测试请求参数">{data.testRequestParams}</Descriptions.Item>
                <Descriptions.Item label="测试响应">{data.testResponse}</Descriptions.Item>
                <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
                <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
              </Descriptions>
            ) : (
              <>接口不存在</>
            )}
          </Card>
        </Col>
        <Col span={12} >
          <Card title="在线测试">
            <Form name="invoke" layout="vertical" onFinish={onFinish}>
              <Form.Item label="请求参数" name="userRequestParams">
                {data ? (
                <Input.TextArea rows={8} placeholder={data.testRequestParams}/>
                ) : (
                  <>输入测试请求参数</>
                )}
              </Form.Item>
              <Form.Item wrapperCol={{ span: 16 }}>
                <Button type="primary" htmlType="submit">
                  调用
                </Button>
              </Form.Item>
            </Form>
          </Card>
          <Divider />
          <Card title="返回结果" loading={invokeLoading}>
            {invokeRes}
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Index;
