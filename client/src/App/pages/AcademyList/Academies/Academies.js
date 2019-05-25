import React from 'react';

const Academies = ( props ) => {

    return(
          <div>
            {/* Render the list of academies */}
            {props.list.map((item) => {
              return(
                <div>
                  {item}
                </div>
              );
            })}
          </div>
    )
};
export default Academies;