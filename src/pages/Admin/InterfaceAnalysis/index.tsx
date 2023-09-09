import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import React, {useEffect, useState} from 'react';
import {listInterfaceInfoByPageUsingGET} from "@/services/yuapi-backend/interfaceInfoController";
// @ts-ignore
import { Pie } from '@ant-design/plots';


/**
 * 接口分析
 * @constructor
 */
const InterfaceAnalysis: React.FC = () => {

  const [infoList, setInfoList] = useState<API.InterfaceInfo[]>([]);
  //
  useEffect(() => {
    try {
      listInterfaceInfoByPageUsingGET({
        current: 1,
        pageSize: 10,
      }).then(res => {
        if (res.data) {
          console.log(res.data.records)
          // @ts-ignore
          setInfoList(res.data.records);
        }
      })
    } catch (e: any) {

    }
  //   // todo 从远程获取数据
  }, [])
  //
  // // 映射：{ value: 1048, name: 'Search Engine' },
  const data = infoList.map(item => {
    return {
      value: item.count,
      type: item.name,
    }
  })

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };

  return (
    <PageContainer>
      <Pie {...config} />
      {/*<ReactECharts option={option} />*/}
    </PageContainer>
  );
};

export default InterfaceAnalysis;
