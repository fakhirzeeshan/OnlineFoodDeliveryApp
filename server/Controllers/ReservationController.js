const Reservation = require('../Models/ReservationModel');

// Create a new reservation
exports.createReservation = async (req, res) => {
  const { userId, clientname, numberOfPersons, phone, date, email } = req.body;

  try {
    if (!userId || !clientname || !numberOfPersons || !phone || !date || !email) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newReservation = new Reservation({
      userId,
      clientname,
      numberOfPersons,
      phone,
      date,
      email,
    });

    await newReservation.save();
    res.status(201).json({ message: 'Reservation created successfully!', reservation: newReservation });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ message: 'Failed to create reservation.' });
  }
};

// controllers/reservationController.js
exports.getUserReservations = async (req, res) => {
  const userId = req.params.userId; // Retrieve userId from request parameters
  try {
    const reservations = await Reservation.find({ userId }); // Use the userId to fetch reservations
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservations', error });
  }
};

// Get all reservations (for admin or overall management)
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all reservations', error });
  }
};

// Update reservation status
exports.updateReservationStatus = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const { status } = req.body;

    const updatedReservation = await Reservation.findByIdAndUpdate(
      reservationId,
      { status },
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(500).json({ message: 'Error updating reservation status', error });
  }
};

// Delete a reservation
exports.deleteReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const deletedReservation = await Reservation.findByIdAndDelete(reservationId);

    if (!deletedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting reservation', error });
  }
};
