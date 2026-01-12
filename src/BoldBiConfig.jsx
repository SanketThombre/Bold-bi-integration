import { useEffect, useRef } from "react";

const DashboardListing = () => {
  const containerRef = useRef(null);
  const dashboardRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      const { BoldBI } = await import("@boldbi/boldbi-embedded-sdk");

      if (!isMounted) return;

      dashboardRef.current = BoldBI.create({
        serverUrl: "https://dev.visualdata.ai/bi/site/pandorabox", // ⚠️ same as your code
        // siteIdentifier: 'pandorabox',

        dashboardId: "b93ef719-fa67-4c61-9156-8e346c78a0d1",

        embedContainerId: "dashboard",
        embedType: BoldBI.EmbedType.Component,

        environment: "onpremise", // ⚠️ unchanged (even though invalid)
        // environment: 'enterprise',

        authorizationServer: {
          url: "https://dev-sutradhar-be.wcms.cloud/bold-bi/auth-server",
        },

        width: "100%",
        height: window.innerHeight + "px",
      });

      dashboardRef.current.loadDashboard();
    };

    loadDashboard();

    return () => {
      isMounted = false;

      // ⚠️ DO NOT call destroy() – SDK bug
      dashboardRef.current = null;

      const container = document.getElementById("dashboard");
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <div id="DashboardListing">
      <div id="viewer-section">
        <div id="dashboard" ref={containerRef} />
      </div>
    </div>
  );
};

export default DashboardListing;
