import styled from "styled-components";
import { NavLink } from "react-router-dom";
const Error = () => {
  return (
    <Wrapper>
      <img
        src="../public/images/error.svg"
        alt="error"
        width={600}
        height={500}
      />
      <NavLink to="/">
        <button type="submit" className="btn">
          Quay trở lại
        </button>
      </NavLink>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .btn {
    margin-top: 0.8rem;
    font-size: 1.6rem;
  }
`;
export default Error;
