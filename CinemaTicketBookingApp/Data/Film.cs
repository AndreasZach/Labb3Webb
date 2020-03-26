using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaTicketBookingApp
{
    public class Film
    {
        public Guid Id { get; set; }
        
        public DateTime ScreenDateTime { get; set; }

        public string Title { get; set; }

        public double Price { get; set; }
        
        public string ImdbImgUrl { get; set; }
        
        public string Summary { get; set; }
        
        public ICollection<Wing> Wings { get; set; }
    }
}
