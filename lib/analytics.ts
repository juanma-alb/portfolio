"use client";

import { Analytics } from "@vercel/analytics/react";

type AnalyticsWrapperProps = {
  gaTrackingId?: string;
};

export function AnalyticsWrapper({ gaTrackingId }: AnalyticsWrapperProps) {
  return (
    <>
      <Analytics />
      {gaTrackingId ? (
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
        />
      ) : null}
      {gaTrackingId ? (
        <script
          id="ga-init"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaTrackingId}');
            `,
          }}
        />
      ) : null}
    </>
  );
}
