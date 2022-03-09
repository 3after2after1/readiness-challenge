import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Box } from "@mui/material";
import { Grid } from "@material-ui/core";
import "./table-crypto.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 16,
    fontWeight: 20,
    backgroundColor: "black",
    color: "white",
    width: "200px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    fontWeight: 20,
    paddingLeft: 20,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:first-child td, &:first-child th": {
    paddingTop: 20,
    paddingBottom: 30,
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#e7f9eb",
    paddingBottom: "20px",
    paddingRight: "20px",
  },
}));

const StyledTableRow2 = styled(TableRow)(({ theme }) => ({
  "&:first-child td, &:first-child th": {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#f8e4e6",
  },
}));

function createData(name, detail, change) {
  return { name, detail, change };
}

const rows = [
  createData("NTLA", "Intellia", "+18.78%"),
  createData("LPSN", "LivePerson", "+3.14%"),
  createData("LUNA", "LunaUS", "+2.88%"),
  createData("BIGC", "BigCommerce", "+1.89%"),
];

export default function CustomizedTables() {
  return (
    <>
      <Grid
        container
        xs={{ minWidth: "100px" }}
        display="flex"
        alignItems="center"
        justify="center"
        style={{
          // paddingLeft: "120px",
          // paddingRight: "120px",
          overflowY: "scroll",
          overflowX: "hidden",
          gap: "30px",
        }}
      >
        <Grid style={{ width: "500px" }}>
          <TableContainer
            component={Paper}
            style={{
              width: "100%",
              minWidth: "100px",
            }}
            xs={{ maxWidth: "200px" }}
          >
            <Box
              id="header-box"
              style={{
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "black",
                color: "white",
                fontSize: "18px",
              }}
            >
              <Box>Top Gaining Coins</Box>
              <Box> 24H Change</Box>
            </Box>

            <Table aria-label="customized table" borderRadius="150">
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name} display="flex">
                    <StyledTableCell
                      component="th"
                      scope="row"
                      justifyContent="space-between"
                      alignItems="center"
                      style={{
                        display: "flex",
                        paddingBottom: "50px",
                        paddingLeft: "30px",
                        paddingRight: 0,
                      }}
                    >
                      <Avatar
                        alt="Icon"
                        variant="rounded"
                        src="/static/images/avatar/1.jpg"
                      />
                    </StyledTableCell>
                    <StyledTableCell flexDirection="column">
                      {row.name} <br /> {row.detail}
                    </StyledTableCell>

                    <StyledTableCell align="right" style={{ color: "#3dae23" }}>
                      {row.change}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid style={{ width: "500px" }}>
          <TableContainer
            component={Paper}
            style={{
              width: "100%",
              minWidth: "100px",
            }}
            xs={{ maxWidth: "200px" }}
          >
            <Box
              id="header-box"
              style={{
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "black",
                color: "white",
                fontSize: "18px",
              }}
            >
              <Box>Top Gaining Coins</Box>
              <Box> 24H Change</Box>
            </Box>
            <Table aria-label="customized table" borderRadius="150">
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow2 key={row.name} display="flex">
                    <StyledTableCell
                      component="th"
                      scope="row"
                      justifyContent="space-between"
                      alignItems="center"
                      style={{
                        display: "flex",
                        paddingBottom: "50px",
                        paddingLeft: "30px",
                        paddingRight: 0,
                      }}
                    >
                      <Avatar
                        alt="Icon"
                        variant="rounded"
                        src="/static/images/avatar/1.jpg"
                      />
                    </StyledTableCell>
                    <StyledTableCell flexDirection="column">
                      {row.name} <br /> {row.detail}
                    </StyledTableCell>

                    <StyledTableCell align="right" style={{ color: "#e8464a" }}>
                      {row.change}
                    </StyledTableCell>
                  </StyledTableRow2>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
