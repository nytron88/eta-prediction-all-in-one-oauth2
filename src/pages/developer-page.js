import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
// import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import { postDeveloperResource } from "../services/api.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const DeveloperPage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getAccessToken = async () => {
      const accessToken = await getAccessTokenSilently();
      setAccessToken(accessToken);
    }

    getAccessToken();

  }, [getAccessTokenSilently]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (event.target[0].value == '' || event.target[0].value.trim() == '') {
      
      toast.error('Endpoint name cannot be blank!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });

        return;
    } else {
      const { responses } = await postDeveloperResource(accessToken, event.target[0].value, event.target[1].value);
      //postDeveloperResource(accessToken, event.target[0].value, event.target[1].value);
      toast.info('Endpoint successfully created!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      
    }
  }

  return (
    <PageLayout>
      <div>
        <h1 id="page-title" className="content__title">
          Developer Zone
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              You can use this form to <strong>create endpoints</strong> on
              Privacy Guardian.
            </span>
            <span>
              <strong>
                Only authenticated users with the{" "}
                <code>developer</code> role should access this
                page.
              </strong>
            </span>
          </p>
        </div>
        <div>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        </div>
        <form class="config-fields_fields__rX7K_" onSubmit={handleSubmit}>
        <div data-heap-redact-text="true" heap-ignore="true" align="center">
          <label for="domain" class="config-field_label__7yXx0">Endpoint</label>
          <input data-heap-redact-text="true" heap-ignore="true" id="domain" data-qa-input="domain" type="text" class="config-field_input__uLS8K" placeholder="Enter endpoint e.g. /post_eta" defaultValue="" />
        </div>
        <br></br><br></br>
        <div data-heap-redact-text="true" heap-ignore="true" align="center">
            <label for="clientId" class="config-field_label__7yXx0">Task</label>
            <select data-heap-redact-text="true" heap-ignore="true" id="clientId" data-qa-input="clientId" type="text" class="config-field_input__uLS8K" placeholder="Enter your Auth0 Client ID" defaultValue="">
              <option value="get_eta_data">Get ETA Data</option>
              <option value="post_eta_data">Post ETA Data</option>
            </select>
        </div>
        <br></br><br></br>
        <div align="center">
          {/* <a tabindex="0" href="" role="button" class="styled__Button-sc-1hwml9q-0 utils-sc-11hlfw-0 jHnZMP kHaByn">Submit</a> */}
          <input type="submit" id="form_submit" value="Submit" class="styled__Button-sc-1hwml9q-0 utils-sc-11hlfw-0 cukJNg kHaByn"/>
          </div>
      </form>
      </div>
      {/* <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Public Page
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              This page retrieves a <strong>public message</strong> from an
              external API.
            </span>
            <span>
              <strong>Any visitor can access this page.</strong>
            </span>
          </p>
          <CodeSnippet title="Public Message" code={message} />
        </div>
      </div> */}
      
    </PageLayout>
  );
};
