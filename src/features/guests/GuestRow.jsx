/* eslint-disable react/prop-types */
import styled from "styled-components";
import { HiPencil, HiTrash } from "react-icons/hi2";

import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Flag from "../../ui/Flag";
import GuestForm from "./GuestForm";
import { useDeleteGuest } from "./useDeleteGuest";

const Stacked = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  justify-content: start;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Number = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

// In parameter function separate booking properti
function GuestRow({ guest: { bookings, ...guest } }) {
  const {
    id: guestId,
    fullName,
    email,
    nationalID,
    nationality,
    countryFlag,
  } = guest;

  const { isDeletingGuest, deleteGuest } = useDeleteGuest();

  return (
    <Table.Row>
      <Modal>
        <Number>{nationalID}</Number>
        <Stacked>{fullName}</Stacked>
        <Stacked>{email}</Stacked>
        <Stacked>
          {nationality}{" "}
          {countryFlag && (
            <Flag src={countryFlag} alt={`Flag of ${countryFlag}`} />
          )}
        </Stacked>

        <Menus.Menu>
          <Menus.Toggle id={guestId} />
          <Menus.List id={guestId}>
            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil />}>Edit Guest</Menus.Button>
            </Modal.Open>

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete Guest</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        {/* Window */}
        <Modal.Window name="edit">
          <GuestForm guestToEdit={guest} />
        </Modal.Window>
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="guest"
            disabled={isDeletingGuest}
            onConfirm={() => deleteGuest(guestId)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default GuestRow;
