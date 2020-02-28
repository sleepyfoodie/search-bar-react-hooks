import React from "react";
import { Divider, Grid, Header, Image, Label, Modal } from "semantic-ui-react";
import isEmpty from "lodash/isEmpty";
import startCase from "lodash/startCase";

import styles from "./Styles";
import { useStateValue } from "./store";
const { StyledButton, StyledSegment, StyledP } = styles;

// add default image empty array, seperate it out from component
function renderImages(images) {
  return (
    <Grid columns={4}>
      {images.map(image => {
        return (
          <Grid.Column key={image}>
            <Image src={image} size="small" />
          </Grid.Column>
        );
      })}
    </Grid>
  );
}

function DetailsSegmentModal() {
  const [{ data, ui }, dispatch] = useStateValue();
  const article = ui.selectedId
    ? data.searchResults.find(art => art.objectID === ui.selectedId)
    : {};
  return (
    <Modal basic size="small" open={ui.isDetails}>
      <StyledSegment color="red">
        <Header as="h2" content={article.title} />
        <Divider />
        <Modal.Content>
          {!isEmpty(article) && (
            <Grid columns={3}>
              {[
                "department",
                "culture",
                "origin",
                "date",
                "dimensions",
                "creditLine",
                "medium",
                "location"
              ].map(title => {
                return (
                  article[title] && (
                    <Grid.Column key={title}>
                      <Header as="h3">{startCase(title)}:</Header>
                      <StyledP>{article[title]}</StyledP>
                    </Grid.Column>
                  )
                );
              })}
              {!isEmpty(article.tags) && (
                <Grid.Column>
                  <Header as="h3">Tags:</Header>
                  {article.tags.map(tag => (
                    <Label key={tag} color="red" content={tag} />
                  ))}
                </Grid.Column>
              )}
            </Grid>
          )}
          {renderImages((article.images = []))}
          <Divider />
        </Modal.Content>
        <Modal.Actions>
          <Grid>
            <Grid.Column textAlign="right">
              <StyledButton
                onClick={() => dispatch({ type: "closeModal" })}
                basic
                color="red"
                compact
              >
                Close
              </StyledButton>
            </Grid.Column>
          </Grid>
        </Modal.Actions>
      </StyledSegment>
    </Modal>
  );
}

export default DetailsSegmentModal;
