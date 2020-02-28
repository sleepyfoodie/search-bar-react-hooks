import React from "react";
import { Container } from "semantic-ui-react";

import { StateProvider } from "./store";
import ResultTable from "./ResultTable";
import SearchBar from "./SearchBar";
import styles from "./Styles";

const { StyledGrid } = styles;

function App() {
  const initialState = {
    data: {
      searchResults: []
    },
    ui: {
      hasError: false,
      isDetails: false,
      isLoading: false,
      selectedId: null,
      query: ""
    }
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "newSearchStart":
        return {
          data: {
            searchResults: action.newQuery ? state.data.searchResults : []
          },
          ui: action.newUi
        };
      case "newSearchSuccess":
        return {
          data: { searchResults: action.searchResults },
          ui: {
            ...state.ui,
            hasError: action.hasError,
            isLoading: action.isLoading
          }
        };
      case "newSearchError":
        return {
          ui: {
            ...state.ui,
            errorMsg: action.errorMsg,
            isLoading: action.isLoading
          },
          data: { ...state.data }
        };
      case "updateId":
        return {
          ui: { ...state.ui, selectedId: action.id, isDetails: true },
          data: { ...state.data }
        };
      default:
        return state;
    }
  };
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Container>
        <StyledGrid>
          <SearchBar />
          <ResultTable />
        </StyledGrid>
      </Container>
    </StateProvider>
  );
}

export default App;
