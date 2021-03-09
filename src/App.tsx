import React from 'react';
import { Container, Nav, NavItem, NavLink } from 'reactstrap';
import Report from './views/Report';
import Research from './views/Research';

interface Props {}

interface State {
  page: number
}

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      page: 0
    }
  }

  setPage(page: number) {
    this.setState({ page })
  }

  render() {
    const { page } = this.state
    
    return (
      <Container>
        <Nav className="mb-5">
          <NavItem>
            <NavLink href="#" onClick={() => this.setPage(0)}>Form</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={() => this.setPage(1)}>Report</NavLink>
          </NavItem>
        </Nav>
        {page === 0 ? <Research /> : <Report />}
      </Container>
    )
  }
}
