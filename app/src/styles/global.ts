import { green } from './variables';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * { box-sizing: border-box }

    body {
        font-family: Hack, monospace;
    }

    a {
        color: ${green};
        text-decoration: none;

        &:hover {
            color: ${green};
            text-decoration: underline;
        }
    }
`;
