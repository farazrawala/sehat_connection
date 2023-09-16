import React, { Component } from "react";
// import { createAppContainer } from "react-navigation";
// import { createStackNavigator } from "react-navigation-stack";
// import Constants from "../src/utils/Constants";
import { Text } from "react-native";
// import { createDrawerNavigator } from "react-navigation-drawer";

import { StatusBar } from "react-native";
import { Provider } from "react-redux";
// import { Root } from "native-base";

// import { NativeBaseProvider } from "native-base";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import configureStore from "../src/store/configureStore";

const store = configureStore();


// import Labs from '../src/screens/labs';
// import blood from '../src/screens/blood';
// import Appointments from '../src/screens/appointments';


import splash from "./common/splash/index";


import Login from "../src/screens/login/index";
import Signup from "../src/screens/signup/index";
import Drawer from "../src/screens/drawernav";
import Home from "../src/screens/home";
import Prescription from '../src/screens/prescription';
import AssistantAppointments from '../src/screens/assistantAppointments';
import Labs from '../src/screens/labs';
import blood from '../src/screens/blood';
import Doctors from '../src/screens/doctors';
import PharmacyService from '../src/screens/pharmacyService';
import Appointments from '../src/screens/appointments';

import AddMember from '../src/screens/addMember';
import Cart from './screens/cart';
import Notifications from '../src/screens/notifications';
import PatientFound from '../src/screens/patientFound';
import PaymentSelection from '../src/screens/paymentSelection';
import ConsultationDetail from '../src/screens/consultationDetail';
import MedicalHistory from '../src/screens/medicalHistory';
import Medicals from '../src/screens/medicals';
import DoctorProfile from '../src/screens/doctorProfile';
import ListQuotation from '../src/screens/listQuotation';

import Products from '../src/screens/products';
import Category from '../src/screens/category';
import TransctionHistory from '../src/screens/transctionHistory';
import TransctionHistoryUser from '../src/screens/transctionHistoryUser';

import AddTransction from '../src/screens/addTransction';
import ProductDetail from '../src/screens/productDetail';
import Video from '../src/screens/Video';
import Medicine from '../src/screens/medicine';
import ConsultationHistory from '../src/screens/consultationHistory';
import AddLocation from '../src/screens/addLocation';


import Join from "../src/scenes/join";
// import Join from "../src/scenes/accept";
import Meeting from "../src/scenes/meeting";


import Waiting from "./screens/waiting";

const Stack = createNativeStackNavigator();

function Navigator() {
  return (
    <Provider store={store}>
      <NavigationContainer >
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false}}>
          <Stack.Screen name="Splash" component={splash}  />

          <Stack.Screen name="Waiting" component={Waiting}  />

          <Stack.Screen name="Login" component={Login}  />
          <Stack.Screen name="App" component={Drawer}  screenOptions={{ headerShown: false}} />
          {/*  */}
          <Stack.Screen name="Home" component={Home}  screenOptions={{ headerShown: false}} />

          <Stack.Screen
            name="Join_Screen"
            component={Join}
            options={{ headerShown: false }}
          />
          
          <Stack.Screen
            name="Meeting_Screen"
            component={Meeting}
            options={{ headerShown: false }}
          />


          <Stack.Screen name="Prescription" component={Prescription}  screenOptions={{ headerShown: false}} />
         
          
          <Stack.Screen name="AssistantAppointments" component={AssistantAppointments}  screenOptions={{ headerShown: false}} />
          <Stack.Screen name="blood" component={Labs}  screenOptions={{ headerShown: false}} /> 
          <Stack.Screen name="Labs" component={blood}  screenOptions={{ headerShown: false}} />
          <Stack.Screen name="doctors" component={Doctors}  screenOptions={{ headerShown: false}} />
          <Stack.Screen name="PharmacyService" component={PharmacyService}  screenOptions={{ headerShown: false}} />
          <Stack.Screen name="doctorAppointments" component={Appointments}  screenOptions={{ headerShown: false}} />
          <Stack.Screen name="Category" component={Category}  screenOptions={{ headerShown: false}} />
          <Stack.Screen name="ListQuotation" component={ListQuotation}  screenOptions={{ headerShown: false}} />
          <Stack.Screen name="Products" component={Products}  screenOptions={{ headerShown: false}} />
          <Stack.Screen name="addMember" component={AddMember}  screenOptions={{ headerShown: false}} />
          <Stack.Screen name="patientFound" component={PatientFound}  screenOptions={{ headerShown: false}} />
          <Stack.Screen name="notifications" component={Notifications}  screenOptions={{ headerShown: false}} />
          <Stack.Screen name="DoctorProfile" component={DoctorProfile}  screenOptions={{ headerShown: false}} />
          <Stack.Screen name="TransctionHistoryUser" component={TransctionHistoryUser}  screenOptions={{ headerShown: false}} />
          <Stack.Screen name="Cart" component={Cart}  screenOptions={{ headerShown: false}} />
          <Stack.Screen name="ConsultationHistory" component={ConsultationHistory}  screenOptions={{ headerShown: false}} />
          <Stack.Screen name="ConsultationDetail" component={ConsultationDetail}  screenOptions={{ headerShown: false}} />
          <Stack.Screen name="ProductDetail" component={ProductDetail}  screenOptions={{ headerShown: false}} />
          <Stack.Screen name="MedicalHistory" component={MedicalHistory}  screenOptions={{ headerShown: false}} />
          <Stack.Screen name="PaymentSelection" component={PaymentSelection}  screenOptions={{ headerShown: false}} />
          <Stack.Screen name="AddTransction" component={AddTransction}  screenOptions={{ headerShown: false}} />
          <Stack.Screen name="Video" component={Video}  screenOptions={{ headerShown: false}} />
          <Stack.Screen name="Medicine" component={Medicine}  screenOptions={{ headerShown: false}} />
          <Stack.Screen name="Medicals" component={Medicals}  screenOptions={{ headerShown: false}} />
          <Stack.Screen name="AddLocation" component={AddLocation}  screenOptions={{ headerShown: false}} />
          <Stack.Screen name="Signup" component={Signup}  screenOptions={{ headerShown: false}} />
        
         

          </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default Navigator;


// export default class App extends React.Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <StatusBar
//           animated={true}
//           // backgroundColor={Constants.Colors.primaryBlue}
//           barStyle="default"
//           showHideTransition="slide"
//         />
        
//         <AppContainer />


//       </Provider>
//       // <Splash />
//         // <Text>dsjk</Text>
//     );
//   }
// }
