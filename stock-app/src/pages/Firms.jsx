import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import { useEffect } from "react";
import useStockCall from "../hooks/useStockCall";
const Firms = () => {
  const { getStockData } = useStockCall();
  useEffect(() => {
    getStockData("firms");
  }, []);
  return (
    <div>
      <Typography variant="h4" color="error" mb={3}>
        Firm
      </Typography>
      <Button variant="contained">New Firm</Button>
    </div>
  );
};

export default Firms;
