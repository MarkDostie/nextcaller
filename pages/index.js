// pages/index.js
import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Home({ callerInfo }) {
  const [clientTime, setClientTime] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setClientTime(new Date().toLocaleString());
    
    // Update time every second
    const interval = setInterval(() => {
      setClientTime(new Date().toLocaleString());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="container">
      <Head>
        <title>CloudFront Caller Information</title>
        <meta name="description" content="Display caller information from CloudFront" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">
          Welcome to <span className="cloudfront">CloudFront</span> Caller Info
        </h1>

        <p className="description">
          This page displays information about your location and connection as determined by CloudFront
        </p>

        <div className="grid">
          <div className="card">
            <h2>🌍 Location Information</h2>
            <div className="info-item">
              <strong>Country:</strong> {callerInfo.country || 'Unknown'}
            </div>
            <div className="info-item">
              <strong>City:</strong> {callerInfo.city || 'Unknown'}
            </div>
            <div className="info-item">
              <strong>Region:</strong> {callerInfo.region || 'Unknown'}
            </div>
            <div className="info-item">
              <strong>Timezone:</strong> {callerInfo.timezone || 'Unknown'}
            </div>
          </div>

          <div className="card">
            <h2>📱 Device Information</h2>
            <div className="info-item">
              <strong>Device Type:</strong> {callerInfo.deviceType || 'Unknown'}
            </div>
            <div className="info-item">
              <strong>Is Mobile:</strong> {callerInfo.isMobile ? 'Yes' : 'No'}
            </div>
            <div className="info-item">
              <strong>Is Desktop:</strong> {callerInfo.isDesktop ? 'Yes' : 'No'}
            </div>
            <div className="info-item">
              <strong>Is Tablet:</strong> {callerInfo.isTablet ? 'Yes' : 'No'}
            </div>
            <div className="info-item">
              <strong>Is Smart TV:</strong> {callerInfo.isSmartTV ? 'Yes' : 'No'}
            </div>
          </div>

          <div className="card">
            <h2>🌐 Connection Information</h2>
            <div className="info-item">
              <strong>IP Address:</strong> {callerInfo.ipAddress || 'Unknown'}
            </div>
            <div className="info-item">
              <strong>User Agent:</strong> {callerInfo.userAgent || 'Unknown'}
            </div>
            <div className="info-item">
              <strong>Accept Language:</strong> {callerInfo.acceptLanguage || 'Unknown'}
            </div>
            <div className="info-item">
              <strong>CloudFront Edge:</strong> {callerInfo.cloudFrontEdge || 'Unknown'}
            </div>
          </div>

          <div className="card">
            <h2>🕐 Time Information</h2>
            <div className="info-item">
              <strong>Server Time:</strong> {callerInfo.serverTime || 'Unknown'}
            </div>
            <div className="info-item">
              <strong>Client Time:</strong> {clientTime}
            </div>
            <div className="info-item">
              <strong>Request ID:</strong> {callerInfo.requestId || 'Unknown'}
            </div>
          </div>
        </div>

        <div className="raw-data">
          <h3>Raw Headers (for debugging)</h3>
          <pre>{JSON.stringify(callerInfo.rawHeaders, null, 2)}</pre>
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          max-width: 1200px;
          width: 100%;
        }

        .title {
          margin: 0 0 1rem;
          line-height: 1.15;
          font-size: 3rem;
          text-align: center;
          color: white;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .cloudfront {
          color: #ff9500;
          text-decoration: none;
        }

        .description {
          line-height: 1.5;
          font-size: 1.2rem;
          text-align: center;
          color: #f0f0f0;
          margin-bottom: 2rem;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          width: 100%;
          margin-bottom: 2rem;
        }

        .card {
          background: white;
          border-radius: 10px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
        }

        .card:hover {
          transform: translateY(-5px);
        }

        .card h2 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
          color: #333;
        }

        .info-item {
          margin: 0.5rem 0;
          padding: 0.5rem;
          background: #f8f9fa;
          border-radius: 5px;
          border-left: 4px solid #667eea;
        }

        .info-item strong {
          color: #333;
        }

        .raw-data {
          background: white;
          border-radius: 10px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-width: 1200px;
          width: 100%;
          margin-top: 2rem;
        }

        .raw-data h3 {
          margin: 0 0 1rem 0;
          color: #333;
        }

        .raw-data pre {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 5px;
          overflow-x: auto;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr;
          }
          
          .title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}

// This function gets called at build time on server-side
export async function getServerSideProps({ req }) {
  // Extract CloudFront headers
  const headers = req.headers;
  
  // Determine device type
  const isMobile = headers['cloudfront-is-mobile-viewer'] === 'true';
  const isDesktop = headers['cloudfront-is-desktop-viewer'] === 'true';
  const isTablet = headers['cloudfront-is-tablet-viewer'] === 'true';
  const isSmartTV = headers['cloudfront-is-smarttv-viewer'] === 'true';
  
  let deviceType = 'Unknown';
  if (isMobile) deviceType = 'Mobile';
  else if (isDesktop) deviceType = 'Desktop';
  else if (isTablet) deviceType = 'Tablet';
  else if (isSmartTV) deviceType = 'Smart TV';

  // Get the real IP address (could be from X-Forwarded-For or CloudFront-Viewer-Address)
  const ipAddress = headers['x-forwarded-for']?.split(',')[0] || 
                   headers['cloudfront-viewer-address']?.split(':')[0] || 
                   req.connection.remoteAddress || 
                   'Unknown';

  const callerInfo = {
    // Location information from CloudFront
    country: headers['cloudfront-viewer-country'] || 'Unknown',
    city: headers['cloudfront-viewer-city'] || 'Unknown',
    region: headers['cloudfront-viewer-country-region'] || 'Unknown',
    timezone: headers['cloudfront-viewer-time-zone'] || 'Unknown',
    
    // Device information
    deviceType,
    isMobile,
    isDesktop,
    isTablet,
    isSmartTV,
    
    // Connection information
    ipAddress,
    userAgent: headers['user-agent'] || 'Unknown',
    acceptLanguage: headers['accept-language'] || 'Unknown',
    cloudFrontEdge: headers['x-amz-cf-pop'] || 'Unknown',
    
    // Time information
    serverTime: new Date().toISOString(),
    requestId: headers['x-amz-cf-id'] || 'Unknown',
    
    // Raw headers for debugging
    rawHeaders: {
      'cloudfront-viewer-country': headers['cloudfront-viewer-country'],
      'cloudfront-viewer-city': headers['cloudfront-viewer-city'],
      'cloudfront-viewer-country-region': headers['cloudfront-viewer-country-region'],
      'cloudfront-viewer-time-zone': headers['cloudfront-viewer-time-zone'],
      'cloudfront-is-mobile-viewer': headers['cloudfront-is-mobile-viewer'],
      'cloudfront-is-desktop-viewer': headers['cloudfront-is-desktop-viewer'],
      'cloudfront-is-tablet-viewer': headers['cloudfront-is-tablet-viewer'],
      'cloudfront-is-smarttv-viewer': headers['cloudfront-is-smarttv-viewer'],
      'x-forwarded-for': headers['x-forwarded-for'],
      'x-amz-cf-pop': headers['x-amz-cf-pop'],
      'x-amz-cf-id': headers['x-amz-cf-id'],
      'user-agent': headers['user-agent']
    }
  };

  return {
    props: {
      callerInfo
    }
  };
}