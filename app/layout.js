import '@/styles/globals.css';

export const metadata = {
  title: '김연준의 여행 플래너',
  description: '',
};
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  minimunScale: 0,
  maximumScale: 1,
  viewportFit: 'cover',
};
export default function RootLayout ({ children }) {
  return (
    <html lang='ko'>
      <head>
        <meta charSet='UTF-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge, chrome=1' />
        <meta name='viewport' content='width=device-width, initial-scale=1, minimum-scale=0, maximum-scale=1' />
        <meta name='robots' content='index,follow' />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"></link>
        <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=3a05cb383c7247a0d8564f72b8ec69af&libraries=services"></script>
        <title>김연준의 여행 플래너</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
