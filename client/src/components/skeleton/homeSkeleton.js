import React from "react";
import { Skeleton, Row, Col, Layout, List, Avatar } from "antd";

const { Sider, Content } = Layout;

const ShowSkeleton = ({ isLoading, numSkeletons = 40, columnsPerRow = 4 }) => {
  const colSpan = 24 / columnsPerRow;

  const skeletonGrid = Array.from({ length: numSkeletons }, (_, index) => (
    <Col key={index} span={colSpan}>
      <Skeleton loading={isLoading} active>
        <div style={{ marginBottom: 16 }}>Content</div>
      </Skeleton>
    </Col>
  ));

  const listData = Array.from({ length: 3 }).map((_, i) => ({
    href: "https://ant.design",
    title: `ant design part ${i + 1}`,
    avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  }));

  return (
    <Layout>
      <Sider width={300} style={{ background: "#fff" }}>
        <Skeleton loading={isLoading} active avatar>
          <List
            itemLayout="horizontal"
            dataSource={listData}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<a href={item.href}>{item.title}</a>}
                  description={item.description}
                />
                {item.content}
              </List.Item>
            )}
          />
        </Skeleton>
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content
          style={{ background: "#fff", padding: 24, margin: 0, minHeight: 280 }}
        >
          <Row gutter={[16, 16]}>{skeletonGrid}</Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ShowSkeleton;
