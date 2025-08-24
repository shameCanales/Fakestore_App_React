import type { AppDispatch } from "./store.js";
import { uiActions } from "./ui-Slice.js";

interface ToastOptions {
  title: string;
  message: string;
  type?: "error" | "success" | "warning"; //restricts to known values
  delay?: number; //ms
}

// added title, message, type, delay for customizability
export const showTimedToast = ({
  title,
  message,
  type = "error",
  delay = 3 * 1000,
}: ToastOptions) => {
  return (dispatch: AppDispatch) => {
    //pass dispatch to the returned function to dispatch normal Redux actions from inside an async or delayed functioon. can also pass the getState
    dispatch(uiActions.showToast({ title, message, type }));

    setTimeout(() => {
      dispatch(uiActions.hideToast());
    }, delay);
  };
};
