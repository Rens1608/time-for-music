import { Feature } from "@/types/feature";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";
import { faMobileScreen, faMusic, faQrcode } from "@fortawesome/free-solid-svg-icons";

const featuresData: Feature[] = [
  {
    id: "fun-for-all",
    icon: (
      <FontAwesomeIcon icon={faMusic} size="2x" color="white" />
    ),
    title: "", // Will be populated from translations
    paragraph: "", // Will be populated from translations
  },
  {
    id: "custom-cards",
    icon: (
      <FontAwesomeIcon icon={faQrcode} size="2x" color="white" />
    ),
    title: "", // Will be populated from translations
    paragraph: "", // Will be populated from translations
  },
  {
    id: "companion-app",
    icon: (
      <FontAwesomeIcon icon={faMobileScreen} size="2x" color="white" />
    ),
    title: "", // Will be populated from translations
    paragraph: "", // Will be populated from translations
  },
  {
    id: "pdf-generator",
    icon: (
      <FontAwesomeIcon icon={faFilePdf} size="2x" color="white" />
    ),
    title: "", // Will be populated from translations
    paragraph: "", // Will be populated from translations
  },
];

export default featuresData;
