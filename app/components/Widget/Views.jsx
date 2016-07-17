import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';

const items = ['Tiles', 'List', 'Table'];

export class View extends PureComponent {

  static propTypes = {
    title: PropTypes.any.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const { title, onClick, isActive } = this.props;
    return (<button className={"btn btn-secondary " + isActive}
               onClick={onClick}>x</button>
    );
  }
}
export default class Views extends PureComponent {

  static propTypes = {
    router: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };

  render() {
    const {location, router} = this.props;
    const {view = 'Tiles'} = location.query;
    return (<fieldset className='btn-group'>

          { items.map((item, index) => {
            const isActive = (item === location.query.view)?'active':'';
            return (<View key={index}
                          isActive={isActive}
                          title={item}
                          onClick={()=> {
             location.query.view = item;
             router.replace(location);
            }}/>);
          })}
      </fieldset>
    );
  }

}
