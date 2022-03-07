import React from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import "./FinalLandingPage.css";

const FinalLandingPage = () => {
  return (
    <Box id="landingPageContent" style={{}}>
      <Box
        id="firstsection"
        style={{
          backgroundImage: "url(public/Vector 25.png)",
          backgroundColor: "#184D47",
          width: "100%",
          height: "500px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          id="signUpContent"
          style={{
            padding: "20px 20px 0 20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box id="typographyBox1">
            <Typography
              id="sentence1"
              variant="h3"
              // component="div"
              sx={{
                fontFamily: "League Spartan",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Informative.
            </Typography>
            <Typography
              id="sentence2"
              variant="h4"
              // component="div"
              sx={{
                fontFamily: " League Spartan",
                color: "white",
                fontWeight: "bold",
              }}
            >
              That's TREX.
            </Typography>
            <Typography
              id="sentence3"
              variant="h6"
              // component="div"
              sx={{
                width: "250px",
                fontFamily: "Bree Serif !important",
                font: "caption",
                color: "white",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
            <Box
              style={{
                paddingTop: "20px",
              }}
            >
              <Button
                id="signUpButton1"
                color="inherit"
                variant="outlined"
                style={{
                  color: "#FFCE45",
                  fontSize: "1rem",
                  fontFamily: "Bree Serif",
                  fontWeight: "bold",
                  width: "275px",
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
          <Box
            style={{
              paddingTop: "20px",
            }}
          >
            <Box
              id="smartmockup"
              style={{
                width: "275px",
                height: "200px",
                backgroundColor: "white",
              }}
            >
              Dashboard Picture
            </Box>
            <Box
              style={{
                paddingTop: "20px",
              }}
            >
              <Button
                id="signUpButton2"
                color="inherit"
                variant="outlined"
                style={{
                  color: "#FFCE45",
                  fontSize: "1rem",
                  fontFamily: "Bree Serif",
                  fontWeight: "bold",
                  width: "275px",
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box id="section23">
        <Box
          id="secondsection"
          style={{
            backgroundColor: "#F9F7F7",
            width: "100%",
            height: "800px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box>
            <Divider
              id="divider1"
              style={{
                color: "#999",
                padding: "20px",
                fontFamily: "Bree Serif",
                fontSize: "2rem",
              }}
            >
              What We Offer
            </Divider>
          </Box>
          <Box
            id="forexAndDashboard"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              id="dashPic1"
              style={{
                width: "275px",
                height: "200px",
                backgroundColor: "white",
              }}
            >
              Dashboard Picture
            </Box>
            <Box>
              <Typography
                id="forexTitle"
                variant="h3"
                // component="div"
                style={{
                  paddingRight: "20px",
                  paddingLeft: "20px",
                  paddingBottom: "0px",
                  fontFamily: "League Spartan",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Forex.
              </Typography>
              <Typography
                id="forexExplanation"
                variant="h6"
                // component="div"
                sx={{
                  width: "250px",
                  fontFamily: "Bree Serif !important",
                  font: "caption",
                  color: "black",
                  paddingRight: "20px",
                  paddingLeft: "20px",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
              <Box
                id="forexContentBox"
                style={{
                  paddingTop: "15px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Box
                    style={{
                      width: "150px",
                      height: "50px",
                      backgroundColor: "white",
                    }}
                  >
                    1) Main Feature
                  </Box>
                  <Typography
                    id=""
                    variant="h6"
                    // component="div"
                    sx={{
                      width: "200px",
                      fontFamily: "Bree Serif !important",
                      font: "caption",
                      color: "black",
                      textAlign: "",
                      paddingTop: "10px",
                      paddingBottom: "20px",
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Typography>
                </Box>
                <Box>
                  <Box
                    style={{
                      width: "150px",
                      height: "50px",
                      backgroundColor: "white",
                    }}
                  >
                    {" "}
                    2) Main Feature
                  </Box>
                  <Typography
                    id=""
                    variant="h6"
                    // component="div"
                    sx={{
                      width: "200px",
                      fontFamily: "Bree Serif !important",
                      font: "caption",
                      color: "black",
                      textAlign: "",
                      paddingTop: "10px",
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Typography>
                </Box>
              </Box>
              <Box
                style={{
                  paddingTop: "20px",
                }}
              >
                <Box
                  style={{
                    paddingLeft: "25px",
                  }}
                >
                  <Button
                    id="forexButton1"
                    color="inherit"
                    variant="outlined"
                    style={{
                      color: "#FFCE45",
                      fontSize: "1rem",
                      fontFamily: "Bree Serif",
                      fontWeight: "bold",
                    }}
                  >
                    Go to Forex
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "20px",
              }}
            >
              <Box
                id="dashPic2"
                style={{
                  width: "275px",
                  height: "200px",
                  backgroundColor: "white",
                }}
              >
                Dashboard Picture
              </Box>
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                id="forexButton2"
                color="inherit"
                variant="outlined"
                style={{
                  color: "#FFCE45",
                  fontSize: "1rem",
                  fontFamily: "Bree Serif",
                  fontWeight: "bold",
                  width: "275px",
                }}
              >
                Go to Forex
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          id="thirdsection"
          style={{
            backgroundColor: "#F9F7F7",
            width: "100%",
            height: "730px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            id="cryptoAndDashboard"
            style={{
              paddingTop: "25px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              id="dashPic3"
              style={{
                width: "275px",
                height: "200px",
                backgroundColor: "white",
              }}
            >
              Dashboard Picture
            </Box>
            <Box>
              <Typography
                id="cryptoTitle"
                variant="h3"
                // component="div"
                style={{
                  paddingRight: "20px",
                  paddingLeft: "20px",
                  paddingBottom: "0px",
                  fontFamily: "League Spartan",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Crypto.
              </Typography>
              <Typography
                id="cryptoExplanation"
                variant="h6"
                // component="div"
                sx={{
                  width: "250px",
                  fontFamily: "Bree Serif !important",
                  font: "caption",
                  color: "black",
                  paddingRight: "20px",
                  paddingLeft: "20px",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
              <Box
                id="cryptoContentBox"
                style={{
                  paddingTop: "15px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Box
                    style={{
                      width: "150px",
                      height: "50px",
                      backgroundColor: "white",
                    }}
                  >
                    1) Main Feature
                  </Box>
                  <Typography
                    id=""
                    variant="h6"
                    // component="div"
                    sx={{
                      width: "200px",
                      fontFamily: "Bree Serif !important",
                      font: "caption",
                      color: "black",
                      textAlign: "",
                      paddingTop: "10px",
                      paddingBottom: "20px",
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Typography>
                </Box>
                <Box>
                  <Box
                    style={{
                      width: "150px",
                      height: "50px",
                      backgroundColor: "white",
                    }}
                  >
                    {" "}
                    2) Main Feature
                  </Box>
                  <Typography
                    id=""
                    variant="h6"
                    // component="div"
                    sx={{
                      width: "200px",
                      fontFamily: "Bree Serif !important",
                      font: "caption",
                      color: "black",
                      textAlign: "",
                      paddingTop: "10px",
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Typography>
                </Box>
              </Box>
              <Box
                style={{
                  paddingTop: "20px",
                }}
              >
                <Box
                  style={{
                    paddingLeft: "25px",
                  }}
                >
                  <Button
                    id="cryptoButton1"
                    color="inherit"
                    variant="outlined"
                    style={{
                      color: "#FFCE45",
                      fontSize: "1rem",
                      fontFamily: "Bree Serif",
                      fontWeight: "bold",
                    }}
                  >
                    Go to Crypto
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "20px",
              }}
            >
              <Box
                id="dashPic4"
                style={{
                  width: "275px",
                  height: "200px",
                  backgroundColor: "white",
                }}
              >
                Dashboard Picture
              </Box>
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                id="cryptoButton2"
                color="inherit"
                variant="outlined"
                style={{
                  color: "#FFCE45",
                  fontSize: "1rem",
                  fontFamily: "Bree Serif",
                  fontWeight: "bold",
                  width: "275px",
                }}
              >
                Go to Crypto
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        id="fourthsection"
        style={{
          backgroundColor: "#CFF4D2",
          width: "100%",
          height: "730px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Divider
          id=""
          style={{
            color: "#999",
            padding: "20px",
            fontFamily: "Bree Serif",
            fontSize: "2rem",
          }}
        >
          About Us
        </Divider>
      </Box>
    </Box>
  );
};

export default FinalLandingPage;
