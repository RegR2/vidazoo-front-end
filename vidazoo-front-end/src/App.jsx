import React, { useState, useEffect } from "react";
import { Container, Typography, CircularProgress } from "@mui/material";
import getDomainsData from "./network/getDomainsData";
import SearchBar from "./components/SearchBar";
import DomainsTable from "./components/DomainsTable";
import "./Styles/App.css";

function App() {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState([]);
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    if (domains.length === 0) {
      getWebsiteAdDomains();
    }
  }, [domains.length]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setDisplayData(searchQuery);
    }
  }, [searchQuery, domains]);

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
            <SearchBar domains={domains} setSearchQuery={setSearchQuery} />
            <DomainsTable
              headers={["Domain", "Count"]}
              displayData={displayData}
            />
          </>
        )}
      </Container>
    </>
  );
}

export default App;
