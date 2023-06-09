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
  Card,
  Divider,
  Link,
  Radio,
} from "@nextui-org/react";
import { StyledBadge } from "./StyledBadge";
import "./Tasks.css";
import React, {useState, useEffect} from "react";
import ModalCreateDAO from "./common/modalCreateDAO/ModalCreateDAO";
import ModalAddNewDAO from "./common/modalAddNewDAO/ModalAddNewDAO";
import ModalDAO from "./common/daoModals/ModalDAO";
import ModalCreateProposal from "./common/modalProposals/ModalCreateProposal";
import ModalCreateReading from "./common/modalWeeklyReading/ModalNewWeeklyReading";
import ModalVoteOnProposal from "./common/modalProposals/ModalVoteOnProposal";
import {getContract, getAllDaos, getDaoAvatar} from "./common/generalFunctions/daos";
import { Moralis } from "moralis";

function DAOFunctions(props) {

  useEffect(() => {
    //GetDaoMetadata()
    GetDaoList()
  }, [])

  const [visible, setVisible] = useState(false);
  const [visibleAddDAO, setVisibleAddDAO] = useState(false);
  const [visibleAddNewDAO, setVisibleAddNewDAO] = useState(false);
  const [visibleDAO, setVisibleDAO] = useState(false);

  const [visibleCreateProposal, setVisibleCreateProposal] = useState(false);
  const [visibleCreateReading, setVisibleCreateReading] = useState(false);
  const [visibleVoteOnProposal, setVisibleVoteOnProposal] = useState(false);

  //states for DAOs
  const [dao, setDao] = useState(null);
  const [inf, setInf] = useState(null);
  const [daosList, setDaosList] = useState([]);
  const [daosInfo, setDaosInfo] = useState([]);
  const [daoName, setDaoName] = useState("");
  const [daoDesc, setDaoDesc] = useState("");
  const [daoTech, setDaoTech] = useState("");
  const [daoContract, setDaoContract] = useState("");
  const [daoSections, setDaoSections] = useState("");
  const [daoSite, setDaoSite] = useState("");

  //states for Proposals
  const [userVote, setUserVote] = useState(false);


  function createDAOHandler() {
    setVisibleAddDAO(true);
    console.log("test");
  }

  function createProposalHandler() {
    setVisibleCreateProposal(true);
    console.log("test");
  }

  function createReadingHandler() {
    setVisibleCreateReading(true);
  }

  function createVoteHandler() {
    setVisibleVoteOnProposal(true);
  }

  function onAdd(id) {
    props.addDAO(id);
    closeModal();
  }

  function closeModal() {
    setVisibleAddDAO(false);
    setVisibleAddNewDAO(false);
    setVisibleDAO(false);
    setVisibleCreateProposal(false);
    setVisibleCreateReading(false);
    setVisibleVoteOnProposal(false);
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

  // const getAllProposals = async () => {
  //   const userAddress = user.get("ethAddress");
  //   const daos = await getAllUserDaos(userAddress);
  //   console.log("the first dao: ", daos[0])
  //   const tasks = await getAllDaoTasks(daos);
  //   console.log("The tasks status I get: ", tasks[0].status)
  //   console.log("The tasks avatar I get: ", tasks[0].avatar)
  //   console.log("The tasks name I get: ", tasks[0].name)
  //   console.log("The tasks owner I get: ", tasks[0].owner)
  //   console.log("The tasks deadline I get: ", tasks[0].deadline)
  //   setAllTasks(tasks);
  //   // console.log("The tasks i get: ", tasks)
  // }

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
  const GetDaoMetadata = async () => {
    const DaosInfo = [];
    const { ethereum } = window;
    if (ethereum) {
      const bc = await getAllDaos();
      const query = new Moralis.Query("DAOs");
      for ( var i = 0; i < bc.length; i++) {
        await query.select("CID").equalTo("contractAddress", bc[i]);
        const qAnswer = await query.first();
        const daoCID = qAnswer.attributes.CID;
        const url = `https://gateway.moralisipfs.com/ipfs/${daoCID}`;
        const response = await fetch(url);
        const responseJson = await response.json();
        const DaoInfo = {
          contract: bc[i],
          name: responseJson.name,
          tag: responseJson.tag,
          type: responseJson.type,
          description: responseJson.description,
          tech: responseJson.tech,
          site: responseJson.site,
          signature: responseJson.signature,
          sections: responseJson.sections,
        }
        //console.log(DaoInfo)
        await DaosInfo.push(DaoInfo)
      }
      //await setDaosInfo(DaosInfo)
      return DaosInfo
    }
  }

  const GetDaoInfo = async (id) => {
      var daoInf = []
      daoInf = await GetDaoMetadata();

      console.log(daoInf[id])
      setInf(<Row css={{ paddingBottom: 16 }} gap={1}>
        <Container>
          <Col span={6}>
            <Grid>
              <Card>
                <Card.Header>
                  <Text
                    b
                    h3
                    css={{
                      textGradient: "45deg, $purple600 -20%, $pink600 100%",
                    }}
                  >
                    {daoInf[id].name}
                  </Text>
                </Card.Header>
                <Divider />
                <Card.Body css={{ py: "$10" }}>
                  <Text id="modal-title" b size={16}>
                    DAO Description:
                  </Text>
                  <Text>
                    {daoInf[id].description}
                  </Text>
                  <Text id="modal-title" b size={16}>
                    DAO Technology:
                  </Text>
                  <Text>
                    {daoInf[id].tech}
                  </Text>
                  <Text id="modal-title" b size={16}>
                    DAO Contract Address:
                  </Text>
                  <Text>
                    {daoInf[id].contract}
                  </Text>
                  <Text id="modal-title" b size={16}>
                    Offical Site:
                  </Text>
                  <Link
                    icon
                    color="primary"
                    target="_blank"
                    href={"https://"+daoInf[id].site}
                  >
                    {daoInf[id].site}
                  </Link>
                  <Text id="modal-title" b size={16}>
                    DAO Sections:
                  </Text>
                  <Text>
                      {daoInf[id].sections}
                  </Text>
                </Card.Body>
                <Divider />
                <Card.Footer>
                  <Row justify="flex-end">
                    <Button
                      onClick={createVoteHandler}
                      color="secondary"
                      size="sm"
                    >
                      Show More
                    </Button>
                    {visibleVoteOnProposal && (
                      <ModalVoteOnProposal
                        id={props.id}
                        open={visibleVoteOnProposal}
                        onClose={closeModal}
                      />
                    )}
                  </Row>
                </Card.Footer>
              </Card>
            </Grid>
          </Col>
        </Container>
      </Row>)
  }


  const GetDaoList = async () => {
    //getting all daos from the blockchain
    const DaosList = [];
    const { ethereum } = window;
    if (ethereum) {
      //const bountiContract = await getContract();
      //console.log(bountiContract)
      //const bc = await bountiContract.getAllDaos();
      const bc = await getAllDaos();
      console.log(bc)
      // const query = new Moralis.Query("DAOs");
      for ( let i = 0; i < bc.length; i++) {
        // await query.select("CID").equalTo("contractAddress", bc[i]);
        // const qAnswer = await query.first();
        // console.log(qAnswer)
        // const daoCID = qAnswer.attributes.CID;
        // const url = `https://gateway.moralisipfs.com/ipfs/${daoCID}`;
        // const response = await fetch(url);
        // //make response from ipfs image/logo url
        // const responseJson = await response.json();
        const image = await getDaoAvatar(bc[i]);
        const id = i;
        const reply = <Grid key={i}> <Avatar size='xl' src={image} zoomed bordered color='gradient' onClick={() => GetDaoInfo(id)} id={id} key={id}/> </Grid>
        await DaosList.push(reply);
        console.log("DAO LIST ID: "+i)
      }
      await setDaosList(DaosList);
    }
  }

  return (
    <Container gap={1}>
      <Grid.Container gap={4}>
        {daosList}
        {visibleDAO && (
          <ModalDAO id={props.id} open={visibleDAO} onClose={closeModal} />
        )}
        <Grid.Container justify="right" wrap>
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
        <Spacer y={1} />
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
            Vote:
          </Text>
          <Radio.Group size={"sm"} color="secondary">
          <Radio
            value="General"
            onChange={(e) => {
              setUserVote(true);
            }}
          >
            Voter for
          </Radio>
          <Radio
            value="Bronze"
            onChange={(e) => {
              setUserVote(false);
            }}
          >
            Vote against
          </Radio>
        </Radio.Group>
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
        {inf}
      <Spacer y={1} />
      <Grid.Container justify="right" wrap>
        <Button.Group color="secondary" ghost>
          <Button onClick={createProposalHandler}>Create a Proposal</Button>
          <Button onClick={createReadingHandler}>Create new Reading</Button>
          {visibleCreateProposal && (
            <ModalCreateProposal
              id={props.id}
              open={visibleCreateProposal}
              onClose={closeModal}
            />
          )}
          {visibleCreateReading && (
            <ModalCreateReading
              id={props.id}
              open={visibleCreateReading}
              onClose={closeModal}
            />
          )}
        </Button.Group>
      </Grid.Container>
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
      <Spacer y={1} />
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
export default DAOFunctions;
