using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaTicketBookingApp
{
    public class Seat
    {
        public Guid Id { get; set; }

        public int SeatNumber { get; set; }

        public bool Booked { get; set; }
    }
}
