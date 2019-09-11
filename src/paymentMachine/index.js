import { Machine, assign } from "xstate";
import { saveBooking } from "./services/saveBooking";
import { confirmPayment } from "./services/confirmPayment";

const paymentMachine = Machine(
  {
    id: "paymentMachine",
    initial: "pageLoaded",
    context: {},
    states: {
      pageLoaded: {
        on: {
          SAVE_BOOKING: {
            target: "saveBooking"
          }
        }
      },
      saveBooking: {
        invoke: {
          id: "saveBookingApi",
          src: saveBooking,
          onDone: {
            target: "saveBookingSuccess"
          }
        }
      },
      saveBookingSuccess: {
        entry: ["setSaveBookingResponseData"],
        on: {
          "": "confirmPayment"
        }
      },
      confirmPayment: {
        invoke: {
          id: "confirmPaymentApi",
          src: confirmPayment,
          onDone: {
            target: "processConfirmPayment"
          }
        }
      },
      processConfirmPayment: {
        entry: ["setConfirmPaymentResponseData"],
        on: {
          "": [
            {
              target: "handleBookingSuccess",
              cond: (context, event) =>
                context && context.confirmPaymentResponseData.status === 0
            }
          ]
        }
      },
      handleBookingSuccess: {
        on: {
          "": "redirectToThankYouPage"
        }
      },
      redirectToThankYouPage: {
        type: "final"
      }
    }
  },
  {
    actions: {
      setSaveBookingResponseData: assign({
        saveBookingResponseData: (context, event) => event.data
      }),

      setConfirmPaymentResponseData: assign({
        confirmPaymentResponseData: (context, event) => event.data
      })
    }
  }
);

export default paymentMachine;
