/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";

const variations = {
  blur: css`
    background-color: var(--backdrop-color);
    backdrop-filter: blur(4px);
  `,

  transparent: css`
    background-color: transparent;
  `,
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  transition: all 0.5s;

  ${(props) => variations[props.variant]}
`;

Overlay.defaultProps = {
  variant: "blur",
};

export default Overlay;
