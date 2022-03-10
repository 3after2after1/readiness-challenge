import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { blue } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
} from "@material-ui/core";
import moment from "moment";

const carouselProperties = {
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 320,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 425,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
  ],
};

const Testing = ({ data }) => {
  const demoImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";
  const sliderRef = useRef(null);
  useEffect(() => {
    // console.log(sliderRef);
  }, []);

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 20px",
          }}
        >
          <Typography
            variant="h3"
            style={{ fontFamily: "League Spartan", fontWeight: "bold" }}
          >
            News
          </Typography>
          <div style={{ display: "flex" }}>
            <div
              style={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
                borderRadius: 7,
                boxShadow: "0 2px 4px rgb(0 0 0 /10%)",
                cursor: "pointer",
              }}
              onClick={() => sliderRef.current.slickPrev()}
            >
              <ArrowBackIos />
            </div>
            <div
              style={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
                borderRadius: 7,
                boxShadow: "0 2px 4px rgb(0 0 0 /10%)",
                cursor: "pointer",
              }}
              onClick={() => sliderRef.current.slickNext()}
            >
              <ArrowForwardIos />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Slider {...carouselProperties} ref={sliderRef}>
          {data.map((news, index) => (
            <div key={index}>
              <Card
                style={{
                  maxWidth: 400,
                  minHeight: 420,
                  maxHeight: 420,
                  margin: 5,
                  borderRadius: 15,
                  border: "0.2rem solid black",
                }}
              >
                <a
                  href={news.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      maxHeight: "500px",
                      // minHeight: "300px",
                    }}
                  >
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="body1"
                        component="h2"
                        minwidth="200"
                        fontWeight="bold"
                      >
                        {news.name}
                      </Typography>
                    </CardContent>
                    <CardMedia
                      component="img"
                      height="200"
                      image={news?.image?.thumbnail?.contentUrl || demoImage}
                      alt="Image"
                      // objectFit="cover"
                    />
                  </Box>
                  <CardContent style={{ maxHeight: 70, overflow: "hidden" }}>
                    <Typography variant="body2" component="p">
                      {/* {news.description.length > 100
                        ? `${news.description.substring(0, 75)}...`
                        : news.description} */}
                    </Typography>
                  </CardContent>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 15,
                    }}
                  >
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Avatar
                        sx={{ bgcolor: blue[500] }}
                        aria-label="Logo"
                        src={
                          news.provider[0]?.image?.thumbnail?.contentUrl ||
                          demoImage
                        }
                        alt=""
                      ></Avatar>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        // objectFit="cover"
                        margin="50"
                        style={{
                          marginLeft: "1rem",
                          paddingBottom: "0",
                        }}
                      >
                        {news.provider[0]?.name}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {moment(news.datePublished).startOf("ss").fromNow()}
                    </Typography>
                  </Box>
                </a>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Testing;
