import mongoose from "mongoose";
import slugify from "slugify";

const propertySchema = new mongoose.Schema(
  {
    // =========================
    // PROPERTY BASIC INFORMATION
    // =========================

    propertyName: {
      type: String,
      required: [true, "Please enter your property name"],
      trim: true,
      maxlength: [100, "Property name cannot exceed 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Please add information about your property"],
      trim: true,
    },

    extraInfo: {
      type: String,
      default: "Checking on time, good services available",
      trim: true,
    },

    propertyType: {
      type: String,
      enum: ["House", "Flat", "Guest House", "Hotel"],
      default: "House",
    },

    roomType: {
      type: String,
      enum: ["Anytype", "Room", "Entire Home"],
      default: "Anytype",
    },

    maximumGuest: {
      type: Number,
      required: [
        true,
        "Please give the maximum number of guests that can occupy",
      ],
      min: [1, "There must be at least 1 guest"],
    },

    // =========================
    // AMENITIES
    // =========================

    amenities: [
      {
        name: {
          type: String,
          required: true,
          enum: [
            "Wifi",
            "Kitchen",
            "Ac",
            "Washing Machine",
            "Tv",
            "Pool",
            "Freezer",
            "Parking",
          ],
        },

        icon: {
          type: String,
          required: true,
        },
      },
    ],

    // =========================
    // PROPERTY IMAGES
    // =========================

    images: {
      type: [
        {
          public_id: {
            type: String,
            default: "",
          },

          url: {
            type: String,
            required: true,
          },
        },
      ],

      validate: {
        validator: function (arr) {
          return arr && arr.length >= 6;
        },

        message: "The property must contain at least 6 images",
      },
    },

    // =========================
    // PRICE
    // =========================

    price: {
      type: Number,
      required: [true, "Please enter the price per night"],
      default: 500,
      min: [0, "Price cannot be negative"],
    },

    // =========================
    // ADDRESS
    // =========================

    address: {
      area: {
        type: String,
        trim: true,
      },

      city: {
        type: String,
        trim: true,
      },

      state: {
        type: String,
        trim: true,
      },

      pincode: {
        type: String,
        trim: true,
      },
    },

    // =========================
    // CURRENT BOOKINGS
    // =========================

    currentBookings: [
      {
        bookingId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Booking",
        },

        fromDate: {
          type: Date,
          required: true,
        },

        toDate: {
          type: Date,
          required: true,
        },

        userId: {
          type:  mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],

    // =========================
    // PROPERTY OWNER
    // =========================

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Property must belong to a user"],
    },

    // =========================
    // SLUG
    // =========================

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },

    // =========================
    // CHECK-IN / CHECK-OUT
    // =========================

    checkInTime: {
      type: String,
      default: "11:00",
    },

    checkOutTime: {
      type: String,
      default: "13:00",
    },
  },
  {
    timestamps: true,
  }
);

// =========================
// CREATE SLUG
// =========================

propertySchema.pre("save", function (next) {
  if (this.isModified("propertyName")) {
    this.slug = slugify(this.propertyName, {
      lower: true,
      strict: true,
    });
  }

  next();
});

// =========================
// NORMALIZE CITY / STATE / AREA
// =========================

propertySchema.pre("save", function (next) {
  if (this.address) {
    if (this.address.city) {
      this.address.city = this.address.city
        .toLowerCase()
        .replace(/\s+/g, "");
    }

    if (this.address.state) {
      this.address.state = this.address.state
        .toLowerCase()
        .replace(/\s+/g, "");
    }

    if (this.address.area) {
      this.address.area = this.address.area
        .toLowerCase()
        .replace(/\s+/g, "");
    }
  }

  next();
});

// =========================
// MODEL
// =========================

const Property =
  mongoose.models.Property || mongoose.model("Property", propertySchema);

export default Property;