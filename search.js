import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addMembers, getAllMembers } from "../redux/searchSlice";
import MembersListing from "./MembersListing";
import Pagination from "./pagination";
import "./search.scss";

const Search = () => {
  const dispatch = useDispatch();

  // const members = useSelector(getAllMembers);
  // console.log("members::::", members);

  useEffect(() => {
    const fetchFun = async () => {
      console.log("----------")
      const response = await axios
        .get(
          `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
        )
        .catch((err) => {
          console.log("Err:::", err);
        });
     dispatch(addMembers(response.data));
      // console.log("Response:", response);
    };
    fetchFun();
  }, []);

  const members = useSelector(getAllMembers);
  console.log("members::::", members.members);
  const list = members.members;
  console.log("list::::", list);

  let PageSize = 10;

  const [currentPage, setCurrentPage] = useState(1);
  let [currentTableData, setCurrentTableData] = useState([]);


   currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return list.members.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  console.log("currentTableData", currentTableData);

  let [checked, setChecked] = useState(false);
  const handleCheckList = () => {
    if (checked == true) {
      // debugger
      setChecked(false)
    } else
      setChecked(true)
  };


  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchString, setSearchedString] = React.useState("")
 
 

  const handleSearch = (event) => {
    debugger
    let search = []
    setFilteredData([])
    setSearchedString(event.target.value);
    let e = event.target.value
    if (e == "") { return null; }
    let lowercasedValue = e.toLowerCase();
    currentTableData && currentTableData.map((item) => {
      if (item.name) {
        debugger
        if(item.name.toLowerCase().includes(lowercasedValue) || item.role.toLowerCase().includes(lowercasedValue))
        search.push(item);
        setFilteredData(search)
      }
    })
  }

  console.log(filteredData);

  const handleEdit = (name) => {
    debugger
    console.log("data", name)
  }

  const handleDelete = (data) => {
    let del = [];

    setCurrentTableData([])
   currentTableData && currentTableData.map((item) => {
    console.log( data.id);
    console.log( item.id);

    

    if(item.id == data.id){
      currentTableData.splice(item, 1);    
       // setCurrentTableData(currentTableData)

    }
  else{
    del.push(item);
  }

   })
   setCurrentTableData(del)

  }

  //   const handleSearch = (event) => {
  //     debugger
  //     let value = event.target.value.toLowerCase();
  //     let result = [];
  //     console.log(value);

  //     result = currentTableData.filter((data) => {
  //       return data.name//.search(value) != -1;
  //   })
  //   console.log("result", result)
  //   setFilteredData(result);
  // }

  return (
    <div>
      search
      <div className="container" style={{ padding: "0.5rem 0rem" }}>
        <label>Search:</label>
        <input type="text" onChange={(event) => handleSearch(event)} />
        <div className="row">
          <div className="col-sm">
            <input type="checkbox" onClick={handleCheckList} />
          </div>
          
          <div className="col-sm">name</div>
          <div className="col-sm">email</div>
          <div className="col-sm">role</div>
          <div className="col-sm">Action</div>

          <div className="row" >
            { filteredData && filteredData.length=== 0 && currentTableData.map((name) => {
              return (
                <>
                  <div className="container" style={{ padding: "0.5rem 0rem" }}>
                    <div className="row">
                      <div className="col-sm">
                        {checked ? <input type="checkbox" checked /> : <input type="checkbox" />}
                      </div>
                      <div className="col-sm">{name.name}</div>
                      <div className="col-sm">{name.email}</div>
                      <div className="col-sm">{name.role}</div>
                      <div className="col-sm">
                        <div className = "row">

                        <div className="col-sm" onClick = { () => handleEdit(name)}>
                        <i class="bi bi-pencil-square" > </i>
                        </div>
                       <div className="col-sm" onClick = { () => handleDelete(name)}>
                       <i class="bi bi-trash-fill"></i>
                       </div>
                      </div>
                      </div>


                    </div>
                  </div>
                </>
              );
            })}
            </div>
            <div>
            <div className="row" >
            { filteredData && filteredData.map((name) => {
              return (
                <>
                  <div className="container" style={{ padding: "0.5rem 0rem" }}>
                    <div className="row">
                      <div className="col-sm">
                        {checked ? <input type="checkbox" checked /> : <input type="checkbox" />}
                      </div>
                      <div className="col-sm">{name.name}</div>
                      <div className="col-sm">{name.email}</div>
                      <div className="col-sm">{name.role}</div>
                      <div className="col-sm">
                        <div className = "row">

                        <div className="col-sm" onClick = { () => handleEdit(name)}>
                        <i class="bi bi-pencil-square" > </i>
                        </div>
                       <div className="col-sm" onClick = { () => handleDelete(name)}>
                       <i class="bi bi-trash-fill"></i>
                       </div>
                      </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
            </div>
            </div>
          {/* <div className="col-sm">
<i className="fa fa-trash-alt btn-icon-left"
onClick = {() => handleClick(fileData.lang)}></i>
<FormattedMessage {...commonMessages.removeBtn} />
</div> */}
        </div>
      </div>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={list.members.length }
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
      {/* </tbody> */}
    </div>
  );
};

export default Search;
