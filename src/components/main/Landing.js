import React, { useContext, useEffect } from "react";
import "./Landing.css";
import { Auth } from "aws-amplify";
import { onAuthUIStateChange } from "@aws-amplify/ui-components";
import { AuthContext } from "../../Contexts";
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp } from "@aws-amplify/ui-react";
import { Space } from "antd";
import helpJSON from "../../assets/help/help_text_json";

function NotAuthenticated() {
    const setCognitoPayload = useContext(AuthContext).setCognitoPayload;
    async function authUser() {
        try {
            let currSession = await Auth.currentSession();
            setCognitoPayload(currSession.getIdToken().payload);
        } catch (err) {
            if (err !== "No current user") {
                // no current user on page load
                alert(err);
            }
        }
    }
    useEffect(() => onAuthUIStateChange(authUser));


    return (
        <AmplifyAuthenticator usernameAlias="email">
          <AmplifySignUp
            slot="sign-up"
            usernameAlias="email"s
            headerText="Create a Mobius-evo Account"
            formFields={[
              {
                type: "email",
                label: "E-mail",
                placeholder: "email@email.mail",
                required: true
              },
              {
                type: "password",
                label: "Password",
                placeholder: "********",
                required: true
              },
              {
                type: "nickname",
                label: "How should we address you???????.............",
                placeholder: "nickname",
                required: true
              }
            ]}
          />
          <AmplifySignIn
            slot="sign-in"
            usernameAlias="email"
            headerText="Sign In!"
          />
        </AmplifyAuthenticator>
        // <AmplifyAuthenticator usernameAlias="email">
        //     <AmplifySignIn slot="sign-in" usernameAlias="email" headerText="Get started!" hideSignUp />
        // </AmplifyAuthenticator>
    );
}

function LandingArticle() {
    return (
        <article id="landing-article">
            <h1>{helpJSON.front_page.title}</h1>
            <p>{helpJSON.front_page.description}</p>
            <Space size="middle">
                <a href="https://mobius.design-automation.net/gallery">Mobius Modeller</a>
                <a type="link" href="http://design-automation.net">
                    Design Automation Lab
                </a>
            </Space>
        </article>
    );
}

function Landing() {
    return (
        <div id="landing-container">
            <LandingArticle></LandingArticle>
            {!useContext(AuthContext).cognitoPayload ? <NotAuthenticated /> : null}
        </div>
    );
}

export default Landing;
