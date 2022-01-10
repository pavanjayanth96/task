import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link, Routes } from "react-router-dom";

import axios from  "axios";
import Test from './component/data';
import Search from './component/Search';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { addMembers } from './redux/searchSlice';



function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchFun = async () => {
  //     const response = await axios
  //       .get(
  //         `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
  //       )
  //       .catch((err) => {
  //         console.log("Err:::", err);
  //       });
  //     dispatch(addMembers(response.data));
  //     console.log("Response:", response);
  //   };
  //   fetchFun();
  // }, []);


  return (
    <div className="App">
     <Search/>
     {/* <View/> */}
    </div>
  );
}

export default App;



