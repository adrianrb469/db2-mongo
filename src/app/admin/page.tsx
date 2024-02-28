"use client";

import React, { useEffect, useRef } from "react";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

export default function AdminView() {
  const chartRef = useRef();
  const chartRef2 = useRef();
  const chartRef3 = useRef();
  const chartRef4 = useRef();

  useEffect(() => {
    const sdk = new ChartsEmbedSDK({
      baseUrl: "https://charts.mongodb.com/charts-db2-p1-kolmn",
    });

    const chart = sdk.createChart({
      chartId: "65de9c38-7bcc-4e6f-8ee8-40cf26dc9b11",
      theme: "light",
    });

    const chart2 = sdk.createChart({
      chartId: "65dea0a2-3a1d-4d3f-8cb4-1ee14c42e449",
      theme: "light",
    });

    const chart3 = sdk.createChart({
      chartId: "65deb4a4-7bcc-4b5e-8abd-40cf260cf1aa",
      theme: "light",
    });

    const chart4 = sdk.createChart({
      chartId: "65dec71e-48ba-41b1-86d8-781f6ea92aec",
      theme: "light",
    });

    chart
      .render(chartRef.current)
      .catch(() => window.alert("Chart failed to initialise"));

    chart2
      .render(chartRef2.current)
      .catch(() => window.alert("Chart failed to initialise"));

    chart3
      .render(chartRef3.current)
      .catch(() => window.alert("Chart failed to initialise"));

    chart4
      .render(chartRef4.current)
      .catch(() => window.alert("Chart failed to initialise"));

    // Optional: Refresh the chart when a button is clicked
    // document
    //   .getElementById('refreshButton')
    //   .addEventListener('click', () => chart.refresh());
  }, []);

  return (
    <div className="space-x-5 flex h-screen justify-center items-center">
      <div className="6 ">
        <div ref={chartRef} className=" w-96 h-96 " />
      </div>
      <div className="6 ">
        <div ref={chartRef2} className=" w-96 h-96 " />
      </div>
      <div className="6 ">
        <div ref={chartRef3} className=" w-96 h-96 " />
      </div>
      <div className="6 ">
        <div ref={chartRef4} className=" w-96 h-96 " />
      </div>
    </div>
  );
}
