﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Cosmos;
using CinemaTicketBookingApp;

namespace CinemaTicketBookingApp
{
    public class CinemaContext : DbContext
    {
        public CinemaContext(DbContextOptions<CinemaContext> options) 
            : base(options)
        {
        }

        public DbSet<Film> Films { get; set; }

        public DbSet<BookingDetails> BookingDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BookingDetails>().OwnsMany(t => t.Tickets);
            modelBuilder.Entity<Film>().OwnsMany(w => w.Wings, s =>
            {
                s.OwnsMany(s => s.Seats);
            });
        }
    }
}
