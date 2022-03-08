import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar } from "@mui/material";
import { Grid } from "@material-ui/core";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 18,
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
    paddingTop: 30,
    paddingBottom: 30,
    fontSize: 23,
    fontWeight: "bold",
    backgroundColor: "#e7f9eb",
    paddingBottom: "20px",
    paddingRight: "20px",
  },
}));

const StyledTableRow2 = styled(TableRow)(({ theme }) => ({
  // hide last border
  "&:first-child td, &:first-child th": {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 23,
    fontWeight: "bold",
    backgroundColor: "#f8e4e6",
  },
}));

function createData(name, detail, change) {
  return { name, detail, change };
}

const rows = [
  // hide last border
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
        sx={{ minWidth: "200px" }}
        display="flex"
        alignItems="center"
        justify="center"
        style={{
          paddingLeft: "120px",
          paddingRight: "120px",
          overflowX: "auto",
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
            <Table aria-label="customized table" borderRadius="150">
              <TableHead>
                <TableRow style={{ display: "flex" }}>
                  {/* <StyledTableCell>TopGainingCoins</StyledTableCell>
            <StyledTableCell align="right" colSpan={3}>
              24H Change
            </StyledTableCell> */}
                </TableRow>
              </TableHead>
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
            style={{ width: "100%", minWidth: "100px" }}
          >
            <Table aria-label="customized table" borderRadius="150">
              <TableHead>
                <TableRow>
                  {/* <StyledTableCell>TopGainingCoins</StyledTableCell>
            <StyledTableCell align="right" colSpan={3}>
              24H Change
            </StyledTableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow2 key={row.name}>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      display="flex"
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
                    <StyledTableCell>
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
