using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaTicketBookingApp
{
    public class Ticket
    {
        public virtual Customer Customer { get; set; }

        public Guid Id { get; set; }

        public Guid FilmID { get; set; }

        public Guid WingId { get; set; }

        public Guid SeatId { get; set; }

        public bool Expired { get; set; }
    }
}
