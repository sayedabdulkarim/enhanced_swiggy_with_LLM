import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  Typography,
  Row,
  Col,
  Spin,
  Tag,
  Alert,
  Collapse,
  Divider,
  Rate,
} from "antd";
import { useGetRestaurantReviewsQuery } from "../../apiSlices/ordersApiSlice";
import { skipToken } from "@reduxjs/toolkit/query/react"; // Import skipToken

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

const Dashboard = () => {
  // Access restaurant info from the correct Redux state, similar to Home.js
  const { userInfo } = useSelector((state) => state.authReducer);
  const { restaurantDetails } = useSelector((state) => state.restaurantReducer);
  const restaurantId = restaurantDetails?._id;

  // Only query when restaurantId exists using skipToken pattern
  const {
    data: reviewsData,
    isLoading: isLoadingReviews,
    error: reviewsError,
    refetch: refetchReviews,
  } = useGetRestaurantReviewsQuery(restaurantId ?? skipToken);

  useEffect(() => {
    if (restaurantId) {
      refetchReviews();
    }
  }, [restaurantId, refetchReviews]);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get sentiment tag color
  const getSentimentTagColor = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return "success";
      case "negative":
        return "error";
      default:
        return "default";
    }
  };

  // Show loading state if no restaurant details yet
  if (!restaurantDetails) {
    return (
      <div style={{ padding: "24px", textAlign: "center" }}>
        <Spin size="large" />
        <Text style={{ display: "block", marginTop: "16px" }}>
          Loading restaurant information...
        </Text>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px", marginTop: 70 }}>
      <Title level={2}>Restaurant Dashboard</Title>
      <Text>Welcome, {restaurantDetails.name}</Text>

      {/* Restaurant Reviews Section */}
      <Card
        title={<Title level={4}>Customer Reviews Analysis</Title>}
        style={{ marginBottom: 24, marginTop: 24 }}
      >
        {isLoadingReviews ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <Spin size="large" />
          </div>
        ) : reviewsError ? (
          <Alert
            message="Error"
            description={reviewsError.data?.message || reviewsError.error}
            type="error"
            showIcon
          />
        ) : !reviewsData || reviewsData.reviewsCount === 0 ? (
          <Alert
            message="No Reviews"
            description="No reviews available for analysis. Once customers provide feedback, insights will appear here."
            type="info"
            showIcon
          />
        ) : (
          <>
            <Row gutter={[24, 24]}>
              <Col xs={24} md={6}>
                <Card style={{ textAlign: "center" }}>
                  <Title level={2} style={{ color: "#1890ff" }}>
                    {reviewsData.reviewsCount}
                  </Title>
                  <Text type="secondary">Total Reviews</Text>
                </Card>
              </Col>
              <Col xs={24} md={18}>
                <Title level={5}>AI Analysis Overview</Title>
                <Card style={{ background: "#f5f5f5" }}>
                  {reviewsData.analysis
                    .split("\n")
                    .map((line, index) =>
                      line.trim() ? (
                        <Paragraph key={index}>{line}</Paragraph>
                      ) : (
                        <div key={index} style={{ height: "10px" }} />
                      )
                    )}
                </Card>
              </Col>
            </Row>

            <Divider />

            <Title level={5}>Individual Reviews</Title>
            <Collapse ghost style={{ marginTop: 16 }}>
              {reviewsData.reviews.map((review, index) => (
                <Panel
                  key={index}
                  header={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <Tag color={getSentimentTagColor(review.sentiment)}>
                          {review.sentiment}
                        </Tag>{" "}
                        {review.review?.substring(0, 50)}...
                      </div>
                      <div style={{ textAlign: "right", marginRight: 20 }}>
                        {review.rating ? (
                          <Rate disabled defaultValue={review.rating} />
                        ) : null}
                        <Text type="secondary" style={{ marginLeft: 8 }}>
                          {formatDate(review.createdAt)}
                        </Text>
                      </div>
                    </div>
                  }
                >
                  <Row gutter={16}>
                    <Col span={16}>
                      <Title level={5}>Customer Feedback:</Title>
                      <Paragraph>{review.review}</Paragraph>
                    </Col>
                    <Col span={8}>
                      <div
                        style={{
                          borderLeft: "1px solid #f0f0f0",
                          paddingLeft: 16,
                        }}
                      >
                        <Title level={5}>Automated Response:</Title>
                        <Paragraph type="secondary">
                          {review.llmResponse ||
                            "No automated response generated."}
                        </Paragraph>
                      </div>
                    </Col>
                  </Row>
                </Panel>
              ))}
            </Collapse>
          </>
        )}
      </Card>

      {/* Other dashboard components would go here */}
    </div>
  );
};

export default Dashboard;
