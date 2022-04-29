
import * as React from 'react';
import { Box, Container } from "@material-ui/core";
import ListeAccount from "./ListeAccount";
import SearhUser from "./SearhUser";
import axios from "axios";
import _ from "lodash";

const RetraitArgent = () => {
  const [email, setEmail] = React.useState();
  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const [result, setResult] = React.useState();

  const [emlploye, setEmploye] = React.useState([])

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8000/emlploye`)
        setEmploye(_.filter(response.data, { email: result }));
      } catch (err) { }
    }
    fetchData()
  }, [result])

  console.log(emlploye);

  return (
    <>
      {/* <Container maxWidth="lg"> */}
        <Box mt={4} mb={4}>
          <SearhUser email={email} setResult={setResult} handleChange={handleChange}/>
        </Box>
        {emlploye.length !== 0 ?
          <Box mt={4} mb={4}>
            <ListeAccount emlploye={emlploye} />
          </Box>
          : ''
        }
      {/* </Container> */}
    </>
  );
}
export default RetraitArgent;


