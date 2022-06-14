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
} from "@nextui-org/react";
import { StyledBadge } from "./StyledBadge";
import "./Tasks.css";
import React from "react";
import ModalCreateTask from "./common/modalTasks/ModalCreateTask";
import ModalTask from "./common/modalTasks/ModalTask";
import ModalReviewTask from "./common/modalTasks/ModalReviewTask";

function Tasks(props) {
  const [visible, setVisible] = React.useState(false);
  const [visibleCreateTask, setVisibleCreateTask] = React.useState(false);
  const [visibleTask, setVisibleTask] = React.useState(false);
  const [visibleReviewTask, setVisibleReviewTask] = React.useState(false);

  function createTaskHandler() {
    setVisibleCreateTask(true);
  }

  function viewTaskHandler() {
    setVisibleTask(true);
  }

  function closeModal() {
    setVisibleTask(false);
    setVisibleCreateTask(false);
    setVisibleReviewTask(false);
  }

  function createReviewTaskHandler() {
    setVisibleReviewTask(true);
  }

  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
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













  const renderCell = (task, columnKey) => {
    const cellValue = task[columnKey];
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
                src={task.avatar}
                name={cellValue}
                css={{ p: 0 }}
              ></User>
            </Row>
          </Col>
        );
      case "status":
        return <StyledBadge type={task.status}>{cellValue}</StyledBadge>;

      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Spacer x={1} />
              <Tooltip
                content="See task details"
                color="error"
                onClick={() => console.log("Open more info", task.id)}
              >
                <Button size="sm" color="secondary" onClick={viewTaskHandler}>
                  More Info
                </Button>
                {visibleTask && (
                  <ModalTask
                    id={props.id}
                    open={visibleTask}
                    onClose={closeModal}
                  />
                )}
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };
  return (
    <Container gap={0}>
      <Grid.Container justify="right">
        <Button.Group color="secondary" ghost>
          <Button onClick={createTaskHandler}>Create a Task</Button>
          <Button onClick={createReviewTaskHandler}>Review a Task</Button>
          {visibleCreateTask && (
            <ModalCreateTask
              id={props.id}
              open={visibleCreateTask}
              onClose={closeModal}
            />
          )}
          {visibleReviewTask && (
            <ModalReviewTask
              id={props.id}
              open={visibleReviewTask}
              onClose={closeModal}
            />
          )}
        </Button.Group>
      </Grid.Container>
      <Row css={{ paddingBottom: 16 }} gap={1}>
        <Col span={6}>
          <Row>
            <Text h3>New Tasks:</Text>
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
              rowsPerPage={8}
              onPageChange={(page) => console.log({ page })}
            />
          </Table>
        </Col>

        <Col span={6}>
          <Text h3>Current Tasks:</Text>
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
              rowsPerPage={8}
              onPageChange={(page) => console.log({ page })}
            />
          </Table>
        </Col>

        <Col span={6}>
          <Text h3>Completed Tasks:</Text>
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
              rowsPerPage={8}
              onPageChange={(page) => console.log({ page })}
            />
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
export default Tasks;
