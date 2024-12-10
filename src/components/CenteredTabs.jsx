import { Tabs } from "@mui/material"
import Tab from "@mui/material/Tab"
import Paper from "@mui/material/Paper"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    tab: {
      fontSize:12,
      color: "#5f6368",
      textTransform: "capitalize",
      height: 10,
      fontWeight: "600",
      fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
    },
    tabs: {
      height: 10
    }
  }
});

export default function CenteredTabs() {

  const classes = useStyles();

  return (
    <Paper>
      <Tabs className={classes.tabs} centered textColor="primary" indicatorColor="primary">
        <Tab  className={classes.tab} label="Questions">

        </Tab>
        <Tab className={classes.tab} label="Responds">
          
        </Tab>
      </Tabs>
    </Paper>
  )
}