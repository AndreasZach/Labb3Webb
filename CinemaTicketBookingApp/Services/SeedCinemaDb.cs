using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaTicketBookingApp
{
    public class SeedCinemaDb
    {
        private readonly CinemaContext _ctx;

        public SeedCinemaDb(CinemaContext ctx)
        {
            _ctx = ctx;
        }

        public async Task SeedDataAsync()
        {
            _ctx.Database.EnsureCreated();
            if (!_ctx.Films.AsEnumerable().Any())
            { 
                _ctx.Films.AddRange(
                        new Film
                        {
                            Id = new Guid(),
                            ScreenDateTime = DateTime.Today.AddHours(12),
                            Title = "The Shawshank Redemption",
                            Price = 80,
                            ImdbImgUrl = "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
                            Summary = "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
                            Wings = new List<Wing> 
                            { 
                                new Wing 
                                {
                                    Id = new Guid(),
                                    WingAreaName = "Wing A",
                                    Seats = SeatBuilder(50)
                                }, 
                                new Wing 
                                {
                                    Id = new Guid(),
                                    WingAreaName = "Wing B",
                                    Seats = SeatBuilder(100)
                                } 
                            }
                        },
                        new Film
                        {
                            Id = new Guid(),
                            ScreenDateTime = DateTime.Today.AddHours(15),
                            Title = "The Godfather",
                            Price = 95,
                            ImdbImgUrl = "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,704,1000_AL_.jpg",
                            Summary = "Michael, the young and idealistic son of Vito Corleone, the head of the most powerful Mafia clan in New York, returns home as a war hero and is determined to live his own life. But tragic circumstances make him face the legacy of his family.",
                            Wings = new List<Wing>
                            {
                                new Wing
                                {
                                    Id = new Guid(),
                                    WingAreaName = "Wing A",
                                    Seats = SeatBuilder(50)
                                },
                                new Wing
                                {
                                    Id = new Guid(),
                                    WingAreaName = "Wing B",
                                    Seats = SeatBuilder(100)
                                }
                            }
                        },
                        new Film
                        {
                            Id = new Guid(),
                            ScreenDateTime = DateTime.Today.AddHours(18),
                            Title = "The Dark Knight",
                            Price = 110,
                            ImdbImgUrl = "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg",
                            Summary = "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
                            Wings = new List<Wing>
                            {
                                new Wing
                                {
                                    Id = new Guid(),
                                    WingAreaName = "Wing A",
                                    Seats = SeatBuilder(50)
                                },
                                new Wing
                                {
                                    Id = new Guid(),
                                    WingAreaName = "Wing B",
                                    Seats = SeatBuilder(100)
                                }
                            }
                        },
                        new Film
                        {
                            Id = new Guid(),
                            ScreenDateTime = DateTime.Today.AddHours(21),
                            Title = "The Matrix",
                            Price = 60,
                            ImdbImgUrl = "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_CR0,0,665,1000_AL_.jpg",
                            Summary = "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
                            Wings = new List<Wing>
                            {
                                new Wing
                                {
                                    Id = new Guid(),
                                    WingAreaName = "Wing A",
                                    Seats = SeatBuilder(50)
                                },
                                new Wing
                                {
                                    Id = new Guid(),
                                    WingAreaName = "Wing B",
                                    Seats = SeatBuilder(100)
                                }
                            }
                        },
                        new Film
                        {
                            Id = new Guid(),
                            ScreenDateTime = DateTime.Today.AddHours(23),
                            Title = "Back to the Future",
                            Price = 120,
                            ImdbImgUrl = "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SY1000_CR0,0,643,1000_AL_.jpg",
                            Summary = "Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the eccentric scientist Doc Brown.",
                            Wings = new List<Wing>
                            {
                                new Wing
                                {
                                    Id = new Guid(),
                                    WingAreaName = "Wing A",
                                    Seats = SeatBuilder(50)
                                },
                                new Wing
                                {
                                    Id = new Guid(),
                                    WingAreaName = "Wing B",
                                    Seats = SeatBuilder(100)
                                }
                            }
                        }
                    );
                await _ctx.SaveChangesAsync();
            }
        }

        private List<Seat>SeatBuilder(int amount)
        {
            var seatList = new List<Seat>();
            for (int i = 0; i < amount; i++)
            {
                seatList.Add
                    (
                        new Seat
                        {
                            Id = new Guid(),
                            SeatNumber = i + 1,
                            Booked = false
                        }
                    );
            }
            return seatList;
        }
    }
}
