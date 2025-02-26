// import { Controller, useForm } from "react-hook-form";
// import { DayPicker } from "react-day-picker";

// import Form from "../../ui/Form";
// import FormRow from "../../ui/FormRow";
// import Select from "../../ui/Select";
// import { useCabin } from "../cabins/useCabin";
// import {
//   eachDayOfInterval,
//   endOfDay,
//   isBefore,
//   isValid,
//   parseISO,
//   startOfToday,
// } from "date-fns";

// function BookingForm() {
//   const { handleSubmit, formState, control, getValues } = useForm();
//   const { errors } = formState;

//   // Get cabins data
//   const { isLoading: isLoadingCabins, cabins = [] } = useCabin();
//   const cabinOptions = cabins.map((cabin) => ({
//     value: cabin.id,
//     label: cabin.name,
//     key: `${cabin.id}-${Math.random()}`,
//   }));

//   const isWorking = isLoadingCabins;

//   // Date
  
//   const bookedDatesForCabin = bookedDates?.flatMap(({ startDate, endDate }) => {
//     const start = parseISO(startDate);
//     const end = endOfDay(parseISO(endDate));
//     const startToday = isBefore(start, startOfToday()) ? startOfToday() : start;
//     const datesInRange = eachDayOfInterval({ start: startToday, end });

//     return datesInRange;
//   });

//   function onSumbit(data) {
//     console.log(data);
//   }

//   function onError(error) {
//     console.error(error.message);
//   }

//   return (
//     <Form onSubmit={handleSubmit(onSumbit, onError)}>
//       <FormRow label="Cabin" error={errors?.cabinId?.message}>
//         <Controller
//           name="cabinId"
//           control={control}
//           rules={{
//             required: "Cabin is required",
//           }}
//           render={({ field }) => (
//             <Select {...field} options={cabinOptions} disabled={isWorking} />
//           )}
//         />
//       </FormRow>

//       <FormRow flex="datepicker" label="Check in - Check out dates">
//         <Controller
//           name="startDate"
//           id="startDate"
//           rules={{
//             required: "Check in date is required",
//             validate: {
//               isValidDate: (value) =>
//                 isValid(parseISO(value)) || "Invalid date",
//               isFutureDate: (value) =>
//                 isBefore(value, startOfToday())
//                   ? "Check in cannot before today"
//                   : true,
//             },
//           }}
//           control={control}
//           render={({ field }) => <input type="hidden" {...field} />}
//         />
//         <Controller
//           name="endDate"
//           id="endDate"
//           rules={{
//             required: "Check out date is required",
//             validate: {
//               isValidDate: (value) =>
//                 isValid(parseISO(value)) || "Invalid date",

//               isAfterStartDate: (value) => {
//                 return (
//                   !isBefore(
//                     parseISO(value),
//                     parseISO(getValues("startDate"))
//                   ) || "Check out cannot be before check in"
//                 );
//               },
//             },
//           }}
//           control={control}
//           render={({ field }) => <input type="hidden" {...field} />}
//         />

//         <DayPicker
//           mode="range"
//           modifiers={{ booked: bookedDatesForCabin }}
//           modifiersStyles={modifiersStylesDatePicker.create}
//           onDayClick={handleDayClick}
//           selected={range}
//           onSelect={(range) => {
//             setRange(range);
//             setValue(
//               "startDate",
//               range?.from ? format(range?.from, "yyyy-MM-dd") : ""
//             );
//             setValue(
//               "endDate",
//               range?.to ? format(range?.to, "yyyy-MM-dd") : ""
//             );
//           }}
//           footer={<FooterDatePicker range={range} />}
//         />
//       </FormRow>
//     </Form>
//   );
// }

// export default BookingForm;
