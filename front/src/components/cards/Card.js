import React from 'react'
import './Card.css'
const colors = [
    {
      primaryColor: "rgba(93, 147, 225, 1)",
      btnColor: "rgba(93, 147, 225, 0.7)",
      hoverColor: "rgba(93, 147, 225, 1)",
      shadowColor: "rgba(93, 147, 225, 0.3)",
      secondaryColor: "rgba(93, 147, 229, 0.1)",
    },
    {
      primaryColor: "hsla(16, 87%, 62%,1)",
      btnColor: "hsla(16, 87%, 62%,0.7)",
      hoverColor: "hsla(16, 87%, 62%,1)",
      shadowColor: "hsla(16, 87%, 62%,0.3)",
      secondaryColor: "hsla(16, 87%, 62%,0.09)",
    },
    {
      primaryColor: "rgba(93, 194, 80, 1)",
      btnColor: "rgba(93, 194, 80, 0.6)",
      hoverColor: "rgba(93, 194, 80, 1)",
      shadowColor: "rgba(93, 194, 80, 0.3)",
      secondaryColor: "rgba(93, 194, 80, 0.08)",
    },
    {
      primaryColor: "rgba(244, 134, 135, 1)",
      btnColor: "rgba(244, 134, 135, 0.7)",
      hoverColor: "rgba(244, 134, 135, 1)",
      shadowColor: "rgba(244, 134, 135, 0.3)",
      secondaryColor: "rgba(244, 134, 135, 0.08)",
    },
    {
      primaryColor: "rgba(185, 100, 247, 1)",
      btnColor: "rgba(177,79,243,0.8)",
      hoverColor: "rgba(177,79,243,1)",
      shadowColor: "rgba(177,79,243,0.3)",
      secondaryColor: "rgba(185, 100, 247, 0.07)",
    },
  ];
const Card = ({data,index}) => {
    function changeColor(e) {
        e.target.style.color = colors[index % 5].hoverColor;
      }
    
      function actualColor(e) {
        e.target.style.color = colors[index % 5].btnColor;
      }
    
  
    
      return (
        <div
          className="card-wrapper mr-5"
          style={{ boxShadow: `0 0 1.5rem ${colors[index % 5].shadowColor}` }}
        >
          <div
            className="card-top"
            style={{ backgroundColor: colors[index % 5].primaryColor }}
          />
          <div className="task-holder">
            <span
              className="card-header"
              style={{
                backgroundColor: colors[index % 5].secondaryColor,
                borderRadius: "10px",
              }}
            >
              {data.title}
            </span>
            <p>{data.content}</p>
            <div style={{ position: "absolute", right: "13px", bottom: "6px" }}>
              
              
            </div>
          </div>
          
        </div>
      );
    
}

export default Card