using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaTicketBookingApp
{
    public class Wing
    {
        public Guid Id { get; set; }

        public string WingAreaName { get; set; }

        public int? FreeSeats { get; set; } = null;

        public List<Seat> Seats { get; set; }   
    }
}
