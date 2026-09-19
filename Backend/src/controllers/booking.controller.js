import Property from "../models/property.model.js";
import Booking from "../models/booking.model.js";

// ============================================================
// CREATE ORDER
// ============================================================

const createOrder = async (req, res) => {
    try {
        const {
            amount,
            propertyId,
            fromDate,
            toDate,
            guests
        } = req.body;

        // Validate required fields
        if (
            !amount ||
            !propertyId ||
            !fromDate ||
            !toDate ||
            !guests
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "amount, propertyId, fromDate, toDate and guests are required"
            });
        }

        // Check property exists
        const property = await Property.findById(propertyId);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found"
            });
        }

        // Create order ID
        const orderId = "order_" + Date.now();

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            orderId,
            amount,
            propertyId,
            fromDate,
            toDate,
            guests
        });

    } catch (error) {
        console.error("Create Order Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ============================================================
// VERIFY PAYMENT
// ============================================================

const verifyPayment = async (req, res) => {
    try {
        const {
            orderId,
            bookingDetails,
            forceStatus
        } = req.body;

        // Validate request
        if (!orderId || !bookingDetails) {
            return res.status(400).json({
                success: false,
                message:
                    "orderId and bookingDetails are required"
            });
        }

        // Check payment status
        if (forceStatus !== "success") {
            return res.status(400).json({
                success: false,
                message: "Payment failed",
                orderId
            });
        }

        // Check authenticated user
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User is not authenticated"
            });
        }

        const {
            propertyId,
            price,
            fromDate,
            toDate,
            guests,
            nights
        } = bookingDetails;

        // Validate booking details
        if (
            !propertyId ||
            !price ||
            !fromDate ||
            !toDate ||
            !guests ||
            !nights
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "propertyId, price, fromDate, toDate, guests and nights are required"
            });
        }

        // Check property
        const property = await Property.findById(propertyId);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found"
            });
        }

        // Create payment ID
        const paymentId = "pay_" + Date.now();

        // Create booking
        const newBooking = await Booking.create({
            user: req.user._id,
            property: propertyId,
            price: price,
            fromDate: fromDate,
            toDate: toDate,
            guests: guests,
            numberOfNights: nights,
            paid: true
        });

        // Update property
        const updatedProperty =
            await Property.findByIdAndUpdate(
                propertyId,
                {
                    $push: {
                        currentBookings: {
                            bookingId: newBooking._id,
                            fromDate: fromDate,
                            toDate: toDate,
                            userId: req.user._id
                        }
                    }
                },
                {
                    new: true
                }
            );

        res.status(200).json({
            success: true,
            message:
                "Payment successful, booking confirmed",
            paymentId,
            orderId,
            booking: newBooking,
            property: updatedProperty
        });

    } catch (error) {
        console.error("Verify Payment Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ============================================================
// GET MY BOOKINGS
// ============================================================

const getUserBookings = async (req, res) => {
    try {

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Please login first"
            });
        }

        const bookings = await Booking.find({
            user: req.user._id
        }).populate("property");

        res.status(200).json({
            success: true,
            results: bookings.length,
            data: {
                bookings
            }
        });

    } catch (error) {
        console.error("Get User Bookings Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ============================================================
// GET ONE BOOKING
// ============================================================

const getBookingDetails = async (req, res) => {
    try {

        const { bookingId } = req.params;

        const booking =
            await Booking.findById(bookingId)
                .populate("property")
                .populate("user");

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        res.status(200).json({
            success: true,
            data: {
                booking
            }
        });

    } catch (error) {
        console.error("Get Booking Details Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ============================================================
// EXPORT
// ============================================================

export {
  getBookingDetails,
  getUserBookings,
  createOrder,
  verifyPayment,
};