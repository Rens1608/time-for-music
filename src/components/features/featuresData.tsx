import { Feature } from "@/types/feature";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";
import { faMobileScreen, faMusic, faQrcode } from "@fortawesome/free-solid-svg-icons";
const featuresData: Feature[] = [
  {
    id: 1,
    icon: (
      <FontAwesomeIcon icon={faMusic} size="2x" color="white" />
    ),
    title: "Fun for All",
    paragraph: "Perfect for game nights, team-building events, or music-loving friends and family.",
  },
  {
    id: 2,
    icon: (
      <FontAwesomeIcon icon={faQrcode} size="2x" color="white" />
    ),
    title: "Custom Cards",
    paragraph: "Create personalized music cards featuring song titles, artists, release years, and a scannable code.",
  },
  {
    id: 3,
    icon: (
      <FontAwesomeIcon icon={faMobileScreen} size="2x" color="white" />
    ),
    title: "Intuitive Companion App",
    paragraph: "Enjoy a sleek and user-friendly app that makes scanning QR codes and playing songs a breeze.",
  },
  {
    id: 4,
    icon: (
      <FontAwesomeIcon icon={faFilePdf} size="2x" color="white" />
    ),
    title: "Handy PDF Generator",
    paragraph: "Easily create a well-organized PDF with custom music cards, perfect for printing or sharing.",
  },
];
export default featuresData;
