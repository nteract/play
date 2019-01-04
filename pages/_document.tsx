import React from "react";
import Document, {
  Head,
  Main,
  NextScript,
  NextDocumentContext,
  DefaultDocumentIProps
} from "next/document";
import flush from "styled-jsx/server";

interface DocumentProps extends DefaultDocumentIProps {
  html?: string;
  head?: Array<React.ReactElement<any>>;
  styles?: React.ReactNode;
}

class MyDocument extends Document {
  static getInitialProps(context: NextDocumentContext): DocumentProps {
    const renderPage = context.renderPage;
    const { html, head, buildManifest } = renderPage();
    const styles = flush();
    return { html, head, styles, buildManifest };
  }

  getChildContext() {
    return { _documentProps: this.props };
  }

  render() {
    return (
      <html lang="en-US">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
