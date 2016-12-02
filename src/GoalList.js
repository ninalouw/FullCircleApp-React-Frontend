import React from 'react';
import GoalItem from './GoalItem';

const GoalList = (props) => {
  return (
     <ul className="GoalsList">
       {
         props.goals.map (
           (goal, index) => {
             return (
               <GoalItem
                 goal={goal}
                 key={goal.id}/>
             );
           }
         )
       }
     </ul>
  );
};

export default GoalList;
