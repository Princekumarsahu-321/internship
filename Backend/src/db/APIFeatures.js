class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = {
      ...this.queryString,
    };

    const filterQuery = {};

    if (
      queryObj.minPrice !== undefined &&
      queryObj.maxPrice !== undefined
    ) {
      const minPrice = Number(queryObj.minPrice);
      const maxPrice = Number(queryObj.maxPrice);

      if (Number.isFinite(minPrice) && Number.isFinite(maxPrice)) {
        filterQuery.price = {
          $gte: minPrice,
          $lte: maxPrice,
        };
      }
    }

    if (queryObj.propertyType) {
      const propertyTypes = Array.isArray(queryObj.propertyType)
        ? queryObj.propertyType
        : queryObj.propertyType.split(",");

      filterQuery.propertyType = {
        $in: propertyTypes.map((value) => value.trim()).filter(Boolean),
      };
    }

    if (queryObj.roomType) {
      filterQuery.roomType = queryObj.roomType;
    }

    if (queryObj.amenities) {
      const amenitiesArray =
        Array.isArray(queryObj.amenities)
          ? queryObj.amenities
          : queryObj.amenities
              .split(",")
              .map((value) => value.trim());

      filterQuery["amenities.name"] = {
        $all: amenitiesArray,
      };
    }

    this.query = this.query.find(filterQuery);

    return this;
  }

  search() {
    const queryObj = {
      ...this.queryString,
    };

    const searchQuery = {};

    if (queryObj.city) {
      const city = queryObj.city
        .toLowerCase()
        .replace(/\s+/g, "");

      searchQuery.$or = [
        { "address.city": city },
        { "address.state": city },
        { "address.area": city },
      ];
    }

    if (queryObj.guests && Number.isFinite(Number(queryObj.guests))) {
      searchQuery.maximumGuest = {
        $gte: Number(queryObj.guests),
      };
    }

    if (
      queryObj.dateIn &&
      queryObj.dateOut
    ) {
      searchQuery.currentBookings = {
        $not: {
          $elemMatch: {
            fromDate: {
              $lt: new Date(queryObj.dateOut),
            },
            toDate: {
              $gt: new Date(queryObj.dateIn),
            },
          },
        },
      };
    }

    this.query = this.query.find(searchQuery);

    return this;
  }

  paginate() {
    const page =
      Number(this.queryString.page) || 1;

    const limit =
      Number(this.queryString.limit) || 12;

    const skip = (page - 1) * limit;

    this.query = this.query
      .skip(skip)
      .limit(limit);

    return this;
  }
}

export default APIFeatures;