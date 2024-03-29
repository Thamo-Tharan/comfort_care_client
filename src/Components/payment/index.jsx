import React from "react";
import Styles from "./Styles";
import { Form, Field } from "react-final-form";
import Card from "./Card";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./cardUtils";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// eslint-disable-next-line react-hooks/rules-of-hooks

const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
  
};

export const Payment = () => (
  <Styles>
    <Form
      onSubmit={onSubmit}
      render={({
        handleSubmit,
        form,
        submitting,
        pristine,
        values,
        active,
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Card
              number={values.number || ""}
              name={values.name || ""}
              expiry={values.expiry || ""}
              cvc={values.cvc || ""}
              focused={active}
            />
            <div>
              <Field
                name="number"
                component="input"
                type="text"
                pattern="[\d| ]{16,22}"
                placeholder="Card Number"
                format={formatCreditCardNumber}
              />
            </div>
            <div>
              <Field
                name="name"
                component="input"
                type="text"
                placeholder="Name"
              />
            </div>
            <div>
              <Field
                name="expiry"
                component="input"
                type="text"
                pattern="\d\d/\d\d"
                placeholder="Valid Thru"
                format={formatExpirationDate}
              />
              <Field
                name="cvc"
                component="input"
                type="text"
                pattern="\d{3,4}"
                placeholder="CVC"
                format={formatCVC}
              />
            </div>
            {/* <div className="buttons">
              <button type="submit" disabled={submitting}>
                Paynow
              </button>
              <button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div> */}
          </form>
        );
      }}
    />
  </Styles>
);
