using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaTicketBookingApp
{
    public class BookingDetails
    {
        public Guid Id { get; set; } = new Guid();

        public Guid CustomerId { get; set; } = new Guid(); // Create a customer class and use that instead if I have time. Implement Form for customer to enter information in frontend.

        public List<Ticket> Tickets { get; set; }
    }
}
