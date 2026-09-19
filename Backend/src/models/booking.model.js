import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: [true, "Booking must belong to a Property"],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Booking must belong to a User"],
    },

    price: {
      type: Number,
      required: [true, "Booking must have a price"],
    },

    paid: {
      type: Boolean,
      default: false,
    },

    fromDate: {
      type: Date,
      required: [true, "Booking must have a start date"],
    },

    toDate: {
      type: Date,
      required: [true, "Booking must have an end date"],
    },

    guests: {
      type: Number,
      required: [true, "Booking must have number of guests"],
      min: 1,
    },

    numberOfNights: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.pre(/^find/, function () {
  this.populate({
    path: "user",
    select: "-password",
  });

  this.populate({
    path: "property",
    select:
      "maximumGuest images propertyName address price",
  });
});

const Booking = mongoose.model(
  "Booking",
  bookingSchema
);

export default Booking;