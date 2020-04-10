using System;
using System.Collections.Generic;

namespace CinemaTicketBookingApp
{
    public class BookingDetails
    {
        public Guid Id { get; set; } = new Guid();

        public Guid CustomerId { get; set; } = new Guid();

        public List<Ticket> Tickets { get; set; }
    }
}
