import { green, backgroundColor } from './variables';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * { box-sizing: border-box }

    body {
        font-family: Hack, monospace;
        background: ${backgroundColor};
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
