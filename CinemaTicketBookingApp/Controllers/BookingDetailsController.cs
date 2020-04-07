using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CinemaTicketBookingApp;
using Newtonsoft.Json;

namespace CinemaTicketBookingApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingDetailsController : ControllerBase
    {
        private readonly CinemaContext _context;

        public BookingDetailsController(CinemaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookingDetails>>> GetBookingDetails()
        {
            return await _context.BookingDetails.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BookingDetails>> GetBookingDetails(Guid id)
        {
            var bookingDetails = await _context.BookingDetails.FindAsync(id);

            if (bookingDetails == null)
            {
                return NotFound();
            }

            return bookingDetails;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookingDetails(Guid id, BookingDetails bookingDetails)
        {
            if (id != bookingDetails.Id)
            {
                return BadRequest();
            }

            _context.Entry(bookingDetails).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingDetailsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        public async Task<ActionResult<BookingDetails>> PostBookingDetails([FromBody]BookingDetails bookingDetails)
        {
            if(bookingDetails.Tickets.Count() <= 12)
            {
                _context.BookingDetails.Add(bookingDetails);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetBookingDetails", new { id = bookingDetails.Id }, bookingDetails);
            }
            
            return BadRequest(new { error="User tried to book more than 12 tickets."});
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<BookingDetails>> DeleteBookingDetails(Guid id)
        {
            var bookingDetails = await _context.BookingDetails.FindAsync(id);
            if (bookingDetails == null)
            {
                return NotFound();
            }

            _context.BookingDetails.Remove(bookingDetails);
            await _context.SaveChangesAsync();

            return bookingDetails;
        }

        private bool BookingDetailsExists(Guid id)
        {
            return _context.BookingDetails.Any(e => e.Id == id);
        }
    }
}
