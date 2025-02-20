import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import GuestForm from "./GuestForm";
function AddGuest() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="guest-form">
          <Button>Add Guest</Button>
        </Modal.Open>

        <Modal.Window name="guest-form">
          <GuestForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddGuest;
