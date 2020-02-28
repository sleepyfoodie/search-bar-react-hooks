import { Button, Grid, Input, Segment, Table } from "semantic-ui-react";
import styled from "styled-components";

const StyledGrid = styled(Grid)`
  && {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const CenteredRow = styled(Grid.Row)`
  resize: vertical;
`;

const JumboRed = styled.div`
  background-color: #e4002b;
  border-radius: 4px;
  color: #ffffff;
  padding: 40px 30px;
`;

const FullWidthSearch = styled(Input)`
  width: 100%;
`;

const Header = styled.h1`
  font-family: "Playfair Display", serif;
`;

const Link = styled.a`
  border: 1px solid #e4002b;
  border-radius: 4px;
  color: #e4002b;
  cursor: pointer;
  font-size: 1em;
  :hover {
    background-image: linear-gradient(to right, #ce0058, #e4002b, #fe8800);
    color: #ffffff;
  }
  margin: 0px 5px;
  padding: 7px 20px;
`;

const StyledButton = styled(Button)`
  &&&& {
    :hover {
      background-color: none !important;
      background-image: linear-gradient(to right, #ce0058, #e4002b, #fe8800) !important;
      color: #ffffff !important;
    }
  }
`;

const StyledSegment = styled(Segment)`
  color: black;
`;

const StyledP = styled.p`
  margin-top: -10px !important;
`;

const ClickableCell = styled(Table.Cell)`
  cursor: pointer;
  :hover {
    h4 {
      .content {
        color: #e4002b;
      }
    }
  }
`;

const styles = {
  StyledGrid,
  CenteredRow,
  JumboRed,
  FullWidthSearch,
  Header,
  Link,
  StyledButton,
  StyledSegment,
  StyledP,
  ClickableCell
};

export default styles;
