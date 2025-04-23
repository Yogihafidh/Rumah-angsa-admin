/* eslint-disable react/prop-types */
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, fontFamily: "Helvetica" },
  section: { marginBottom: 10 },
  header: { fontSize: 16, marginBottom: 10, fontWeight: "bold" },
  label: { fontWeight: "bold" },
});

export default function BookingPDF({ booking }) {
  const {
    guests: { fullName, email, country, nationalID },
    cabins: { name: cabinName },
    numNights,
    numGuests,
    totalPrice,
    startDate,
    endDate,
    hasBreakfast,
    isPaid,
  } = booking;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Booking Detail</Text>
        </View>

        <View style={styles.section}>
          <Text>
            <Text style={styles.label}>Guest:</Text> {fullName} ({email})
          </Text>
          <Text>
            <Text style={styles.label}>Country:</Text> {country}
          </Text>
          <Text>
            <Text style={styles.label}>National ID:</Text> {nationalID}
          </Text>
        </View>

        <View style={styles.section}>
          <Text>
            <Text style={styles.label}>Cabin:</Text> {cabinName}
          </Text>
          <Text>
            <Text style={styles.label}>Nights:</Text> {numNights}
          </Text>
          <Text>
            <Text style={styles.label}>Guests:</Text> {numGuests}
          </Text>
          <Text>
            <Text style={styles.label}>Dates:</Text> {startDate} – {endDate}
          </Text>
        </View>

        <View style={styles.section}>
          <Text>
            <Text style={styles.label}>Breakfast included:</Text>{" "}
            {hasBreakfast ? "Yes" : "No"}
          </Text>
          <Text>
            <Text style={styles.label}>Total price:</Text> ${totalPrice}
          </Text>
          <Text>
            <Text style={styles.label}>Payment status:</Text>{" "}
            {isPaid ? "Paid" : "Unpaid"}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
