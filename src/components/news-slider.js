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

const carouselProperties = {
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 840,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1190,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 1550,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
  ],
};

const News = () => {
  const sliderRef = useRef(null);
  useEffect(() => {
    console.log(sliderRef);
  }, []);

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 40px",
            fontsize: "40px",
            fontweight: "700",
            color: "#1a2f66",
          }}
        >
          <h1>News</h1>
          <div style={{ display: "flex", alignItems: "center" }}>
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
          {Array(10)
            .fill("")
            .map(() => (
              <div>
                <Card
                  style={{
                    minwidth: 350,
                    height: "100%",
                    maxHeight: 400,
                    margin: 10,
                    objectFit: "contain",
                    borderRadius: 15,
                  }}
                >
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        minwidth="200"
                      >
                        News Title
                      </Typography>
                    </CardContent>
                    <CardMedia
                      component="img"
                      height="200"
                      image="https://i.pinimg.com/564x/54/b0/f9/54b0f98fc7530d471381bec95e27125a.jpg"
                      alt="Image"
                    />
                  </Box>
                  <CardContent style={{ maxHeight: 80, overflow: "hidden" }}>
                    <Typography variant="body2" component="p">
                      Overflow can be hidden or auto for scroll. Im not sure how
                      else better add dot dot or something sdnkjdna asn
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
                      ></Avatar>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        objectFit="cover"
                        style={{ padding: "10px" }}
                      >
                        Source
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{ padding: "10px" }}
                    >
                      Date
                    </Typography>
                  </Box>
                </Card>
              </div>
            ))}
        </Slider>
      </div>
    </>
  );
};

export default News;
