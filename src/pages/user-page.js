import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { PageLayout } from "../components/page-layout";
import { postUserResource } from "../services/api.service";
import _ from "lodash";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UserPage = () => {
  const [accessToken, setAccessToken] = useState("");
  const [etaCollection, setEtaCollection] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getAccessToken = async () => {
      const accessToken = await getAccessTokenSilently();
      setAccessToken(accessToken);
    }

    getAccessToken();

  }, [getAccessTokenSilently]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    let inputs = [];
    for (let i = 0; i < event.target.length; i++) {
      console.log('[' + event.target[i].value + ']')
        if (event.target[i].value !== 'Submit') {
          if (event.target[i].value < 0 ) {
            toast.error('ETA cannot be less than 0!', {
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
          } else
          if (event.target[i].value === "" || event.target[i].value === null) {
            event.target[i].value = 0;
            inputs.push(event.target[i].value)

          } else {
            inputs.push(event.target[i].value)
          }
        }
    }

    console.log(inputs);

    const { responses } = await postUserResource(accessToken, inputs);

  }

    
  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          User Zone
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span align="justify">
              Submit your ETA readings on this form. The default value of each input box is <strong>0</strong>. If you leave a box blank, then it is considered <strong>0</strong>.
            </span>
            <span align="justify">
            Only authenticated users with the{" "}
                <code>user</code> role should access this
                page.
            </span>
          </p>
          {/* <CodeSnippet title="Protected Message" code={message} /> */}
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
        {_.times(10, (i) => (
          <React.Fragment>
            <div align="center">
              <input data-heap-redact-text="true" heap-ignore="true" id="eta{i}" data-qa-input="domain" type="number" class="config-field_input__uLS8K" defaultValue="0" />  
            </div>
            <p></p>
          </React.Fragment>
        ))}
        <p></p>
        <div align="center">
          <input type="submit" id="form_submit" value="Submit" class="styled__Button-sc-1hwml9q-0 utils-sc-11hlfw-0 cukJNg kHaByn"/>
          </div>
      </form>
      </div>
    </PageLayout>
  );
};
