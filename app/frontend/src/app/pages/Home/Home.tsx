import React from 'react';
import Wrapper from 'app/frontend/src/app/components/Wrapper/Wrapper';
import './Home.css';

const Home: React.FC = () => {
  return (
    <Wrapper title="Mauricio's Application">
      <div>
        <p>Welcome</p>
        <p>this is a page to test ionic library</p>
      </div>
    </Wrapper>
  );
};

export default Home;
