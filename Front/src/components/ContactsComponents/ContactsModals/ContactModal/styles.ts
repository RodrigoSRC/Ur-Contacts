import styled from "styled-components";

export const Container = styled.div`
  top: 0;
  background-color: rgba(0, 0, 0, .5);
  width: 100vw;
  height: 100vh;
  position: fixed;

  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    background-color: var(--grey-3);
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0  0 25px 0 var(--color-primary);
    width: 100%;
    max-width: 250px;
  }
`