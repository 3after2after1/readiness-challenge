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

import { LinearProgress } from "@material-ui/core";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 16,
    fontWeight: 20,
    backgroundColor: "black",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
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
    align: "center",
  },
}));

const StyledTableRow2 = styled(TableRow)(({ theme }) => ({
  "&:first-child td, &:first-child th": {
    paddingTop: 20,
    paddingBottom: 30,
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#f8e4e6",
    paddingBottom: "20px",
    paddingRight: "20px",
    align: "center",
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

export default function CustomizedTables({ loading, list, rowClass }) {
  console.log(loading);
  console.log(list);

  return (
    <>
      <Grid
        container
        xs={{ minWidth: "100px" }}
        display="flex"
        alignItems="center"
        justify="center"
        style={{
          padding: "1% 0",
          overflowX: "hidden",
          gap: "20px",
        }}
      >
        <Grid style={{ width: "500px" }}>
          {loading ? (
            <LinearProgress style={{ background: "gold" }} />
          ) : (
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
                  padding: "10px",
                  display: "flex",
                  justifyContent: "space-around",
                  backgroundColor: "black",
                  color: "white",
                  fontSize: "1rem",
                }}
              >
                <Box>Rank</Box>
                <Box>Top Gainers</Box>
                <Box> 24H Change</Box>
              </Box>
              <Table
                aria-label="customized table"
                borderRadius="150"
                style={{ padding: "0 10%" }}
              >
                <TableBody>
                  {list[0].map((row, index) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <StyledTableRow
                        key={row.id}
                        display="flex"
                        justifyContent="space-between"
                        style={{
                          justifyContent: "space-around",
                        }}
                      >
                        <StyledTableCell
                          flexDirection="column"
                          align="center"
                          style={{ paddingLeft: "3rem" }}
                        >
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          // justifyContent="space-between"
                          // alignItems="center"
                          align="right"
                          style={{
                            display: "flex",
                            padding: "2rem",
                            paddingLeft: "1rem",
                            paddingRight: "0",
                            // paddingLeft: "30px",
                            // paddingRight: 0,
                          }}
                        >
                          <Avatar
                            alt="Icon"
                            variant="rounded"
                            src={row?.image}
                          />
                        </StyledTableCell>
                        <StyledTableCell
                          style={{ paddingLeft: "0.8rem", paddingRight: "0" }}
                        >
                          {row.name}
                        </StyledTableCell>

                        <StyledTableCell
                          align="center"
                          style={{
                            color: "#3dae23",
                            paddingLeft: "1rem",
                            paddingRight: "2rem",
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>

        <Grid style={{ width: "500px" }}>
          {loading ? (
            <LinearProgress style={{ background: "gold" }} />
          ) : (
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
                  padding: "10px",
                  display: "flex",
                  justifyContent: "space-around",
                  backgroundColor: "black",
                  color: "white",
                  fontSize: "1rem",
                }}
              >
                <Box>Rank</Box>
                <Box>Top Losers</Box>
                <Box> 24H Change</Box>
              </Box>
              <Table
                aria-label="customized table"
                borderRadius="150"
                style={{ padding: "0 10%" }}
              >
                <TableBody>
                  {list[1].map((row, index) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <StyledTableRow2
                        key={row.id}
                        display="flex"
                        justifyContent="space-between"
                        style={{
                          justifyContent: "space-around",
                        }}
                      >
                        <StyledTableCell
                          flexDirection="column"
                          align="center"
                          style={{ paddingLeft: "3rem" }}
                        >
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          // justifyContent="space-between"
                          // alignItems="center"
                          align="right"
                          style={{
                            display: "flex",
                            padding: "2rem",
                            paddingLeft: "1rem",
                            paddingRight: "0",
                            // paddingLeft: "30px",
                            // paddingRight: 0,
                          }}
                        >
                          <Avatar
                            alt="Icon"
                            variant="rounded"
                            src={row?.image}
                          />
                        </StyledTableCell>
                        <StyledTableCell
                          style={{ paddingLeft: "0.8rem", paddingRight: "0" }}
                        >
                          {row.name}
                        </StyledTableCell>

                        <StyledTableCell
                          align="center"
                          style={{
                            color: "#e8464a",
                            paddingLeft: "1rem",
                            paddingRight: "2rem",
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </StyledTableCell>
                      </StyledTableRow2>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </>
  );
}
