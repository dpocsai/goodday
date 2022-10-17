import {
  Work,
  Home,
  PeopleAlt,
  FitnessCenter,
  DirectionsRun,
  Restaurant,
  LocalDrink,
  Soap,
  Hotel,
  PhoneIphone,
  AutoStories,
  AccessTimeFilled,
  SportsEsports,
  Public,
  AttachMoney,
  AssignmentTurnedIn,
  LocalPharmacy,
} from "@mui/icons-material";

const itemIconStyle = { fontSize: { xs: "25px", sm: "30px" } };
const ItemIcons = {
  AssignmentTurnedIn: (
    <AssignmentTurnedIn id="AssignmentTurnedIn" sx={itemIconStyle} />
  ),
  Work: <Work id="Work" sx={itemIconStyle} />,
  Home: <Home id="Home" sx={itemIconStyle} />,
  PeopleAlt: <PeopleAlt id="PeopleAlt" sx={itemIconStyle} />,
  FitnessCenter: <FitnessCenter id="FitnessCenter" sx={itemIconStyle} />,
  DirectionsRun: <DirectionsRun id="DirectionsRun" sx={itemIconStyle} />,
  Restaurant: <Restaurant id="Restaurant" sx={itemIconStyle} />,
  LocalDrink: <LocalDrink id="LocalDrink" sx={itemIconStyle} />,
  LocalPharmacy: <LocalPharmacy id="LocalPharmacy" sx={itemIconStyle} />,
  Soap: <Soap id="Soap" sx={itemIconStyle} />,
  Hotel: <Hotel id="Hotel" sx={itemIconStyle} />,
  PhoneIphone: <PhoneIphone id="PhoneIphone" sx={itemIconStyle} />,
  SportsEsports: <SportsEsports id="SportsEsports" sx={itemIconStyle} />,
  AutoStories: <AutoStories id="AutoStories" sx={itemIconStyle} />,
  AccessTimeFilled: (
    <AccessTimeFilled id="AccessTimeFilled" sx={itemIconStyle} />
  ),
  Public: <Public id="Public" sx={itemIconStyle} />,
  AttachMoney: <AttachMoney id="AttachMoney" sx={itemIconStyle} />,
};

export default ItemIcons;
