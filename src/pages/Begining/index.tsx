import { PageContainer } from '@ant-design/pro-components';
import {Card,Typography, Col, Descriptions, Row, Tabs, TabsProps} from 'antd';
import React, {ReactNode, useEffect} from 'react';
import Button from "@mui/material/Button";
import CodeEditor from "@uiw/react-textarea-code-editor";
const { Title, Paragraph, Text, Link } = Typography;
const codeText1= " <dependency>\n" +
      "            <groupId>io.github.jackdaw-cell</groupId>\n" +
      "            <artifactId>jackdawapi-sdk</artifactId>\n" +
      "            <version>0.0.3</version>\n" +
      "        </dependency>\n" +
      "        <dependency>\n" +
      "            <groupId>io.github.jackdaw-cell</groupId>\n" +
      "            <artifactId>jackdawapi-common</artifactId>\n" +
      "            <version>0.0.1</version>\n" +
      "        </dependency>\n" +
      "        <dependency>"
const codeText2= "jackdaw:\n" +
      "  openai:\n" +
      "    api-key: 你的OpenAIPkey，详细获取访问【https://platform.openai.com/】\n" +
      "    api-host: OpenAI官方网站：https://api.openai.com/\n" +
      "    proxy-host-name: 访问互联网的IP地址\n" +
      "    proxy-port: 网络代理端口\n" +
      "  api:\n" +
      "    access-key: 个人的accesskey\n" +
      "    secret-key: 个人的secretKey"
const codeText3="@Resource\n" +
      "    private JackdawApiClient jackdawApiClient;\n" +
      "\n" +
      "    @Resource\n" +
      "    private JackdawOpenAiClient jackdawOpenAiClient;"
const codeText4="public BaseResponse<Object> TestGetSDK() {\n" +
      "       String userRequestParams=\"{\"number\":\"114514\"}\";\n" +
      "        String bodyJson = JSONUtil.toJsonStr(userRequestParams);\n" +
      "        String url = \"/user/number\";\n" +
      "        return jackdawApiClient.getRequest(bodyJson, url);\n" +
      "    }"

const codeText5="public BaseResponse<Object> invokeInterfaceYvCongMingInfoByPostSDK() {\n"+
      "       String userRequestParams=\"{\"accessKey\":\"m3myozewahwadx4gvdjxnjrmm3c3k4f0\",\"secretKey\":\"6xw04z98gjuq1gv5qhtnsr951pxmitou\",\"modelId\":1651468516836098050,\"message\":\"浮夸\"}\"\n"+
      "       String bodyJson = JSONUtil.toJsonStr(userRequestParams);\n"+
      "       String url = \"/yucongming/chat\";\n"+
      "       return jackdawApiClient.postRequest(bodyJson, url);\n"+
      "       }"
/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {

  const onChange = (key: string) => {
    console.log(key);
  };
  const Tab1: ReactNode = () =>{
    return(
      <Card>
        <p>以下是安装 [JinOpenAPI开放平台] 示例项目的步骤：</p>
        <ol>
          <li>克隆项目：在命令行中执行 <code>git clone [示例项目仓库链接]</code></li>
          <li>导入项目：使用您喜欢的 IDE 导入已克隆的项目</li>
          <li>配置 API 访问凭证：在配置文件中添加您的 API 访问凭证</li>
          <li>构建项目：执行 <code>mvn clean install</code> 构建项目</li>
        </ol>
      </Card>);
  }
  const Tab2: ReactNode = () =>{
    const [codeTextMaven, setCodeTextMaven] = React.useState(codeText1);
    const [codeTextConfig, setCodeTextConfig] = React.useState(codeText2);
    const [codeTextBean, setCodeTextBean] = React.useState(codeText3);
    const [codeTextUsingGET, setCodeTextUsing] = React.useState(codeText4);
    const [codeTextUsingPOST, setcodeTextUsingPOST] = React.useState(codeText5);

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
