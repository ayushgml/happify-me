import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Controls from "../controls/Controls";

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
  dialogTitle: {
    textAlign: "center",
  },
  dialogContent: {
    textAlign: "center",
  },
  dialogAction: {
    justifyContent: "center",
  },
}));

export default function ConfirmDialog(props) {
  const { confirmDialog, setConfirmDialog } = props;
  const classes = useStyles();
  let id;
  let user;
  if (confirmDialog) {
    id = confirmDialog.param;
    user = confirmDialog.paramMail;
  }
  return (
    confirmDialog.isOpen && (
      <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
        <DialogTitle className={classes.dialogTitle}></DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography variant="h6">{confirmDialog.title}</Typography>
          <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
        </DialogContent>
        <DialogActions className={classes.dialogAction}>
          <Controls.Button
            text="No"
            color="default"
            onClick={() =>
              setConfirmDialog({ ...ConfirmDialog, isOpen: false })
            }
          />
          {/* If Param Is there then execute with param else do without param */}
          <Controls.Button
            text="Yes"
            color="secondary"
            onClick={
              // !confirmDialog.param
              //   ? confirmDialog.onConfirm
              //   : () => {
              //       confirmDialog.onConfirm(id);
              //       setTimeout(() => {
              //         setConfirmDialog();
              //       }, 1000);
              //     }
              () => {
                if (confirmDialog.param) {
                  confirmDialog.onConfirm(id);
                  setTimeout(() => {
                    setConfirmDialog();
                  }, 1000);
                } else if (confirmDialog.paramMail) {
                  confirmDialog.onConfirm(user);
                  setTimeout(() => {
                    setConfirmDialog();
                  }, 1000);
                } else {
                  confirmDialog.onConfirm();
                }
              }
            }
          />
        </DialogActions>
      </Dialog>
    )
  );
}
