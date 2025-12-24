import * as hotelService from "../services/hotelService.js";

export const getHotels = async (req, res) => {
  try {
    const hotels = await hotelService.findAllHotels();
    res.status(200).json({ success: true, data: hotels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getSingleHotel = async (req, res) => {
  try {
    const hotel = await hotelService.findSingleHotel(req.params.id);
    res.status(200).json({ success: true, data: hotel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const postHotel = async (req, res) => {
  try {
      const imageUrl = req.file ? req.file.path : null;
      console.log("the image url is ==>>",imageUrl)
      console.log("the image url is ==>>",req.body)
    const hotel = await hotelService.createHotel(req.body, imageUrl);
    res.status(201).json({ success: true, data: hotel });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const putHotel = async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : null;
    const hotel = await hotelService.updateHotelById(
      req.params.id,
      req.body,
      imageUrl
    );

    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.status(200).json({ success: true, data: hotel });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const removeHotel = async (req, res) => {
  try {
    const hotel = await hotelService.deleteHotelById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.status(200).json({ success: true, message: "Hotel Deleted" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
