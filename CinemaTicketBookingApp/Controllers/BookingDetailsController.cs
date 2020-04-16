using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CinemaTicketBookingApp
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingDetailsController : ControllerBase
    {
        private readonly CinemaContext _context;
        private readonly ILogger<BookingDetailsController> _logger;

        public BookingDetailsController(CinemaContext context, ILogger<BookingDetailsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookingDetails>>> GetBookingDetails()
        {
            try
            {
                return await _context.BookingDetails.ToListAsync();
            }
            catch (Exception e)
            {
                ErrorLog(e);
                return BadRequest(new { error = "An error occured while getting bookingdetails from the database, please try again later" });
            }
        }

        public async Task<ActionResult<BookingDetails>> PostBookingDetails([FromBody]BookingDetails bookingDetails)
        {
            try
            {
                if (bookingDetails.Tickets.Count() <= 12)
                {
                    _context.BookingDetails.Add(bookingDetails);
                    await _context.SaveChangesAsync();

                    return CreatedAtAction("GetBookingDetails", bookingDetails);
                }

                return BadRequest(new { error = "User tried to book more than 12 tickets." });
            }
            catch (Exception e)
            {
                ErrorLog(e);
                return BadRequest(new { error = "An error occured while saving your booking information to the database. Please try again later." });
            }
            
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

        private void ErrorLog(Exception e) => _logger.LogError(e, e.Message);
    }
}
