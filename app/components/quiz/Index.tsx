//Timer.tsx: This component represents the timer functionality in your app. 
// It could use the useEffect hook to update the elapsed time.

import React, { useEffect, useState } from 'react';

function Index(props: any) {
  const indexArray = [
    '1 - • - • - • - •', 
    '1 - 2 - • - • - •', 
    '1 - 2 - 3 - • - •', 
    '1 - 2 - 3 - 4 - •', 
    '1 - 2 - 3 - 4 - 5',
    ];

  const [text, setText] = useState(indexArray[props.index]);

  useEffect(() => {
    setText(indexArray[props.index]);
  }, [props.index, indexArray]);


  return (
    <div>
      <h2>{text}</h2>
    </div>
  );
}

export default Index;