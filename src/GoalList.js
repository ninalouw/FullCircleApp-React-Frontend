import React from 'react';
import GoalItem from './GoalItem';

const GoalList = (props) => {
  return (
    <div>
    <h1> Your Goals </h1>
     <ul className="GoalList">
       {
         props.goals.map(
           (goal, index) => {
             return (
               <GoalItem
                 goal={goal}
                 checkFunction={props.checkFunction}
                 deleteFunction={props.deleteFunction}
                 key={goal.id}
              />
             );
           }
         )
       }
     </ul>
   </div>
  );
};

export default GoalList;
