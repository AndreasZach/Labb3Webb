import { Component } from 'react';

export default class FetchData extends Component {
  static displayName = FetchData.name;

  
  static PostBookingDetails = async (tickets) => {
    return fetch('api/bookingdetails', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({tickets})
    })
    .then(response => response.json())
    .catch(err => this.fetchFailure(err));
  }

  static UpdateFilmItem = async (filmChanges) => {
    return fetch('api/films', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: (JSON.stringify({
      Id: filmChanges.Id, 
      ScreenDateTime: filmChanges.ScreenDateTime,
      Title: filmChanges.Title,
      Price: filmChanges.Price,
      ImdbImgUrl: filmChanges.ImdbImgUrl,
      Summary: filmChanges.Summary,
      Wings: filmChanges.Wings
    }))})
    .then(response => response.text())
    .catch(err => this.fetchFailure(err));
  }

  static GetFilmItems = async () => {
    return fetch('api/films')
    .then(response => response.json())
    .then((result) => {
      result.forEach(item => 
        { 
          return (
          item.Wings.forEach(w => {
              return w.FreeSeats = w.Seats.filter(s => s.Booked === false).length;
          }));
        })
        return (result.sort((a,b) => new Date(b.ScreenDateTime) - new Date(a.ScreenDateTime)));
      })
    .catch(err => this.fetchFailure(err))
  }

  static fetchFailure(err){
    alert(err);
  }
}
