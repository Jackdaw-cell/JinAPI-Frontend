import { PageContainer } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import {
  Layout,
  message,
  Space,
  Cascader,
  Form,
  Input,
  Select,
  Upload,} from 'antd';
import {getLoginUserDetailUsingGET, getLoginUserUsingGET} from "@/services/jackdawAPI-backend/userController";

type loginUserDetail={
  id: string;
  userName: string;
  userAvatar: string;
  userProfile: string;
  userRole: string;
  createTime: string;
  updateTime: string;
  accessKey?: string;
  secretKey?: string;
  count?: number;
}
//样式
const { Sider, Content } = Layout;
const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#3ba0e9',
};
/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {
  const [currentUser, setcurrentUser] = useState<loginUserDetail>();
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const loadData = async (current = 1, pageSize = 5) => {

    try {
      const msg = await getLoginUserDetailUsingGET();
      if (msg.code==0) {
        setcurrentUser(msg.data)
        console.log(currentUser)

        }
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);


  return (

    <PageContainer title="个人信息">
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <Layout>
          <Layout hasSider>
            <Content>
              <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
              >
                <Form.Item label="用户名">
                  <Input readOnly value={currentUser?.userName}/>
                </Form.Item>
                <Form.Item label="AccessKey">
                  <Input readOnly value={currentUser?.accessKey}/>
                </Form.Item>
                <Form.Item label="SercretKet">
                  <Input readOnly value={currentUser?.secretKey}/>
                </Form.Item>
                <Form.Item label="剩余调用次数">
                  {currentUser?.count}
                </Form.Item>
              </Form>
            </Content>
          </Layout>
        </Layout>
      </Space>
    </PageContainer>
  );
};

export default Index;
