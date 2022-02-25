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
import { flexbox } from "@mui/system";

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
            padding: "0 10px",
          }}
        >
          <h1>News</h1>
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
              onClick={() => sliderRef.current.slickPrev()} >
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
      <div style={{ margin: 30 }}>
        <Slider ref={sliderRef} slidesToShow={4} slidesToScroll={4}>
          {Array(10)
            .fill("")
            .map(() => (
              <div style={{ margin: 20 }}>
                <Card
                  style={{ width: 350, objectFit: "contain", borderRadius: 15 }}
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
                      image="https://thumbs.dreamstime.com/b/pink-ice-cream-small-cone-pink-ice-cream-small-cone-154220273.jpg"
                      alt="Image"
                      objectFit="cover"
                    />
                  </Box>
                  <CardContent>
                    <Typography
                      variant="body2"
                      component="p"
                    >
                      News description
                    </Typography>
                  </CardContent>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent:"space-between",
                      padding:15                   
                    }}
                  >
                    <Box
                    style={{
                      display: "flex",
                      flexDirection: "row"
                    }}>
                    <Avatar
                      sx={{ bgcolor: blue[500] }}
                      aria-label="Logo"
                    ></Avatar>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      objectFit="cover"
                      margin="50"
                    >
                      Source
                    </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
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
