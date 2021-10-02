import React from "react";
import { StatusBar } from "react-native";
import { AppNavigation } from "./src/navigation";
import { AlertBottomSnackbar } from "./src/snackbar";

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"/>
      <AppNavigation />
      <AlertBottomSnackbar/>
    </>
  );
}

export default App;