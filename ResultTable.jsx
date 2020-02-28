import React from "react";
import truncate from "lodash/truncate";
import { Divider, Grid, Header, Image, Table } from "semantic-ui-react";

import { useStateValue } from "./store";
import styles from "./Styles";

const { Link, ClickableCell } = styles;

const formatForSearch = results => {
  return results.map(res => {
    return {
      title: res.title,
      image: res.primaryImageSmall,
      link: res.objectURL,
      id: res.objectID
    };
  });
};

function ResultTable() {
  const [{ data }, dispatch] = useStateValue();
  if (data.searchResults.length === 0) {
    return "";
  }
  return (
    <Grid.Row>
      <Grid.Column width={10}>
        <Divider hidden />
        <Table basic="very" celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">Details</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {formatForSearch(data.searchResults).map(result => {
              return (
                <Table.Row key={`${result.title}-${result.id}`}>
                  <ClickableCell
                    onClick={() =>
                      dispatch({ type: "updateId", id: result.id })
                    }
                  >
                    <Header as="h4" image>
                      <Image src={result.image} rounded size="mini" />
                      <Header.Content>
                        {truncate(result.title, { length: 70 })}
                      </Header.Content>
                    </Header>
                  </ClickableCell>
                  <Table.Cell textAlign="right">
                    <Link target="_blank" href={result.link}>
                      View on MET
                    </Link>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Grid.Column>
    </Grid.Row>
  );
}

export default ResultTable;
