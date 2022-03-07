import * as React from "react";
import Card from "@mui/material/Card";

export default function DetailsStatsContent({ statsData }) {
  React.useEffect(() => {
    console.log("stats ", statsData);
    if (statsData) {
      statsData.pivot.forEach((item) => console.log(item.pivot));
    } else console.log("null");
  }, [statsData]);
  return (
    <Card sx={{ minWidth: 200 }}>
      <div>
        <h5>Pivot points</h5>
        {statsData ? (
          statsData.pivot.map((item) => {
            return (
              <div>
                <p>
                  {item.pivot} {item.point}
                </p>
              </div>
            );
          })
        ) : (
          <p>loading...</p>
        )}
        <h5>Support</h5>
        {statsData ? (
          statsData.support.map((item) => {
            return (
              <div>
                <p>
                  {item.s} {item.value} {item.strength}
                </p>
              </div>
            );
          })
        ) : (
          <p>loading...</p>
        )}
        <h5>Resistance</h5>
        {statsData ? (
          statsData.resist.map((item) => {
            return (
              <div>
                <p>
                  {item.r} {item.value} {item.strength}
                </p>
              </div>
            );
          })
        ) : (
          <p>loading...</p>
        )}
      </div>
    </Card>
  );
}
