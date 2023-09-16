import { Dimensions, Platform } from "react-native";
const { width, height } = Dimensions.get("window");

const Constants = {
  internetConnectionError: "Internet Connection Error!",
  // baseurl:"",
  url: "https://demo.sehatconnection.com/",
  baseurl: "https://demo.sehatconnection.com/api/",
  imgBaseUrl: "https://demo.sehatconnection.com/assets/front_assets/images/",
  versionName: "2.0.0.6",
  ScreenWidth: width,
  ScreenHeight: height,
  dummyAddress:
    "Lorem Ipsum is simply dummy text of the, Shahra-e-Faisal Karachi",
  Platform: Platform.OS,
  dummyAbout:
    "Lorem Ipsum is simply dummy text of the. Lorem Ipsum is simply dummy text of the, Lorem Ipsum is simply dummy text of the",
  dummyText: "Lorem Ipsum is simply dummy text of the",
  dummyTime: "from 9:00 am to 10:30 pm",
  dummyLocation: "Hall one Expo center Karachi",

  buttonShadow: {
    shadowColor: "#787878",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.3,
    elevation: 3,
  },

  // crossbtn: require("../assets/sehat/crossbtn.png"),
  // splashBg: require("../assets/sehat/splashBg.png"),
  splashBg: require("../../src/assets/sehat/Splash-Bg.png"),
  call_alert: require("../assets/sehat/call_alert_2.mp3"),

  logo: require("../assets/sehat/Logo.png"),
  logo_gray: require("../assets/sehat/logo_gray.png"),
  homebanner: require("../assets/sehat/home_banner.png"),

  cat_banner: require("../assets/sehat/cat_banner.png"),
  doctr_banner: require("../assets/sehat/doctr_banner.jpg"),
  online_pharmacy_banner: require("../assets/sehat/Online_pharmacy_banner.png"),
  billing_icon: require("../assets/sehat/billing_icon_2.png"),
  product_banner1: require("../assets/sehat/product_banner1.jpeg"),
  sehat_wallet: require("../assets/sehat/sehat_wallet.png"),
  wallet_icon: require("../assets/sehat/wallet_icon.png"),

  quotation_list: require("../assets/sehat/quotation_icon.jpeg"),
  healthcare_icon: require("../assets/sehat/healthcare_icon.jpeg"),

  video_banner: require("../assets/sehat/video_banner.png"),
  pharmacy_service_banner: require("../assets/sehat/pharmacy_service_banner.png"),

  // Home Icons.
  video_consultation_icon: require("../assets/sehat/video_consultation_icon.png"),
  hospital_appointment_icon: require("../assets/sehat/hospital_appointment_icon.png"),
  // ambulance_icon: require('../assets/sehat/ambulance_icon.png'),
  waiting_icon: require("../assets/sehat/waiting_icon.png"),

  dctr_app_icon: require("../assets/sehat/dctr_app_icon.png"),
  history_icon: require("../assets/sehat/history_icon.png"),

  pharmacy_service: require("../assets/sehat/pharmacy_service.png"),
  lab_services: require("../assets/sehat/lab_services.png"),
  home_care: require("../assets/sehat/home_care.png"),
  blood_bank: require("../assets/sehat/blood_bank.png"),
  wallet_banner_icon: require("../assets/sehat/wallet_banner_icon.jpeg"),
  wallet_money: require("../assets/sehat/wallet_money.jpeg"),

  ambulance: require("../assets/sehat/ambulance.jpeg"),
  pending_icon: require("../assets/sehat/pending_icon.png"),

  coviImg: require("../assets/sehat/coviImg.png"),
  doctordummy: require("../assets/sehat/doctordummy.png"),
  cameraIcon: require("../assets/sehat/cameraIcon.png"),
  plus: require("../assets/sehat/plus.png"),

  avatar: require("../assets/sehat/avatar.png"),
  bigplus: require("../assets/sehat/bigplus.png"),
  requestmodalimg: require("../assets/sehat/requestmodalimg.png"),
  video_doctor_banner: require("../assets/sehat/video_doctor_banner.jpeg"),

  cash: require("../assets/sehat/cash.png"),
  easypaisa: require("../assets/sehat/easypaisa.png"),
  jazzcash: require("../assets/sehat/jazzcash.png"),

  membership: require("../assets/sehat/membership.png"),
  upaisa: require("../assets/sehat/upaisa.png"),
  visacard: require("../assets/sehat/visacard.png"),

  aghaKhan: require("../assets/sehat/aghaKhan.png"),
  liaquatNational: require("../assets/sehat/liaquatNational.png"),
  northCity: require("../assets/sehat/northCity.png"),
  southCity: require("../assets/sehat/southCity.png"),
  doctorProfileBg: require("../assets/sehat/doctorProfileBg.png"),
  doctorAvatar: require("../assets/sehat/doctorAvatar.png"),
  doctrMapImg: require("../assets/sehat/doctrProfileImg.png"),
  rightIcon: require("../assets/sehat/rightIcon.png"),

  scheduled_icon: require("../assets/sehat/scheduled_icon.png"),
  men_avatar: require("../assets/sehat/men_avatar.png"),
  women_avatar: require("../assets/sehat/women_avatar.png"),

  attachment: require("../assets/sehat/attachment.png"),
  diagtest: require("../assets/sehat/diagtest.png"),
  medication: require("../assets/sehat/medication.png"),
  treatment: require("../assets/sehat/treatment.png"),
  downArrow: require("../assets/sehat/downArrow.png"),
  doctr: require("../assets/sehat/doctr.jpeg"),

  add_attch: require("../assets/sehat/add_attch.png"),
  hosp_logo_avatar: require("../assets/sehat/hosp_logo_avatar.png"),

  FontSize: {
    superTiny: 9,
    big: 20,
    tiny: 11,
    small: 13,
    medium: 15,
    large: 25,
    extraLarge: 28,
    extraLargeXl: 30,
    extraLargeXXl: 32,
    extraLargeXXXl: 35,
  },

  Keyboard: {
    number: "number-pad",
    email: "email-address",
    phone: "phone-pad",
    default: "default",
    decimal: "decimal-pad",
  },

  Colors: {
    red: "red",
    black: "black",
    white: "white",
    grey: "#6C6C6C",
    reddish: "#fa625b",
    seaGreen: "#21c27f",
    lightGrey: "#ADADAD",
    primaryBlue: "#3E497F",
    primaryBgGrey: "#E5E5E5",
    primaryGreen: "#8EC641",
    listingBoxBg: "#515b8c",
    buttonBlue: "#525de2",
    buttonBlueStatus: "rgb(60,134,202)",
    primaryYellow: "#fec200",
    redHearColor: "#e54b3c",
    backgrounGrey: "#ECEEF5",
    purpleMenuColor: "#8967f6",
  },

  PoppinsBold: "Poppins-Bold",
  PoppinsLight: "Poppins-Light",
  PoppinsMedium: "Poppins-Bold",
  PoppinsRegular: "Poppins-Bold",
  PoppinsSemiBold: "Poppins-Bold",

  FontWeight: {
    bold: "bold",
    semiBold: "500",
  },
  Languages: [
    {
      code: "en",
      text: "English",
    },
  ],
  Api: {
    Limit: 20,
  },
  dummyImage:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlUKE4lpNTymRCXQvOBekOd39SZBB5G2tYJ8MCtw_UMkchs3WF",
  dummyText:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  //Images,
};

export default Constants;
