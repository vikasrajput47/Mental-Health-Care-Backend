import Hotel from "../models/hotel.js";
export const findAllHotels = async () => {
  return await Hotel.find().sort({ createdAt: -1 });
};
export const findSingleHotel = async (id) => {
  return await Hotel.findById(id)
};

export const createHotel = async (hotelData, imageUrl) => {
  const hotel = new Hotel({
    ...hotelData,
    images: imageUrl ? [imageUrl] : [],
  });
  return await hotel.save();
};

export const updateHotelById = async (id, updateData, newImageUrl) => {
  if (newImageUrl) {
    updateData.images = [newImageUrl];
  }
  return await Hotel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

export const deleteHotelById = async (id) => {
  return await Hotel.findByIdAndDelete(id);
};
