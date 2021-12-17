import debounce from "lodash/debounce";

type Handler = (event: React.UIEvent<HTMLElement>, ...args: unknown[]) => void;

export const useMultipleClicks = (
  ...handlers: Handler[]
): ((event: React.UIEvent<HTMLElement>, ...args: unknown[]) => void) => {
  const callEventHandler = (
    event: React.UIEvent<HTMLElement>,
    ...args: unknown[]
  ) => {
    if (event.detail <= 0) return;

    const handler = handlers[event.detail - 1];
    handler?.(event, ...args);
  };

  const debounceHandler = debounce(function (
    event: React.UIEvent<HTMLElement>,
    ...args: unknown[]
  ) {
    callEventHandler(event, ...args);
  },
  250);

  return (event: React.UIEvent<HTMLElement>, ...args: unknown[]) => {
    event.persist();
    debounceHandler(event, args);
  };
};
