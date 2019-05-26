import React from 'react';

const Academies = ( props ) => {

    return(
          <div>
            {/* Render the list of academies */}
            {props.list.map((item) => {
              return(
                <div key={item.name}>
                  {item.name} {item.description} {item.grade} {item.tag}
                </div>
              );
            })}
          </div>
    )
};

export default Academies;