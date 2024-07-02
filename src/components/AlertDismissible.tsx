interface Props {
  title: string;
  isAlert: boolean;
  onClose: () => void;
}

function AlertDismissible({ title, isAlert, onClose }: Props) {
  return (
    <>
      {isAlert && (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <h4 className="alert-heading">{title}</h4>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={onClose}
          ></button>
        </div>
      )}
    </>
  );
}

export default AlertDismissible;
