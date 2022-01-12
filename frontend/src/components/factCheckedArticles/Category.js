import React from 'react'
import './container.css';

function Category() {
    return  (
        <div >
            <div className='sidenav'>
                <div className='top'>
                    <h3 className='categoryLabel'>Category</h3>
                    <a  href="verified/all" >All</a>
                </div>
                <div>
                    <a  href="verified/health" >Health</a>
                </div>
                <div>
                    <a  href="verified/economic" >Economic</a>
                </div>
                <div>
                    <a  href="verified/environment" >Environment</a>
                </div>
                <div>
                    <a href="verified/technology" >Technology</a>
                </div>
                <div>
                    <a href="verified/lifestyle"  >Life Style</a>
                </div>
                <div>
                    <a href="verified/international" >International</a>
                </div>
            </div> 
        </div>
    )
}

export default Category;