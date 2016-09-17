import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Pages from './Pages';
import { setPage } from '../actions';

class Pagination extends React.PureComponent {

  static propTypes = {
    limit: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    updatePage: PropTypes.func.isRequired
  }

  render() {
    const { limit, page, pages, total, updatePage } = this.props;
    const start = (limit * page) - (limit - 1);
    const end = limit * page <= total ? limit * page : total;
    return (
      <li className="nav-item page-picker">
        {total > 0 &&
          <span className="nav-link">
            {start} to&nbsp;
            {end} of {total}
          </span>
        }
        {total > 0 && pages > 1 &&
          <Pages
            current={page}
            pages={pages}
            pagesToDisplay={5}
            updatePage={updatePage}
          />
        }
      </li>
    );
  }

}

const mapStateToProps = (state) => {
  const { ui, } = state;
  const { limit, page, pages, total } = ui;
  return {
    limit,
    page,
    pages,
    total
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePage: (page) => {
      dispatch(setPage(page));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
