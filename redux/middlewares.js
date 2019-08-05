// extracted from core middlewares in a dependency reduced version

export const errorMiddleware = (
  store,
  console = global.console
) => next => action => {
  if (!(action.type.includes("ERROR") || action.error)) {
    return next(action);
  }
  console.error(action);
  let errorText;

  if (action.payload) {
    if (
      action.payload instanceof Object &&
      action.payload.error instanceof Error
    ) {
      errorText = action.payload.error.message;
    } else {
      errorText = JSON.stringify(action.payload, null, 2);
    }
  } else {
    errorText = JSON.stringify(action, null, 2);
  }

  // Hack around notification system for use in play for now
  console.error({
    title: action.type,
    message: errorText,
    dismissible: true,
    position: "tr",
    level: "error"
  });
  return next(action);
};
