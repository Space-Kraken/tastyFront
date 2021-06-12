import React from "react";
import Navbar from "./../Components/Navbar";
import List from "../Pages/List";
import Requester from "./../Pages/Requester";
import Request from "./../Pages/Request";
import Schoolarship from "./../Pages/Schoolarship";
import Uploader from "./../Pages/FileUploader";
import { useCookies } from "react-cookie";
import { BrowserRouter as RouterPro, Switch, Route } from "react-router-dom";

export default function Router() {
  const [cookies, setCookies, removeCookie] = useCookies([
    "requester",
    "schoolarship",
  ]);
  return (
    <RouterPro>
      <Navbar />
      <Switch>
        <Route exact path="/" component={List} />
        <Route path="/schoolarships-list" component={List} />
        <Route path="/requester" render={(props) => <Requester />} />
        <Route path="/request-schoolarship" render={(props) => <Request />} />
        <Route path="/schoolarship" render={(props) => <Schoolarship />} />
        <Route path="/UploadDocuments" render={(props) => <Uploader />} />
      </Switch>
    </RouterPro>
  );
}
