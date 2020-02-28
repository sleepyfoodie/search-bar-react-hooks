import React from "react";
import { Grid } from "semantic-ui-react";
import axios from "axios";
import debounce from "lodash/debounce";

import { useStateValue } from "./store";
import styles from "./Styles";

const { CenteredRow, JumboRed, FullWidthSearch, Header } = styles;

function SearchBar() {
  const [{ ui, data }, dispatch] = useStateValue();
  const newSearch = debounce(query => {
    const promise = axios.post("http://localhost:8080/search", {
      q: query
    });
    promise.then(response => {
      const isCorrectResponse = JSON.parse(response.config.data).q === query;
      dispatch({
        type: "newSearchSuccess",
        searchResults: isCorrectResponse ? response.data : data.searchResults,
        hasError: query && response.data.length === 0,
        isLoading: false
      });
    });
    promise.catch(error => {
      dispatch({
        type: "newSearchError",
        isLoading: false,
        errorMsg: error
      });
    });
  }, 1000);
  const handleSearchChange = e => {
    const query = e.target.value;
    dispatch({
      type: "newSearchStart",
      newUi: { ...ui, query, isLoading: query ? true : false, hasError: false }
    });
    query !== "" && newSearch(query);
  };
  return (
    <CenteredRow>
      <Grid.Column width={10}>
        <JumboRed>
          <Header>The Metropolitan Museum of Collection</Header>
          <p>
            Experience 5,000 Years of Art at The Met! Tell us what you are
            looking for and we will find it for you.
          </p>
          <FullWidthSearch
            loading={ui.isLoading}
            icon="search"
            placeholder="What is inspiring you now?"
            value={ui.query}
            onChange={e => handleSearchChange(e)}
          />
          {ui.hasError && <p>No results for "{ui.query}" :( </p>}
        </JumboRed>
      </Grid.Column>
    </CenteredRow>
  );
}

export default SearchBar;
