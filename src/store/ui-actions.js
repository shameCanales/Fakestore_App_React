import { uiActions } from "./ui-slice";

export const showTimedToast = (
  { title, message, type = "info", delay = 3 * 1000 } // added this for customizability
) => {
  return (dispatch) => {
    //pass dispatch to the returned function to dispatch normal Redux actions from inside an async or delayed functioon. can also pass the getState
    dispatch(uiActions.showToast({ title, message, type }));

    setTimeout(() => {
      dispatch(uiActions.hideToast());
    }, delay);
  };
};
