import { Card, Grid, Row, Text } from "@nextui-org/react";

export default function App() {
  const listPrices = [
    {
      title: "Total Portfolio:",
      price: "$27,234.50",
      increase: "2.17%",
      arrow: "⬆",
    },
    {
      title: "Maker DAO",
      price: "$1,596.14",
      increase: "+12.67%",
      arrow: "⬇",
    },
    {
      title: "Curve DAO",
      price: "$2.441",
      increase: "+8.932%",
      arrow: "⬆",
    },
    {
      title: "Ox DAO",
      price: "$0.8181",
      increase: "+22.692%",
      arrow: "⬆",
    },
  ];
  const listTasksPending = [
    {
      id: 1,
      task: "Implement Protocol",
      dao: "UniSwap",
      team: "Management",
      status: "active",
      age: "29",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsuemhTEun-zByzH2wxWCo5dTjrUP8v2sbJAoajF7JmXmZcHHaQ6Za0Qk5xNldQHHp1lY&usqp=CAU",
      desc: "This task needs to be done asap...",
    },
    {
      id: 2,
      task: "Edit Contract",
      dao: "Curve DAO",
      team: "Development",
      status: "paused",
      age: "25",
      avatar:
        "https://cryptoclothing.cc/merch/curve-dao-token-crv-sticker.jpg?v=022",
      desc: "Need to edit the main files so that...",
    },
    {
      id: 3,
      task: "Change Colours",
      dao: "Maker DAO",
      team: "Development",
      status: "active",
      age: "22",
      avatar:
        "https://pbs.twimg.com/profile_images/1196456510424961025/zacb-9pN_400x400.jpg",
      desc: "The colours don't fit the design.",
    },
  ];

  return (
    <Grid.Container gap={2} justify="flex-start">
      {listPrices.map((item, index) => (
        <Grid xs={6} sm={3} key={index}>
          <Card color="gradient">
            <Row wrap="wrap" justify="space-between">
              <Text b color="white">
                {item.title}
              </Text>
            </Row>
            <Row wrap="wrap" justify="space-between">
              <Text size={45} b color="white">
                {item.price}
              </Text>
            </Row>
            <Card.Footer justify="flex-start">
              <Row wrap="wrap" justify="space-between">
                <Text b color="white">
                  {item.increase}
                </Text>
                <Text
                  color="white"
                  css={{ color: "$accents4", fontWeight: "$semibold" }}
                >
                  {item.arrow}
                </Text>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      ))}
      <Row>
        <Text h3>Pending Tasks:</Text>
      </Row>
      {listTasksPending.map((item, index) => (
        <Grid xs={6} sm={3} key={index}>
          <Card color="gradient">
            <Row wrap="wrap" justify="space-between">
              <Text b color="white">
                {item.id}
              </Text>
            </Row>
            <Row wrap="wrap" justify="space-between">
              <Text size={32} b color="white">
                {item.task}
              </Text>
            </Row>
            <Card.Footer justify="flex-start">
              <Row wrap="wrap" justify="space-between">
                <Text b color="white">
                  {item.desc}
                </Text>
                <Text
                  color="white"
                  css={{ color: "$accents4", fontWeight: "$semibold" }}
                >
                  {item.dao}
                </Text>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      ))}
      <Row>
        <Text h3>Review Tasks:</Text>
      </Row>
      {listTasksPending.map((item, index) => (
        <Grid xs={6} sm={3} key={index}>
          <Card color="gradient">
            <Row wrap="wrap" justify="space-between">
              <Text b color="white">
                {item.id}
              </Text>
            </Row>
            <Row wrap="wrap" justify="space-between">
              <Text size={32} b color="white">
                {item.task}
              </Text>
            </Row>
            <Card.Footer justify="flex-start">
              <Row wrap="wrap" justify="space-between">
                <Text b color="white">
                  {item.desc}
                </Text>
                <Text
                  color="white"
                  css={{ color: "$accents4", fontWeight: "$semibold" }}
                >
                  {item.dao}
                </Text>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      ))}
    </Grid.Container>
  );
}
