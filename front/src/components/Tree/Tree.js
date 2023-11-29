import React from 'react'
import './tree.css'
const Tree = ({treeData}) => {
    const treeRendering = (treeData) => {
    
        return (
            <>
                    <ul>
                {
                    treeData.map((item)=>                
                        <li className={item.text+item.id}>
                            <div>{ item.id}</div>
                            {
                                item.children && item.children.length ?
                                treeRendering(item.children)
                                :''
                            }
                        </li>
                    )            
                    
                }
                </ul>
            </>
        )
      }
  return (
    <div className="tree">
  {
      treeRendering(treeData)
  }

                  
</div>
  )
  
}

export default Tree