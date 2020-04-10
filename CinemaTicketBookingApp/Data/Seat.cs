using System;

namespace CinemaTicketBookingApp
{
    public class Seat
    {
        public Guid Id { get; set; }

        public int SeatNumber { get; set; }

        public bool Booked { get; set; }
    }
}
