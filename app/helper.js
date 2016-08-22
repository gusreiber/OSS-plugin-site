import React from 'react';
import {Icon} from 'react-material-icons-blue';
import { Link } from 'react-router';

export function getScoreClassName(score) {
  score = score || '4';
  return `i scr_${score}`;
}
export function getCategories(items,itemIndex){
  const categories = [];
  if (!items) return;
  for (let i=0; i < items.length; i++){
    const keyIndex = `${itemIndex}_${i}`;
    const itemTitle = items[i];
    categories.push(
      <span key={keyIndex}>{itemTitle} </span> 
    );
  }
  return categories;
}
export function getLabels(items,itemIndex){
  const labels = [];
  if (!items) return;
  for (let i=0; i < items.length; i++){
    const keyIndex = `${itemIndex}_${i}`;
    const itemTitle = items[i];
    labels.push(
      <span key={keyIndex}>{itemTitle} </span> 
    );
  }
  return labels;
}

export function getMaintainers(devs,itemIndex) {
  const maintainers = [];
  if(devs){
    for(let i = 0; i < devs.length; i++){
      const devIndex = `${itemIndex}_${i}`;
      const dev = devs[i].name || devs[i].developerId;
      if( i>1 && i+1 < devs.length ){
        maintainers.push(
          <div key={devIndex}>({devs.length - 2} other contributers)</div>
        );
        i = devs.length;
      }
      else{
        maintainers.push(
          <div key={devIndex}>{dev}</div>
        );
      }
    }
  }
  return maintainers;
}

export function getMaintainersLinked(developers) {
  const maintainers = developers.map((item, index) => {
    const name = item.name || item.developerId;
    return (
        <Link key={index} to={`/?authors=${name}`}>{name}</Link>
    );
  });
  return maintainers;
}

export function getDependencies(rawdependencies) {
  const dependencies = rawdependencies
    .sort((a, b) => a.optional === b.optional ? 0: a.optional? 1 : -1)
    .map((item, index) => {
    return (<div key={index}>
       <Link className={item.optional ? 'optional' : 'required'} to={`/${item.name}`} >{item.name} v.{item.version}</Link>
    </div>);
  });
  if(!dependencies || dependencies.length === 0) {
    dependencies.push(<div key={1}>
      <Icon icon="bookmark_outline"/>
      none
    </div>);
  }
  return dependencies;
}

 /* FIXME:
  This isn't the best way to do this, but plugins currently have a lot
  of repetitive goop in their titles.
  plugins leading with 'Jenkins' is particularly bad because then sorting
  on the name lumps a bunch of plugins toggether incorrectly.
  but even 'plugin' at the end of the string is just junk.
  All of these are plugins.
  */
export function cleanTitle(title) {
  return title.replace('Jenkins ','').replace(' Plugin','').replace(' plugin','').replace(' Plug-in','').replace(' for Jenkins','').replace('Hudson ','');
}
