import React, {useState, useRef} from "react";

// Snackbar
// Ref
export const queueRef = useRef([]);
export const [open, setOpen] = useState(false);
export const [messageInfo, setMessageInfo] = useState(undefined);

const processQueue = () => {
  if (queueRef.current.length > 0) {
    setMessageInfo(queueRef.current.shift());
    setOpen(true);
  }
}

export const handleSnackBar = (type, message, open) => {
  queueRef.current.push({
    message,
    key: new Date().getTime(),
    type
  });
  if (open) {
    // immediately begin dismissing current message
    // to start showing new one
    setOpen(false);
  } else {
    processQueue();
  }
};

export const handleCloseSB = (event, reason) => {
  if (reason === "clickaway") {
    return;
  }
  setOpen(false);
};

export const handleExitedSB = () => {
  processQueue();
};
