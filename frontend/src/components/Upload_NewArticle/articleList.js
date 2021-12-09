import React from 'react';
import ArticleItem from './articleItem';

const ArticleList = props =>{
    let content;
    if (!props.item || props.items.length ===0){
        content = <p>Could not find any article</p>
    } else {
        content =(
            <ul>
                {props.item.map(p => (
                    <ArticleItem key={p.id} name={p.value} />
                ))}
            </ul>
        )
    }
} ;
export default ArticleList;