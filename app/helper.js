import React from 'react';
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
export function getLabel(label,labelVals){
  let itemTitle = label;
  if(labelVals)
    labelVals.map((lbl)=>{
    if(lbl.id === label) itemTitle = lbl.title;
  });
  return itemTitle;
}
export function getLabels(items,itemIndex,labelVals,showLink){
  const labels = [];
  if (!items) return;
  labelVals =  labelVals || [];
  for (let i=0; i < items.length; i++){
    const keyIndex = `${itemIndex}_${i}`;
    let itemTitle = items[i];
    labelVals.map((lbl)=>{
      if(lbl.id === items[i]) itemTitle = lbl.title;
    });
    if(showLink)
      labels.push(
        <Link className="label-link" key={keyIndex} to={`/?labels=${items[i]}`}>{itemTitle}</Link>
      );
    else if (typeof itemTitle === 'string'){
      itemTitle = itemTitle.replace(' development','');
      labels.push(
        <span key={keyIndex}>{itemTitle},</span>
      );
    }
  }
  return labels;
}

export function getMaintainers(maintainers, itemIndex) {
  const result = [];
  if(maintainers){
    for(let i = 0; i < maintainers.length; i++){
      const devIndex = `${itemIndex}_${i}`;
      const dev = maintainers[i].name || maintainers[i].id;
      if( i>1 && i+1 < maintainers.length ){
        result.push(
          <div key={devIndex}>({maintainers.length - 2} other contributers)</div>
        );
        i = maintainers.length;
      }
      else{
        result.push(
          <div key={devIndex}>{dev}</div>
        );
      }
    }
  }
  return result;
}

export function getMaintainersLinked(maintainers) {
  const result = maintainers.map((item, index) => {
    const name = item.name || item.id;
    return (
        <Link className="maintainer" key={index} to={`/?maintainers=${name}`}>{name}</Link>
    );
  });
  return result;
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
      This plugin has no dependencies.
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
