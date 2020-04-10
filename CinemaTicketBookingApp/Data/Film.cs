using System;
using System.Collections.Generic;

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
        
        public List<Wing> Wings { get; set; }
    }
}
