import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
const Footer: React.FC = () => {
  const defaultMessage = '身处于未知迷雾，探索乃指路明灯。';
  // const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={` ${defaultMessage}`}
      links={[
        {
          key: 'JackdawAPI',
          title: 'JackdawAPI',
          href: 'https://github.com/Jackdaw-cell',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/Jackdaw-cell',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
