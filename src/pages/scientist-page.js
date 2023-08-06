import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import { getPermissionsResource, getScientistResource } from "../services/api.service";
import Chart from "react-google-charts";
import { first } from "lodash";

export const ScientistPage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [message, setMessage] = useState("");
  const [binsDisplay, setBinsDisplay] = useState([
    ["Category", "Value"],
    ["ETA 1", 0],
    ["ETA 2", 0],
    ["ETA 3", 0],
    ["ETA 4", 0],
    ["ETA 5", 0],
    ["ETA 6", 0],
    ["ETA 7", 0],
    ["ETA 8", 0],
    ["ETA 9", 0],
    ["ETA 10", 0],
  ])

  useEffect(() => {
    const getAccessToken = async () => {
      const accessToken = await getAccessTokenSilently();
      setAccessToken(accessToken);
    };

    getAccessToken();

  }, [getAccessTokenSilently]);

  useEffect(() => {
    const getPermission = async () => {
      const firstTimeAccessToken = await getAccessTokenSilently();
      const { data, error } = await getPermissionsResource(firstTimeAccessToken);
      const isAuthorized = data.permissions.indexOf("get:eta-data") > -1;
      setIsAuthorized(isAuthorized)
      
    };

    getPermission();

  }, []);

  useEffect(() => {
    if (isAuthorized) {
      const interval = setInterval(updateTable, 5000);
      return () => clearInterval(interval);
    }
  });
  
  const updateTable = async () => {
    const { responses } = await getScientistResource(accessToken);

    const dataServerOne = responses[0].data;
    const dataServerTwo = responses[0].data;
    const errorServerOne = responses[0].error;
    const errorServerTwo = responses[0].error;
    
    if (dataServerOne.message === "You don't have access to this resource") {
      setMessage("You don't have access to this resource!")
    } else if (errorServerOne) {
      setMessage(errorServerOne)
    } else if (errorServerTwo) {
      setMessage(errorServerTwo)
    }
    else {
      setMessage("Scientist Page")
      const finalSum = [];
      // const messageLength = Math.min(dataServerOne.message.length, dataServerTwo.message.length);
      
      if (dataServerOne.message.length > dataServerTwo.message.length) {
        for (let i = 0; i < dataServerOne.message.length; i++) {
          finalSum.push(dataServerOne.message[i] + dataServerTwo.message[0]);
        }
        const newBinsDisplay = [["Category", "Value"]];
        for (let i = 0; i < finalSum.length; i++) {
        newBinsDisplay.push([`ETA ${i + 1}`, finalSum[i]]);
        }
        setBinsDisplay(newBinsDisplay);
      } else if (dataServerTwo.message.length > dataServerOne.message.length){
        for (let i = 0; i < dataServerTwo.message.length; i++) {
          finalSum.push(dataServerTwo.message[i] + dataServerOne.message[0]);
        }
        const newBinsDisplay = [["Category", "Value"]];
        for (let i = 0; i < finalSum.length; i++) {
        newBinsDisplay.push([`ETA ${i + 1}`, finalSum[i]]);
        }
        setBinsDisplay(newBinsDisplay);
      }
    }
  }


  const optionsLoad = () => {
    const options = {
      title: "ETA Data",
      legend: { position: "none" },
      colors: ["#e7711c"],
      vAxis: {
        title: "Sum Value",
        minValue: 0, 
      },
      chartArea: {
        width: '80%', 
        height: '70%', 
      },
      hAxis: {
        title: "Bins",
      },
      histogram: {
        bucketSize: 1,
      },
      bar: {
        gap: 2, 
      },
    };
    return options;
  };

  if (!isAuthorized) {
    return (
      <PageLayout>
        <div className="content-layout">
          <h1 id="page-title" className="content__title">
            Protected Page
          </h1>
          <div className="content__body">
            <p id="page-description">
              <span>
              This page retrieves the ETA prediction data enetred by users and displays it on a self-refreshing histogram.
              </span>
              <span>
              <strong>
                Only authenticated users with the{" "}
                <code>scientist</code> role should access this
                page.
              </strong>
            </span>
            </p>
            <CodeSnippet title="Unauthorized!!!" code="You don't have permission to access this resource. Please contact the administrator." />
          </div>
        </div>
      </PageLayout>
    );

  } else {
    return (
      <PageLayout>
        <div className="content-layout">
          <h1 id="page-title" className="content__title">
            Scientist Zone
          </h1>
          <div className="content__body">
            <p id="page-description">
              <span>
                This page retrieves the ETA prediction data enetred by users and displays it on a self-refreshing histogram.
              </span>
              <span>
                <strong>
                  Only authenticated users with the{" "}
                  <code>scientist</code> role should access this
                  page.
                </strong>
              </span>
            </p>
            
            <div>
              <Chart
              className="sum-container"
                chartType="ColumnChart" 
                height="400px"
                data={binsDisplay}
                options={optionsLoad()}
              />
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }
};
