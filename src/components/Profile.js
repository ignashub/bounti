import {
  Button,
  Row,
  Container,
  Grid,
  Col,
  Text,
  Divider,
  Card,
  Link,
  Spacer,
  Avatar,
} from "@nextui-org/react";
import ModalCreateUser from "./common/modalCreateUser/ModalCreateUser";
import React from "react";
import ModalDAO from "./common/daoModals/ModalDAO";

function Profile(props) {
  const [visible, setVisible] = React.useState(false);
  const [visibleDAO, setVisibleDAO] = React.useState(false);

  function createDAOHandler() {
    setVisible(true);
    console.log("test");
  }

  function closeModal() {
    setVisible(false);
    setVisibleDAO(false);
  }

  function showDAO() {
    setVisibleDAO(true);
    console.log("test");
  }

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
        <Spacer y={1} />
      </Grid.Container>
      <Grid.Container justify="right">
        <Button color="secondary" ghost onClick={createDAOHandler}>
          Create your Profile
        </Button>
        {visible && (
          <ModalCreateUser id={props.id} open={visible} onClose={closeModal} />
        )}
      </Grid.Container>
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
                luc.jonkers.eth
              </Text>
            </Card.Header>
            <Divider />
            <Card.Body css={{ py: "$10" }}>
              <Text id="modal-title" b size={16}>
                Your Experience:
              </Text>
              <Grid.Container gap={2}>
                <Grid xs={4}>
                  <Card>
                    <Card.Body>
                      <Text id="modal-title" b size={16}>
                        On-chain Experience:
                      </Text>
                      <Divider />
                      <Text>Web3 Consulting: 2016-2018</Text>
                      <Text>Maker DAO: 2018-Present</Text>
                      <Text>Curve DAO: 2019-Present</Text>
                      <Text>0x DAO: 2021-Present</Text>
                    </Card.Body>
                  </Card>
                </Grid>
                <Grid xs={4}>
                  <Card>
                    <Card.Body>
                      <Text id="modal-title" b size={16}>
                        Off-chain Experience:
                      </Text>
                      <Divider />
                      <Text>Fontys: 2004-2008</Text>
                      <Text>IT Systems BV: 2008-2009</Text>
                      <Text>Facebook: 2010-2012</Text>
                      <Text>IBM: 2012-2016</Text>
                    </Card.Body>
                  </Card>
                </Grid>
                <Grid xs={4}>
                  <Card>
                    <Card.Body>
                      <Text id="modal-title" b size={16}>
                        Credentials:
                      </Text>
                      <Divider />
                      <Text>Bachelor's of Software Engineering</Text>
                      <Link
                        icon
                        color="primary"
                        target="_blank"
                        href="https://www.linkedin.com/in/luc-jonkers/"
                      >
                        LinkedIn
                      </Link>
                      <Link
                        icon
                        color="primary"
                        target="_blank"
                        href="https://github.com/Luc-Jonkers"
                      >
                        GitHub
                      </Link>
                    </Card.Body>
                  </Card>
                </Grid>
              </Grid.Container>
              <Text id="modal-title" b size={16}>
                About you:
              </Text>
              <Text>
                Second year Software Engineering student working on web3
              </Text>
              <Text id="modal-title" b size={16}>
                Your Website:
              </Text>
              <Link
                icon
                color="primary"
                target="_blank"
                href="https://www.linkedin.com/in/luc-jonkers/"
              >
                Luc Jonkers
              </Link>
            </Card.Body>
            <Divider />
            <Card.Footer>
              <Row justify="flex-end">
                <Button color="secondary" size="sm">
                  Show More
                </Button>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      </Col>
    </Container>
  );
}
export default Profile;
