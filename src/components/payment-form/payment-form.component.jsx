import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Button from "../button/button.component";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { useState } from "react";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const { userUsername } = useSelector((state) => state.user);
  const cartTotal = useSelector(selectCartTotal);

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessingPayment(true);

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: cartTotal * 100 }),
    }).then((res) => res.json());

    const clientSecret = response.paymentIntent.client_secret;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: userUsername ? userUsername : "guest",
        },
      },
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert("Oops, something went wrong. Payment was unsuccessful");
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment successful");
      }
    }
  };

  return (
    <div className="checkout__payment">
      <h2>Credit card payment:</h2>
      <form className="checkout__payment-form" onSubmit={paymentHandler}>
        <CardElement className="checkout__payment__card-details" />
        <Button isLoading={isProcessingPayment} buttonType={"payment"}>
          Pay now
        </Button>
      </form>
    </div>
  );
};

export default PaymentForm;
