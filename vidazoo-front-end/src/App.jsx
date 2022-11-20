import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AbcIcon from "@mui/icons-material/Abc";
import getDomainsData from "./network/getDomainsData";
import SearchBarWithFilterAndDownload from "./components/SearchBarWithFilterAndDownload";
import DomainsTable from "./components/DomainsTable";
import "./Styles/App.css";

function App() {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [toggleSort, setToggleSort] = useState("desc");

  useEffect(() => {
    if (domains?.length === 0) {
      getWebsiteAdDomains();
    }
  }, [domains]);

  useEffect(() => {
    if (searchQuery?.length > 0) {
      setDisplayData(searchQuery);
    }
  }, [searchQuery, domains]);

  useEffect(() => {
    if (toggleSort == "desc") {
      console.log("toggleSortdesc", toggleSort);
      const sortDisplayDataDesc = displayData?.sort(function (a, b) {
        return parseFloat(b?.count) - parseFloat(a?.count);
      });
      setDisplayData([...sortDisplayDataDesc]);
    } else if (toggleSort == "asc") {
      console.log("toggleSortasc", toggleSort);
      const sortDisplayDataAsc = displayData?.sort(function (a, b) {
        return parseFloat(a?.count) - parseFloat(b?.count);
      });
      setDisplayData([...sortDisplayDataAsc]);
    } else if (toggleSort == "name") {
      console.log("toggleSortname", toggleSort);
      const sortDisplayDataName = displayData?.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
      setDisplayData([...sortDisplayDataName]);
    }
  }, [toggleSort]);

  const getWebsiteAdDomains = async () => {
    setLoading(true);
    const response = await getDomainsData();
    const sortedResponse = response?.sort(function (a, b) {
      return parseFloat(b.count) - parseFloat(a.count);
    });
    setDomains(sortedResponse);
    setDisplayData(sortedResponse);
    setLoading(false);
  };

  return (
    <>
      <Typography variant="h2" className="site-header-text">
        Ads.txt crawler
      </Typography>
      <Container className="Site-body">
        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          <>
            <SearchBarWithFilterAndDownload
              domains={domains}
              setSearchQuery={setSearchQuery}
              toggleSort={toggleSort}
              setToggleSort={setToggleSort}
              displayData={displayData}
            />
            <DomainsTable
              headers={[
                "Domain",
                [
                  "Count",
                  <IconButton
                    sx={{ p: "10px", color: "rgb(229, 107, 111);" }}
                    aria-label="filter"
                    onClick={() => {
                      setToggleSort("desc");
                    }}
                    key="desc"
                  >
                    <ArrowDownwardIcon />
                  </IconButton>,
                  <IconButton
                    sx={{ p: "10px", color: "rgb(229, 107, 111);" }}
                    aria-label="filter"
                    onClick={() => {
                      setToggleSort("asc");
                    }}
                    key="asc"
                  >
                    <ArrowUpwardIcon />
                  </IconButton>,
                  <IconButton
                    sx={{ p: "10px", color: "rgb(229, 107, 111);" }}
                    aria-label="filter"
                    onClick={() => {
                      setToggleSort("name");
                    }}
                    key="name"
                  >
                    <AbcIcon />
                  </IconButton>,
                ],
              ]}
              displayData={displayData}
            />
          </>
        )}
      </Container>
    </>
  );
}

export default App;
