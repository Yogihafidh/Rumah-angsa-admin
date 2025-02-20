/* eslint-disable react/prop-types */
import { Controller, useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import { useUpdateGuest } from "./useUpdateGuest";
import { useCreateGuest } from "./useCreateGuest";
import { useCountries } from "../../hooks/useCountries";
import Select from "../../ui/Select";

function GuestForm({ guestToEdit = {}, onCloseModal }) {
  // Get Id
  const { id: guestId, ...editValues } = guestToEdit;

  // Check if form to edit
  const isEditSession = Boolean(guestId);

  const { register, handleSubmit, formState, reset, control } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isUpdateGuest, updateGuest } = useUpdateGuest();
  const { isCreatingGuest, createGuest } = useCreateGuest();
  const { countries, isLoading: isLoadingCountries } = useCountries();
  const isWorking = isUpdateGuest || isCreatingGuest;

  function onSubmit(data) {
    const countryFlag = countries.find(
      (country) => country.label === data.nationality
    )?.flagUrl;

    if (isEditSession) {
      updateGuest(
        { id: guestId, ...data, countryFlag },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createGuest(
        { countryFlag, ...data },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  function onError(error) {
    console.error(error.message);
    // Handle error here
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Full Name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isWorking}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="text"
          id="email"
          disabled={isWorking}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },
          })}
        />
      </FormRow>

      <FormRow label="National ID" error={errors?.nationalID?.message}>
        <Input
          type="text"
          id="nationalID"
          disabled={isWorking}
          {...register("nationalID", {
            required: "National ID is required",
            pattern: {
              value: /^[0-9]+$/,
              message: "National ID must be numeric",
            },
          })}
        />
      </FormRow>

      <FormRow label="Nationality" error={errors?.nationality?.message}>
        <Controller
          name="nationality"
          control={control}
          rules={{ required: "National ID is required" }}
          render={({ field }) => (
            <Select
              {...field}
              options={countries}
              disabled={isLoadingCountries}
            />
          )}
        />
      </FormRow>

      <FormRow>
        <Button
          variant="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Guest" : "Add Guest"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default GuestForm;
