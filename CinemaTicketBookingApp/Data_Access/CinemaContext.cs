using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Cosmos;

namespace CinemaTicketBookingApp
{
    public class CinemaContext : DbContext
    {
        public CinemaContext(DbContextOptions<CinemaContext> options) 
            : base(options)
        {
        }

        // public DbSet<Customer> Customers { get; set; }

        public DbSet<Film> Films { get; set; }

        public DbSet<Ticket> Tickets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ticket>().OwnsOne(c => c.Customer);
            modelBuilder.Entity<Film>().OwnsMany(w => w.Wings, s =>
            {
                s.OwnsMany(s => s.Seats);
            });
        }
    }
}
