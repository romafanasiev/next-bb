import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => (
  <Html lang="en">
    <Head />
    <script
      src="https://apis.google.com/js/platform.js?onload=init"
      async
      defer
    ></script>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
