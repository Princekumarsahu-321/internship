import Property from "../models/property.model.js";
import APIFeatures from "../db/APIFeatures.js";
import groq from "../ai/aiClient.js";

// ===============================
// GET ALL PROPERTIES
// ===============================
const getProperties = async (req, res) => {
  try {
    const features = new APIFeatures(
      Property.find(),
      req.query
    )
      .filter()
      .search()
      .paginate();

    // Execute final mongoose query
    const properties = await features.query;
    const total = await Property.countDocuments(features.query.getFilter());

    res.status(200).json({
      status: "success",
      no_of_responses: properties.length,
      total,
      data: properties,
    });
  } catch (error) {
    console.error("Error searching properties:", error);

    res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};

// ===============================
// GET SINGLE PROPERTY
// ===============================
const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    // Property not found
    if (!property) {
      return res.status(404).json({
        status: "fail",
        message: "Property not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: property,
    });
  } catch (error) {
    console.error("Error getting property:", error);

    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const generateDescription = async (req, res) => {
  const {
    propertyName, extraInfo, propertyType, roomType,
    maximumGuest, amenities, price, address,
  } = req.body;

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [{
      role: "user",
      content: `Write a concise rental listing description for ${propertyName}. Details: ${JSON.stringify({
        extraInfo, propertyType, roomType, maximumGuest, amenities, price, address,
      })}. Return only the description.`,
    }],
  });

  res.status(200).json({
    status: "success",
    data: { description: completion.choices[0].message.content },
  });
};

export {
  getProperties,
  getProperty,
  generateDescription,
};