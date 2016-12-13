import React from 'react';
// import FontAwesome from 'react-fontawesome';
// import FaLink from 'react-icons/lib/fa/link';
import { MdInsertLink } from 'react-icons/lib/md/';
// import * as FontAwesome from 'react-icons/fa';

const Chain = (props) => {
  const linkArray = [];
  for (var i = 0; i < props.count; i++) {
    linkArray.push(<MdInsertLink />);
  }
  return (
    <p>
      {
        linkArray
      }
    </p>
  );
};

export default Chain;
