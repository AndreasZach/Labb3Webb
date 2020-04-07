using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaTicketBookingApp
{
    public class Ticket
    {
        public Guid Id { get; set; } = new Guid();

        public string FilmTitle { get; set; }

        public DateTime FilmTime { get; set; }

        public string WingName { get; set; }

        public int SeatNumber { get; set; }
    }
}
