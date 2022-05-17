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
  Avatar,
  Grid,
} from "@nextui-org/react";
import { StyledBadge } from "./StyledBadge";
import "./Tasks.css";
import React from "react";
import ModalCreateDAO from "./common/modalCreateDAO/ModalCreateDAO";
import ModalAddNewDAO from "./common/modalAddNewDAO/ModalAddNewDAO";
import ModalDAO from "./common/daoModals/ModalDAO";

function DAOVotesReading(props) {
  const [visible, setVisible] = React.useState(false);
  const [visibleAddDAO, setVisibleAddDAO] = React.useState(false);
  const [visibleAddNewDAO, setVisibleAddNewDAO] = React.useState(false);
  const [visibleDAO, setVisibleDAO] = React.useState(false);
  function createDAOHandler() {
    setVisibleAddDAO(true);
    console.log("test");
  }

  function onAdd(id) {
    props.addDAO(id);
    closeModal();
  }

  function closeModal() {
    setVisibleAddDAO(false);
    setVisibleAddNewDAO(false);
    setVisibleDAO(false);
  }

  function createNewDAOHandler() {
    setVisibleAddNewDAO(true);
    console.log("test");
  }

  function showDAO() {
    setVisibleDAO(true);
    console.log("test");
  }

  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  const columns = [
    { name: "Votes/Proposals", uid: "vote" },
    { name: "DAO", uid: "dao" },
    { name: "Voted", uid: "voted" },
    { name: "Vote", uid: "actions" },
  ];
  const votes = [
    {
      id: 1,
      vote: "Implement Protocol",
      dao: "UniSwap",
      team: "Management",
      voted: "45/746",
      age: "29",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsuemhTEun-zByzH2wxWCo5dTjrUP8v2sbJAoajF7JmXmZcHHaQ6Za0Qk5xNldQHHp1lY&usqp=CAU",
      desc: "This task needs to be done asap...",
    },
    {
      id: 2,
      vote: "Edit Contract",
      dao: "Curve DAO",
      team: "Development",
      voted: "34/746",
      age: "25",
      avatar:
        "https://cryptoclothing.cc/merch/curve-dao-token-crv-sticker.jpg?v=022",
      desc: "Need to edit the main files so that...",
    },
    {
      id: 3,
      vote: "Change Colours",
      dao: "Maker DAO",
      team: "Development",
      voted: "567/746",
      age: "22",
      avatar:
        "https://pbs.twimg.com/profile_images/1196456510424961025/zacb-9pN_400x400.jpg",
      desc: "The colours don't fit the design.",
    },
    {
      id: 4,
      vote: "Edit UI",
      dao: "UniSwap",
      team: "Marketing",
      voted: "03/746",
      age: "28",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsuemhTEun-zByzH2wxWCo5dTjrUP8v2sbJAoajF7JmXmZcHHaQ6Za0Qk5xNldQHHp1lY&usqp=CAU",
      desc: "Users are having trouble finding the right...",
    },
    {
      id: 5,
      vote: "Fix Bug",
      dao: "Maker DAO",
      team: "Sales",
      voted: "89/746",
      age: "24",
      avatar:
        "https://pbs.twimg.com/profile_images/1196456510424961025/zacb-9pN_400x400.jpg",
      desc: "Critical bug in the login component.",
    },
    {
      id: 6,
      vote: "Fix Bug",
      dao: "Maker DAO",
      team: "Sales",
      voted: "676/746",
      age: "24",
      avatar:
        "https://pbs.twimg.com/profile_images/1196456510424961025/zacb-9pN_400x400.jpg",
      desc: "Critical bug in the login component.",
    },
    {
      id: 7,
      vote: "Fix Bug",
      dao: "Maker DAO",
      team: "Sales",
      voted: "743/746",
      age: "24",
      avatar:
        "https://pbs.twimg.com/profile_images/1196456510424961025/zacb-9pN_400x400.jpg",
      desc: "Critical bug in the login component.",
    },
    {
      id: 8,
      vote: "Fix Bug",
      dao: "Maker DAO",
      team: "Sales",
      voted: "43/746",
      age: "24",
      avatar:
        "https://pbs.twimg.com/profile_images/1196456510424961025/zacb-9pN_400x400.jpg",
      desc: "Critical bug in the login component.",
    },
    {
      id: 9,
      vote: "Fix Bug",
      dao: "Maker DAO",
      team: "Sales",
      voted: "88/746",
      age: "24",
      avatar:
        "https://pbs.twimg.com/profile_images/1196456510424961025/zacb-9pN_400x400.jpg",
      desc: "Critical bug in the login component.",
    },
    {
      id: 10,
      vote: "Fix Bug",
      dao: "Maker DAO",
      team: "Sales",
      voted: "332/746",
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
    <Container gap={1}>
      <Grid.Container gap={4}>
        <Grid>
          <Avatar
            size="xl"
            src="https://cryptoclothing.cc/merch/curve-dao-token-crv-sticker.jpg?v=022"
            zoomed
            bordered
            color="gradient"
            onClick={showDAO}
          />
        </Grid>
        <Grid>
          <Avatar
            size="xl"
            src="https://cryptologos.cc/logos/uniswap-uni-logo.svg?v=022"
            zoomed
            bordered
            color="gradient"
            onClick={showDAO}
          />
        </Grid>
        <Grid>
          <Avatar
            size="xl"
            src="https://cryptologos.cc/logos/maker-mkr-logo.svg?v=022"
            zoomed
            bordered
            color="gradient"
            onClick={showDAO}
          />
        </Grid>
        <Grid>
          <Avatar
            size="xl"
            src="https://upload.wikimedia.org/wikipedia/commons/a/ad/The-dao-logo.png"
            zoomed
            bordered
            color="gradient"
            onClick={showDAO}
          />
        </Grid>
        <Grid>
          <Avatar
            size="xl"
            src="https://cryptologos.cc/logos/balancer-bal-logo.svg?v=022"
            zoomed
            bordered
            color="gradient"
            onClick={showDAO}
          />
        </Grid>
        <Grid>
          <Avatar
            size="xl"
            src="https://cryptologos.cc/logos/0x-zrx-logo.svg?v=022"
            zoomed
            bordered
            color="gradient"
            onClick={showDAO}
          />
        </Grid>
        <Grid>
          <Avatar
            size="xl"
            src="https://www.sushi.com/_next/static/media/logo.d019d88b.png"
            zoomed
            bordered
            color="gradient"
            onClick={showDAO}
          />
        </Grid>
        {visibleDAO && (
          <ModalDAO id={props.id} open={visibleDAO} onClose={closeModal} />
        )}
        <Grid.Container justify="right">
          <Button.Group color="secondary" ghost>
            <Button onClick={createDAOHandler}>Add a DAO</Button>
            <Button onClick={createNewDAOHandler}>Join a DAO</Button>
            {visibleAddDAO && (
              <ModalCreateDAO
                id={props.id}
                open={visibleAddDAO}
                onClose={closeModal}
              />
            )}
            {visibleAddNewDAO && (
              <ModalAddNewDAO
                id={props.id}
                open={visibleAddNewDAO}
                onClose={closeModal}
              />
            )}
          </Button.Group>
        </Grid.Container>
      </Grid.Container>
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
            <Text h3>Votes:</Text>
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
            <Table.Body items={votes}>
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
              rowsPerPage={6}
              onPageChange={(page) => console.log({ page })}
            />
          </Table>
        </Col>

        <Col span={6}>
          <Text h3>Proposals:</Text>
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
            <Table.Body items={votes}>
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
              rowsPerPage={6}
              onPageChange={(page) => console.log({ page })}
            />
          </Table>
        </Col>
      </Row>
      <Row css={{ paddingBottom: 16 }} gap={1}>
        <Col span={12}>
          <Row>
            <Text h3>Weekly Reading:</Text>
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
            <Table.Body items={votes}>
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
              rowsPerPage={6}
              onPageChange={(page) => console.log({ page })}
            />
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
export default DAOVotesReading;
