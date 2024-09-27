import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import styles from "./styles/ErrorDialog.module.css";

export function ErrorDialog(props: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const errors = Object.values(props.errors);
  const criticalErrors = errors.filter(
    (error: any) => error.severity === "critical"
  );
  const warningErrors = errors.filter(
    (error: any) => error.severity === "warning"
  );

  return (
    <>
      <Button onClick={handleOpen} variant="gradient" color="red">
        {props.buttonText}
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>{props.headerText}</DialogHeader>
        <DialogBody>
          {criticalErrors.length > 0 && (
            <>
              <h1>Critical Errors</h1>
              {criticalErrors.map((error: any, index: number) => {
                return (
                  <h2
                    key={error.severity + index}
                    className={styles.criticalError}
                  >
                    {error.message}
                  </h2>
                );
              })}
            </>
          )}
          {warningErrors.length > 0 && (
            <>
              <h1>Warning Errors</h1>
              {warningErrors.map((error: any, index: number) => {
                return (
                  <h2
                    key={error.severity + index}
                    className={styles.warningError}
                  >
                    {error.message}
                  </h2>
                );
              })}
            </>
          )}
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="red" onClick={handleOpen}>
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
