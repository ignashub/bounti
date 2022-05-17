import {
  Table,
  Row,
  Container,
  Col,
  Tooltip,
  User,
  Text,
  Spacer,
  Button,
  Modal,
  Grid,
  Card,
  Avatar,
} from "@nextui-org/react";
import { StyledBadge } from "./StyledBadge";
import "./Tasks.css";
import React from "react";
import ModalDAO from "./common/daoModals/ModalDAO";

function DAOVotesReading(props) {
  const [visible, setVisible] = React.useState(false);
  const [visibleDAO, setVisibleDAO] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  function showDAO() {
    setVisibleDAO(true);
    console.log("test");
  }
  function closeModal() {
    setVisibleDAO(false);
  }
  const listPrices = [
    {
      title: "Total Portfolio:",
      price: "$27,234.50",
      increase: "2.17%",
      arrow: "⬆",
      avatar:
        "https://icon-library.com/images/investment-icon/investment-icon-11.jpg",
    },
    {
      title: "Maker DAO",
      price: "$1,596.14",
      increase: "+12.67%",
      arrow: "⬇",
      avatar: "https://cryptologos.cc/logos/maker-mkr-logo.svg?v=022",
    },
    {
      title: "Curve DAO",
      price: "$2.441",
      increase: "+8.932%",
      arrow: "⬆",
      avatar:
        "https://cryptoclothing.cc/merch/curve-dao-token-crv-sticker.jpg?v=022",
    },
    {
      title: "Ox DAO",
      price: "$0.8181",
      increase: "+22.692%",
      arrow: "⬆",
      avatar: "https://cryptologos.cc/logos/0x-zrx-logo.svg?v=022",
    },
  ];
  const columns = [
    { name: "TASK", uid: "task" },
    { name: "DAO", uid: "dao" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];
  const tasks = [
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
    {
      id: 4,
      task: "Edit UI",
      dao: "UniSwap",
      team: "Marketing",
      status: "review",
      age: "28",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsuemhTEun-zByzH2wxWCo5dTjrUP8v2sbJAoajF7JmXmZcHHaQ6Za0Qk5xNldQHHp1lY&usqp=CAU",
      desc: "Users are having trouble finding the right...",
    },
    {
      id: 5,
      task: "Fix Bug",
      dao: "Maker DAO",
      team: "Sales",
      status: "active",
      age: "24",
      avatar:
        "https://pbs.twimg.com/profile_images/1196456510424961025/zacb-9pN_400x400.jpg",
      desc: "Critical bug in the login component.",
    },
    {
      id: 6,
      task: "Fix Bug",
      dao: "Maker DAO",
      team: "Sales",
      status: "active",
      age: "24",
      avatar:
        "https://pbs.twimg.com/profile_images/1196456510424961025/zacb-9pN_400x400.jpg",
      desc: "Critical bug in the login component.",
    },
    {
      id: 7,
      task: "Fix Bug",
      dao: "Maker DAO",
      team: "Sales",
      status: "active",
      age: "24",
      avatar:
        "https://pbs.twimg.com/profile_images/1196456510424961025/zacb-9pN_400x400.jpg",
      desc: "Critical bug in the login component.",
    },
    {
      id: 8,
      task: "Fix Bug",
      dao: "Maker DAO",
      team: "Sales",
      status: "active",
      age: "24",
      avatar:
        "https://pbs.twimg.com/profile_images/1196456510424961025/zacb-9pN_400x400.jpg",
      desc: "Critical bug in the login component.",
    },
    {
      id: 9,
      task: "Fix Bug",
      dao: "Maker DAO",
      team: "Sales",
      status: "active",
      age: "24",
      avatar:
        "https://pbs.twimg.com/profile_images/1196456510424961025/zacb-9pN_400x400.jpg",
      desc: "Critical bug in the login component.",
    },
    {
      id: 10,
      task: "Fix Bug",
      dao: "Maker DAO",
      team: "Sales",
      status: "active",
      age: "24",
      avatar:
        "https://pbs.twimg.com/profile_images/1196456510424961025/zacb-9pN_400x400.jpg",
      desc: "Critical bug in the login component.",
    },
  ];

  const renderCell = (vote, columnKey) => {
    const cellValue = vote[columnKey];
    switch (columnKey) {
      case "task":
        return (
          <Col css={{ paddingLeft: 0 }}>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {cellValue}
              </Text>
            </Row>
            <Row>
              <Text small i weight="light">
                Task description
              </Text>
            </Row>
          </Col>
        );
      case "dao":
        return (
          <Col css={{ paddingLeft: 0 }}>
            <Row>
              <User
                squared
                src={vote.avatar}
                name={cellValue}
                css={{ p: 0 }}
              ></User>
            </Row>
          </Col>
        );
      case "status":
        return <StyledBadge type={vote.status}>{cellValue}</StyledBadge>;

      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Spacer x={1} />
              <Tooltip
                content="See task details"
                color="error"
                onClick={() => console.log("Open more info", vote.id)}
              >
                <Button size="sm" color="secondary" onClick={handler}>
                  More Info
                </Button>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };
  return (
    <Grid.Container gap={2} justify="flex-start">
      {listPrices.map((item, index) => (
        <Grid xs={6} sm={3} key={index}>
          <Card color="gradient">
            <Row wrap="wrap" justify="space-between">
              <Text b color="white">
                {item.title}
              </Text>
              <Avatar
                size="xl"
                src={item.avatar}
                zoomed
                bordered
                color="gradient"
                onClick={showDAO}
              />
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
      {visibleDAO && (
        <ModalDAO id={props.id} open={visibleDAO} onClose={closeModal} />
      )}
      <Container gap={1}>
        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={visible}
          onClose={closeHandler}
          blur
        >
          <Modal.Header>
            <Text id="modal-title" b size={18}>
              Develop Notification services for MakerDAOs dApp
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Text id="modal-title" b size={18}>
              Description:
              <Text>
                The follwoing task requires the workers to further develop the
                Push Notification services for the MakerDAO dApp.
              </Text>
            </Text>
            <Text id="modal-title" b size={18}>
              Details:
              <Text>Using EPNS, React, Sol, etc...</Text>
            </Text>
            <Text id="modal-title" b size={18}>
              Owner:
              <Text>johnster.eth</Text>
            </Text>
            <Text id="modal-title" b size={18}>
              Workers:
              <Text>crazyziu.eth, rx73.eth, hazza.eth</Text>
            </Text>
            <Text id="modal-title" b size={18}>
              Reviewers:
              <Text>Pending...</Text>
            </Text>
            <Text id="modal-title" b size={18}>
              Status:
              <Text>Waiting for Review...</Text>
            </Text>
            <Text id="modal-title" b size={18}>
              Reward:
              <Text>250 CRV & 50 BTI</Text>
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onClick={closeHandler}>
              Close
            </Button>
            <Button auto onClick={closeHandler}>
              Sign in
            </Button>
          </Modal.Footer>
        </Modal>
        <Row css={{ paddingBottom: 16 }} gap={1}>
          <Col span={6}>
            <Row>
              <Text h3>Urgent Tasks:</Text>
            </Row>
            <Table
              aria-label="Example table with custom cells"
              css={{
                height: "auto",
                minWidth: "100%",
              }}
              selectionMode="single"
            >
              <Table.Header columns={columns}>
                {(column) => (
                  <Table.Column
                    key={column.uid}
                    hideHeader={column.uid === "actions"}
                    align={column.uid === "actions" ? "center" : "start"}
                  >
                    {column.name}
                  </Table.Column>
                )}
              </Table.Header>
              <Table.Body items={tasks}>
                {(item) => (
                  <Table.Row>
                    {(columnKey) => (
                      <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                    )}
                  </Table.Row>
                )}
              </Table.Body>
              <Table.Pagination
                shadow
                noMargin
                align="center"
                rowsPerPage={7}
                onPageChange={(page) => console.log({ page })}
              />
            </Table>
          </Col>

          <Col span={6}>
            <Text h3>Review Tasks:</Text>
            <Table
              aria-label="Example table with custom cells"
              css={{
                height: "auto",
                minWidth: "100%",
              }}
              selectionMode="single"
            >
              <Table.Header columns={columns}>
                {(column) => (
                  <Table.Column
                    key={column.uid}
                    hideHeader={column.uid === "actions"}
                    align={column.uid === "actions" ? "center" : "start"}
                  >
                    {column.name}
                  </Table.Column>
                )}
              </Table.Header>
              <Table.Body items={tasks}>
                {(item) => (
                  <Table.Row>
                    {(columnKey) => (
                      <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                    )}
                  </Table.Row>
                )}
              </Table.Body>
              <Table.Pagination
                shadow
                noMargin
                align="center"
                rowsPerPage={7}
                onPageChange={(page) => console.log({ page })}
              />
            </Table>
          </Col>
        </Row>
      </Container>
    </Grid.Container>
  );
}
export default DAOVotesReading;
