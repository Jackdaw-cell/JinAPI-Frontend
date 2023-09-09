import { PageContainer } from '@ant-design/pro-components';
import {Card,Typography, Col, Descriptions, Row, Tabs, TabsProps} from 'antd';
import React, {ReactNode, useEffect} from 'react';
import Button from "@mui/material/Button";
import CodeEditor from "@uiw/react-textarea-code-editor";
const { Title, Paragraph, Text, Link } = Typography;
//导入依赖代码
const codeText1= " <dependency>\n" +
      "            <groupId>io.github.jackdaw-cell</groupId>\n" +
      "            <artifactId>jackdawapi-sdk</artifactId>\n" +
      "            <version>0.0.7</version>\n" +
      "        </dependency>\n" +
      "        <dependency>\n" +
      "            <groupId>io.github.jackdaw-cell</groupId>\n" +
      "            <artifactId>jackdawapi-common</artifactId>\n" +
      "            <version>0.0.1</version>\n" +
      "        </dependency>\n" +
      "        <dependency>"
//yml配置代码
const codeText2= "jackdaw:\n" +
      "  api:\n" +
      "    access-key: 个人的accesskey\n" +
      "    secret-key: 个人的secretKey"
//依赖注入代码
const codeText3="@Resource\n" +
      "    private JackdawApiClient jackdawApiClient;\n" +
      "\n" +
      "    @Resource\n" +
      "    private JackdawOpenAiClient jackdawOpenAiClient;"
//方法调用GET代码
const codeText4="public BaseResponse<Object> TestGetSDK() {\n" +
      "       String userRequestParams=\"{\"number\":\"114514\"}\";\n" +
      "        String bodyJson = JSONUtil.toJsonStr(userRequestParams);\n" +
      "        String url = \"/user/number\";\n" +
      "        return jackdawApiClient.getRequest(bodyJson, url);\n" +
      "    }"
//方法调用POST请求代码
const codeText5="public BaseResponse<Object> TestPostSDK() {\n"+
      "       String userRequestParams=\"{\"accessKey\":\"m3myozewahwadx4gvdjxnjrmm3c3k4f0\",\"secretKey\":\"6xw04z98gjuq1gv5qhtnsr951pxmitou\",\"modelId\":1651468516836098050,\"message\":\"浮夸\"}\"\n"+
      "       String bodyJson = JSONUtil.toJsonStr(userRequestParams);\n"+
      "       String url = \"/yucongming/chat\";\n"+
      "       return jackdawApiClient.postRequest(bodyJson, url);\n"+
      "       }"

//OpenAI服务
const codeText6= `jackdaw:
  openai:
  api-key: 您的OpenKey【详细请前往https://api.openai.com获取】
  api-host: https://api.openai.com/
  proxy-host-name: 您的网络代理地址
  proxy-port: 网络代理服务器服务端口`
//OpenAI服务
const codeText7=`
@Resource
private JackdawOpenAiClient jackdawOpenAiClient;`
//OpenAI服务
const codeText8= `
@PostMapping("/CreateSSE")
public SseEmitter invokeInterfaceInfoByCreateSseSDK() {
    return jackdawOpenAiClient.createConnect();
}
@PostMapping("/SSEChat")
public ChatResponse invokeInterfaceInfoBySseChatSDK() {
  ChatRequest chatRequest=new ChatRequest();
  chatRequest.setMsg("你好吗？");
  return jackdawOpenAiClient.sseChat( chatRequest);
}`



const codeText9= `//编写JS代码如下并且运行,创建SSE连接
    eventSource = new EventSourcePolyfill('http://您的服务IP地址/api/CreateSSE');
    eventSource.onopen = () => { console.log("SSE连接建立")};
    eventSource.onmessage = (event) => { console.log("ChatGPT助手说：",event) };
    eventSource.onerror = () => {console.log("SSE连接关闭")event.target.close();};`

const codeText10= `fetch('http://你的服务启动IP地址:端口/SSEChat', {
        method: 'POST',
        body: '你好吗？',
        headers: {
          Accept: 'application/json',
          charset: 'UTF-8',
          'Content-Type': 'application/json;charset=UTF-8',
          'dataType': 'json',
        },
      });`
const codeText11=`curl http://111.230.23.40:8101/api/interfaceInfo/invokeByGet \\
  -H "Content-Type: application/json" \\
  -H "Cookie: JSESSIONID=您登录的SESSION" \\
  -d '{
      "connectType": 0,
      "id": 23,
      "userRequestParams": "{\\"number\\":\\"114514\\"}"
    }'
`
const codeText12=`{"code":0,"data":"3614bac671f580764ffcdf774600d24860042b7d51a37bf1cfa752b5a9146a36","message":"ok"}`
/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {

  const onChange = (key: string) => {
    console.log(key);
  };
  const Tab1: ReactNode = () =>{
    const [codeTextCurl,setCodeTextCurl ] = React.useState(codeText11);
    const [codeTextResponse,setCodeTextResponse ] = React.useState(codeText12);
    return(
      <Card>
        <p>以下是利用发送http请求调用开放接口的步骤：</p>
        <ol>
          <li>发送请求<CodeEditor
            value={codeTextCurl}
            language="xml"
            placeholder="Please enter JS code."
            onChange={(evn) => setCodeTextCurl(evn.target.value)}
            readOnly={true}
            padding={15}
            style={{
              fontSize: 12,
              backgroundColor: "#f5f5f5",
              fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
          /></li>
          <li>响应示例如下：<CodeEditor
            value={codeTextResponse}
            language="xml"
            placeholder="Please enter JS code."
            onChange={(evn) => setCodeTextResponse(evn.target.value)}
            readOnly={true}
            padding={15}
            style={{
              fontSize: 12,
              backgroundColor: "#f5f5f5",
              fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
          /></li>
        </ol>
      </Card>);
  }
  const Tab2: ReactNode = () =>{
    const [codeTextMaven, setCodeTextMaven] = React.useState(codeText1);
    const [codeTextConfig, setCodeTextConfig] = React.useState(codeText2);
    const [codeTextBean] = React.useState(codeText3);
    const [codeTextUsingGET] = React.useState(codeText4);
    const [codeTextUsingPOST] = React.useState(codeText5);

    return(
      <Card>
          <p>本平台安装教程默认您已经有Spring项目开发经验,以下将基于SpringBoot项目引入 [JinOpenAPI开放平台] 示例项目的步骤：</p>
          <ol>
            <li>在Maven项目里面导入平台的依赖
              <CodeEditor
                value={codeTextMaven}
                language="xml"
                placeholder="Please enter JS code."
                onChange={(evn) => setCodeTextMaven(evn.target.value)}
                readOnly={true}
                padding={15}
                style={{
                  fontSize: 12,
                  backgroundColor: "#f5f5f5",
                  fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                }}
              /></li>
            <li>在配置文件添加JinOpenAPI的配置
              <CodeEditor
                value={codeTextConfig}
                language="xml"
                placeholder="Please enter JS code."
                onChange={(evn) => setCodeTextConfig(evn.target.value)}
                readOnly={true}
                padding={15}
                style={{
                  fontSize: 12,
                  backgroundColor: "#f5f5f5",
                  fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                }}
              /></li>
            <li>依赖注入
              <CodeEditor
                value={codeTextBean}
                language="xml"
                placeholder="Please enter JS code."
                onChange={(evn) => setCodeTextConfig(evn.target.value)}
                readOnly={true}
                padding={15}
                style={{
                  fontSize: 12,
                  backgroundColor: "#f5f5f5",
                  fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                }}
              /></li>

            <li>
              使用发送GET请求
              <CodeEditor
                value={codeTextUsingGET}
                language="xml"
                placeholder="Please enter JS code."
                onChange={(evn) => setCodeTextConfig(evn.target.value)}
                readOnly={true}
                padding={15}
                style={{
                  fontSize: 12,
                  backgroundColor: "#f5f5f5",
                  fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                }}
              />
            </li>
            <li>
              使用发送POST请求
              <CodeEditor
                value={codeTextUsingPOST}
                language="xml"
                placeholder="Please enter JS code."
                onChange={(evn) => setCodeTextConfig(evn.target.value)}
                readOnly={true}
                padding={15}
                style={{
                  fontSize: 12,
                  backgroundColor: "#f5f5f5",
                  fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                }}
              />
            </li>
          </ol>
      </Card>);
  }
  const Tab3: ReactNode = () =>{
    const [codeTextCreateConfig,setCodeTextCreateConfig ] = React.useState(codeText6);
    const [codeTextCreateBean,setCodeTextCreateBean ] = React.useState(codeText7);
    const [codeTextCreateSSE,setCodeTextCreateSSE ] = React.useState(codeText8);
    const [codeTextCreateSSEFront,setCodeTextCreateSSEFront ] = React.useState(codeText9);
    const [codeTextChat,setCodeTextChat ] = React.useState(codeText10);

    return(
      <Card>
        <p>本教程基于我们的SDK调用内嵌的OpenAI服务(AI基于gpt-3.5-turbo模型)，
          本平台同样实现ChatGpt是<Text mark>『基于SSE实现长连接的对话』和『后台对话记忆』</Text>
          ，开发者可以利用API与AI畅聊</p>
        <Paragraph>
        </Paragraph>
        <ol>
          <li> 在您的Spring应用的配置文件application.yml添加如下配置：<CodeEditor
            value={codeTextCreateConfig}
            language="xml"
            placeholder="Please enter JS code."
            onChange={(evn) => setCodeTextCreateConfig(evn.target.value)}
            readOnly={true}
            padding={15}
            style={{
              fontSize: 12,
              backgroundColor: "#f5f5f5",
              fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
          /></li>
          <li> Spring应用依赖注入：<CodeEditor
            value={codeTextCreateBean}
            language="xml"
            placeholder="Please enter JS code."
            onChange={(evn) => setCodeTextCreateBean(evn.target.value)}
            readOnly={true}
            padding={15}
            style={{
              fontSize: 12,
              backgroundColor: "#f5f5f5",
              fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
          /></li>
          <li>因为本平台OpenAI服务是基于SSE长连接的，因此后端要维护长连接对话对象，发送SSE流式对话请求<CodeEditor
            value={codeTextCreateSSE}
            language="xml"
            placeholder="Please enter JS code."
            onChange={(evn) => setCodeTextCreateSSE(evn.target.value)}
            readOnly={true}
            padding={15}
            style={{
              fontSize: 12,
              backgroundColor: "#f5f5f5",
              fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
          /></li>
          <li>基于SSE长连接的后续响应将以流式响应返回，前端必须搭建SSE接收对象 <CodeEditor
            value={codeTextCreateSSEFront}
            language="xml"
            placeholder="Please enter JS code."
            onChange={(evn) => setCodeTextCreateSSEFront(evn.target.value)}
            readOnly={true}
            padding={15}
            style={{
              fontSize: 12,
              backgroundColor: "#f5f5f5",
              fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
          /></li>
          <li>前端发送单次对话请求，SSE对象eventSource会调用回调函数onmessage，在控制台输出AI返回的对话对象 <CodeEditor
            value={codeTextChat}
            language="xml"
            placeholder="Please enter JS code."
            onChange={(evn) => setCodeTextChat(evn.target.value)}
            readOnly={true}
            padding={15}
            style={{
              fontSize: 12,
              backgroundColor: "#f5f5f5",
              fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
          /></li>
        </ol>
      </Card>);
  }
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '通过请求方式调用平台接口',
      children: Tab1(),
    },
    {
      key: '2',
      label: '通过SDK调用接口',
      children: Tab2(),
    },
    {
      key: '3',
      label: '通过SDK调用OpenAI的ChatGpt服务',
      children: Tab3(),
    }
  ];
  const loadData = async (current = 1, pageSize = 5) => {

  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageContainer title="">
      <Typography>
        <Title>介绍</Title>

        <Paragraph>
          将创意转化为现实，连接您的应用与世界！

          您的创意需要一个桥梁，一个能够将您的应用与全球范围内的功能和数据连接起来的桥梁。
          JinOpenAPI正是您所需要的工具，为您提供了无限的可能性，让您的应用拥有更多的功能、更广阔的视野，以及与其他应用无与伦比的互联性。
        </Paragraph>
        <Title level={3}>为什么选择 JinOPenAPI？</Title>
        <Paragraph>
          <Text strong>强大的功能扩展</Text>：无论您的应用是什么领域，我们的API都能够为其提供丰富的功能扩展。
          从地理位置服务到人工智能，从支付处理到社交媒体集成，我们的API涵盖了各种行业，为您的应用提供所需的一切。
        </Paragraph>
        <Paragraph>
          <Text strong>灵活性与定制性</Text>：我们理解每个应用的独特性。
          因此，我们的API设计为灵活可定制，能够满足您的特定需求。您可以根据应用的需求选择功能模块，定制请求和响应格式，确保一切都完美契合。
        </Paragraph>
        <Paragraph>
          <Text strong>安全与稳定性</Text>：安全始终是我们的首要任务。我们采取最先进的安全措施，
          保护您的数据免受潜在威胁。同时，我们的API基础架构稳定可靠，确保您的应用始终保持高可用性。
        </Paragraph>

        <h2>1. 环境准备</h2>
        <p>在开始使用 JinOpenAPI 之前，请确保您已经满足以下环境要求：</p>
        <ul>
          <li>Java Development Kit (JDK) 8 或更新版本</li>
          <li>Maven 3.2 或更新版本</li>
          <li>注册此网站获取 API 访问凭证</li>
          <li>(可选)若您需要访问OpenAI对话服务，还需要设置网络代理</li>
        </ul>
        <h2>2. 使用教程</h2>

        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;

      </Typography>
    </PageContainer>
  );
};

export default Index;
