import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// @ts-ignore
import {  EventSourcePolyfill } from 'event-source-polyfill';
import {ReactNode} from "react/index";
import {Paper, StepContent } from '@mui/material';
import {Card, Col, Descriptions, Form, Input, message, Row} from "antd";
import CodeEditor from "@uiw/react-textarea-code-editor";
import {getLoginUserUsingGET} from "@/services/yuapi-backend/userController";
import {useState} from "react";
import {LOCALHOST} from "@/constants";

interface ModalProps {
  topNode: ReactNode;
  children: ReactNode;
  bottomNode: ReactNode;
}

const StepperContent: React.FC<ModalProps> = () => {
  // eslint-disable-next-line prefer-const
  let [text, setText] = useState<string>('');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [code, setCode] = React.useState(
    `//前端创建sse连接，编写JS代码如下并且运行
    eventSource = new EventSourcePolyfill('http://ip地址/api/interfaceInfo/invokeByCreateSse');
    eventSource.onopen = () => { //创建连接回调 };
    eventSource.onmessage = (event) => {//消息处理回调};
    eventSource.onerror = () => {event.target.close();};`
  );
  let uid: string | number | undefined;
  let sse = {};

  getLoginUserUsingGET().then(res=>{
    // @ts-ignore
    uid = res.data.id
  })

  const topNode: ReactNode = () =>{
    const data={
      name:'发送sse',
      status:'1',
      description:'建立sse连接',
      url:'/api/interfaceInfo/invokeByCreateSse',
      method:'GET',
      requestHeader:`["uid": userId,
                      Content-Type: text/event-stream,
                      Keep-Alive: timeout=60,
                      Connection: keep-alive]`,
      responseHeader: '[Content-Type: application/json]'
    }

    const createSse = async (value: any)=>{
      const eventSource = new EventSourcePolyfill(LOCALHOST + '/api/interfaceInfo/invokeByCreateSse', {
        headers: {
          "uid": uid,
        }
      });
      eventSource.onopen = (event: { target: {}; }) => {
        sse = event.target;
      };
      eventSource.onmessage = (event: { lastEventId: string; data: string; }) => {
        if (event.lastEventId == "[TOKENS]") {
          text = text + event.data.content;
          setText(text);
          setText('');
          return;
        }
        if (event.data == "[DONE]") {
          if (sse) {
            sse.close();
          }
          return;
        }
        const json_data = JSON.parse(event.data)
        if (json_data.content == null || json_data.content == 'null') {
          return;
        }
        text = text + json_data.content;
        setText(text);
      };
      eventSource.onerror = (event: { readyState: number; target: { close: () => void; }; }) => {
        console.log("错误：", event);
        if (event.readyState === EventSource.CLOSED) {
          console.log('连接关闭');
        } else {
          console.log("错误：", event);
        }
        event.target.close();
      };
    }

    const handleClick = async (values: any) => {
      try {
        if (typeof uid === "string") {
          window.localStorage.setItem("uid", uid);
        }
        await createSse(values).then(()=>{
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          handleNext();
        })
      } catch (error: any) {
        message.error('操作失败，' + error.message);
      }
    };
    // @ts-ignore
    return(<Card>
      <Row>
        <Col span={12}>
          {data ? (
            <Descriptions title={data.name} column={1}>
              <Descriptions.Item label="接口状态">{data.status ? '开启' : '关闭'}</Descriptions.Item>
              <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
              <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
              <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
              <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
              <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
            </Descriptions>
          ) : (
            <>接口不存在</>
          )}
        </Col>
        <Col span={12} >
          <Card title="在线测试">
            <Form name="invoke" layout="vertical" onFinish={handleClick} >
              <CodeEditor
                value={code}
                language="js"
                placeholder="Please enter JS code."
                onChange={(evn) => setCode(evn.target.value)}
                readOnly={true}
                padding={15}
                style={{
                  fontSize: 12,
                  backgroundColor: "#f5f5f5",
                  fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                }}
              />
              <Form.Item wrapperCol={{ span: 16 }}>
                <Button type="primary" htmlType="submit">
                  调用
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Card>);
  }

  const secondNode: ReactNode = () =>{
    const data={
      name:'发送信息',
      status:'1',
      description:'发起对话',
      url:'/api/interfaceInfo/invokeBySseChat',
      method:'POST',
      requestHeader:`['Content-Type': 'application/json;charset=UTF-8',
          'Accept': 'application/json',
          'Charset': 'UTF-8',
          'DataType': 'json',
          "uid": userId]`,
      requestParams:`{"msg": "我们来玩数字接龙怎么样，我说1你说下一位","apiKey": "你个人的OpenKey"}`,
      responseHeader:'[Content-Type: application/json]'
    }
    const chat = (body: any, options?: any)=>{
      // @ts-ignore
      return fetch(LOCALHOST + '/api/interfaceInfo/invokeBySseChat', {
        method: 'POST',
        body: body.msg,
        headers: {
          Accept: 'application/json',
          charset: 'UTF-8',
          'Content-Type': 'application/json;charset=UTF-8',
          'dataType': 'json',
          "uid": uid
        },
      });
    }
    const handleClick = async (values: any) => {
      try {
        if (typeof uid === "string") {
          window.localStorage.setItem("uid", uid);
        }
       await chat(values).then((res)=>{
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          handleNext();
        })

      } catch (error: any) {
        message.error('操作失败，' + error.message);
      }
    };
    return(<Card>
      <Row>
        <Col span={12}>
          {data ? (
            <Descriptions title={data.name} column={1}>
              <Descriptions.Item label="接口状态">{data.status ? '开启' : '关闭'}</Descriptions.Item>
              <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
              <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
              <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
              <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
              <Descriptions.Item label="请求体">{data.requestParams}</Descriptions.Item>
              <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
            </Descriptions>
          ) : (
            <>接口不存在</>
          )}
        </Col>
        <Col span={12} >
          <Card title="在线测试">
            <Form name="invoke" layout="vertical" onFinish={handleClick} >
              <Form.Item label="请求体" name="msg" rules={[{ required: true, message: '必须有请求体！！' }]}>
                <Input.TextArea rows={8} placeholder={data.requestParams}/>
              </Form.Item>
              <Form.Item wrapperCol={{ span: 16 }} >
                <Button type="primary" htmlType="submit">
                  调用
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Card>);
  }


  const thirdNode: ReactNode = () =>{
    const data={
      name:'响应SSE流式对话',
      status:'1',
      description:'ChatGpt将以SSE流式数据持续返回，直到结尾返回[DONE]表示返回完成',
    }
    const handleClick = ()=>{
      setText('');
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handleNext()
    }
    return(<Card>
      <Row>
        <Col span={12}>
          {data ? (
            <Descriptions title={data.name} column={1}>
              <Descriptions.Item label="接口状态">{data.status ? '开启' : '关闭'}</Descriptions.Item>
              <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
            </Descriptions>
          ) : (
            <>接口不存在</>
          )}
        </Col>
        <Col span={12} >
          <Card title="在线测试">
            <p>{text}</p>
          </Card>
          <Button onClick={handleClick} sx={{ mt: 1, mr: 1 }}>
            结束
          </Button>
        </Col>
      </Row>
    </Card>);
  }

  const steps = [
    {
      label: '创建Sse连接',
      description: topNode(),
    },
    {
      label: '发送对话消息',
      description: secondNode(),
    },
    {
      label: '返回消息',
      description: thirdNode(),
    },
  ];

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>一次SSE对话已结束</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            重试
          </Button>
        </Paper>
      )}
    </Box>
  );
};
export default StepperContent;
