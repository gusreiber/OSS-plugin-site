import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';

const items = ['Tiles', 'List', 'Table'];

export class View extends PureComponent {

  static propTypes = {
    title: PropTypes.any.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const { title, onClick, isActive,icon } = this.props;
    return (<button className={"btn btn-secondary " + isActive}
               onClick={onClick}><i className={icon}></i></button>
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
    const {view = 'Tiles'} = location.query.view;
    return (<fieldset className='btn-group'>

          { items.map((item, index) => {
            const isActive = (item === view )?'active':'';
            const icon = (item === 'Tiles')? 'icon-grid-alt':
              (item === 'List')? 'icon-list2' :
                (item === 'Table')? 'icon-menu3':'';        
            return (<View key={index}
                      icon={icon}
                      isActive={isActive}
                      title={item}
                      onClick={(e)=> {
                        e.preventDefault()
                        location.query.view = item;
                        router.replace(location);
            }}/>);
          })}
      </fieldset>
    );
  }

}
