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
    public class FilmsController : ControllerBase
    {
        private readonly CinemaContext _context;
        private readonly ILogger<FilmsController> _logger;

        public FilmsController(CinemaContext context, ILogger<FilmsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Film>>> GetFilms()
        {
            try
            {
                return await _context.Films.ToListAsync();
            }
            catch (Exception e)
            {
                ErrorLog(e);
                return BadRequest(new { error = "An error occured while getting film-data from the database, please try again later" });
            }
        }

        [HttpPut]
        public async Task<IActionResult> PutFilm([FromBody]Film film)
        {
            var entry = _context.Films.Add(film);
            entry.State = EntityState.Unchanged;
            _context.Update(film);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException e)
            {
                if (!FilmExists(film.Id))
                {
                    return NotFound();
                }
                else
                {
                    ErrorLog(e);
                    return BadRequest(new { error = "Could not update the database." });
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Film>> DeleteFilm(Guid id)
        {
            var film = await _context.Films.FindAsync(id);
            if (film == null)
            {
                return NotFound();
            }

            _context.Films.Remove(film);
            await _context.SaveChangesAsync();

            return film;
        }

        private void ErrorLog(Exception e) 
        {
            _logger.LogError(e, e.Message);
        }

        private bool FilmExists(Guid id)
        {
            return _context.Films.Any(e => e.Id == id);
        }
    }
}
